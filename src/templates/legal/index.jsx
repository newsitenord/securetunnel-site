import React from 'react';
import Base from '../../layouts/Base.jsx';
import Crumbs from '../../components/Crumbs.jsx';
import Cta from '../../components/Cta.jsx';
import legalCountries from '../../data/legal.js';
import { site } from '../../config.js';
export default function Template(props = {}) {
  const groups = {
    legal: {
      label: 'Legal without restriction',
      note: 'No registration, no licensing, no meaningful risk in using one.'
    },
    grey: {
      label: 'Legal tool, penalised misuse',
      note: 'The VPN is lawful; what you do with it may not be, and the penalties can be severe.'
    },
    restricted: {
      label: 'Restricted',
      note: 'Licensing requirements, protocol blocking or registration obligations apply.'
    },
    'effectively-banned': {
      label: 'Effectively banned or no public internet',
      note: 'A VPN should not be relied on as protection in these environments.'
    }
  };
  const order = ['legal', 'grey', 'restricted', 'effectively-banned'];
  return <Base title={`Are VPNs legal? Laws in ${legalCountries.length} countries`} description={`VPN legality in ${legalCountries.length} countries \u2014 the specific laws, the real penalties, enforcement reality and where the grey areas actually sit. China, Russia, UAE, India, Turkey and more.`} slug="/legal" ogType="website">
  <div className="wrap">
    <Crumbs items={[{
        label: 'VPN legality',
        href: '/legal'
      }]} />
    <p className="count">{legalCountries.length} countries &middot; last checked {new Date(site.factsVerifiedOn).toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        })}</p>
    <h1>Are VPNs legal? Country by country</h1>
    <p className="hub-intro">People confuse three separate questions: is using a VPN legal, is using a VPN to reach blocked content legal, and is providing a VPN legal. The answers differ &mdash; sometimes in the same country. Below, each market is classified by the answer that matters most in practice.</p>



    <Cta slug="hub-legal" compact />

    <div className="note">
      <strong>This is not legal advice.</strong> These are summaries of published law and reported enforcement for a general audience. Laws in this area change quickly, particularly in the restricted category. If the answer matters to you, check with a qualified lawyer or a specialist digital-rights organisation.
    </div>

    <div className="verdict">
      <h3>The short version</h3>
      <p>VPN use is legal without restriction in the overwhelming majority of countries &mdash; including the US, UK, EU, Canada, Australia, Japan, India, Brazil and most of Southeast Asia and Africa. The interesting cases are a small number of countries that restrict them, and a larger group where the tool is legal but the content it reaches is not.</p>
    </div>

    {order.map(key => groups[key] && <>
        <h2>{groups[key].label}</h2>
        <p>{groups[key].note}</p>
        <div className="grid">
          {legalCountries.filter(l => l.status === key).map((l, index) => <a className="card" href={`/legal/${l.id}`} key={index}>
              <h3>{l.name}</h3>
              <p>{l.statusLabel}</p>
            </a>)}
        </div>
      </>)}

    <h2>Read next</h2>
    <div className="grid-2">
      <a className="card" href="/guides/vpn-legal-basics"><h3>Are VPNs legal? The full explainer</h3><p>The three questions people confuse, and why the answers differ.</p></a>
      <a className="card" href="/use/vpn-for-censorship"><h3>Bypassing censorship</h3><p>NordWhisper, obfuscation, and why this is an arms race.</p></a>
      <a className="card" href="/vpn"><h3>Best VPN by country</h3><p>Setup, servers, speeds and local streaming for 40 markets.</p></a>
      <a className="card" href="/use/vpn-for-journalists"><h3>For journalists and activists</h3><p>What a VPN does and does not protect you from.</p></a>
    </div>
  </div>
</Base>;
}
