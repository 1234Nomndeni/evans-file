import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  UserCircleIcon,
  ClockIcon,
  BookOpenIcon,
  BookmarkIcon,
} from "@heroicons/react/outline";
import Feed from "./Feed";
import { db } from "../utils/firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  const getLocation = pathname.split("/");
  const user = useSelector(selectUser);


  // -> Make the blog visible from the firebase to the front-end

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
 
  }, []);
  
  return (
    <main>
      <section className="mb-20">
        <nav className="w-full  bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500">
          <div className=" pb-8 mt-14 mx-auto mx-wd p-10">
            <h1 className="lg:text-3xl w-1/2 mb-14 text-gray-700 prose md:text-lg font-serif">
              {/* Hello world melbite is a place to write, read, and connect */}
              Hello world, let's read, write and learn through melbite
            </h1>
            <button className="bg-c p-3 transition-all text-white font-bold rounded-sm transform hover:scale-105 ">
              Sign Me Up
            </button>
          </div>
        </nav>

        <main className="mt-5 mx-auto mx-wd1 ">
          <section className="hidden md:block lg:mx-wd1">
            <nav className="flex items-center justify-between bg-white p-2 border-2 m-auto rounded-md">
              <span
                onClick={() => navigate("/profile")}
                className="flex text-center items-center cursor-pointer"
              >
                {/* <UserCircleIcon src={user?.photoURL} className="h-10 w-10 rounded-full  font-light text-gray-500" /> */}
                  <span className="bg-c w-10 font-mono p-1 uppercase text-xl text-white h-10 border-2 border-gray-900 rounded-full">
                    {user?.email[0] }
                  </span>
                <h3 className="ml-3 text-gray-700 font-serif text-xl">
                  {user?.displayName}
                </h3>
              </span>
              <span className="flex md:flex sm:hidden">
                <li
                  className={
                    getLocation[1] === ""
                      ? "list-none text-blue-300"
                      : "list-none"
                  }
                >
                  <Link
                    className="flex items-center mx-2 px-3 py-2 text-gray-900 border  hover:bg-gray-100 rounded-lg"
                    to="/"
                  >
                    <BookOpenIcon className="text-sm w-6 mr-2" />
                    <p className="text-lg">My Feeds</p>
                  </Link>
                </li>

                <Link
                  className=" flex items-center mx-2 px-3 py-2 text-gray-900 border text-xl hover:bg-gray-100 rounded-lg"
                  to="/recent"
                >
                  <ClockIcon className="text-sm w-6 mr-2" />
                  <p className="text-lg">Recent</p>
                </Link>
                <Link
                  className="flex items-center mx-2 px-3 text-gray-900 border hover:bg-gray-100 rounded-lg"
                  to="/classified"
                >
                  <p className="text-lg">Classified</p>
                </Link>
                <Link
                  className="flex items-center mx-2 px-3 py-2 text-gray-900 border text-xl hover:bg-gray-100 rounded-lg"
                  to="/bookmarks"
                >
                  <BookmarkIcon className="w-6 text-sm  mr-2 " />

                  <p className="text-lg">Bookmarks</p>
                </Link>

              </span>
              <span>
                <Link
                  className="flex items-center px-3 py-2 text-gray-900 border text-xl hover:bg-gray-100 rounded-lg"
                  to="/new"
                >
                  <p>Start Writing</p>
                </Link>
              </span>
            </nav>
          </section>

          <section className="flex justify-between h-full mt-5">
            <div className=" lg:w-3/5 sm:w-full">
              {posts.map( 
                ({
                  id,
                  data: { backgroundImage,profilePic, blogHeader, blogBody, timestamp, description,displayName,skills, likeCount },
                }) => (
                  <Feed
                    key={id}
                    id={id}
                    backgroundImage={backgroundImage}
                    profilePic={profilePic}
                    blogHeader={blogHeader}
                    blogBody={blogBody}
                    timestamp={timestamp}
                    displayName={displayName}
                    skills={skills}
                    description={description}
                    likeCount={likeCount}
                  />
                )
              )}
            </div>

            <div className=" w-72 h-72">
              <div className="border-2 flex-wrap bg-white p-4">
                <p onClick={() => navigate('/our-story') } className="text-sm cursor-pointer hover:text-purple-800 mb-1">Our Story</p>
                <p onClick={() => navigate('/contact-us') } className="text-sm cursor-pointer hover:text-purple-800 mb-1">Contact Us</p>
                <p onClick={() => navigate('/profile') } className="text-sm cursor-pointer hover:text-purple-800 mb-1">Your Account</p>
                <p onClick={() => navigate('FAQs') } className="text-sm cursor-pointer hover:text-purple-800 mb-1">FAQs</p>
                <p onClick={() => navigate('/sponser-us') } className="text-sm cursor-pointer hover:text-purple-800 mb-1">Sponser Us</p>
                <p onClick={() => navigate('/how-to') } className="text-sm cursor-pointer hover:text-purple-800 mb-1">How to Blog Here</p>
                <p onClick={() => navigate('/privacy-policy') } className="text-sm cursor-pointer hover:text-purple-800 mb-1">Privacy Policy</p>
                <p onClick={() => navigate('/code-of-conduct') } className="text-sm cursor-pointer hover:text-purple-800">Code of Conduct</p>
              </div>
              <button onClick={() => navigate('/new')} className="bg-c text-white w-full p-1 mt-5 rounded-sm">Start Writting</button>
            </div>
          </section>
        </main>
      </section>
    </main>
  );
};

export default HomePage;
