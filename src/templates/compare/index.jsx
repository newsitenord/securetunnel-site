import React from 'react';
import Base from '../../layouts/Base.jsx';
import Crumbs from '../../components/Crumbs.jsx';
import Cta from '../../components/Cta.jsx';
import competitors from '../../data/competitors.js';
import { legal, site } from '../../config.js';
export default function Template(props = {}) {
  const sorted = [...competitors].sort((a, b) => b.score - a.score);
  const grouped = sorted.reduce((acc, c) => {
    const band = c.score >= 4.3 ? 'Close rivals' : c.score >= 3.8 ? 'Solid mid-tier' : 'Specialist or bundle VPNs';
    (acc[band] ??= []).push(c);
    return acc;
  }, {});
  const order = ['Close rivals', 'Solid mid-tier', 'Specialist or bundle VPNs'];
  return <Base title={`NordVPN compared: ${competitors.length} head-to-head VPN comparisons`} description={`NordVPN vs ${competitors.length} competitors \u2014 ExpressVPN, Surfshark, Proton VPN, CyberGhost, Mullvad and more. Real specs, honest verdicts, and who should buy something else.`} slug="/compare" ogType="website">
  <div className="wrap">
    <Crumbs items={[{
        label: 'Comparisons',
        href: '/compare'
      }]} />
    <p className="count">{competitors.length} comparisons &middot; verified {new Date(site.factsVerifiedOn).toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        })}</p>
    <h1>NordVPN compared with {competitors.length} rivals</h1>
    <p className="hub-intro">Every comparison below is built from the provider's own published specifications plus independent testing, and every one states plainly who should buy the other service instead. Specs are re-checked periodically, but VPN pricing moves constantly &mdash; confirm the final price at checkout.</p>



    <Cta slug="hub-compare" compact />

    {order.map(band => grouped[band] && <>
        <h2>{band}</h2>
        <div className="grid">
          {grouped[band].map((c, index) => <a className="card" href={`/compare/nordvpn-vs-${c.id}`} key={index}>
              <p className="meta">{c.score}/5 &middot; {c.hq}</p>
              <h3>NordVPN vs {c.name}</h3>
              <p>{c.servers} servers &middot; {c.countries} countries &middot; from {c.bestPrice}</p>
            </a>)}
        </div>
      </>)}

    <h2>The short version</h2>
    <div className="tablewrap">
      <table>
        <thead>
          <tr><th>Provider</th><th>Servers</th><th>Countries</th><th>Devices</th><th>Best price</th><th>Score</th></tr>
        </thead>
        <tbody>
          {sorted.map((c, index) => <tr key={index}>
              <td><a href={`/compare/nordvpn-vs-${c.id}`}>{c.name}</a></td>
              <td>{c.servers}</td>
              <td>{c.countries}</td>
              <td>{c.devices}</td>
              <td className="num">{c.bestPrice}</td>
              <td className="num">{c.score}</td>
            </tr>)}
        </tbody>
      </table>
    </div>

    <p className="disclosure" style={{
        "marginTop": "2rem"
      }}>{legal.specDisclaimer}</p>
  </div>
</Base>;
}
