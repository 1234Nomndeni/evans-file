import { useState } from "react";
import { Helmet } from "react-helmet";
import googleIcon from "./images/google-icon.png";
import gitHubIcon from "./images/github.png";
import twitterIcon from "./images/twitter.png";
import {
  auth,
  db,
  gitProvider,
  provider,
  twitterProvider,
} from "../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import HomePage from "./HomePage";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [tagName, setTagName] = useState("");
  const [website, setWebsite] = useState("");
  const [workExperience, setWorkExperience] = useState("");
  const [skills, setSkills] = useState("");
  const [biography, setBiography] = useState("");
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  // Google SignIn
  const googleSignIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        db.collection("Users").doc(result.user?.uid).set(
          {
            email: email,
            tagName: tagName,
            website: website,
            workExperience: workExperience,
            skills: skills,
            biography: biography,
            followers: [],
          },
          { merge: true }
        );
        setEmail("");
        setDisplayName("");
        setTagName("");
        setWebsite("");
        setWorkExperience("");
        setSkills("");
        setBiography("");
      })
      .catch((error) => {
        alert(error.message);
      })
      .then(() => {});
  };

  const githubSignUp = (e) => {
    e.preventDefault();
    auth.signInWithPopup(gitProvider).then((result) => {
      db.collection("Users").doc(result.user.uid).set(
        {
          displayName: displayName,
          tagName: tagName,
          website: website,
          workExperience: workExperience,
          skills: skills,
          biography: biography,
          followers: [],
        },
        { merge: true }
      );
      setDisplayName("");
      setTagName("");
      setWebsite("");
      setWorkExperience("");
      setSkills("");
      setBiography("");
    });
  };

  const twitterSignUp = (e) => {
    e.preventDefault();
    auth.signInWithPopup(twitterProvider).then((result) => {
      db.collection("Users").doc(result.user.uid).set(
        {
          tagName: tagName,
          website: website,
          workExperience: workExperience,
          skills: skills,
          biography: biography,
          followers: [],
        },
        { merge: true }
      );
      setDisplayName("");
      setTagName("");
      setWebsite("");
      setWorkExperience("");
      setSkills("");
      setBiography("");
    });
  };

  return (
    <>
      {!user ? (
        <div
          className="mt-24 sm:w-3/6 md:w-3/6 md:p-5 mx-auto items-center "
          to="/"
        >
          <Helmet>
            <title>Melbite | Get Started</title>
            <link rel="canonical" href="http://melbite.com/signIn"></link>
          </Helmet>
          <h1 className="text-center text-gray-600 font-bold">
            Welcome to melbite
          </h1>

          <section className="border-lg md:w-4/5 mx-auto mt-5 border-2 sm:p-5 md:p-5 lg:p-6 index-50 bg-white space-y-10 ">
            <span
              onClick={googleSignIn}
              className="flex items-center justify-center mx-auto font-bold w-full text-yellow-600 border-2 border-gray-900 rounded-full cursor-pointer mt-4"
            >
              <img src={googleIcon} className="w-12" alt="" />
              <h3 className=" ">Continue with Google </h3>
            </span>
            <span
              onClick={githubSignUp}
              className="flex items-center justify-center text-gray-800 p-2 mx-auto font-bold w-full border-2 border-gray-900 rounded-full cursor-pointer mt-4"
            >
              <img src={gitHubIcon} className="w-8" alt="" />
              <h3 className="ml-3 ">SignUp with github </h3>
            </span>
            <span
              onClick={twitterSignUp}
              className="flex items-center justify-center p-2 mx-auto font-bold w-full border-2 border-gray-800 rounded-full cursor-pointer mt-4"
            >
              <img src={twitterIcon} className="w-8" alt="" />
              <h3 className="ml-3 twitter">SignUp with twitter </h3>
            </span>
          </section>
        </div>
      ) : (
        <HomePage />
      )}
    </>
  );
};

export default SignUp;
