import React from 'react';
import {catalog} from '../lib/articles.js';
import Base from '../layouts/Base.jsx';
import Cta from '../components/Cta.jsx';
import nordvpn from '../data/nordvpn.js';
import competitors from '../data/competitors.js';
import countries from '../data/countries.js';
import platforms from '../data/platforms.js';
import devices from '../data/devices.js';
import guides from '../data/guides.js';
import legalCountries from '../data/legal.js';
import { site } from '../config.js';
export default function Template(props = {}) {
  const t = nordvpn.pricing.tiers;
  const verified = new Date(site.factsVerifiedOn).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  const sections = [{href: '/learn', title: 'Privacy fundamentals', desc: 'Source-linked explainers about private browsing, proxies, account security and reading VPN claims.', count: `${catalog.length + 2} guides`}, {
    href: '/compare',
    title: 'NordVPN vs the competition',
    desc: `${competitors.length} head-to-head comparisons with real specs, not marketing copy.`,
    count: `${competitors.length} comparisons`
  }, {
    href: '/vpn',
    title: 'Best VPN by country',
    desc: 'Censorship, retention law, local streaming and server advice for 40 markets.',
    count: `${countries.length} countries`
  }, {
    href: '/streaming',
    title: 'Streaming and unblocking',
    desc: 'Platform-by-platform server picks, error codes and the fixes that actually work.',
    count: `${platforms.length} platforms`
  }, {
    href: '/legal',
    title: 'Is a VPN legal where you are?',
    desc: 'The specific laws, the real penalties, and where the grey areas actually sit.',
    count: `${legalCountries.length} countries`
  }, {
    href: '/devices',
    title: 'Setup by device',
    desc: 'Real instructions for phones, laptops, TVs, consoles and routers.',
    count: `${devices.length} devices`
  }, {
    href: '/guides',
    title: 'Guides and explainers',
    desc: 'Kill switches, DNS leaks, NordLynx, Meshnet and the myths worth correcting.',
    count: `${guides.length} guides`
  }];
  const popular = [{
    href: '/reviews/nordvpn',
    title: 'NordVPN review 2026',
    desc: `Scored ${nordvpn.score.overall}/5 across six categories, with the cons listed first.`
  }, {
    href: '/deals/nordvpn-coupon',
    title: 'Current NordVPN deals',
    desc: `What the ${t[0].twoYear}/month offer actually includes, and how to avoid the renewal price.`
  }, {
    href: '/compare/nordvpn-vs-expressvpn',
    title: 'NordVPN vs ExpressVPN',
    desc: 'The two premium leaders, compared on the things that differ.'
  }, {
    href: '/compare/nordvpn-vs-surfshark',
    title: 'NordVPN vs Surfshark',
    desc: 'Same parent company, very different products. Here is which to buy.'
  }, {
    href: '/vpn/india',
    title: 'Best VPN for India',
    desc: 'CERT-In retention rules, shutdowns, cricket streaming and server choice.'
  }, {
    href: '/vpn/united-arab-emirates',
    title: 'Best VPN for the UAE',
    desc: 'VoIP blocking, the cybercrime law, and what is actually legal.'
  }, {
    href: '/watch/netflix-us/india',
    title: 'Watch Netflix US from India',
    desc: 'Server picks, the M7111 error, and the fix nobody mentions.'
  }, {
    href: '/fix/netflix-blocked',
    title: 'Netflix blocks my VPN',
    desc: 'Error M7111-5059, decoded, with the fixes in order of likelihood.'
  }];
  return <Base title="VPN comparisons, deals and country guides" description={site.description} slug="/" ogType="website" googleSiteVerification="gHgZWIxbIJOcOWoAip6FxTt4D7t3NJmmdXr4Q77x0zU">
  <section className="hero">
    <div className="wrap">
      <p className="kicker">Independent VPN testing &middot; verified {verified}</p>
      <h1>VPN advice that tells you when <em>not</em> to buy</h1>
      <p className="lede">{site.name} tests and compares VPN services. We publish the downsides alongside the upsides, name the specific servers that work, and tell you which readers should buy something else entirely.</p>
      <div style={{
          "display": "flex",
          "gap": ".6rem",
          "flexWrap": "wrap",
          "marginTop": "1.25rem"
        }}>
        <a className="btn solid" href="/reviews/nordvpn">Read the NordVPN review</a>
        <a className="btn" style={{
            "background": "var(--bg-soft)",
            "color": "var(--ink)"
          }} href="/compare">Compare {competitors.length} VPNs</a>
      </div>
    </div>
  </section>

  <div className="wrap">


    <div className="verdict" style={{
        "marginTop": "1rem"
      }}>
      <h3>Top recommendation</h3>
      <p><strong><a href="/reviews/nordvpn">NordVPN</a></strong> &mdash; {nordvpn.score.overall}/5. {nordvpn.network.servers} servers in {nordvpn.network.countries} countries, the fastest mainstream protocol we have tested, and reliable unblocking. From <strong>${t[0].twoYear}/month</strong> on the two-year Basic plan (${t[0].twoYearTotal} for {t[0].twoYearMonths} months). The main caveat is renewal pricing, which rises sharply.</p>
      <p><em>Not right for you?</em> Unlimited devices: <a href="/compare/nordvpn-vs-surfshark">Surfshark</a>. Maximum privacy: <a href="/compare/nordvpn-vs-mullvad">Mullvad</a>. Free: <a href="/guides/nordvpn-vs-free-vpn">Proton VPN Free</a>. China specifically: <a href="/compare/nordvpn-vs-astrill">Astrill</a>.</p>
    </div>

    <Cta slug="homepage" />

    <h2>Start here</h2>
    <div className="grid-2">
      {popular.map((p, index) => <a className="card" href={p.href} key={index}>
          <h3>{p.title}</h3>
          <p>{p.desc}</p>
        </a>)}
    </div>

    <h2>Browse the site</h2>
    <div className="grid">
      {sections.map((s, index) => <a className="card" href={s.href} key={index}>
          <p className="meta">{s.count}</p>
          <h3>{s.title}</h3>
          <p>{s.desc}</p>
        </a>)}
    </div>

    <h2>What we actually do differently</h2>
    <div className="grid-2">
      <div>
        <h3>We publish the cons</h3>
        <p>Every review lists what we did not like, in the same visual weight as the positives. NordVPN's renewal pricing, Mullvad's lack of streaming support and ExpressVPN's cost are all stated plainly, because a recommendation that ignores downsides is not a recommendation.</p>
      </div>
      <div>
        <h3>We say who should buy something else</h3>
        <p>Each page ends with the readers it is wrong for. If you have fourteen devices, you should not buy NordVPN, and no amount of affiliate commission changes that arithmetic.</p>
      </div>
      <div>
        <h3>We are specific about servers</h3>
        <p>"Use a US server" is not advice. We name the cities that work, the error codes you will see, and the fix in order of likelihood &mdash; see <a href="/fix/netflix-blocked">our Netflix troubleshooting page</a> for what we mean.</p>
      </div>
      <div>
        <h3>We date our facts</h3>
        <p>VPN pricing changes constantly. Every price and specification on this site carries a verification date, and we re-check rather than leaving stale numbers up.</p>
      </div>
    </div>

    <h2>Popular country guides</h2>
    <div className="grid">
      {countries.slice(0, 12).map((c, index) => <a className="card" href={`/vpn/${c.id}`} key={index}>
          <h3>{c.name}</h3>
          <p>{c.region} &middot; {c.popular.slice(0, 2).join(', ')}</p>
        </a>)}
    </div>
    <p><a href="/vpn">See all {countries.length} country guides &rarr;</a></p>
  </div>
</Base>;
}
