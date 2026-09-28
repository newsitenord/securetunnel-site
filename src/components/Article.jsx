import React from 'react';
import Crumbs from './Crumbs.jsx';
import JsonLd from './JsonLd.jsx';
import {affiliateLink,site} from '../config.js';
import {catalog} from '../lib/articles.js';
const displayDate=d=>new Date(`${d}T00:00:00Z`).toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric',timeZone:'UTC'});
export default function Article({article:a}){
 const path=`/learn/${a.slug}`;
 return <div className="wrap reading-wrap"><Crumbs items={[{label:'Privacy fundamentals',href:'/learn'},{label:a.title,href:path}]}/>
  <article className="reading-article">
   <header className="article-header"><p className="kicker">Privacy fundamentals / Practical guide</p><h1>{a.title}</h1><p className="hub-intro">{a.intro}</p>
    <p className="article-meta">By {a.author} · Published {displayDate(a.publishedAt)} · {Math.ceil(catalog.find(x=>x.slug===a.slug).wordCount/220)} minute read</p>
    <p className="method-note">AI-assisted, documentation-based guide. Sources checked {displayDate(a.sourcesCheckedOn)}. No hands-on testing or provider performance verification is claimed.</p>
   </header>
   <div className="reading-grid"><aside className="article-toc"><nav aria-label="On this page"><h2>On this page</h2><ol>{a.sections.map(s=><li key={s.id}><a href={`#${s.id}`}>{s.title}</a></li>)}</ol><a href="#sources">Sources and scope</a></nav></aside>
   <div className="article-copy"><div data-article-body>{a.sections.map(s=><section key={s.id} id={s.id}><h2>{s.title}</h2>{s.paragraphs.map((p,i)=><p key={i}>{p}</p>)}{s.bullets?.length>0&&<ul>{s.bullets.map((b,i)=><li key={i}>{b}</li>)}</ul>}<p className="section-citations">References: {s.sourceIds.map((id,i)=><React.Fragment key={id}>{i>0?' · ':''}<a href={`#source-${id}`} aria-label={`Source ${id}: ${a.sources[id-1].publisher}`}>[{id}] {a.sources[id-1].publisher}</a></React.Fragment>)}</p></section>)}</div>
    <section id="sources" className="sources-panel"><h2>Sources and scope</h2><p>These sources support the technical background. Practical checklists are editorial synthesis, not independent product tests. The sources do not endorse SecureTunnel or its affiliate partners.</p><ol>{a.sources.map((s,i)=><li id={`source-${i+1}`} key={s.url}><a href={s.url} rel="noopener noreferrer">{s.title}</a><span className="source-publisher"> — {s.publisher}</span><p>{s.note}</p></li>)}</ol></section>
    {a.affiliate&&<aside className="cta" aria-label="Optional affiliate offer"><div className="cta-body"><h2>Still considering a VPN?</h2><p>Compare supported devices, privacy policies and the full subscription terms before buying. A VPN may not be needed for your situation.</p><p className="cta-note">Affiliate link: we may earn a commission if you buy, at no extra cost to you.</p></div><a className="btn" href={affiliateLink(a.slug)} target="_blank" rel="nofollow sponsored noopener noreferrer">Check NordVPN’s current terms</a></aside>}
    <section className="related"><h2>Continue learning</h2><ul>{a.related.map(p=><li key={p}><a href={p}>{catalog.find(x=>`/learn/${x.slug}`===p)?.title||p.split('/').at(-1).replaceAll('-',' ').replace(/^./,s=>s.toUpperCase())}</a></li>)}</ul><a href="/learn">Browse all privacy guides →</a></section>
   </div></div>
  </article>
  <JsonLd data={{'@context':'https://schema.org','@type':'Article',headline:a.title,description:a.description,datePublished:a.publishedAt,dateModified:a.updatedAt,author:{'@type':'Organization',name:a.author,url:site.url+'/about'},publisher:{'@type':'Organization',name:site.name,url:site.url},mainEntityOfPage:site.url+path,citation:a.sources.map(s=>s.url)}}/>
 </div>;
}
