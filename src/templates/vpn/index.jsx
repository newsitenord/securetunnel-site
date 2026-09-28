import React from 'react';
import Base from '../../layouts/Base.jsx';
import Crumbs from '../../components/Crumbs.jsx';
import Cta from '../../components/Cta.jsx';
import countries from '../../data/countries.js';
import { site } from '../../config.js';
export default function Template(props = {}) {
  const byRegion = countries.reduce((acc, c) => {
    (acc[c.region] ??= []).push(c);
    return acc;
  }, {});
  const regions = Object.keys(byRegion).sort();
  const riskLabel = {
    low: 'Open internet',
    medium: 'Some filtering',
    high: 'Heavy restrictions'
  };
  return <Base title={`Best VPN by country: ${countries.length} guides`} description={`Country-by-country VPN guides for ${countries.length} markets \u2014 what is blocked, retention law, local streaming services, which servers to pick and whether a VPN is legal where you are.`} slug="/vpn" ogType="website">
  <div className="wrap">
    <Crumbs items={[{
        label: 'VPN by country',
        href: '/vpn'
      }]} />
    <p className="count">{countries.length} countries &middot; verified {new Date(site.factsVerifiedOn).toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        })}</p>
    <h1>Best VPN by country</h1>
    <p className="hub-intro">A VPN recommendation that ignores where you live is not much use. Each guide below covers the specific censorship environment, data-retention law, local streaming services, realistic server choice and speeds for that market &mdash; not a rewritten version of the same page.</p>



    <Cta slug="hub-country" compact />

    {regions.map(region => <>
        <h2>{region}</h2>
        <div className="grid">
          {byRegion[region].map((c, index) => <a className="card" href={`/vpn/${c.id}`} key={index}>
              <p className="meta">{riskLabel[c.risk]}</p>
              <h3>{c.name}</h3>
              <p>{c.popular.slice(0, 3).join(' &middot; ')}</p>
            </a>)}
        </div>
      </>)}

    <h2>Which countries restrict VPNs?</h2>
    <p>The overwhelming majority of these markets allow VPN use without restriction. The exceptions and grey areas are covered in detail on our <a href="/legal">VPN legality index</a>, which covers {countries.filter(c => c.risk !== 'low').length} of the countries above plus several more.</p>
  </div>
</Base>;
}
