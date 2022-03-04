import React from "react";
// import logo from "../Images/JohFun1.jpg";

const Footer = () => {
  return (
    <div className="w-full mt-10 bg-gray-900 bottom-0 pb-10">
      <section className="pt-6 pb-3 mx-wd2 mx-auto border-b border-gray-700 flex justify-center flex-col items-center">
        {/* <img className="w-44 mb-6  items-center" src={logo} alt="" /> */}
        <span className=" w-full flex-wrap mb-3">
            <h3 className="pb-2 text-white font-semibold  text-lg">
              Get to Know Us
            </h3>
          <span className="flex justify-between">
            <p className="text-sm text-gray-300 hover:text-orange-500 cursor-pointer mb-2 ">
              About Us
            </p>
            <p className="text-sm text-gray-300 hover:text-orange-500 cursor-pointer mb-2">
              Contact Us
            </p>
            <p className="text-sm text-gray-300 hover:text-orange-500 cursor-pointer mb-2">
              Start Writing
            </p>
            <p className="text-sm text-gray-300 hover:text-orange-500 cursor-pointer mb-2">
              Sponser Us
            </p>
            <p className="text-sm text-gray-300 hover:text-orange-500 cursor-pointer mb-2">
              Your Account
            </p>
            <p className="text-sm text-gray-300 hover:text-orange-500 cursor-pointer mb-2">
              FAQs
            </p>
            <p className="text-sm text-gray-300 hover:text-orange-500 cursor-pointer mb-2">
              How to Blog Here
            </p>
            <p className="text-sm text-gray-300 hover:text-orange-500 cursor-pointer mb-2">
              Our Technologies
            </p>
          </span>
        </span>
      </section>
      <section className="text-gray-400 mt-4 text-sm flex items-center justify-between flex-wrap w-3/6 mx-auto">
        <p className="hover:text-orange-500 cursor-pointer">Privacy Policy</p>
        <p className="hover:text-orange-500 cursor-pointer"></p>
        <p className="hover:text-orange-500 cursor-pointer">Code of Conduct</p>
        <span className="flex items-center">
          <p className="mt-1 text-xl pr-1">©</p>
          Evansify 2022, evansify.com All rights reserved
        </span>
      </section>
    </div>
  );
};

export default Footer;
