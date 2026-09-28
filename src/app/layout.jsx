import React from 'react';
import '../styles/global.css';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import JsonLd from '../components/JsonLd.jsx';
import {site} from '../config.js';
export const metadata = {
  metadataBase: new URL(site.url),
  icons: {icon:'/favicon.svg'},
  alternates: {types:{'application/rss+xml':'/rss.xml'}},
};
export const viewport = {themeColor:'#0b6b5b'};
export default function RootLayout({children}) {
  return <html lang="en"><body><Header/><main id="main">{children}</main><Footer/>
    <JsonLd data={{'@context':'https://schema.org','@type':'WebSite',name:site.name,url:site.url,description:site.description}}/>
  </body></html>;
}
