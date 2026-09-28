import {allPages} from '../../../lib/site-routes.jsx';
import {chunks,urlset} from '../../../lib/sitemap.js';
import {site} from '../../../config.js';
export const dynamic='force-static';
export const dynamicParams=false;
export function generateStaticParams(){return chunks(allPages()).map((_,i)=>({file:`${i}.xml`}));}
export async function GET(_request,{params}){
 const {file}=await params;
 if(!/^(0|[1-9]\d*)\.xml$/.test(file))return new Response('Not found',{status:404});
 const group=chunks(allPages())[Number(file.slice(0,-4))];
 if(!group)return new Response('Not found',{status:404});
 return new Response(urlset(group,site.url),{headers:{'Content-Type':'application/xml; charset=utf-8','Cache-Control':'public, max-age=3600'}});
}
