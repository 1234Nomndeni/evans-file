import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

const AboutUs = () => {
  const navigate = useNavigate();
  return (
    <main
      onLoad={window.scroll(0, 0)}
      className="mt-24 mx-wd1 bg-white mx-auto p-4 pt-12 pb-12 pl-12 border rounded-md"
    >
      <Helmet>
        <title>Melbite | About Us</title>
      </Helmet>
      <section className="bg mx-wd2">
        <h2 className="text-3xl text-gray-800">About Melbite</h2>
        <p className="mt-3 leading-7 text-md text-gray-900">
          Melbite is a platform for everyone to read, write and learn.{" "}
        </p>
        <p className="leading-7 text-md text-gray-900">
          The idea behind melbite was to create a platform that enables everyone
          to share their thoughts about a particular topic of their expertise
          and help others learn.
        </p>
        <h2 className="mt-7 mb-5 text-2xl leading-5 text-gray-800">
          Technologies
        </h2>
        <p className="leading-7 text-md text-gray-900">
          Melbite is built with this amazing Javascript library called ReactJs.
          We also make use of firebase realtime database, firestore and firebase
          storage.
        </p>
        <p className="leading-7 text-md text-gray-900">
          We make use of customised Quill Editor supporting various features and
          instant preview of the content. This feature in not available on any
          other platform available.{" "}
          <p
            onClick={() => navigate("/new")}
            className="text-purple-700 hover:text-purple-900 underline cursor-pointer"
          >
            try it out
          </p>
          <p className="leading-7 text-md text-gray-900 mt-4">
            Welcome to melbite{" "}
          </p>
        </p>
      </section>
      <section></section>
    </main>
  );
};

export default AboutUs;
