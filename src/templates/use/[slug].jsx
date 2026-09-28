import React from 'react';
import Base from '../../layouts/Base.jsx';
import Crumbs from '../../components/Crumbs.jsx';
import Cta from '../../components/Cta.jsx';
import Faq from '../../components/Faq.jsx';
import nordvpn from '../../data/nordvpn.js';
import usecases from '../../data/usecases.js';
import { site, fitTitle } from '../../config.js';
export function getStaticPaths() {
  return usecases.map(u => ({
    params: {
      slug: `vpn-for-${u.id}`
    },
    props: {
      u
    }
  }));
}
export default function Template(props = {}) {
  const {
    u
  } = props;
  const n = nordvpn;
  const t = n.pricing.tiers[0];
  const faqs = [...u.faq, {
    q: `Is NordVPN good for ${u.name.toLowerCase()}?`,
    a: `${u.hook} NordVPN's ${u.keyFeatures.length > 0 ? u.keyFeatures.slice(0, 3).join(', ').toLowerCase() : 'feature set'} is what makes it work for this.`
  }];
  const others = usecases.filter(o => o.id !== u.id).slice(0, 6);
  return <Base title={fitTitle(`Best VPN for ${u.name}`, ' in 2026')} description={`VPN for ${u.name.toLowerCase()}: ${u.keyFeatures.join(', ')}. What genuinely matters, what marketing gets wrong, and how to set NordVPN up for it.`} slug="/use">
  <div className="wrap">
    <Crumbs items={[{
        label: 'Use cases',
        href: '/use'
      }, {
        label: u.name,
        href: `/use/vpn-for-${u.id}`
      }]} />

    <article className="narrow">
      <p className="count">Verified {new Date(site.factsVerifiedOn).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          })}</p>
      <h1>Best VPN for {u.name}</h1>
      <p className="hub-intro">{u.hook}</p>



      <div className="verdict">
        <h3>Features that matter here</h3>
        <p>{u.keyFeatures.join(' &middot; ')}</p>
      </div>

      {u.body.map((para, index) => <p key={index}>{para}</p>)}

      {u.warnings && <div className="note">
          <strong>Worth being clear about:</strong> {u.warnings}
        </div>}

      <Cta slug={`use-${u.id}`} title={`NordVPN from $${t.twoYear}/month`} body={`${n.network.servers} servers in ${n.network.countries} countries. ${n.pricing.guarantee}, so you can test it on your own setup.`} />

      <Faq faqs={faqs} />

      <section className="related">
        <h2>Other use cases</h2>
        <div className="grid">
          {others.map((o, index) => <a className="card" href={`/use/vpn-for-${o.id}`} key={index}><h3>{o.name}</h3><p>{o.intent}</p></a>)}
        </div>
      </section>
    </article>
  </div>
</Base>;
}
