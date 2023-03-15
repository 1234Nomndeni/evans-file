import React, { useEffect, useState, Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { db } from "../../utils/firebase";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import AddIcon from "@mui/icons-material/Add";
import DoneIcon from "@mui/icons-material/Done";
import LanguageIcon from "@mui/icons-material/Language";
import EditLocationIcon from "@mui/icons-material/EditLocation";
import { HeartIcon, ChatIcon, ShareIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";
import ReactTimeago from "react-timeago";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const CommunityProfile = () => {
  const { communityName } = useParams();
  const user = useSelector(selectUser);
  const [communityProfile, setCommunityProfile] = useState(null);
  const [communityPosts, setCommunityPosts] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followers, setFollowers] = useState([]);

  const fetchCommunityProfile = async () => {
    const snapshot = await db
      .collection("communities")
      .where("communityName", "==", communityName)
      .get();
    const userData = snapshot.docs.map((doc) => doc.data())[0];
    setCommunityProfile(userData);
  };

  const fetchCommunityPosts = async () => {
    db.collection("posts")
      .where("communityName", "==", communityName)

      .onSnapshot((querySnapshot) => {
        const postData = [];
        querySnapshot.forEach((doc) => {
          postData.push({ id: doc.id, ...doc.data() });
        });
        setCommunityPosts(postData);
      });
  };

  useEffect(() => {
    fetchCommunityPosts();
    fetchCommunityProfile();
  }, [communityName]);

  useEffect(() => {
    const userRef = db.collection("communityFollowers").doc(communityName);

    // Get the current list of followers for this displayName
    const unsubscribe = userRef.onSnapshot((doc) => {
      if (doc.exists) {
        setFollowers(doc.data().followers || []);
        setIsFollowing(doc.data().followers?.includes(user?.uid));
      }
    });

    return unsubscribe;
  }, [communityName]);

  const handleFollowWriter = () => {
    if (!user) {
      toast("Please Login To follow This Writer");
    } else {
      const tagRef = db.collection("communityFollowers").doc(communityName);

      if (isFollowing) {
        const updatedFollowers = followers.filter(
          (follower) => follower !== user?.uid
        );
        tagRef.set({ followers: updatedFollowers }, { merge: true });
        setIsFollowing(false);
      } else {
        const updatedFollowers = [...followers, user?.uid];
        tagRef.set({ followers: updatedFollowers }, { merge: true });
        setIsFollowing(true);
      }
    }
  };
  return (
    <main className="pt-16">
      <section className="bg-white md:mt-8 mx-auto max-w-7xl p-4 shadow-md">
        {communityProfile ? (
          <>
            <section className="flex justify-between w-full flex-wrap">
              <div className="flex gap-5 flex-wrap mb-2">
                <div className="">
                  {communityProfile.communityProfileImage ? (
                    <img
                      className="w-32 h-32 rounded-full"
                      src={communityProfile.communityProfileImage}
                      alt=""
                    />
                  ) : (
                    <h1 className="bg-yellow-300 font-mono py-10 px-12 uppercase font-bold text-2xl text-gray-800  border-2 border-yellow-300 rounded-full">
                      {communityProfile.communityName?.[0]}
                    </h1>
                  )}
                </div>
                <div>
                  <h2 className="text-xl">{communityProfile.communityName}</h2>
                  <span className="flex gap-2 mb-1">
                    <EditLocationIcon className="text-gray-500" />
                    <p>World Wide</p>
                  </span>

                  {!communityProfile.communityWebsite ? (
                    <></>
                  ) : (
                    <span className="flex gap-2">
                      <LanguageIcon className="text-gray-500" />
                      <a
                        className="text-purple-900"
                        href={communityProfile.communityWebsite}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {communityProfile.communityWebsite}
                      </a>
                    </span>
                  )}
                </div>
              </div>
              <div className="">
                <button
                  onClick={handleFollowWriter}
                  className="border-2 border-purple-600 w-full  rounded-lg"
                >
                  {isFollowing ? (
                    <div className=" p-2 px-3 text-white bg-purple-800 ">
                      <DoneIcon className="mr-1 h-1 w-4" />
                      Following
                    </div>
                  ) : (
                    <div className=" p-2 px-5 flex justify-center text-purple-800">
                      <AddIcon />
                      <p className="ml-1">Follow</p>
                    </div>
                  )}
                </button>
                <p>
                  <p className="mt-3 md:text-center text-gray-600">
                    {followers.length} Followers
                  </p>
                </p>
              </div>
            </section>
            <section className="ml-3 mt-3">
              <h2 className="text-2xl">About Community</h2>
              {!communityProfile.communityBio ? (
                <p>Bio Not Found!</p>
              ) : (
                <p className="leading-7">{communityProfile.communityBio}</p>
              )}
            </section>
          </>
        ) : (
          <p>404 Bio not found</p>
        )}
      </section>
      <h1 className="mx-auto max-w-7xl mt-7 pl-3 text-gray-900 text-2xl">
        Recent Activity ( {communityPosts.length} ) posts
      </h1>
      <section className="mx-auto max-w-7xl mt-3 p-1 flex gap-6">
        <article className="w-full">
          {communityPosts &&
            communityPosts.map((post) => (
              <article
                className="w-full border-2 rounded-md bg-white p-5 mb-2 hover:border-purple-800 duration-150"
                key={post.id}
              >
                <section className="flex items-center ">
                  <span className="bg-yellow-300 w-10 font-mono p-1 pl-3 uppercase text-xl text-gray-800 h-10 border-2 border-yellow-300 rounded-full">
                    <Link
                      to={`/users/${post.name_slug}`}
                      title="View this user profile"
                    >
                      {post.displayName?.[0]}
                    </Link>
                  </span>
                  <span className="ml-2">
                    <div className="flex gap-1 item-center text-sm">
                      <Link
                        to={`/users/${post.name_slug}`}
                        title="View this user profile"
                      >
                        <h3 className="text-sm">{post.displayName}</h3>
                      </Link>
                      <p>
                        {post.communityName ? (
                          <>
                            {post.displayName ? (
                              <div className="flex gap-1">
                                <p>for </p>{" "}
                                <Link to={`/community/${post.communityName}`}>
                                  <h3>{post.communityName}</h3>
                                </Link>
                              </div>
                            ) : (
                              ""
                            )}
                          </>
                        ) : (
                          <></>
                        )}
                      </p>
                    </div>
                    <p className="text-sm text-gray-500 -mt-1">
                      Published{" "}
                      <ReactTimeago
                        date={new Date(post.timestamp?.toDate()).toUTCString()}
                      />
                    </p>
                  </span>
                </section>

                <section className="mt-2">
                  <Link to={`/${post.name_slug}/${post.id}`}>
                    <h1 className="md:leading-9 text-lg md:text-2xl text-gray-900 hover:text-purple-900 cursor-pointer">
                      {post.blogHeader}{" "}
                    </h1>
                  </Link>
                </section>
                <section className="flex gap-1 text-xs md:text-sm md:flex md:gap-3 mt-4 flex-wrap w-full">
                  {post.hashTags?.map((tag) => (
                    <Link
                      key={tag}
                      to={`/tags/${tag}`}
                      className="rounded-md max-w-min bg-green-50 hover:bg-green-100 py-1 px-2 border cursor-pointer"
                    >
                      #{tag}
                    </Link>
                  ))}
                </section>
                <section className="flex justify-between">
                  <span className="flex items-center w-2/5 gap-3 justify-between text-gray-400">
                    <Link
                      to={`/${post.name_slug}/${post.id}`}
                      className="flex items-center space-x-1 hover:bg-gray-200 p-2 rounded-md cursor-pointer"
                    >
                      <HeartIcon className="w-6 cursor-pointer " />
                      <p className="text-sm text-gray-600">
                        {post.likes?.length}
                      </p>
                      <p className="text-sm text-gray-600">Likes</p>
                    </Link>

                    <Link
                      to={`/${post.name_slug}/${post.id}`}
                      className="flex items-center hover:bg-gray-200 p-2 rounded-md cursor-pointer"
                    >
                      <ChatIcon className="w-6 cursor-pointer text-gray-500 " />
                      <p className="hidden sm:block ml-2 text-sm text-gray-600">
                        Comment
                        {/* {posts.commentCount} */}
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
                              href={`https://twitter.com/intent/tweet?url=https://melbite.com/${post.name_slug}/${post.id}`}
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
                              href={`https://www.facebook.com/sharer.php?u=https://melbite.com/${post.name_slug}/${post.id}`}
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
                              href={`https://www.linkedin.com/sharing/share-offsite/?url=https://melbite.com/${post.name_slug}/${post.id}`}
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
                              href={`https://www.reddit.com/submit?url=https://melbite.com/${post.name_slug}/${post.id}`}
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
              </article>
            ))}
        </article>
        <section className=" hidden md:block w-2/6">
          <div>
            <h2 className="text-xl">Community Members</h2> <br />
            <p className="-mt-3 text-bold">
              {communityProfile.communityMembers.length} Members
            </p>
          </div>
        </section>
      </section>
    </main>
  );
};

export default CommunityProfile;
