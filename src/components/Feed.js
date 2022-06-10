import React, { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { HeartIcon, ChatIcon, ShareIcon } from "@heroicons/react/outline";
import ReactTimeago from "react-timeago";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Feed = ({
  children,
  id,
  timestamp,
  blogHeader,
  blogBody,
  backgroundImage,
  name_slug,
  displayName,
  ...customMeta
}) => {
  const meta = {
    title: blogHeader,
    description: blogBody,
    image: backgroundImage,
    type: "website",
    date: new Date(timestamp?.toDate()).toUTCString(),
    ...customMeta,
  };

  return (
    <main className="w-full border-2 rounded-md bg-white p-5 mb-2 hover:border-purple-800 duration-150">
      <Helmet>
        {/* <title>{meta.title}</title> */}
        <meta name="robots" content="follow, index" />
        <meta content={meta.description} name="description" />
        <meta property="og:url" content={`https://melbite.com${Link.asPath}`} />
        <link rel="canonical" href={`https://melbite.com${Link.asPath}`} />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content="Paul Knulst" />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="melbite.com" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />
        {meta.date && (
          <meta property="article:published_time" content={meta.date} />
        )}
      </Helmet>

      <section className="flex items-center ">
        <span className="bg-yellow-300 w-10 font-mono p-1 pl-3 uppercase text-xl text-gray-800 h-10 border-2 border-yellow-300 rounded-full">
          {displayName?.[0]}
        </span>
        <span className="ml-2">
          <h3 className="text-sm">{displayName}</h3>
          <p className="text-sm text-gray-500">
            Published{" "}
            <ReactTimeago date={new Date(timestamp?.toDate()).toUTCString()} />
          </p>
        </span>
      </section>

      <section className="mt-2">
        <Link to={`/${name_slug}/${id}`}>
          <h1 className="leading-9 text-3xl text-gray-900 hover:text-purple-900 cursor-pointer">
            {blogHeader}{" "}
          </h1>
        </Link>
      </section>

      <section className="flex justify-between mt-4">
        <span className="flex items-center w-2/5 justify-between text-gray-400">
          <Link
            to={`/${name_slug}/${id}`}
            className="flex items-center hover:bg-gray-200 p-2 rounded-md cursor-pointer"
          >
            <HeartIcon className="w-6 cursor-pointer " />
            <p className="hidden sm:block ml-2 text-sm text-gray-600">React</p>
          </Link>

          <Link
            to={`/${name_slug}/${id}`}
            className="flex items-center hover:bg-gray-200 p-2 rounded-md cursor-pointer"
          >
            <ChatIcon className="w-6 cursor-pointer text-gray-500 " />
            <p className="hidden sm:block ml-2 text-sm text-gray-600">
              Comment
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
                    href={`https://twitter.com/intent/tweet?url=https://melbite.com/${name_slug}/${id}`}
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
                    href={`https://www.facebook.com/sharer.php?u=https://melbite.com/${name_slug}/${id}`}
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
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=https://melbite.com/${name_slug}/${id}`}
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
                    href={`https://www.reddit.com/submit?url=https://melbite.com/${name_slug}/${id}`}
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
    </main>
  );
};

export default Feed;
