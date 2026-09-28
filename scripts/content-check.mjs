import fs from 'node:fs/promises';
import path from 'node:path';
import {validateArticle,duplicateProblems,bodyText,countWords} from '../src/lib/content-policy.js';
const dir=path.resolve('content/articles');
const articles=[],errors=[];
const baseline=JSON.parse(await fs.readFile('docs/baseline-routes.json','utf8'));
for(const file of (await fs.readdir(dir)).filter(f=>f.endsWith('.json')).sort()){
 let a;try{a=JSON.parse(await fs.readFile(path.join(dir,file),'utf8'));}catch(e){errors.push(`${file}: ${e.message}`);continue;}
 errors.push(...validateArticle(a).map(e=>`${file}: ${e}`));
 if(file!==`${a.slug}.json`)errors.push(`${file}: filename must match slug`);
 if(baseline.includes(`/learn/${a.slug}`))errors.push(`${file}: collides with an existing URL`);
 if(a.status==='published')articles.push(a);
}
errors.push(...duplicateProblems(articles));
const paths=new Set([...baseline,...articles.map(a=>`/learn/${a.slug}`)]);
for(const a of articles) for(const p of a.related||[]) if(!paths.has(p))errors.push(`${a.slug}: broken related link ${p}`);
if(errors.length){console.error(errors.join('\n'));process.exit(1);}
const catalog=articles.map(({slug,title,description,intent,publishedAt,updatedAt,sourcesCheckedOn,author,...a})=>({slug,title,description,intent,publishedAt,updatedAt,sourcesCheckedOn,author,wordCount:countWords(bodyText(a))})).sort((a,b)=>b.publishedAt.localeCompare(a.publishedAt)||a.slug.localeCompare(b.slug));
await fs.mkdir('src/generated',{recursive:true});
await fs.writeFile('src/generated/catalog.json',JSON.stringify(catalog,null,2)+'\n');
console.log(`Content checks passed: ${catalog.length} published guides; ${catalog.reduce((n,a)=>n+a.wordCount,0).toLocaleString()} body words. Drafts excluded.`);
for(const a of catalog)console.log(`  ${String(a.wordCount).padStart(5)} words /learn/${a.slug}`);
