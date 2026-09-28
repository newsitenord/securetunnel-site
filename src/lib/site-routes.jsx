import React from 'react';
import legacyRoutes from './legacy-routes.jsx';
import {catalog,PAGE_SIZE,articleMeta,getArticle} from './articles.js';
import Article from '../components/Article.jsx';
import LearnHub from '../components/LearnHub.jsx';
import {site} from '../config.js';
const legacyPaths=[...legacyRoutes.keys()];
export function resolveRoute(path){
 if(legacyRoutes.has(path))return {kind:'legacy',...legacyRoutes.get(path)};
 const articleMatch=path.match(/^\/learn\/([a-z0-9]+(?:-[a-z0-9]+)*)$/);
 if(articleMatch&&articleMeta(articleMatch[1]))return {kind:'article',meta:articleMeta(articleMatch[1])};
 const pageMatch=path.match(/^\/learn\/page\/([1-9]\d*)$/);
 if(pageMatch){const page=Number(pageMatch[1]);if(page>1&&page<=Math.ceil(catalog.length/PAGE_SIZE))return {kind:'hub',page};}
 return null;
}
export function routeMetadata(route){
 if(route.kind==='article')return route.meta;
 if(route.kind==='hub')return LearnHub({page:route.page}).props;
 // Existing native templates return a Base element carrying presentation data.
 // The Learn hub is itself the Base-returning function.
 return route.Component(route.props).props;
}
export async function renderRoute(route){
 if(route.kind==='article'){const article=await getArticle(route.meta.slug);return article?<Article article={article}/>:null;}
 if(route.kind==='hub')return <LearnHub page={route.page}/>;
 const Component=route.Component;return <Component {...route.props}/>;
}
export function allPages(){
 const pages=legacyPaths.map(path=>({path,...(path==='/learn'&&catalog.length?{lastmod:catalog.reduce((d,a)=>a.updatedAt>d?a.updatedAt:d,'')}: {})}));
 pages.push(...catalog.map(a=>({path:`/learn/${a.slug}`,lastmod:a.updatedAt})));
 for(let page=2;page<=Math.ceil(catalog.length/PAGE_SIZE);page++)pages.push({path:`/learn/page/${page}`});
 return pages;
}
export function prebuiltPaths(){
 // Existing URLs plus a bounded number of new articles. Unbuilt, approved
 // articles use ISR on first request; arbitrary keyword URLs stay 404.
 return [...legacyPaths,...catalog.slice(0,24).map(a=>`/learn/${a.slug}`)];
}
