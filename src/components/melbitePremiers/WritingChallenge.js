import React, { useState } from "react";
import { Helmet } from "react-helmet";
import firebase from "firebase/compat/app";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { db } from "../../utils/firebase";

toast.configure({
  position: toast.POSITION.TOP_CENTER,
  autoClose: 3000,
  pauseOnFocusLoss: false,
  className: {
    backgroundColor: "red-red-200",
  },
  bodyClassName: {
    backgroundColor: "blue",
    height: "100%",
    width: "100%",
  },
});

const WritingChallenge = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");

  const submitForm = async (e) => {
    e.preventDefault();
    if (firstName && lastName && phoneNumber && email) {
      await db
        .collection("writechallenge")
        .add({
          //   uid: user.uid,
          firstName: firstName,
          lastName: lastName,
          phoneNumber: phoneNumber,
          email: email,
        })
        .then(() => {
          setFirstName("");
          setLastName("");
          setPhoneNumber("");
          setEmail("");
          toast("Registered Successfully");
        }).catch((err) => {
            console.log(err)
        });
    }
  };

  return (
    <main>
      <Helmet>
        <title>Writing Challenge</title>
      </Helmet>

      <section className="mt-28 pb-3 max-w-7xl mx-auto">
        <h1 className="text-center">Melbite Writing Challenge</h1>
        <h3 className="text-center mt-4 px-2">
          Join The melbite writing challenge and stand a chance to win cash and
          melbite merchandise
        </h3>

        <p className="text-center px-2">
          To know more about the topics and rules of the challenge click here
        </p>

        <section className="mt-7 flex items-center justify-center flex-col">
          <label className="font-semibold">First Name*</label>
          <input
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
            className="p-2 md:w-2/6 border-2 rounded-sm border-purple-500"
            type="text"
            placeholder="First Name"
            required
          />
          <br />
          <label className="font-semibold left-0">Last Name*</label>
          <input
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
            className="p-2 md:w-2/6 border-2 rounded-sm border-purple-500"
            type="text"
            placeholder="Last Name"
            required
          />{" "}
          <br />
          <label className="font-semibold">Phone Number*</label>
          <input
            onChange={(e) => setPhoneNumber(e.target.value)}
            value={phoneNumber}
            className="p-2 md:w-2/6 border-2 rounded-sm border-purple-500"
            type="text"
            placeholder="Phone Number"
            required
          />{" "}
          <br />
          <label className="font-semibold">Email Address*</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="p-2 md:w-2/6 border-2 rounded-sm border-purple-500"
            type="email"
            placeholder="Email Address"
            required
          />{" "}
          <br />
          <button
            onClick={submitForm}
            className="border border-purple-500 px-9 py-2.5 rounded-full font-semibold text-purple-800 hover:bg-purple-600 hover:text-white"
          >
            Register Now
          </button>
          <p className="mt-5">
            {" "}
            Email us : <span className="text-purple-600">info@melbite.com</span>
          </p>
        </section>
      </section>
    </main>
  );
};

export default WritingChallenge;
