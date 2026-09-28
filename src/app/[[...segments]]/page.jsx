import React from 'react';
import {notFound} from 'next/navigation';
import {resolveRoute,routeMetadata,renderRoute,prebuiltPaths} from '../../lib/site-routes.jsx';
import {pageMetadata} from '../../lib/metadata.js';
export const revalidate=86400;
export const dynamicParams=true;
const pathFrom=params=>'/'+(params.segments||[]).join('/');
export function generateStaticParams(){return prebuiltPaths().map(p=>({segments:p==='/'?[]:p.slice(1).split('/')}));}
export async function generateMetadata({params}){
 const path=pathFrom(await params),route=resolveRoute(path);
 if(!route)notFound();
 return pageMetadata(routeMetadata(route),path);
}
export default async function Page({params}){
 const path=pathFrom(await params),route=resolveRoute(path);
 if(!route)notFound();
 const content=await renderRoute(route);if(!content)notFound();return content;
}
