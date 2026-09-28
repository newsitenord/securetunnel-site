import React from 'react';
import { site, legal } from '../config.js';
import countries from '../data/countries.js';
import competitors from '../data/competitors.js';
export default function Template(props = {}) {
  const year = new Date().getFullYear();
  const topCountries = countries.slice(0, 8);
  const topCompare = competitors.slice(0, 8);
  return <><footer className="site-foot">
  <div className="wrap">
    <div className="foot-grid">
      <div>
        <h3>NordVPN</h3>
        <ul>
          <li><a href="/reviews/nordvpn">Full review</a></li>
          <li><a href="/deals/nordvpn-coupon">Current deals</a></li>
          <li><a href="/pricing/nordvpn-pricing">Pricing explained</a></li>
          <li><a href="/nordvpn/alternatives">Alternatives</a></li>
          <li><a href="/fix">Troubleshooting</a></li>
        </ul>
      </div>
      <div>
        <h3>Comparisons</h3>
        <ul>
          {topCompare.map((c, index) => <li key={index}><a href={`/compare/nordvpn-vs-${c.id}`}>NordVPN vs {c.name}</a></li>)}
          <li><a href="/compare">All comparisons</a></li>
        </ul>
      </div>
      <div>
        <h3>VPN by country</h3>
        <ul>
          {topCountries.map((c, index) => <li key={index}><a href={`/vpn/${c.id}`}>Best VPN for {c.name}</a></li>)}
          <li><a href="/vpn">All {countries.length} countries</a></li>
        </ul>
      </div>
      <div>
        <h3>Streaming</h3>
        <ul>
          <li><a href="/watch/netflix-us/india">Netflix US from India</a></li>
          <li><a href="/watch/bbc-iplayer/australia">iPlayer from Australia</a></li>
          <li><a href="/watch/hulu/united-kingdom">Hulu from the UK</a></li>
          <li><a href="/guides/how-to-change-netflix-region">Change Netflix region</a></li>
          <li><a href="/streaming">All streaming guides</a></li>
        </ul>
      </div>
      <div>
        <h3>Site</h3>
        <ul>
          <li><a href="/about">About us</a></li>
          <li><a href="/editorial-policy">How we test</a></li>
          <li><a href="/affiliate-disclosure">Affiliate disclosure</a></li>
          <li><a href="/legal">VPN legality by country</a></li>
          <li><a href="/learn">Privacy fundamentals</a></li>
          <li><a href="/privacy-policy">Privacy policy</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </div>
    </div>

    <div className="foot-legal">
      <p>{legal.disclosureShort}</p>
      <p>{legal.trademarkNotice}</p>
      <p>{legal.specDisclaimer}</p>
      <p>&copy; {year} {site.name}. All rights reserved. Product facts carry their own dates. Educational guides cite documentation and do not claim hands-on testing.</p>
    </div>
  </div>
</footer>
</>;
}
