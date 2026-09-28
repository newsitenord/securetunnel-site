import React from 'react';
import { site } from '../config.js';
/** items: [{ label, href }] — last item is the current page (no link). */

export default function Template(props = {}) {
  /** items: [{ label, href }] — last item is the current page (no link). */
  const {
    items = []
  } = props;
  const trail = [{
    label: 'Home',
    href: '/'
  }, ...items];
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.label,
      item: `${site.url}${it.href === '/' ? '/' : it.href}`
    }))
  };
  return <><nav className="crumbs" aria-label="Breadcrumb">
  <ol>
    {trail.map((it, i) => <li key={i}>
        {i === trail.length - 1 ? <span aria-current="page">{it.label}</span> : <a href={it.href}>{it.label}</a>}
      </li>)}
  </ol>
</nav>
<script type="application/ld+json" dangerouslySetInnerHTML={{
      __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c")
    }} />
</>;
}
