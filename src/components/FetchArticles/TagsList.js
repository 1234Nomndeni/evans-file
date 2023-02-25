import { useEffect, useState, Fragment } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../../utils/firebase";
import ArticleIcon from "@mui/icons-material/Article";
import GroupsIcon from "@mui/icons-material/Groups";
import AddIcon from "@mui/icons-material/Add";
import { Menu, Transition } from "@headlessui/react";
import { HeartIcon, ChatIcon, ShareIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";
import ReactTimeago from "react-timeago";
import FetchMostRead from "../FilterCategory/FetchMostRead";
import DoneIcon from "@mui/icons-material/Done";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const TagsList = () => {
  const [posts, setPosts] = useState([]);
  const [tagArticlesCount, setTagArticlesCount] = useState(0);
  const { tag } = useParams();
  const user = useSelector(selectUser);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followers, setFollowers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = db
      .collection("posts")
      .where("hashTags", "array-contains", tag)
      .onSnapshot((querySnapshot) => {
        const newPosts = [];
        querySnapshot.forEach((doc) => {
          newPosts.push({ id: doc.id, ...doc.data() });
        });
        setPosts(newPosts);
      });
    return unsubscribe;
  }, [tag]);

  const fetchTagCount = async () => {
    await db
      .collection("posts")
      .where("hashTags", "array-contains", tag)
      .onSnapshot((snapshot) => setTagArticlesCount(snapshot.size));
  };

  useEffect(() => {
    const tagRef = db.collection("tagsFollowers").doc(tag);

    // Get the current list of followers for this tag
    const unsubscribe = tagRef.onSnapshot((doc) => {
      if (doc.exists) {
        setFollowers(doc.data().followers || []);
        setIsFollowing(doc.data().followers?.includes(user?.uid));
      }
    });

    return unsubscribe;
  }, [tag]);

  const handleFollow = () => {
    if (!user) {
      toast("Please Login To follow This tag");
    } else {
      const tagRef = db.collection("tagsFollowers").doc(tag);

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

  useEffect(() => {
    fetchTagCount();
  }, []);

  return (
    <main className="max-w-7xl mt-3 mx-auto mx-wd1 pt-20">
      <section className="rounded-md bg-white border shadow-sm py-5 px-3 items-center text-center">
        <h1 className="text-purple-800 text-2xl md:text-4xl">#{tag}</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil
          doloremque provident iste?
        </p>

        <div className="flex gap-5 justify-center flex-wrap-reverse">
          <button
            onClick={handleFollow}
            className="flex items-center mt-5 border border-purple-600 text-white px-5 hover:ease-in-out duration-150 md:py-1 rounded-full transform hover:scale-105 bg-purple-800"
          >
            {isFollowing ? (
              <>
                <DoneIcon className="mr-1 h-1 w-4" /> Following
              </>
            ) : (
              <>
                <AddIcon /> Follow
              </>
            )}
          </button>
          <button
            onClick={() => navigate("/new")}
            className="mt-5 border border-purple-600 text-purple-800 px-5 hover:ease-in-out duration-150 md:py-1 rounded-full transform hover:scale-105 "
          >
            Start Writing
          </button>
        </div>
        <div className="flex gap-8 justify-center mt-5 flex-wrap">
          <span className="flex gap-1 font-semibold text-gray-600">
            <GroupsIcon />
            <p>{followers.length}</p>
            <p>Followers</p>
          </span>
          <span className="flex gap-1 font-semibold text-gray-600">
            <ArticleIcon />
            <p>{tagArticlesCount}</p>
            <p>Articles</p>
          </span>
        </div>
      </section>

      <section className="flex gap-5 mt-10">
        <article className="w-full">
          {posts.map((post) => (
            <article
              className="w-full border-2 rounded-md bg-white p-5 mb-2 hover:border-purple-800 duration-150"
              key={post.id}
            >
              <section className="flex items-center ">
                <span className="bg-yellow-300 w-10 font-mono p-1 pl-3 uppercase text-xl text-gray-800 h-10 border-2 border-yellow-300 rounded-full">
                  {post.displayName?.[0]}
                </span>
                <span className="ml-2">
                  <h3 className="text-sm">{post.displayName}</h3>
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
                      {posts.commentCount}
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
        <article className="hidden md:block pl-4 w-2/4 ">
          <FetchMostRead />
        </article>
      </section>
    </main>
  );
};

export default TagsList;
