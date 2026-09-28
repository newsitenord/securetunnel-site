import React from 'react';
import Base from '../../layouts/Base.jsx';
import Crumbs from '../../components/Crumbs.jsx';
import Cta from '../../components/Cta.jsx';
import Faq from '../../components/Faq.jsx';
import nordvpn from '../../data/nordvpn.js';
import devices from '../../data/devices.js';
import { site } from '../../config.js';
export function getStaticPaths() {
  return devices.map(d => ({
    params: {
      slug: `nordvpn-for-${d.id}`
    },
    props: {
      d
    }
  }));
}
export default function Template(props = {}) {
  const {
    d
  } = props;
  const n = nordvpn;

  // Short display names keep the <title> tag inside the ~60-character window.
  // Short display names keep the <title> tag inside the ~60-character window.
  const shortName = {
    'smart-tv': 'Smart TV',
    'android-tv': 'Android TV',
    'firestick': 'Fire TV Stick',
    'browser-extension': 'Browser extensions',
    'ios': 'iPhone and iPad'
  }[d.id] ?? d.name;
  const t = n.pricing.tiers[0];
  const faqs = [...d.faq, {
    q: `How many devices can I protect with one NordVPN subscription?`,
    a: `${n.devices.simultaneous} simultaneously. A router-level connection counts as one and covers every device behind it, which is the trick for covering ${d.kind.toLowerCase()} hardware that cannot run a VPN client.`
  }, {
    q: `Does the VPN slow down ${d.name}?`,
    a: `${d.bestProtocol} ${d.kind === 'Console' || d.kind === 'TV / Streaming' ? 'On limited hardware like this, protocol choice matters more than usual \u2014 always prefer the lightest option available.' : 'On a nearby server the difference is usually under 10 percent.'}`
  }];
  const others = devices.filter(o => o.id !== d.id && o.kind === d.kind).slice(0, 4);
  const otherKinds = devices.filter(o => o.id !== d.id && o.kind !== d.kind).slice(0, 4);
  return <Base title={`NordVPN on ${shortName}: setup guide`} description={`How to set up NordVPN on ${d.name}: step-by-step instructions, limitations and the best protocol to use. Difficulty ${d.difficulty}/5.`} slug="/devices">
  <div className="wrap">
    <Crumbs items={[{
        label: 'Devices',
        href: '/devices'
      }, {
        label: d.name,
        href: `/devices/nordvpn-for-${d.id}`
      }]} />

    <article className="narrow">
      <p className="count">{d.kind} &middot; setup difficulty {d.difficulty}/5 &middot; verified {new Date(site.factsVerifiedOn).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          })}</p>
      <h1>NordVPN for {d.name}</h1>
      <p className="hub-intro">{d.summary}</p>



      <div className="verdict">
        <h3>Supported versions</h3>
        <p>{d.versions}</p>
        <p><strong>Protocol to use:</strong> {d.bestProtocol}</p>
      </div>

      <h2 id="setup">How to set it up</h2>
      <ol className="steps">
        {d.steps.map((s, index) => <li key={index}>{s}</li>)}
      </ol>

      {d.olderMethod && <div className="note info">
          <strong>Older devices:</strong> {d.olderMethod}
        </div>}

      <h2 id="notes">Things worth knowing</h2>
      <p>{d.notes}</p>

      <h3>Limitations on {d.name}</h3>
      <ul>{d.limitations.map((l, index) => <li key={index}>{l}</li>)}</ul>

      <Cta slug={`devices-${d.id}`} title={`NordVPN on ${d.name} from $${t.twoYear}/month`} body={`${n.devices.simultaneous} simultaneous connections cover your phone, laptop and ${d.name} on one subscription. ${n.pricing.guarantee}.`} />

      <Faq faqs={faqs} title={`${d.name}: common questions`} />

      <section className="related">
        <h2>More {d.kind.toLowerCase()} guides</h2>
        <div className="grid">
          {others.map((o, index) => <a className="card" href={`/devices/nordvpn-for-${o.id}`} key={index}><h3>{o.name}</h3><p>Difficulty {o.difficulty}/5</p></a>)}
          {otherKinds.map((o, index) => <a className="card" href={`/devices/nordvpn-for-${o.id}`} key={index}><h3>{o.name}</h3><p>{o.kind}</p></a>)}
        </div>
      </section>
    </article>
  </div>
</Base>;
}
