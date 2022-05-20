import React from 'react'
import { Helmet } from 'react-helmet';
import { Link } from "react-router-dom";


const SeoOptimization = ({
  children,
  id,
  timestamp,
  blogHeader,
  blogBody,
  backgroundImage,
  name_slug,
  displayName,
  ...customMeta
}) => {
  const meta = {
    title: blogHeader,
    description: blogBody,
    image: backgroundImage,
    type: "website",
    date: new Date(timestamp?.toDate()).toUTCString(),
    ...customMeta,
  };
  return (
    <main>
      <Helmet>
        <title>{meta.title}</title>
        <meta name="robots" content="follow, index" />
        <meta content={meta.description} name="description" />
        <meta property="og:url" content={`https://melbite.com${Link.asPath}`} />
        <link rel="canonical" href={`https://melbite.com${Link.asPath}`} />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content="Paul Knulst" />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="melbite.com" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />
        {meta.date && (
          <meta property="article:published_time" content={meta.date} />
        )}
      </Helmet>
      <section>
          <div>{children}</div>
      </section>
    </main>
  );
};

export default SeoOptimization