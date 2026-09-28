import React from 'react';
export default function Template(props = {}) {
  /** faqs: [{ q, a }] — renders accessible <details> plus FAQPage structured data. */
  const {
    faqs = [],
    title = 'Frequently asked questions'
  } = props;
  const jsonLd = faqs.length ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a
      }
    }))
  } : null;
  return <>{faqs.length > 0 && <>
    <h2 id="faq">{title}</h2>
    <div className="faq">
      {faqs.map((f, index) => <details key={index}>
          <summary>{f.q}</summary>
          <div className="a"><p>{f.a}</p></div>
        </details>)}
    </div>
    {jsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c")
      }} />}
  </>}
</>;
}
