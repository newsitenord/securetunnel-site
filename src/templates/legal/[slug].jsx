import React from 'react';
import Base from '../../layouts/Base.jsx';
import Crumbs from '../../components/Crumbs.jsx';
import Cta from '../../components/Cta.jsx';
import Faq from '../../components/Faq.jsx';
import countries from '../../data/countries.js';
import legalCountries from '../../data/legal.js';
import { site } from '../../config.js';
export function getStaticPaths() {
  return legalCountries.map(l => ({
    params: {
      slug: l.id
    },
    props: {
      l
    }
  }));
}
export default function Template(props = {}) {
  const {
    l
  } = props;
  const vpnPage = countries.find(c => c.id === l.id);
  const toneClass = l.status === 'legal' ? 'info' : '';
  const faqs = [...l.faq, {
    q: `What happens if I use a VPN in ${l.name}?`,
    a: l.enforcement
  }];
  const others = legalCountries.filter(o => o.id !== l.id && o.status === l.status).slice(0, 6);
  return <Base title={`Is a VPN legal in ${l.name}?`} description={`VPN legality in ${l.name}: ${l.statusLabel}. The specific laws, real penalties, what is blocked, enforcement reality and practical advice. Last checked ${site.factsVerifiedOn}.`} slug="/legal">
  <div className="wrap">
    <Crumbs items={[{
        label: 'VPN legality',
        href: '/legal'
      }, {
        label: l.name,
        href: `/legal/${l.id}`
      }]} />

    <article className="narrow">
      <p className="count">Last checked {new Date(site.factsVerifiedOn).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          })}</p>
      <h1>Is a VPN legal in {l.name}?</h1>
      <p className="hub-intro"><strong>{l.statusLabel}.</strong> {l.summary}</p>



      <div className={`note ${toneClass}`}>
        <strong>This is not legal advice.</strong> It is a summary of published law and reported enforcement, written for a general audience and checked on {new Date(site.factsVerifiedOn).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          })}. Laws in this area change quickly. If the answer matters to you personally or professionally, check with a qualified lawyer in {l.name} or a specialist digital-rights organisation.
      </div>

      <h2 id="laws">The relevant laws</h2>
      <ul>{l.laws.map((x, index) => <li key={index}>{x}</li>)}</ul>

      <h2 id="enforcement">What enforcement actually looks like</h2>
      <p>{l.enforcement}</p>

      <h2 id="blocked">What is blocked</h2>
      <p>{l.blocked}</p>

      <h2 id="advice">Practical advice</h2>
      <p>{l.advice}</p>

      {l.status !== 'legal' && <div className="note">
          <strong>If your safety depends on this:</strong> a commercial VPN is one partial layer, not protection. Consult specialist organisations such as <a href="https://www.accessnow.org/" target="_blank" rel="noopener noreferrer">Access Now</a>, the <a href="https://cpj.org/" target="_blank" rel="noopener noreferrer">Committee to Protect Journalists</a> or the <a href="https://www.eff.org/" target="_blank" rel="noopener noreferrer">EFF</a> for threat-appropriate guidance rather than relying on a VPN review site.
        </div>}

      {vpnPage && <div className="note info">
          <strong>Looking for setup advice instead?</strong> Our <a href={`/vpn/${vpnPage.id}`}>guide to using a VPN in ${l.name}</a> covers server choice, speeds, local streaming services and the restrictions you will run into.
        </div>}

      <Cta slug={`legal-${l.id}`} compact />

      <Faq faqs={faqs} title={`VPN law in ${l.name}: common questions`} />

      <section className="related">
        <h2>Other {l.status === 'legal' ? 'countries where VPNs are legal' : 'restricted countries'}</h2>
        <div className="grid">
          {others.map((o, index) => <a className="card" href={`/legal/${o.id}`} key={index}><h3>{o.name}</h3><p>{o.statusLabel}</p></a>)}
          <a className="card" href="/legal"><h3>All {legalCountries.length} countries</h3><p>Full index</p></a>
        </div>
      </section>
    </article>
  </div>
</Base>;
}
