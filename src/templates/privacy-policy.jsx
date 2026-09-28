import React from 'react';
import Base from '../layouts/Base.jsx';
import Crumbs from '../components/Crumbs.jsx';
import { site } from '../config.js';
export default function Template(props = {}) {
  return <Base title="Privacy policy" description={`How ${site.name} handles your data: what we collect, what we do not collect, how affiliate links are tracked, and how to contact us.`} slug="/privacy-policy">
  <div className="wrap narrow">
    <Crumbs items={[{
        label: 'Privacy policy',
        href: '/privacy-policy'
      }]} />
    <h1>Privacy policy</h1>
    <p className="hub-intro">A site that reviews privacy products should not have a privacy policy that is hard to read. This one is short because there is very little to say.</p>

    <p><em>Last updated: {new Date(site.factsVerifiedOn).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          })}</em></p>

    <h2>What we collect</h2>
    <p>Nothing that identifies you personally. {site.name} is a static website hosted on Netlify. We run no analytics, no advertising scripts, no third-party trackers and no cookies of our own.</p>

    <h2>Hosting logs</h2>
    <p>Netlify, our host, retains standard server logs including IP addresses and request timestamps for operational and security purposes. This is outside our control and is covered by <a href="https://www.netlify.com/privacy/" target="_blank" rel="noopener noreferrer">Netlify's privacy policy</a>.</p>

    <h2>Affiliate links</h2>
    <p>When you click a link to NordVPN, the request goes through Impact, NordVPN's affiliate network. Impact sets its own cookies to attribute the referral and will process data under its own privacy policy. We do not receive your personal information from that process &mdash; only aggregate, anonymised click and conversion data.</p>
    <p>Affiliate links on this site carry <code>rel="nofollow sponsored noopener noreferrer"</code>. The <code>noreferrer</code> attribute prevents this site's address being sent as a referrer.</p>

    <h2>External links</h2>
    <p>Some pages link to third-party sites such as Access Now, the EFF and the Committee to Protect Journalists. Those sites have their own privacy policies, which we do not control.</p>

    <h2>Children</h2>
    <p>{site.name} is not directed at children and we do not knowingly collect data from anyone under 16.</p>

    <h2>Your rights</h2>
    <p>Since we hold no personal data, there is nothing for us to disclose, correct or delete. If you believe we hold data about you, contact us and we will investigate.</p>

    <h2>Contact</h2>
    <p><a href={`mailto:${site.email}`}>{site.email}</a></p>

    <p><a href="/about">About us</a> &middot; <a href="/affiliate-disclosure">Affiliate disclosure</a></p>
  </div>
</Base>;
}
