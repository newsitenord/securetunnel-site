import React from 'react';
import Base from '../../layouts/Base.jsx';
import Crumbs from '../../components/Crumbs.jsx';
import Cta from '../../components/Cta.jsx';
import troubleshooting from '../../data/troubleshooting.js';
export default function Template(props = {}) {
  return <Base title={`NordVPN troubleshooting: ${troubleshooting.length} common fixes`} description={`NordVPN not working? ${troubleshooting.length} troubleshooting guides \u2014 connection failures, Netflix M7111 errors, slow speeds, DNS and IP leaks, kill switch, mobile drops and router setup.`} slug="/fix" ogType="website">
  <div className="wrap">
    <Crumbs items={[{
        label: 'Troubleshooting',
        href: '/fix'
      }]} />
    <h1>NordVPN troubleshooting</h1>
    <p className="hub-intro">Every guide below lists the fixes in order of likelihood rather than in a random order, because working through a list of twelve things when the answer is number two wastes twenty minutes. Each one explains what the fix actually addresses, so you can judge whether it applies.</p>



    <Cta slug="hub-fix" compact />

    <div className="grid-2">
      {troubleshooting.map((x, index) => <a className="card" href={`/fix/${x.id}`} key={index}>
          <p className="meta">{x.fixes.length} fixes</p>
          <h3>{x.name}</h3>
          <p>{x.symptom}</p>
        </a>)}
    </div>

    <div className="note info">
      <strong>Before you start:</strong> disconnect the VPN and confirm your connection works normally. Roughly a third of reported VPN problems turn out to be an ISP or router issue that was already there.
    </div>
  </div>
</Base>;
}
