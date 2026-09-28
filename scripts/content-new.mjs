import fs from 'node:fs/promises';
import {SLUG} from '../src/lib/content-policy.js';
const slug=process.argv[2];
if(!SLUG.test(slug||'')||slug.length>96){console.error('Usage: npm run content:new -- descriptive-slug');process.exit(1);}
const a={slug,status:'draft',title:'',description:'',intent:'',intro:'',method:'documentation',author:'SecureTunnel',publishedAt:null,updatedAt:null,sourcesCheckedOn:null,sections:[],sources:[],related:[],affiliate:false};
await fs.writeFile(`content/articles/${slug}.json`,JSON.stringify(a,null,2)+'\n',{flag:'wx'});
console.log('Draft created. It is NOT routable or included in sitemaps. Complete the article, sources and dates before setting status to published.');
