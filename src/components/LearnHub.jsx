import React from 'react';
import Base from '../layouts/Base.jsx';
import Crumbs from './Crumbs.jsx';
import {catalog,PAGE_SIZE} from '../lib/articles.js';
export default function LearnHub({page=1}){
 const maxPage=Math.max(1,Math.ceil(catalog.length/PAGE_SIZE));
 const items=catalog.slice((page-1)*PAGE_SIZE,page*PAGE_SIZE);
 const title=page===1?'Privacy fundamentals: practical VPN explainers':`Privacy fundamentals: page ${page}`;
 const path=page===1?'/learn':`/learn/page/${page}`;
 return <Base title={title} description={page===1?'Practical privacy guides with cited sources, clear limitations and checklists. Compare VPNs with other tools and decide which protections you actually need.':`Browse page ${page} of SecureTunnel’s documentation-based privacy guides, with practical checklists, technical sources and clear VPN limitations.`} slug="/learn" ogType="website">
  <section className="hero"><div className="wrap"><Crumbs items={[{label:'Privacy fundamentals',href:'/learn'},...(page>1?[{label:`Page ${page}`,href:path}]:[])]}/><p className="kicker">Understand first. Choose second.</p><h1>Privacy fundamentals{page>1?` · Page ${page}`:''}</h1><p className="lede">Clear answers to different privacy problems. Learn what each tool can protect, what it cannot, and when you do not need another subscription.</p></div></section>
  <div className="wrap learn-list">
   {page===1&&<><h2>Start with the basics</h2><div className="grid-2"><a className="card" href="/learn/vpn-vs-https"><p className="meta">Encryption</p><h3>VPN vs HTTPS: what each one protects</h3><p>Understand the separate encryption boundaries and who can still see what.</p></a><a className="card" href="/learn/vpn-on-public-wifi"><p className="meta">Everyday privacy</p><h3>Do you need a VPN on public Wi-Fi?</h3><p>A threat-based checklist for cafés, airports and hotels.</p></a></div></>}
   <h2>Documentation-based guides</h2><p className="hub-intro">{catalog.length} new guides with linked sources. These explainers do not claim hands-on product testing.</p>
   <div className="grid-2">{items.map(a=><a className="card guide-card" href={`/learn/${a.slug}`} key={a.slug}><p className="meta">{Math.ceil(a.wordCount/220)} minute read · {a.wordCount.toLocaleString('en-US')} words</p><h3>{a.title}</h3><p>{a.description}</p><span className="card-action">Read guide →</span></a>)}</div>
   {maxPage>1&&<nav className="pagination" aria-label="Guide pages">{page>1&&<a rel="prev" href={page===2?'/learn':`/learn/page/${page-1}`}>← Previous</a>}<span>Page {page} of {maxPage}</span>{page<maxPage&&<a rel="next" href={`/learn/page/${page+1}`}>Next →</a>}</nav>}
   <aside className="note info"><strong>Need setup help?</strong> Browse <a href="/guides">VPN configuration guides</a> or <a href="/fix">troubleshooting</a>. Product features and prices on older pages need to be checked against the provider’s current documentation.</aside>
  </div>
 </Base>;
}
