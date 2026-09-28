import React from 'react';
import JsonLd from '../components/JsonLd.jsx';
// Metadata is extracted by the route's generateMetadata. This component only
// renders the article, so every page shares one document, header and footer.
export default function Base({children, schema}) {
  return <>{schema && <JsonLd data={schema}/>} {children}</>;
}
