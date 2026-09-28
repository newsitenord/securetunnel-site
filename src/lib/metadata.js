import {site, fitTitle, fitDescription, seo} from '../config.js';
export function pageMetadata({title, description, ogType='article', noindex=false, googleSiteVerification}, path) {
  const canonical = new URL(path, site.url).href;
  const fullTitle = seo.titleTemplate(fitTitle(title));
  const desc = fitDescription(description);
  return {
    title: fullTitle, description: desc,
    alternates: {canonical},
    robots: {index:!noindex,follow:true},
    ...(googleSiteVerification?{verification:{google:googleSiteVerification}}:{}),
    openGraph:{type:ogType,title:fullTitle,description:desc,url:canonical,siteName:site.name,locale:site.locale.replace('-','_')},
    twitter:{card:'summary',title:fullTitle,description:desc},
  };
}
