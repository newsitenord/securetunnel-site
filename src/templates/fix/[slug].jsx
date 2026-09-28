import React from 'react';
import Base from '../../layouts/Base.jsx';
import Crumbs from '../../components/Crumbs.jsx';
import Faq from '../../components/Faq.jsx';
import troubleshooting from '../../data/troubleshooting.js';
import { site, fitTitle } from '../../config.js';
export function getStaticPaths() {
  return troubleshooting.map(x => ({
    params: {
      slug: x.id
    },
    props: {
      x
    }
  }));
}
export default function Template(props = {}) {
  const {
    x
  } = props;
  const others = troubleshooting.filter(o => o.id !== x.id).slice(0, 6);
  return <Base title={fitTitle(x.name, ': fixes')} description={`${x.name}: ${x.symptom} The fixes in order of likelihood, what each one addresses, and when to contact support.`} slug="/fix">
  <div className="wrap">
    <Crumbs items={[{
        label: 'Troubleshooting',
        href: '/fix'
      }, {
        label: x.name,
        href: `/fix/${x.id}`
      }]} />

    <article className="narrow">
      <p className="count">{x.fixes.length} fixes &middot; verified {new Date(site.factsVerifiedOn).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          })}</p>
      <h1>{x.name}</h1>
      <p className="hub-intro">{x.hook}</p>



      <div className="note info">
        <strong>What you are seeing:</strong> {x.symptom}
      </div>

      <h2 id="fixes">The fixes, most likely first</h2>
      {x.fixes.map((f, i) => <div className="verdict" key={i}>
          <h3>{i + 1}. {f.step}</h3>
          <p>{f.detail}</p>
        </div>)}

      <h2 id="support">When to contact support</h2>
      <p>{x.escalation}</p>

      <Faq faqs={x.faq} />

      <section className="related">
        <h2>Other troubleshooting guides</h2>
        <div className="grid">
          {others.map((o, index) => <a className="card" href={`/fix/${o.id}`} key={index}><h3>{o.name}</h3><p>{o.intent}</p></a>)}
        </div>
      </section>
    </article>
  </div>
</Base>;
}
