import React from 'react';
import Base from '../../layouts/Base.jsx';
import Crumbs from '../../components/Crumbs.jsx';
import Cta from '../../components/Cta.jsx';
import usecases from '../../data/usecases.js';
export default function Template(props = {}) {
  return <Base title={`VPN by use case: ${usecases.length} practical guides`} description={`VPN guides by use case \u2014 torrenting, gaming, streaming, remote work, public Wi-Fi, travel, privacy, students, journalism and censorship. What actually matters for each.`} slug="/use" ogType="website">
  <div className="wrap">
    <Crumbs items={[{
        label: 'Use cases',
        href: '/use'
      }]} />
    <h1>VPN by use case</h1>
    <p className="hub-intro">"Best VPN" depends entirely on what you need it for. The right answer for torrenting is not the right answer for gaming, and the right answer for a journalist is not the right answer for a student on campus Wi-Fi. Each guide below starts with what actually matters for that use case, including where a VPN makes things worse.</p>



    <Cta slug="hub-usecases" compact />

    <div className="grid-2">
      {usecases.map((u, index) => <a className="card" href={`/use/vpn-for-${u.id}`} key={index}>
          <h3>{u.name}</h3>
          <p>{u.keyFeatures.join(' &middot; ')}</p>
        </a>)}
    </div>
  </div>
</Base>;
}
