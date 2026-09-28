import React from 'react';
import Base from '../../layouts/Base.jsx';
import Crumbs from '../../components/Crumbs.jsx';
import Cta from '../../components/Cta.jsx';
import Faq from '../../components/Faq.jsx';
import nordvpn from '../../data/nordvpn.js';
import countries from '../../data/countries.js';
import platforms from '../../data/platforms.js';
import { watchMatrix } from '../../data/platforms.js';
import legalCountries from '../../data/legal.js';
import { site, legal, fitTitle } from '../../config.js';
export function getStaticPaths() {
  return countries.map(c => ({
    params: {
      slug: c.id
    },
    props: {
      c
    }
  }));
}
export default function Template(props = {}) {
  const {
    c
  } = props;
  const n = nordvpn;
  const t = n.pricing.tiers[0];
  const legalPage = legalCountries.find(l => l.id === c.id);
  const relatedWatch = Object.entries(watchMatrix).filter(([, list]) => list.includes(c.id)).map(([pid]) => platforms.find(p => p.id === pid)).filter(Boolean).slice(0, 6);
  const riskNote = {
    low: null,
    medium: `The legal and technical situation in ${c.name} is more complicated than in most countries. Read the specifics below before relying on a VPN for anything sensitive.`,
    high: `${c.name} imposes significant restrictions on internet access, and the legal consequences of some online activity are severe. A VPN is one partial tool, not protection. Understand the risks before you rely on it.`
  }[c.risk];
  const faqs = [...c.faq, {
    q: `Is NordVPN a good choice in ${c.name}?`,
    a: `NordVPN is a strong choice in ${c.name} because of its ${n.network.servers} servers across ${n.network.countries} countries and its NordWhisper protocol, which is built for restrictive networks. ${c.serverAdvice}`
  }, {
    q: `How much does NordVPN cost from ${c.name}?`,
    a: `The cheapest plan is the two-year Basic subscription at $${t.twoYear} a month \u2014 $${t.twoYearTotal} for ${t.twoYearMonths} months including three extra. NordVPN accepts cards, PayPal, Google Pay, Apple Pay and major cryptocurrencies, which is useful where card payments to foreign services are restricted. Prices vary by country and currency.`
  }, {
    q: `Will a VPN slow down my internet in ${c.name}?`,
    a: c.speedNote
  }];
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `Best VPN for ${c.name} in ${new Date(site.factsVerifiedOn).getFullYear()}`,
    datePublished: site.factsVerifiedOn,
    dateModified: site.factsVerifiedOn,
    author: {
      '@type': 'Organization',
      name: site.name
    },
    about: {
      '@type': 'Place',
      name: c.name
    }
  };
  return <Base title={fitTitle(`Best VPN for ${c.name}`, ' in 2026')} description={`Using a VPN in ${c.name}: what is blocked, ${c.restrictions.length} restrictions to know about, which servers to choose, and whether it is legal. ${c.popular.slice(0, 3).join(', ')} and more.`} slug="/vpn" schema={schema}>
  <div className="wrap">
    <Crumbs items={[{
        label: 'VPN by country',
        href: '/vpn'
      }, {
        label: c.name,
        href: `/vpn/${c.id}`
      }]} />

    <article className="narrow">
      <p className="count">{c.region} &middot; verified {new Date(site.factsVerifiedOn).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          })}</p>
      <h1>Best VPN for {c.name}</h1>
      <p className="hub-intro">{c.situation}</p>



      {riskNote && <div className="note">
          <strong>{c.risk === 'high' ? 'Important safety note.' : 'Worth knowing.'}</strong> {riskNote}
          {legalPage && <> See our <a href={`/legal/${legalPage.id}`}>full breakdown of VPN legality in {c.name}</a> before you rely on one.</>}
        </div>}

      <Cta slug={`vpn-${c.id}`} title={`NordVPN in ${c.name}: from $${t.twoYear}/month`} body={`${n.network.servers} servers in ${n.network.countries} countries. ${n.pricing.guarantee}.`} />

      <h2 id="restrictions">What is restricted in {c.name}</h2>
      <ul>
        {c.restrictions.map((r, index) => <li key={index}>{r}</li>)}
      </ul>

      <h2 id="servers">Which servers to use from {c.name}</h2>
      <p>{c.serverAdvice}</p>

      <h3>Speeds</h3>
      <p>{c.speedNote}</p>

      <h2 id="streaming">Streaming and local services in {c.name}</h2>
      <p>The services people in {c.name} most often want to reach are {c.popular.slice(0, -1).join(', ')} and {c.popular[c.popular.length - 1]}.</p>
      {relatedWatch.length > 0 && <>
          <p>We have written specific step-by-step guides for the hardest of these:</p>
          <div className="grid">
            {relatedWatch.map((p, index) => <a className="card" href={`/watch/${p.slugBase}/${c.id}`} key={index}>
                <h3>{p.library} from {c.name}</h3>
                <p>{p.vpnSuccess} &middot; difficulty {p.difficulty}/5</p>
              </a>)}
          </div>
        </>}

      <h2 id="setup">Setting NordVPN up in {c.name}</h2>
      <ol className="steps">
        <li><strong>Install before you need it.</strong> Download the app on every device you will use while you still have unrestricted access. In some countries VPN apps are removed from app stores.</li>
        <li><strong>Enable the kill switch.</strong> Settings &rarr; Kill Switch. In a filtered network this is the difference between a tunnel that fails safely and one that exposes you.</li>
        <li><strong>Set the protocol deliberately.</strong> NordLynx by default for speed.{c.risk !== 'low' && ' NordWhisper if the connection fails or behaves oddly.'}</li>
        <li><strong>Choose your server for the job.</strong> {c.serverAdvice}</li>
        <li><strong>Run a leak test.</strong> Confirm DNS and IP are both routing through the tunnel before you rely on it.</li>
      </ol>

      <h2 id="legal">Is a VPN legal in {c.name}?</h2>
      {legalPage ? <>
          <p><strong>{legalPage.statusLabel}.</strong> {legalPage.summary}</p>
          <p><a href={`/legal/${legalPage.id}`}>Read the full legal breakdown for {c.name}</a>, including the specific laws, enforcement reality and practical advice.</p>
        </> : <>
          <p>{c.faq[0].a}</p>
          <p>See our <a href="/legal">overview of VPN legality by country</a> for the full picture across {legalCountries.length} jurisdictions.</p>
        </>}

      <Faq faqs={faqs} title={`VPN in ${c.name}: common questions`} />

      <section className="related">
        <h2>Related guides</h2>
        <div className="grid">
          <a className="card" href="/reviews/nordvpn"><h3>Full NordVPN review</h3><p>Scored across six categories, with the cons listed.</p></a>
          <a className="card" href="/guides/nordvpn-setup-guide"><h3>Set up NordVPN properly</h3><p>The nine settings worth changing on day one.</p></a>
          <a className="card" href="/use/vpn-for-censorship"><h3>Bypassing censorship</h3><p>NordWhisper, obfuscation and what actually works.</p></a>
          <a className="card" href="/pricing/nordvpn-pricing"><h3>NordVPN pricing explained</h3><p>Every tier, and the renewal price nobody mentions.</p></a>
        </div>
      </section>

      <p className="disclosure" style={{
          "marginTop": "2rem"
        }}>{legal.trademarkNotice}</p>
    </article>
  </div>
</Base>;
}
