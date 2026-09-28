import React from 'react';
import Base from '../../layouts/Base.jsx';
import Crumbs from '../../components/Crumbs.jsx';
import Cta from '../../components/Cta.jsx';
import guides from '../../data/guides.js';
export default function Template(props = {}) {
  return <Base title={`VPN guides and explainers: ${guides.length} in-depth articles`} description={`${guides.length} VPN guides \u2014 changing Netflix region, kill switches, DNS leaks, NordLynx explained, Meshnet, split tunnelling, dedicated IPs, free VPNs and the myths worth correcting.`} slug="/guides" ogType="website">
  <div className="wrap">
    <Crumbs items={[{
        label: 'Guides',
        href: '/guides'
      }]} />
    <h1>VPN guides and explainers</h1>
    <p className="hub-intro">Practical, specific guides to the things people actually get wrong. Each one names the setting to change rather than describing it vaguely, and several exist specifically to correct claims the VPN industry makes that do not survive contact with how the technology works.</p>


    <Cta slug="hub-guides" compact />

    <div className="grid-2">
      {guides.map((g, index) => <a className="card" href={`/guides/${g.id}`} key={index}>
          <p className="meta">{g.readTime} min read</p>
          <h3>{g.name}</h3>
          <p>{g.hook}</p>
        </a>)}
    </div>
  </div>
</Base>;
}
