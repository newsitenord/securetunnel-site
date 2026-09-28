import React from 'react';
import Base from '../../layouts/Base.jsx';
import Crumbs from '../../components/Crumbs.jsx';
import Cta from '../../components/Cta.jsx';
import Faq from '../../components/Faq.jsx';
import nordvpn from '../../data/nordvpn.js';
import guides from '../../data/guides.js';
import { site } from '../../config.js';
export function getStaticPaths() {
  return guides.map(g => ({
    params: {
      slug: g.id
    },
    props: {
      g
    }
  }));
}
export default function Template(props = {}) {
  const {
    g
  } = props;
  const t = nordvpn.pricing.tiers[0];
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: g.name,
    description: g.intro,
    totalTime: `PT${g.readTime}M`,
    datePublished: site.factsVerifiedOn,
    ...(g.steps.length ? {
      step: g.steps.map((s, i) => ({
        '@type': 'HowToStep',
        position: i + 1,
        text: s
      }))
    } : {})
  };
  const others = guides.filter(o => o.id !== g.id).slice(0, 6);
  return <Base title={g.name} description={g.hook} slug="/guides" schema={schema}>
  <div className="wrap">
    <Crumbs items={[{
        label: 'Guides',
        href: '/guides'
      }, {
        label: g.name,
        href: `/guides/${g.id}`
      }]} />

    <article className="narrow">
      <p className="count">{g.readTime} minute read &middot; difficulty {g.difficulty}/5 &middot; verified {new Date(site.factsVerifiedOn).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          })}</p>
      <h1>{g.name}</h1>
      <p className="hub-intro">{g.intro}</p>


      {g.steps.length > 0 && <>
          <h2 id="steps">Step by step</h2>
          <ol className="steps">
            {g.steps.map((s, index) => <li key={index}>{s}</li>)}
          </ol>
        </>}

      {g.detail.map((para, index) => <p key={index}>{para}</p>)}

      <Cta slug={`guides-${g.id}`} title={`NordVPN from $${t.twoYear}/month`} compact />

      <Faq faqs={g.faq} />

      <section className="related">
        <h2>More guides</h2>
        <div className="grid">
          {others.map((o, index) => <a className="card" href={`/guides/${o.id}`} key={index}><h3>{o.name}</h3><p>{o.readTime} min &middot; {o.intent}</p></a>)}
        </div>
      </section>
    </article>
  </div>
</Base>;
}
