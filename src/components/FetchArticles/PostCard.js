import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { db } from "../../utils/firebase";
import ReactTimeago from "react-timeago";
import loader from "../images/dark-loader.gif";
import { Menu, Transition } from "@headlessui/react";
import { HeartIcon, ChatIcon, ShareIcon } from "@heroicons/react/outline";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const PostCard = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => doc.data());
        setArticles(data);
      })
      .catch((error) => {
        console.error("Error fetching articles: ", error);
      });
  }, []);

  return (
    <main className="w-full border-2 rounded-md bg-white p-5 mb-2 hover:border-purple-800 duration-150">
      {!articles || articles.length === 0 ? (
        <div className="flex flex-col items-center justify-center w-full mx-auto">
          <img className="w-16" src={loader} alt="Loading articles . . ." />
          <p className="mt-2 text-sm">Loading articles. . .</p>
        </div>
      ) : (
        articles.map((article, index) => (
          <section key={index}>
            <section className="flex items-center ">
              <span className="bg-yellow-300 w-10 font-mono p-1 pl-3 uppercase text-xl text-gray-800 h-10 border-2 border-yellow-300 rounded-full">
                {article.displayName?.[0]}
              </span>
              <span className="ml-2">
                <h3 className="text-sm">{article.displayName}</h3>
                <p className="text-sm text-gray-500">
                  Published{" "}
                  <ReactTimeago
                    date={new Date(article.timestamp?.toDate()).toUTCString()}
                  />
                </p>
              </span>
            </section>

            <section className="mt-2">
              <Link to={`/${article.name_slug}/${article.id}`}>
                <h1 className="leading-9 text-3xl text-gray-900 hover:text-purple-900 cursor-pointer">
                  {article.blogHeader}{" "}
                </h1>
              </Link>
            </section>

            <section className="flex justify-between mt-4">
              <span className="flex items-center w-2/5 gap-3 justify-between text-gray-400">
                <Link
                  to={`/${article.name_slug}/${article.id}`}
                  className="flex items-center space-x-1 hover:bg-gray-200 p-2 rounded-md cursor-pointer"
                >
                  <HeartIcon className="w-6 cursor-pointer " />
                  <p className="text-sm text-gray-600">
                    {article.likes?.length}
                  </p>
                  <p className="text-sm text-gray-600">Likes</p>
                </Link>

                <Link
                  to={`/${article.name_slug}/${article.id}`}
                  className="flex items-center hover:bg-gray-200 p-2 rounded-md cursor-pointer"
                >
                  <ChatIcon className="w-6 cursor-pointer text-gray-500 " />
                  <p className="hidden sm:block ml-2 text-sm text-gray-600">
                    Comment
                    {article.commentCount}
                  </p>
                </Link>
              </span>
              <Menu as="div" className="ml-3 relative">
                <div>
                  <Menu.Button className="flex items-center hover:bg-gray-200 p-2 rounded-md cursor-pointer">
                    <ShareIcon className="h-7 cursor-pointer rounded-full p-1 text-gray-500 " />
                    <p className="hidden sm:block ml-2 text-sm text-gray-600">
                      Share
                    </p>
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href={`https://twitter.com/intent/tweet?url=https://melbite.com/${article.name_slug}/${article.id}`}
                          target="_blank"
                          rel="noreferrer"
                          className={classNames(
                            active ? "bg-white" : "",
                            "block px-4 py-2 text-sm text-gray-700 hover:text-purple-900"
                          )}
                        >
                          Share on Twitter
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href={`https://www.facebook.com/sharer.php?u=https://melbite.com/${article.name_slug}/${article.id}`}
                          target="_blank"
                          rel="noreferrer"
                          className={classNames(
                            active ? "bg-white" : "",
                            "block px-4 py-2 text-sm text-gray-700 hover:text-purple-900"
                          )}
                        >
                          Share on Facebook
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href={`https://www.linkedin.com/sharing/share-offsite/?url=https://melbite.com/${article.name_slug}/${article.id}`}
                          target="_blank"
                          rel="noreferrer"
                          className={classNames(
                            active ? "bg-white" : "",
                            "block px-4 py-2 text-sm text-gray-700 hover:text-purple-900"
                          )}
                        >
                          Share on LinkedIn
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href={`https://www.reddit.com/submit?url=https://melbite.com/${article.name_slug}/${article.id}`}
                          target="_blank"
                          rel="noreferrer"
                          className={classNames(
                            active ? "bg-white" : "",
                            "block px-4 py-2 text-sm text-gray-700 hover:text-purple-900"
                          )}
                        >
                          Share on Reddit
                        </a>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </section>
          </section>
        ))
      )}
    </main>
  );
};

export default PostCard;

{
  /* <li key={index}>
          <Link to={`/articles/${article.slug_name}`}>
            <h3>{article.blogHeader}</h3>
          </Link>
          <h3>{article.title}</h3>
          <p>{article.blogBody}</p>
          <p>Slug: {article.slug_name}</p>
        </li> */
}
