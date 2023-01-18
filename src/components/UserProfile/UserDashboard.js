import { useEffect, useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout, selectUser } from "../../features/userSlice";
import { auth, db } from "../../utils/firebase";
import { Menu, Transition } from "@headlessui/react";
import { Helmet } from "react-helmet";
import {
  HeartIcon,
  ChatIcon,
  ShareIcon,
  DocumentDuplicateIcon,
  EyeIcon,
  DocumentAddIcon,
} from "@heroicons/react/outline";
import DashboardIcon from "@mui/icons-material/Dashboard";
import NotificationImportantIcon from "@mui/icons-material/NotificationImportant";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import SettingsIcon from "@mui/icons-material/Settings";
import EditIcon from "@mui/icons-material/Edit";
import PreviewIcon from "@mui/icons-material/Preview";
import LogoutIcon from "@mui/icons-material/Logout";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import ReactTimeago from "react-timeago";
import DeleteMyArticle from "./DeleteMyArticle";
import EditMyArticle from "./EditMyArticle";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const UserDashboard = ({ name_slug, open, setOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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

  const signOutOfApp = () => {
    dispatch(logout);
    auth.signOut();
    window.location.reload(false);

    if (user) {
      auth.signOut();
    }
    navigate("/");
  };

  return (
    <main className="pt-20 md:pt-28 mx-wd1 flex justify-between mx-auto">
      <Helmet>
        <title>Melbite | Dashboard</title>
      </Helmet>

      {/* <section className="flex"> */}
      {/* <section> */}
      <section className="hidden md:flex flex-col justify-between mx-h bg-white py-5 px-8 shadow-md">
        <section>
          <div
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 mb-6 cursor-pointer"
          >
            <DashboardIcon className="text-green-400" />
            <p className="text-md md:text-xl">Dashboard</p>
          </div>
          <div
            onClick={() => navigate("/notifications")}
            className="flex items-center gap-2 mb-6 cursor-pointer"
          >
            <NotificationImportantIcon className="text-yellow-400" />
            <p className="text-md md:text-xl">Notifications</p>
          </div>
          <div
            onClick={() => navigate("")}
            className="flex items-center gap-2 mb-6 cursor-pointer"
          >
            <SettingsIcon className="text-pink-500" />
            <p className="text-md md:text-xl">Settings</p>
          </div>
          <div
            onClick={() => navigate("")}
            className="flex items-center gap-2 mb-6 cursor-pointer"
          >
            <AnalyticsIcon className="text-blue-500" />
            <p className="text-md md:text-xl">Analytics</p>
          </div>
          <div className="flex gap-2 mb-3">
            <ManageAccountsIcon className="text-purple-600" />
            <div>
              <p className="text-md md:text-xl">Profile</p>
              <span
                onClick={() => navigate("/editprofile")}
                className="flex ml-2 mt-2 cursor-pointer"
              >
                <EditIcon className="w-6 h-2 mr-1 text-green-400" />
                <p className="">Edit</p>
              </span>
              <span
                onClick={() => navigate("/previewprofile")}
                className="flex ml-2 mt-2 cursor-pointer"
              >
                <PreviewIcon className="w-6 h-2 mr-1 text-yellow-600" />
                <p>View</p>
              </span>
            </div>
          </div>
        </section>
        <section>
          <div
            onClick={() => navigate("/contact-us")}
            className="flex items-between gap-2 cursor-pointer mb-4 font-semibold"
          >
            <ContactSupportIcon className="text-green-500" />
            <p>Support</p>
          </div>
          <div
            onClick={signOutOfApp}
            className="flex items-between gap-2 cursor-pointer mb-4 font-semibold"
          >
            <LogoutIcon className="text-purple-600" />
            <p className="">Log Out</p>
          </div>
        </section>
      </section>
      {/* </section> */}

      <section className="mk-0 md:ml-20 w-full">
        <section className="mb-3">
          <h3 className="text-lg font-serif md:text-3xl text-gray-600">
            Hello {user?.displayName},
          </h3>
          <p className="text-gray-500">Your recap articles at this time</p>
        </section>
        <section className="md:flex items-start justify-between">
          <article className="">
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
                {/* {userPosts && userPosts.map(())} */}
                {userPosts &&
                  userPosts?.map((userPost) => (
                    <section
                      // key={id}
                      className="w-full border-2 rounded-md bg-white  p-5 mb-2 hover:border-purple-800 duration-150 max-h-96"
                    >
                      <section className="flex justify-between items-center">
                        <div className="flex items-center ">
                          <span className="bg-yellow-300 w-10 font-mono p-1 pl-3 uppercase text-xl text-gray-800 h-10 border-2 border-yellow-300 rounded-full">
                            {user?.displayName[0]}
                          </span>
                          <span className="ml-2">
                            <h3 className="text-sm">{user.displayName}</h3>
                            <p className="text-sm text-gray-500">
                              Published{" "}
                              <ReactTimeago
                                date={new Date(
                                  userPost.timestamp?.toDate()
                                ).toUTCString()}
                              />
                            </p>
                          </span>
                        </div>
                        <div className="flex space-x-5 items-center h-8 justify-between">
                          <div className="w-10 mt-32 bg-transparent">
                            <EditMyArticle
                              id={userPost.id}
                              editBlogHeader={userPost.blogHeader}
                              editBlogBody={userPost.blogBody}
                              editBackgroundImage={userPost.backgroundImage}
                              editCurrentTask={userPost.currentTask}
                            />
                          </div>

                          <div>
                            {user && user.uid === userPost.uid && (
                              <DeleteMyArticle id={userPost.id} />
                            )}
                          </div>
                        </div>
                      </section>

                      <section className="mt-2">
                        <Link
                          to={`/${
                            `${name_slug}` || `${user?.displayName[0]}`
                          }/${userPost.id}`}
                        >
                          <h1 className="md:leading-9 text-lg md:text-3xl text-gray-900 hover:text-purple-900 cursor-pointer">
                            {userPost.blogHeader}{" "}
                          </h1>
                        </Link>
                      </section>

                      <section className="flex justify-between mt-4">
                        <span className="flex items-center w-2/5 justify-between text-gray-400">
                          <Link
                            to={`/${user?.name_slug}/${userPost.id}`}
                            className="flex items-center hover:bg-gray-200 p-2 rounded-md cursor-pointer"
                          >
                            <HeartIcon className="w-6 cursor-pointer " />
                            <p className="hidden sm:block ml-2 text-sm text-gray-600">
                              React
                            </p>
                          </Link>

                          <Link
                            to={`/${user?.name_slug}/${userPost.id}`}
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
                                    href={`https://twitter.com/intent/tweet?url=https://melbite.com/${name_slug}/${userPost.id}`}
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
                                    href={`https://www.facebook.com/sharer.php?u=https://melbite.com/${name_slug}/${userPost.id}`}
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
                                    href={`https://www.linkedin.com/sharing/share-offsite/?url=https://melbite.com/${name_slug}/${userPost.id}`}
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
                                    href={`https://www.reddit.com/submit?url=https://melbite.com/${name_slug}/${userPost.id}`}
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
                  ))}
              </>
            )}
          </article>
          <div className="hidden md:block rounded-md md:w-2/6 w-full ml-3">
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
                  {/* <p className="text-2xl text-gray-800 font-bold">8,069</p> */}
                  <p className="text-xs text-purple-700">
                    Oops! We are Working on it.
                  </p>
                </span>
              </div>
            </div>
          </div>
        </section>
      </section>
      {/* </section> */}
    </main>
  );
};

export default UserDashboard;
