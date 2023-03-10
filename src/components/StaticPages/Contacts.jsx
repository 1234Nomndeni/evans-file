import React from 'react'
import { Helmet } from "react-helmet";

const Contacts = () => {
  return (
    <main
      onLoad={window.scroll(0, 0)}
      className="lg:max-w-7xl w-full mt-24 mx-wd1 bg-white mx-auto pt-12 md:pl-12 pl-6 pb-8 border rounded-md"
    >
      <Helmet>
        <title>Melbite | Contact Us</title>
        <meta name="description" description="Login to melbite"/>
        <meta name="keywords" description="login, create account, start writing"/>
      </Helmet>
      <section className="mx-wd2">
        <h1 className="text-4xl text-gray-800 mb-5">Contact Melbite</h1>
        <p className="text-xl mb-3">We would love to hear from you 😂</p>
        <p className="text-lg">Location: Remote - Kenya</p>
        <p className="text-lg mt-3 flex">
          Whats App us <p className="text-purple-800 ml-1">+254791486125</p>
        </p>
        <p className="text-lg mt-3">
          Email:{" "}
          <a
            href="mailto: info@melbite.com"
            className="cursor-pointer text-purple-900  ml-3"
          >
            info@melbite.com{" "}
          </a>{" "}
        </p>
        <p className="text-lg mb-2 mt-3">
          To Request a feature email us through{" "}
          <a
            href="mailto: info@melbite.com"
            className="cursor-pointer text-purple-900"
          >
            info@melbite.com{" "}
          </a>{" "}
          and briefly describe your feature.
        </p>{" "}
        <p className="text-lg mb-2 mt-3">
          To Report a Bug, Please send Us Email{" "}
          <a
            href="mailto: info@melbite.com"
            className="cursor-pointer text-purple-900"
          >
            info@melbite.com{" "}
          </a>{" "}
        </p>
      </section>
    </main>
  );
}

export default Contacts