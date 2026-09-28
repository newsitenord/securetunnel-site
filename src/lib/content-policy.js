import {createHash} from 'node:crypto';
export const MIN_WORDS = 1200;
export const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
export const normalize = s => String(s).toLowerCase().normalize('NFKC').replace(/[^\p{L}\p{N}]+/gu,' ').trim();
export const countWords = s => String(s).trim().split(/\s+/u).filter(Boolean).length;
export const bodyText = a => [a.intro,...(a.sections||[]).flatMap(s=>[s.title,...(s.paragraphs||[]),...(s.bullets||[])])].join('\n\n');
export function validateArticle(a, today = new Date().toISOString().slice(0,10)) {
  const errors=[];
  const need=(condition,message)=>{if(!condition)errors.push(message);};
  need(SLUG.test(a.slug||'')&&(a.slug||'').length<=96,'Invalid slug (use at most 96 lowercase slug characters)');
  need(['draft','published'].includes(a.status),'Status must be draft or published');
  if(a.status!=='published')return errors;
  for(const key of ['title','description','intent','intro','author'])need(typeof a[key]==='string'&&a[key].trim(),`Missing ${key}`);
  need(a.title?.length<=90,'Title must be at most 90 characters');
  need(a.description?.length>=80&&a.description?.length<=158,'Description must be 80–158 characters');
  need(a.method==='documentation','Only documentation-based guides supported by this pipeline');
  for(const key of ['publishedAt','updatedAt','sourcesCheckedOn']){
    const d=a[key]; need(/^\d{4}-\d{2}-\d{2}$/.test(d||'')&&!isNaN(Date.parse(d))&&new Date(d).toISOString().slice(0,10)===d&&d<=today,`Invalid or future ${key}`);
  }
  need(a.updatedAt>=a.publishedAt,'Updated date precedes publication');
  need(a.sourcesCheckedOn<=a.updatedAt,'Source check date is later than updated date');
  need(countWords(bodyText(a))>=MIN_WORDS,`Article body must contain at least ${MIN_WORDS} words, excluding layout and references`);
  need((a.sections||[]).length>=6,'At least six substantive sections required');
  const ids=new Set();
  for(const s of a.sections||[]){
    need(SLUG.test(s.id||'')&&!ids.has(s.id),`Invalid or duplicate section ID ${s.id}`); ids.add(s.id);
    need(typeof s.title==='string'&&s.title.trim(),`Missing section title ${s.id}`);
    need(Array.isArray(s.paragraphs)&&s.paragraphs.every(p=>typeof p==='string'),`Invalid paragraphs in ${s.id}`);
    need(countWords([...(s.paragraphs||[]),...(s.bullets||[])].join(' '))>=70,`Section ${s.id} is too thin`);
    need((s.sourceIds||[]).length>0&&s.sourceIds.every(i=>Number.isInteger(i)&&i>0&&i<=a.sources?.length),`Missing or invalid citations in ${s.id}`);
  }
  need((a.sources||[]).length>=2,'At least two sources required');
  const urls=new Set();
  for(const s of a.sources||[]){
    let valid=false;try {const u=new URL(s.url);valid=u.protocol==='https:'&&!u.username&&!u.password;}catch{}
    need(valid&&!urls.has(s.url),`Invalid or repeated source URL ${s.url}`);urls.add(s.url);
    need(s.title&&s.publisher&&s.note,'Source requires title, publisher and scope note');
  }
  need((a.related||[]).length>=2,'At least two relevant internal links required');
  need((a.related||[]).every(x=>typeof x==='string'&&x.startsWith('/')&&!x.startsWith('//')),'Related links must be internal paths');
  need(!/<\/?[a-z][^>]*>/i.test(bodyText(a)),'Raw HTML is not allowed');
  need(!/\b(TODO|TBD|lorem ipsum|insert text)\b/i.test(bodyText(a)),'Placeholder text found');
  need(!/\b(we tested|our tests showed|we measured|guaranteed anonymity)\b/i.test(bodyText(a)),'Unsupported testing or anonymity claim');
  return errors;
}
export function duplicateProblems(articles) {
  const errors=[],titles=new Map(),intents=new Map(),bodies=new Map(),paragraphs=new Map();
  for(const a of articles){
    for(const [map,value,label] of [[titles,a.title,'title'],[intents,a.intent,'search intent'],[bodies,bodyText(a),'body']]){
      const key=createHash('sha256').update(normalize(value)).digest('hex');
      if(map.has(key))errors.push(`${a.slug}: duplicate ${label} with ${map.get(key)}`);else map.set(key,a.slug);
    }
    const seen=new Set();
    for(const s of a.sections||[]) for(const p of s.paragraphs||[]){
      if(countWords(p)<60)continue;
      // Remove digits to catch year/price-only rewrites. This is a guardrail,
      // not semantic proof: distinct intent and human review remain necessary.
      const key=createHash('sha256').update(normalize(p).replace(/\b\d+\b/g,'#')).digest('hex');
      if(seen.has(key))errors.push(`${a.slug}: repeated long paragraph within article`);
      seen.add(key);
      if(paragraphs.has(key)&&paragraphs.get(key)!==a.slug) errors.push(`${a.slug}: copied long paragraph from ${paragraphs.get(key)}`);
      else paragraphs.set(key,a.slug);
    }
  }
  return errors;
}
