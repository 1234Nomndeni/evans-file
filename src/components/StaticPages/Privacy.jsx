import React from "react";
import { Helmet } from "react-helmet";

const Privacy = () => {
  return (
    <main
      onLoad={window.scroll(0, 0)}
      className="mt-24 mx-wd1 bg-white mx-auto p-4 text-gray-900 pt-12 pl-12 border rounded-md"
    >
      <Helmet>
        <title>Melbite | Privacy Policy</title>
      </Helmet>
      <section>
        <h1 className="text-4xl text-gray-800 mb-5 leading-5">
          Privacy Policy
        </h1>
        <p className="text-gray-600">Effective from March 17, 2022</p>
        {/* <p>This policy covers DEV Community.</p> */}
        <div className="mt-3 text-md mx-wd2">
          <p className="mb-4 text-gray-900">
            Melbite recognizes the importance of your personal privacy.
            Therefore, we have created this Privacy Policy so that you know how
            we use, maintain, and disclose your information when you make it
            available to us.
          </p>
          <p className="mb-4 text-gray-900">
            By using or accessing the Websites and the Service, you signify your
            agreement to be bound by this Privacy Policy.
          </p>
          <h2 className="mb-1 text-gray-900 text-2xl ">
            Information We Collect and Why We Collect It
          </h2>
          <p className="mb-4 text-gray-900">
            In order to give you the best possible experience, we collect
            information from your interactions with our network. For example,
            you share information directly with us when you create an account,
            fill out a form, submit or post content through our Services,
            communicate with us via third-party platforms, request customer
            support.
          </p>
          <p className="mb-4 text-gray-900">
            The information we collect about all visitors to our website
            includes:
          </p>
          <div className="ml-5 mb-4 text-gray-900">
            <li>
              Name, display name, username, bio, email address,your content.
            </li>
            <li>
              Your avatar image, photos, posts, and any other information you
              choose to provide.
            </li>
          </div>
          <h2 className="mb-1 text-gray-900 text-2xl">Use Of Information</h2>
          <p className="mb-4 text-gray-900">
            We use the information we collect to provide, maintain, and improve
            our Services, which includes publishing. We use the information we
            collect to:{" "}
          </p>
          <div className="ml-5 mb-4 text-gray-900">
            <li>Create and maintain your Melbite account;</li>
            <li>Fight spam and other forms of abuse;</li>
            <li>
              Send you technical notices, security alerts, and support and
              administrative messages;
            </li>
            <li>
              Communicate with you about new content, products, services, and
              features offered by Melbite and provide other news and information
              we think will interest you;{" "}
            </li>
            <li>
              Monitor and analyze trends, usage, and activities in connection
              with our Services;
            </li>
            <li>Debug to identify and repair errors in our Services;</li>
          </div>
          <h2 className="mb-1 text-gray-900 text-2xl">
            Information Disclosure
          </h2>
          <p className="mb-4 text-gray-900">
            We do not share, sell, rent, or trade User Personal Information with
            third parties for commercial purposes.
          </p>
          <p className="mb-4 text-gray-900">
            We do host first-party advertising on Melbite. We do not run any
            code from advertisers.
          </p>
          <p className="mb-4 text-gray-900">
            We may use User Personal Information with your permission, so we can
            perform services you have authorized.{" "}
          </p>

          <h2 className="mb-1 text-gray-900 text-2xl">Data Security</h2>
          <p className="mb-4 text-gray-900">
            We use encryption (HTTPS/TLS) to protect data transmitted to and
            from our site. However, no data transmission over the Internet is
            100% secure, so we can’t guarantee security. You use the Service at
            your own risk, and you’re responsible for taking reasonable measures
            to secure your account.
          </p>
          <h2 className="mb-1 text-gray-900 text-2xl">
            Administrative Emails from Melbite
          </h2>
          <p className="mb-4 text-gray-900">
            Sometimes we’ll send you emails about your account, service changes
            or new policies. You can’t opt out of this type of “transactional”
            email (unless you delete your account).{" "}
          </p>
          <p className="mb-4 text-gray-900">
            When you interact with a transactional email sent from Melbite (such
            as opening an email or clicking on a particular link in an email),
            we may receive information about that interaction.{" "}
          </p>

          <h2 className="mb-1 text-gray-900 text-2xl">Contact Us</h2>
          <p className="mb-4 text-gray-900">
            If you have any questions about this Privacy Policy, please contact
            us at:{" "}
            <a className="text-purple-800" href="mailto: info@melbite.com">
              info@melbite.com
            </a>
          </p>
        </div>
      </section>
    </main>
  );
};

export default Privacy;
