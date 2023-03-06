import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUser } from "../../features/userSlice";

const Footer = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  return (
    <div className="w-full mt-10 footer-bg bottom-0 pb-10">
      <section className="pt-6 pb-3 mx-wd2 mx-auto border-b border-gray-700 flex justify-center flex-col items-center">
        <span className=" w-full flex-wrap mb-3">
          <h3 className="pb-2 text-white font-semibold  text-lg">
            Get to Know Us
          </h3>
          <span className="flex flex-wrap justify-between">
            <p
              onClick={() => navigate("/about")}
              className="text-sm text-gray-300 hover:text-orange-500 cursor-pointer mb-2 mr-2 "
            >
              About Us
            </p>
            <p
              onClick={() => navigate("/contact-us")}
              className="text-sm text-gray-300 cursor-pointer mb-2 mr-2"
            >
              Contact Us
            </p>
            <p
              onClick={() => navigate("/new")}
              className="text-sm text-gray-300 hover:text-orange-500 cursor-pointer mb-2 mr-2"
            >
              Start Writing
            </p>
            <p className="text-sm text-gray-300 hover:text-orange-500 cursor-pointer mb-2 mr-2">
              Sponser Us
            </p>
            {!user ? (
              <p
                onClick={() => navigate("/signIn")}
                className="text-sm text-gray-300 hover:text-orange-500 cursor-pointer mb-2 mr-2"
              >
                Sign Up
              </p>
            ) : (
              <p
                onClick={() => navigate("/profile")}
                className="text-sm text-gray-300 hover:text-orange-500 cursor-pointer mb-2 mr-2"
              >
                Your Account
              </p>
            )}

            <p
              onClick={() => navigate("/how-to-blog-at-melbite")}
              className="text-sm text-gray-300 hover:text-orange-500 cursor-pointer mb-2 mr-2"
            >
              How to Blog Here
            </p>
          </span>
        </span>
      </section>
      <section className="text-gray-400 mt-4 text-xs md:text-sm flex items-center justify-between flex-wrap w-5/6 md:w-3/6 mx-auto">
        <p
          onClick={() => navigate("/privacy-policy")}
          className="hover:text-orange-500 cursor-pointer mr-2 mb-2"
        >
          Privacy Policy
        </p>
        <p className="hover:text-orange-500 cursor-pointer"></p>
        <p
          onClick={() => navigate("/code-of-conduct")}
          className="hover:text-orange-500 cursor-pointer mr-2 mb-2"
        >
          Code of Conduct
        </p>
        <span className="flex items-center mr-2 mb-2">
          <p className="-mt-1 text-xl pr-1 ">©</p>
          Melbite 2023, All rights reserved
        </span>
      </section>
    </div>
  );
};

export default Footer;
