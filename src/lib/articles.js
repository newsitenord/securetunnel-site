import fs from 'node:fs/promises';
import path from 'node:path';
import {cache} from 'react';
import catalog from '../generated/catalog.json';
const bySlug=new Map(catalog.map(a=>[a.slug,a]));
export {catalog};
export const PAGE_SIZE=24;
export function articleMeta(slug){return bySlug.get(slug);}
export const getArticle=cache(async slug=>{
  // Only the validated catalog can select files: no arbitrary path reads.
  if(!bySlug.has(slug))return null;
  const a=JSON.parse(await fs.readFile(path.join(process.cwd(),'content/articles',`${slug}.json`),'utf8'));
  return a.status==='published'?a:null;
});
