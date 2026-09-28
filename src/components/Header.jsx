'use client';
import React from 'react';
import {usePathname} from 'next/navigation';
import { nav, site } from '../config.js';
export default function Template(props = {}) {
  const pathname = usePathname();
  const {current = pathname || ''} = props;
  const isActive = href => current === href || href !== '/' && current.startsWith(href);
  return <><a className="skip" href="#main">Skip to content</a>
<header className="site-head">
  <div className="wrap">
    <a className="brand" href="/">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 2 4 5.5v6c0 4.7 3.4 9 8 10.5 4.6-1.5 8-5.8 8-10.5v-6L12 2Z" fill="#0b6b5b" />
        <path d="M12 7.2 8.4 8.9v2.9c0 2.3 1.6 4.4 3.6 5.1 2-.7 3.6-2.8 3.6-5.1V8.9L12 7.2Z" fill="#fff" />
      </svg>
      <span>{site.name}</span>
    </a>
    <nav className="nav" aria-label="Main">
      {nav.map((item, index) => <a href={item.href} aria-current={isActive(item.href) ? 'page' : undefined} key={index}>{item.label}</a>)}
    </nav>
  </div>
</header>
</>;
}
