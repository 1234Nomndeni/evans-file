import { useEffect, useState, Fragment } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { selectUser } from "../../features/userSlice";
import { db } from "../../utils/firebase";
import { Menu, Transition } from "@headlessui/react";
import {
  HeartIcon,
  ChatIcon,
  ShareIcon,
  DocumentDuplicateIcon,
  EyeIcon,
  DocumentAddIcon,
} from "@heroicons/react/outline";
import ReactTimeago from "react-timeago";
// import EditMyArticle from "./EditMyArticle";
import DeleteMyArticle from "./DeleteMyArticle";
import EditMyArticle from "./EditMyArticle";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const UserDashboard = ({ name_slug }) => {
  const navigate = useNavigate();
  const [userPosts, setUserPosts] = useState([]);
  const user = useSelector(selectUser);
  const [articlesCount, setArticlesCount] = useState(0);

  const fetchData = async () => {
    try {
      await db
        .collection(`posts`)
        .where("uid", "==", user?.uid)
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setUserPosts(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          )
        );
    } catch (error) {
      console.log(error);
    }
  };
  const fetchArticleCount = async () => {
    await db
      .collection("posts")
      .where("uid", "==", user?.uid)
      .onSnapshot((snapshot) => setArticlesCount(snapshot.size));
  };

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    fetchArticleCount();
  }, []);

  return (
    <main className="min-h-screen mt-20 md:mt-24 mx-wd1 mx-auto p-0 md:p-5 ">
      <section className="flex flex-wrap items-center justify-between mb-5">
        <section className="">
          <h3 className="text-lg font-serif md:text-3xl text-gray-600">
            Hello {user?.displayName},
          </h3>
          <p className="text-gray-500">Your recap articles at this time</p>
        </section>
        <TopDash />
      </section>
      <section className="md:flex items-start justify-between space-x-10">
        <article className="md:w-4/6">
          {userPosts.length === 0 ? (
            <section className="text-center flex items-center justify-center flex-col ml-12 md:ml-28">
              <h1 className="text-gray-400 mt-16 mb-16">
                You've not posted yet!
              </h1>
              <button
                onClick={() => navigate("/new")}
                className="bg-c p-3 pl-6 pr-6 text-white rounded-md hover:bg-purple-900 "
              >
                Create Your First Post
              </button>
            </section>
          ) : (
            <>
              {userPosts?.map(
                ({ id, blogHeader, displayName, timestamp, uid }) => (
                  <section
                    key={id}
                    className="w-full border-2 rounded-md bg-white p-5 mb-2 hover:border-purple-800 duration-150"
                  >
                    <section className="flex justify-between items-center ">
                      <div className="flex items-center ">
                        <span className="bg-yellow-300 w-10 font-mono p-1 pl-3 uppercase text-xl text-gray-800 h-10 border-2 border-yellow-300 rounded-full">
                          {displayName?.[0]}
                        </span>
                        <span className="ml-2">
                          <h3 className="text-sm">{displayName}</h3>
                          <p className="text-sm text-gray-500">
                            Published{" "}
                            <ReactTimeago
                              date={new Date(timestamp?.toDate()).toUTCString()}
                            />
                          </p>
                        </span>
                      </div>
                      <div className="flex space-x-5 items-center">
                        {user && user.uid === uid && <EditMyArticle id={id} />}
                        {user && user.uid === uid && (
                          <DeleteMyArticle id={id} />
                        )}
                      </div>
                    </section>

                    <section className="mt-2">
                      <Link to={`/${name_slug}/${id}`}>
                        <h1 className="md:leading-9 text-lg md:text-3xl text-gray-900 hover:text-purple-900 cursor-pointer">
                          {blogHeader}{" "}
                        </h1>
                      </Link>
                    </section>

                    <section className="flex justify-between mt-4">
                      <span className="flex items-center w-2/5 justify-between text-gray-400">
                        <Link
                          to={`/${user?.name_slug}/${id}`}
                          className="flex items-center hover:bg-gray-200 p-2 rounded-md cursor-pointer"
                        >
                          <HeartIcon className="w-6 cursor-pointer " />
                          <p className="hidden sm:block ml-2 text-sm text-gray-600">
                            React
                          </p>
                        </Link>

                        <Link
                          to={`/${user?.name_slug}/${id}`}
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
                  </section>
                )
              )}
            </>
          )}
        </article>
        <div className="rounded-md md:w-2/6 w-full">
          <div className="">
            <div className="bg-white rounded-md flex space-x-5 p-3 shadow-lg mb-3">
              <DocumentAddIcon className="text-blue-600 p-2 rounded-full bg-green-200 w-12 h-12" />
              <span className="ml-3">
                <p className="text-sm text-gray-700">Total Articles</p>
                <p className="text-2xl text-gray-800 font-bold">
                  {articlesCount}
                </p>
              </span>
            </div>
            <div className="bg-white rounded-md flex space-x-5 p-3 shadow-lg mb-3">
              <DocumentDuplicateIcon className="text-blue-600 p-2 rounded-full bg-green-200 w-12 h-12" />
              <span className="ml-3">
                <p className="text-sm text-gray-700">Total Drafts</p>
                <p className="text-2xl text-gray-800 font-bold">0</p>
              </span>
            </div>
            <div className="bg-white rounded-md flex space-x-5 p-3 shadow-lg mb-3">
              <EyeIcon className="text-blue-600 p-2 rounded-full bg-green-200 w-12 h-12" />
              <span className="ml-3">
                <p className="text-sm text-gray-700">Total Articles Views</p>
                {/* <p className="text-2xl text-gray-800 font-bold">269</p> */}
                <p className="text-xs text-purple-700">
                  Oops! We are Working on it.
                </p>
              </span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default UserDashboard;

const TopDash = () => {
  const navigate = useNavigate();
  return (
    <section className="flex items-center justify-between flex-wrap space-y-2 md:space-y-0 md:space-x-14">
      <div
        onClick={() => navigate("/my-drafts")}
        className="py-2 md:py-4 shadow-lg bg-white hover:border-yellow-600 border hover:text-yellow-600 rounded-md px-10 md:px-14 cursor-pointer"
      >
        Edit Drafts
      </div>
      <div
        onClick={() => navigate("/profile")}
        className="py-2 md:py-4  shadow-lg bg-white hover:border-green-600 border hover:text-green-600 rounded-md px-10 md:px-14 cursor-pointer"
      >
        Update Profile
      </div>
      <div
        onClick={() => navigate("/new")}
        className="py-2 md:py-4  shadow-lg bg-white hover:border-purple-800 border hover:text-purple-800 rounded-md px-10 md:px-14 cursor-pointer"
      >
        Start Writing
      </div>
    </section>
  );
};
