import React from 'react';
import Base from '../layouts/Base.jsx';
import countries from '../data/countries.js';
import competitors from '../data/competitors.js';
export default function Template(props = {}) {
  return <Base title="Page not found" description="That page does not exist. Here are the most useful places to go instead." slug="/404" noindex={true}>
  <div className="wrap narrow" style={{
      "paddingBlock": "3rem 2rem"
    }}>
    <p className="count">Error 404</p>
    <h1>That page does not exist</h1>
    <p className="hub-intro">The link may be old, or the page may have moved. Here are the places most people were looking for.</p>

    <div className="grid-2">
      <a className="card" href="/reviews/nordvpn"><h3>NordVPN review</h3><p>Scored across six categories, cons included.</p></a>
      <a className="card" href="/deals/nordvpn-coupon"><h3>Current NordVPN deals</h3><p>What the offer includes, and the renewal price.</p></a>
      <a className="card" href="/compare"><h3>All comparisons</h3><p>{competitors.length} head-to-head VPN comparisons.</p></a>
      <a className="card" href="/vpn"><h3>VPN by country</h3><p>{countries.length} country guides.</p></a>
      <a className="card" href="/streaming"><h3>Streaming guides</h3><p>Servers, error codes and fixes by platform.</p></a>
      <a className="card" href="/fix"><h3>Troubleshooting</h3><p>Fixes in order of likelihood.</p></a>
    </div>

    <p style={{
        "marginTop": "2rem"
      }}><a href="/">Back to the homepage</a></p>
  </div>
</Base>;
}
