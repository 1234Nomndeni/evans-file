import React from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

const HowToBlogHere = () => {
  const navigate = useNavigate();

  return (
    <main
      onLoad={window.scroll(0, 0)}
      className="lg:max-w-7xl mt-20 md:mt-24 mx-wd1 bg-white mx-auto p-4 md:pt-12 md:pl-12 border rounded-md"
    >
      <Helmet>
        <title>Melbite | How To Blog Here</title>
      </Helmet>
      <section className="bg mx-wd2">
        <h2 className="text-3xl text-gray-800">How To Blog At Melbite</h2>
        <p className="mt-3 leading-7 mb-4 text-gray-900">
          Melbite is a platform for everyone to read, write and learn.{" "}
        </p>
        <p className="mb-4 text-gray-900">
          Do you want to create a blog or an article with us for the world to
          learn from? Then here is the procedure to follow to create an article.
          Click the start writting button on the top of the page. Enter the
          background image you want to appear in your blog, Your blog / article
          title, the current project or interesting stuff you are working on,
          your blog content then hit the publish button on the top right of the
          page.
        </p>
        <p className="mb-4 text-gray-900">
          After publishing your content will be available immediately after
          pressing the publish button.{" "}
        </p>
        <p className="mb-4 text-gray-900">
          Do you want to create a blog or an article with us for the world to
          learn from??? If you are new to melbite{" "}
          <span
            onClick={() => navigate("/signIn")}
            className="text-purple-900 cursor-pointer hover:text-purple-700"
          >
            create account
          </span>
          . If you already have an account{" "}
          <span
            onClick={() => navigate("/new")}
            className="text-purple-900 hover:text-purple-700 hover:font-bold cursor-pointer"
          >
            start writting now
          </span>{" "}
        </p>
      </section>
    </main>
  );
};

export default HowToBlogHere;
