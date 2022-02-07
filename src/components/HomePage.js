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

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  const getLocation = pathname.split("/");

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
      <section className="">
        <nav className="w-full  bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500">
          <div className=" pb-8 mt-14 mx-auto mx-wd p-10">
            <h1 className="lg:text-3xl w-1/2 mb-14 text-gray-700 prose md:text-lg font-serif">
              Hello world Evansify is a place to write, read, and connect
            </h1>
            <button className="bg-c p-3 transition-all text-white font-bold rounded-sm transform hover:scale-105 ">
              Sign Me Up
            </button>
          </div>
        </nav>

        <main className="mt-5 mx-auto mx-wd2 ">
          <section className="">
            <nav className="flex items-center justify-between bg-white p-2 border-2 m-auto rounded-md">
              <span
                onClick={() => navigate("/profile")}
                className="flex text-center items-center cursor-pointer"
              >
                <UserCircleIcon className="h-10 w-10 rounded-full  font-light text-gray-500" />
                <h3 className="ml-3 text-gray-700 font-serif text-xl">
                  Evans Mutuku
                </h3>
              </span>
              <span className="flex">
                <li
                  className={
                    getLocation[1] === ""
                      ? "list-none text-blue-300"
                      : "list-none"
                  }
                >
                  <Link
                    className="flex items-center mx-2 px-3 py-3 text-gray-900 border-2  hover:bg-gray-100 rounded-lg"
                    to="/"
                  >
                    <BookOpenIcon className="text-sm w-6 mr-2" />
                    <p className="text-lg">My Feeds</p>
                  </Link>
                </li>

                <Link
                  className=" flex items-center mx-2 px-3 py-2 text-gray-900 border-2 text-xl hover:bg-gray-100 rounded-lg"
                  to="/recent"
                >
                  <ClockIcon className="text-sm w-6 mr-2" />
                  <p className="text-lg">Recent</p>
                </Link>
                <Link
                  className="flex items-center mx-2 px-3 text-gray-900 border-2 hover:bg-gray-100 rounded-lg"
                  to="/classified"
                >
                  <p className="text-lg">Classified</p>
                </Link>
                <Link
                  className="flex items-center mx-2 px-3 py-2 text-gray-900 border-2 text-xl hover:bg-gray-100 rounded-lg"
                  to="/bookmarks"
                >
                  <BookmarkIcon className="w-6 text-sm  mr-2 " />

                  <p className="text-lg">Bookmarks</p>
                </Link>

              </span>
              <span>
                <Link
                  className="flex items-center px-3 py-2 text-gray-900 border-2 text-xl hover:bg-gray-100 rounded-lg"
                  to="/new"
                >
                  <p>Start Writing</p>
                </Link>
              </span>
            </nav>
          </section>

          <section className="flex justify-between h-full mt-5">
            <div className=" w-3/5">
              {posts.map( 
                ({
                  id,
                  data: { blogHeader, blogBody, timestamp, description },
                }) => (
                  <Feed
                    key={id}
                    id={id}
                    blogHeader={blogHeader}
                    blogBody={blogBody}
                    timestamp={timestamp}
                    description={description}
                  />
                )
              )}
            </div>

            <div className="border-2 bg-white w-1/4 p-4  object-contain  ">
              <p className="text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Perferendis eligendi labore repellat, consequatur quisquam culpa
                molestias ab repellendus illum in, delectus libero quod
                inventore! Possimus quam corporis ipsa dolore iusto!
              </p>
            </div>
          </section>
        </main>
      </section>
    </main>
  );
};

export default HomePage;
