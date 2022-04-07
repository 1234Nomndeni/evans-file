import React, { useState } from 'react'
import './ComSoon.css'
import { Helmet } from "react-helmet";
import { db } from '../../utils/firebase';
import firebase from 'firebase/compat/app'

const ComingSoon = () => {
  const [email, setEmail] = useState("")

  const mailList = (e) => {
    e.preventDefault()
    db.collection("mail_list").add({
      email: email,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setEmail("")
  }
  return (
    <div className="com">
      <Helmet>
        <title>Melbite | Welcome</title>
      </Helmet>

      <div className="pt-10 pl-10 pr-10 cont absolute text-left pb-6">
        <h1 className="text-4xl sm:mb-10 md:mb-12 text-white font-bold ">melbite</h1>
        <h3 className=" text-3xl">Hey!</h3>
        <p className="sm:text-sm mb-6 font-bold md:text-3xl text-purple-900">
          We are cooking it up . . .
        </p>
        <p className="hidden md:block mb-2 md:w-3/5 sm:w-full md:text-xl text-gray-800">
          We are currently working on creating something fantastic for content
          creators, bloggers and learners for the world.
        </p>
        <p className="mt-2 mb-6 md:text-xl">
          We're just a few days from our launch. Sign up to be notified.
        </p>

        <div className="flex flex-wrap mt-10">
          <input value={email}  onChange={(e) => setEmail(e.target.value)}
            className="p-2 border w-auto border-yellow-600 outline-none"
            type="email"
            required
            placeholder="Enter Your Email"
          />
          <button disabled={!email} onClick={mailList} className="bg-yellow-600 px-6 p-2 text-white hover:bg-yellow-700">
            NOTIFY ME
          </button>
        </div>
        <form>
          
        </form>
        <div className="mt-6 hidden md:block ">
          <p className="text-lg mt-3">
            Email us:{" "}
            <a
              href="mailto: info@melbite.com"
              className="cursor-pointer text-white ml-3"
            >
              info@melbite.com{" "}
            </a>{" "}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ComingSoon