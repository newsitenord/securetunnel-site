import React from 'react';
import Base from '../../layouts/Base.jsx';
import Crumbs from '../../components/Crumbs.jsx';
import Cta from '../../components/Cta.jsx';
import devices from '../../data/devices.js';
import { site } from '../../config.js';
export default function Template(props = {}) {
  const byKind = devices.reduce((acc, d) => {
    (acc[d.kind] ??= []).push(d);
    return acc;
  }, {});
  const kinds = Object.keys(byKind).sort();
  return <Base title={`NordVPN setup guides for ${devices.length} devices`} description={`Step-by-step NordVPN setup for ${devices.length} devices \u2014 Windows, macOS, Linux, Android, iPhone, Fire TV Stick, Android TV, Apple TV, Roku, routers, PS5, Xbox and Switch.`} slug="/devices" ogType="website">
  <div className="wrap">
    <Crumbs items={[{
        label: 'Devices',
        href: '/devices'
      }]} />
    <p className="count">{devices.length} device guides &middot; verified {new Date(site.factsVerifiedOn).toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        })}</p>
    <h1>NordVPN setup by device</h1>
    <p className="hub-intro">Setup difficulty varies enormously by platform. Phones and laptops have proper native apps. Consoles and most smart TVs cannot run a VPN at all, and need a router or a shared connection &mdash; which changes the instructions completely. Each guide below covers the real method for that specific device.</p>



    <Cta slug="hub-devices" compact />

    {kinds.map(kind => <>
        <h2>{kind}</h2>
        <div className="grid">
          {byKind[kind].map((d, index) => <a className="card" href={`/devices/nordvpn-for-${d.id}`} key={index}>
              <p className="meta">Difficulty {d.difficulty}/5</p>
              <h3>{d.name}</h3>
              <p>{d.limitations[0]}</p>
            </a>)}
        </div>
      </>)}

    <div className="note info">
      <strong>One subscription covers ten devices.</strong> A router-level connection counts as one of those ten and covers every device behind it, which is how you protect consoles, smart TVs and IoT hardware that cannot run a VPN client. See <a href="/guides/vpn-on-multiple-devices">how to spend your ten connections well</a>.
    </div>
  </div>
</Base>;
}
