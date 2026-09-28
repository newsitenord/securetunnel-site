import React from 'react';
import Base from '../../../layouts/Base.jsx';
import Crumbs from '../../../components/Crumbs.jsx';
import Cta from '../../../components/Cta.jsx';
import Faq from '../../../components/Faq.jsx';
import nordvpn from '../../../data/nordvpn.js';
import countries from '../../../data/countries.js';
import platforms, { watchMatrix } from '../../../data/platforms.js';
import { site, fitTitle } from '../../../config.js';
export function getStaticPaths() {
  // Only explicitly supported platform/country entries become routes.
  const ids = new Set(countries.map(c => c.id));
  const paths = [];
  for (const [pid, list] of Object.entries(watchMatrix)) {
    const platform = platforms.find(p => p.id === pid);
    if (!platform) continue;
    for (const cid of list) {
      const country = countries.find(c => c.id === cid);
      if (!country || !ids.has(cid)) continue; // skip combinations with no real country data
      paths.push({
        params: {
          platform: platform.slugBase,
          country: cid
        },
        props: {
          platform,
          country
        }
      });
    }
  }
  return paths;
}
export default function Template(props = {}) {
  const countryById = Object.fromEntries(countries.map(c => [c.id, c]));
  const {
    platform: p,
    country: c
  } = props;
  const n = nordvpn;
  const t = n.pricing.tiers[0];
  const sameCountry = Object.entries(watchMatrix).filter(([pid, list]) => list.includes(c.id) && platforms.find(x => x.id === pid)?.slugBase !== p.slugBase).map(([pid]) => platforms.find(x => x.id === pid)).filter(Boolean).slice(0, 6);
  const samePlatform = watchMatrix[p.id].filter(cid => cid !== c.id && countryById[cid]).map(cid => countryById[cid]).slice(0, 6);
  const faqs = [...p.faq, {
    q: `Which ${p.short} server should I use from ${c.name}?`,
    a: `${p.bestServers.join(', ')}. ${c.serverAdvice}`
  }, {
    q: `Will this work reliably from ${c.name}?`,
    a: `Access is rated ${p.vpnSuccess.toLowerCase()}. ${p.catalogueNote.split('.')[0]}. ${c.risk !== 'low' ? `Note that ${c.name} has its own network filtering, so if the connection itself is unstable, switch to NordWhisper before assuming the streaming service is the problem.` : 'If a specific server stops working, switch city \u2014 blocklists change constantly and no server works permanently.'}`
  }, {
    q: `Do I need to pay in ${c.name}'s currency?`,
    a: `No. An existing account works from any country once the IP matches the catalogue you want. New subscriptions are stricter, because most services check the country of your payment method as well as your IP.`
  }];
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `How to watch ${p.library} from ${c.name}`,
    description: `Step-by-step guide to watching ${p.library} from ${c.name} using NordVPN, including which servers to use and how to fix the common errors.`,
    datePublished: site.factsVerifiedOn,
    step: p.steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      text: s
    }))
  };
  return <Base title={fitTitle(`Watch ${p.short} from ${c.name}`, ` (${new Date(site.factsVerifiedOn).getFullYear()})`)} description={`Watch ${p.library} from ${c.name} with NordVPN. Which servers to use (${p.bestServers.slice(0, 2).join(', ')}), the ${p.short} error codes you will hit, and the fixes in order of likelihood.`} slug="/streaming" schema={schema}>
  <div className="wrap">
    <Crumbs items={[{
        label: 'Streaming',
        href: '/streaming'
      }, {
        label: p.short,
        href: `/streaming#${p.slugBase}`
      }, {
        label: `${p.short} from ${c.name}`,
        href: `/watch/${p.slugBase}/${c.id}`
      }]} />

    <article className="narrow">
      <p className="count">Access rated: {p.vpnSuccess} &middot; difficulty {p.difficulty}/5 &middot; verified {new Date(site.factsVerifiedOn).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          })}</p>
      <h1>How to watch {p.library} from {c.name}</h1>
      <p className="hub-intro">{p.hook ?? p.catalogueNote}</p>



      <div className="verdict">
        <h3>The short answer</h3>
        <p>Connect NordVPN to <strong>{p.bestServers[0]}</strong> before you open {p.short}. {p.bestServers.length > 1 && <>If it fails, try <strong>{p.bestServers[1]}</strong> or <strong>{p.bestServers[2] ?? p.bestServers[0]}</strong> &mdash; blocklists are per IP range, so switching city is the single most effective fix.</>} Access from {c.name} is rated <strong>{p.vpnSuccess.toLowerCase()}</strong>.</p>
      </div>

      <Cta slug={`watch-${p.slugBase}-${c.id}`} title={`Watch ${p.library} from ${c.name}`} body={`NordVPN from $${t.twoYear}/month. ${n.network.servers} servers in ${n.network.countries} countries. ${n.pricing.guarantee}.`} />

      <h2 id="why">Why {p.short} does not work from {c.name}</h2>
      <p>{p.catalogueNote}</p>
      <p>From {c.name} specifically: {c.situation}</p>

      <h2 id="steps">Step by step</h2>
      <ol className="steps">
        {p.steps.map((s, index) => <li key={index}>{s}</li>)}
      </ol>

      <h2 id="servers">Which servers to use</h2>
      <p>{c.serverAdvice}</p>
      <div className="tablewrap">
        <table>
          <thead><tr><th>Recommended</th><th>Use with caution</th></tr></thead>
          <tbody>
            <tr>
              <td>{p.bestServers.join(', ')}</td>
              <td>{p.regionsToAvoid.join(', ')}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 id="errors">When it fails: {p.short} errors and what they mean</h2>
      <ul>{p.commonErrors.map((e, index) => <li key={index}><strong>{e.split(' \u2014 ')[0]}</strong>{e.includes(' \u2014 ') && <> &mdash; {e.split(' \u2014 ').slice(1).join(' \u2014 ')}</>}</li>)}</ul>
      <p>{p.errorFixes}</p>

      <div className="note info">
        <strong>Still stuck?</strong> Our <a href="/fix/netflix-blocked">streaming troubleshooting guide</a> covers the fixes in order of likelihood, and explains why clearing cookies is the step most people skip.
      </div>

      <h2 id="devices">On TVs, consoles and streaming sticks</h2>
      <p>{p.deviceNotes}</p>
      <p>See the device guides for <a href="/devices/nordvpn-for-firestick">Fire TV Stick</a>, <a href="/devices/nordvpn-for-android-tv">Android TV</a>, <a href="/devices/nordvpn-for-apple-tv">Apple TV</a>, <a href="/devices/nordvpn-for-roku">Roku</a> and <a href="/devices/nordvpn-for-router">routers</a>.</p>

      <h2 id="speed">Will it buffer from {c.name}?</h2>
      <p>{c.speedNote}</p>
      <p>For 4K you need roughly 25 Mbps sustained. On a nearby server, NordLynx will not be your bottleneck &mdash; the distance between {c.name} and the content's CDN usually is.</p>

      <Faq faqs={faqs} />

      {sameCountry.length > 0 && <section className="related">
          <h2>Other services from {c.name}</h2>
          <div className="grid">
            {sameCountry.map((o, index) => <a className="card" href={`/watch/${o.slugBase}/${c.id}`} key={index}>
                <h3>{o.library}</h3>
                <p>{o.vpnSuccess}</p>
              </a>)}
          </div>
        </section>}

      {samePlatform.length > 0 && <section className="related">
          <h2>{p.short} from other countries</h2>
          <div className="grid">
            {samePlatform.map((o, index) => <a className="card" href={`/watch/${p.slugBase}/${o.id}`} key={index}>
                <h3>From {o.name}</h3>
                <p>{o.region}</p>
              </a>)}
          </div>
        </section>}
    </article>
  </div>
</Base>;
}
