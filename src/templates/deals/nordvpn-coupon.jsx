import React from 'react';
import Base from '../../layouts/Base.jsx';
import Crumbs from '../../components/Crumbs.jsx';
import Cta from '../../components/Cta.jsx';
import Faq from '../../components/Faq.jsx';
import nordvpn from '../../data/nordvpn.js';
import { site, affiliate, affiliateLink, legal } from '../../config.js';
export default function Template(props = {}) {
  const n = nordvpn;
  const t = n.pricing.tiers;
  const now = new Date();
  const monthYear = now.toLocaleDateString('en-GB', {
    month: 'long',
    year: 'numeric'
  });
  const link = affiliateLink('deals-coupon');
  const monthlyTwoYear = (t[0].monthly * 24).toFixed(2);
  const saving = (t[0].monthly * 24 - t[0].twoYearTotal).toFixed(2);
  const faqs = [{
    q: `Is there a NordVPN coupon code for ${monthYear}?`,
    a: `NordVPN does not use copy-and-paste coupon codes. The discount is applied automatically at checkout through the promotional link \u2014 there is no code to enter and no box to fill in. Any site claiming to have an "exclusive NordVPN coupon code" is describing the same public promotion.`
  }, {
    q: 'What is the cheapest way to buy NordVPN?',
    a: `The two-year Basic plan at $${t[0].twoYear} a month, which is $${t[0].twoYearTotal} for ${t[0].twoYearMonths} months including three extra. That compares with $${monthlyTwoYear} if you paid monthly for the same period \u2014 a saving of about $${saving}.`
  }, {
    q: 'Does NordVPN offer a free trial?',
    a: `There is a three-day free trial for new Android users through Google Play. Everywhere else the route is the ${n.pricing.guarantee}, which applies to all plans and is processed through live chat without argument.`
  }, {
    q: 'Is there a NordVPN student discount?',
    a: 'NordVPN does not run a verified student discount programme. The two-year plan is the cheapest route regardless of student status, and it is cheaper than most dedicated student offers from competing VPNs.'
  }, {
    q: 'Does NordVPN have a lifetime deal?',
    a: 'No, and it never has. Any site advertising a "NordVPN lifetime subscription" is either selling a fraudulent key or confusing it with a different provider. NordVPN sells one-month, one-year and two-year terms only.'
  }, {
    q: 'What price will I be charged at renewal?',
    a: `The introductory rate does not continue. Basic renews at roughly $139 a year, Complete at roughly $219 and Prime at roughly $296. NordVPN emails before charging, but set a calendar reminder for two weeks before your renewal date rather than relying on the email.`
  }, {
    q: 'Can I pay with cryptocurrency?',
    a: `Yes. ${n.pricing.payment}`
  }, {
    q: 'Is the discount different in my country?',
    a: 'Yes. NordVPN prices vary by country and currency, and the promotional percentage differs by market. The figures on this page are US-store list prices; your checkout will show local pricing.'
  }];
  return <Base title={`NordVPN coupon ${monthYear}: current deals`} description={`NordVPN deals for ${monthYear}: ${t[0].twoYear}/month on the two-year Basic plan ($${t[0].twoYearTotal} for ${t[0].twoYearMonths} months). Why there is no coupon code, and the renewal price nobody mentions.`} slug="/deals/nordvpn-coupon">
  <div className="wrap">
    <Crumbs items={[{
        label: 'Deals',
        href: '/deals/nordvpn-coupon'
      }]} />

    <article className="narrow">
      <p className="count">Checked {now.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          })}</p>
      <h1>NordVPN coupon and deals for {monthYear}</h1>
      <p className="hub-intro">There is no coupon code. NordVPN applies its discount automatically through the promotional link, so any site offering you an "exclusive code" is describing the same public offer with extra steps. What is worth understanding is what the offer actually includes &mdash; and what happens when it ends.</p>



      <div className="verdict">
        <h3>Best current deal</h3>
        <p><strong>${t[0].twoYear} a month</strong> on the two-year Basic plan &mdash; <strong>${t[0].twoYearTotal}</strong> upfront for <strong>{t[0].twoYearMonths} months</strong>, because three extra months are included. That is the cheapest NordVPN has been.</p>
        <p>Includes {n.network.servers} servers in {n.network.countries} countries, {n.devices.simultaneous} simultaneous connections, and {n.pricing.guarantee}.</p>
      </div>

      <Cta slug="deals-coupon" title={`Get ${t[0].twoYearMonths} months for $${t[0].twoYearTotal}`} body={`Two-year Basic plan at $${t[0].twoYear}/month, including three extra months. No coupon code needed \u2014 the discount is applied at checkout.`} />

      <h2 id="why-no-code">Why there is no coupon code</h2>
      <p>NordVPN runs a single promotional price per market rather than a code system. The discount is attached to the checkout link, so it applies the moment you arrive through it. This is worth knowing because "NordVPN coupon code" is a heavily searched phrase, and a great deal of content targeting it describes a mechanism that does not exist.</p>
      <p>What does vary is the promotion itself. NordVPN changes the headline discount and the bonus months periodically, and pricing differs by country and currency. The figures on this page are US-store list prices checked on {now.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          })}.</p>

      <h2 id="plans">All three plans at current prices</h2>
      <div className="tablewrap">
        <table>
          <thead><tr><th>Plan</th><th>Monthly</th><th>1 year</th><th>2 years</th><th>2-year total</th><th>Renewal</th></tr></thead>
          <tbody>
            {t.map((tier, index) => <tr key={index}>
                <td><strong>{tier.name}</strong></td>
                <td className="num">${tier.monthly}</td>
                <td className="num">${tier.yearly}</td>
                <td className="num hi">${tier.twoYear}</td>
                <td className="num">${tier.twoYearTotal}</td>
                <td>{tier.renewal}</td>
              </tr>)}
          </tbody>
        </table>
      </div>
      <p>{n.pricing.note}</p>

      <h2 id="math">The actual maths</h2>
      <p>On the Basic plan, paying monthly for the same {t[0].twoYearMonths}-month period would cost roughly <strong>${monthlyTwoYear}</strong>. The two-year offer costs <strong>${t[0].twoYearTotal}</strong>, a saving of about <strong>${saving}</strong>.</p>
      <p>The catch is that you pay it upfront, and you are committed for the full term. The {n.pricing.guarantee.split(' ')[0]}-day refund window is your only exit, after which there are no partial refunds. If you are unsure, the monthly plan costs more but lets you test properly first.</p>

      <div className="note">
        <strong>The renewal is the part nobody puts in the headline.</strong>
        When the introductory term ends, Basic renews at roughly $139 a year rather than $94, and Complete at roughly $219 rather than $121. NordVPN emails before charging. Set a reminder for two weeks before your renewal date, decide then, and cancel if you do not want to continue &mdash; you can always resubscribe later at whatever promotion is running.
      </div>

      <h2 id="which">Which plan should you actually buy?</h2>
      {t.map((tier, index) => <div className="verdict" key={index}>
          <h3>{tier.name} &mdash; ${tier.twoYear}/month</h3>
          <p>{tier.pitch}</p>
          <p><strong>Buy it if:</strong> {tier.bestFor}</p>
        </div>)}

      <h2 id="avoid">Deals to avoid</h2>
      <ul>
        <li><strong>"Lifetime" NordVPN subscriptions.</strong> These do not exist. NordVPN sells one-month, one-year and two-year terms only. A lifetime listing is either a fraudulent key or a different product entirely.</li>
        <li><strong>Resold account keys from marketplaces.</strong> They are usually stolen or shared, and NordVPN can invalidate them without refund.</li>
        <li><strong>Anything asking for a coupon code.</strong> There is no code field at NordVPN checkout. A page that insists on one is not describing the real product.</li>
        <li><strong>Monthly billing for long-term use.</strong> At ${t[0].monthly} a month it is the most expensive way to buy, and only makes sense if you genuinely need one month.</li>
      </ul>

      <h2 id="trial">Free trial and refund</h2>
      <p>{n.pricing.trial}. On every other platform, the route is the {n.pricing.guarantee}. Request it through live chat on the NordVPN website &mdash; it is faster than email, support will ask a brief question about why, and refunds reach your card in about ten business days.</p>
      <p>One detail: subscriptions bought through the Apple App Store or Google Play follow that store's refund policy rather than NordVPN's. Buy direct if the guarantee matters.</p>

      <Faq faqs={faqs} />

      <p className="disclosure" style={{
          "marginTop": "2rem"
        }}>
        <strong>Affiliate link:</strong> the button on this page is <code>{affiliate.baseUrl}</code>, our NordVPN affiliate link. {legal.specDisclaimer}
      </p>
    </article>
  </div>
</Base>;
}
