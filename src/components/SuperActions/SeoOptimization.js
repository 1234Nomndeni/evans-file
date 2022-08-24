import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const SeoOptimization = ({
  children,
  id,
  timestamp,
  blogHeader,
  blogBody,
  backgroundImage,
  name_slug,
  slug_name,
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
        <meta content={meta.slug_name} name="keywords" />
        <meta property="og:url" content={`https://melbite.com/${Link.asPath}`} />
        <link rel="canonical" href={`https://melbite.com/${Link.asPath}`} />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content="Melbite Platform" />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:title" content={meta.slug_name} />
        <meta property="og:image" content={meta.image} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:card" content="https://twitter.com/melbite1" />
        <meta name="twitter:site" content="https://twitter.com/melbite1" />
        <meta
          property="og:image"
          content="https://www.linkedin.com/company/melbite-community"
        ></meta>
        <meta
          property="og:image"
          content="https://www.facebook.com/learnthroughmelbite"
        ></meta>
        <meta name="twitter:image" content="https://twitter.com/melbite1" />
        <link rel="canonical" href="http://melbite.com"></link>
        <meta
          property="og:url"
          content="https://www.facebook.com/learnthroughmelbite"
        ></meta>
        <meta
          property="og:url"
          content="https://www.linkedin.com/company/melbite-community"
        ></meta>
        <meta name="twitter:url" content="https://twitter.com/melbite1"></meta>
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

export default SeoOptimization;
