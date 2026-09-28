import fs from 'node:fs/promises';
const origin=process.env.AUDIT_ORIGIN||'http://127.0.0.1:3000';
const baseline=JSON.parse(await fs.readFile('docs/baseline-routes.json','utf8'));
const catalog=JSON.parse(await fs.readFile('src/generated/catalog.json','utf8'));
const checks=[...baseline,...catalog.map(a=>`/learn/${a.slug}`),'/robots.txt','/rss.xml','/sitemap.xml','/sitemaps/0.xml','/google9a3003e6843e8319.html'].map(path=>({path,status:200}));
checks.push(...['/learn/unpublished-guide','/vpn/fictional','/sitemaps/999.xml','/learn/page/1'].map(path=>({path,status:404})));
let cursor=0,passed=0;const errors=[];
await Promise.all(Array.from({length:8},async()=>{
 while(cursor<checks.length){const {path,status}=checks[cursor++];try{
  const response=await fetch(new URL(path,origin),{redirect:'manual'});await response.arrayBuffer();
  if(response.status!==status)errors.push(`${path}: expected ${status}, received ${response.status}`);else passed++;
 }catch(e){errors.push(`${path}: ${e.message}`);}}
}));
const report={checks:checks.length,passed,errors};
await fs.mkdir('reports',{recursive:true});await fs.writeFile('reports/http-audit.json',JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report,null,2));process.exitCode=errors.length?1:0;
