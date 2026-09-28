import React from 'react';
import { affiliate, affiliateLink, site } from '../config.js';
import nordvpn from '../data/nordvpn.js';
export default function Template(props = {}) {
  const {
    slug = '',
    title = null,
    body = null,
    compact = false
  } = props;
  const cheapest = nordvpn.pricing.tiers[0];
  const href = affiliateLink(slug);
  const heading = title ?? `NordVPN ${cheapest.twoYear} plan: $${cheapest.twoYear}/month`;
  const text = body ?? `${cheapest.twoYearMonths} months for $${cheapest.twoYearTotal}, with a 30-day money-back guarantee. ${nordvpn.network.servers} servers in ${nordvpn.network.countries} countries.`;
  return <><aside className="cta" aria-label="NordVPN offer">
  <div className="cta-body">
    {compact ? <h3>{heading}</h3> : <h2>{heading}</h2>}
    <p>{text}</p>
    <p className="cta-note">Affiliate link &mdash; we may earn a commission. Price checked {nordvpn.pricing.asOf}.</p>
  </div>
  <div>
    <a className="btn" href={href} target="_blank" rel="nofollow sponsored noopener noreferrer">{affiliate.ctaPrimary}</a>
  </div>
</aside>
</>;
}
