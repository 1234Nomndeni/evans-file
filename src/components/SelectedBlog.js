import { Fragment, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Menu, Transition } from "@headlessui/react";
import Avatar from "@mui/material/Avatar";
import { ChatIcon, ShareIcon, HeartIcon } from "@heroicons/react/outline";
import ReplyIcon from "@mui/icons-material/Reply";
// import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { db } from "../utils/firebase";
import ReactTimeago from "react-timeago";
import { selectUser } from "../features/userSlice";
import { useNavigate, useParams } from "react-router-dom";
import firebase from "firebase/compat/app";
import { useSelector } from "react-redux";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ReplyComment from "./ReplyComment";
import LikePost from "./LikePost";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MoreFromUser from "./FilterCategory/MoreFromUser";
import contentLoading from "./images/content-loading.gif";
// import MoreFromUser from "./SuperActions/MoreFromUser";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const SelectedBlog = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const { blogId, displayName } = useParams();
  const [blogHeader, setBlogHeader] = useState("");
  const [blogBody, setBlogBody] = useState("");
  const [backgroundImage, setBackgroundImage] = useState("");
  const [currentTask, setCurrentTask] = useState("");
  const [timestamp, setTimestamp] = useState("");
  const [slug_name, setSlugName] = useState("");
  const [uid, setUid] = useState("");
  const [name_slug, setNameSlug] = useState("");
  const [likes, setLikes] = useState("");
  const [addComment, setAddComment] = useState("");
  const [comments, setComments] = useState([]);
  const [subComments, setSubComments] = useState([]);
  const [commentCount, setCommentCount] = useState(0);
  const [subcommentCount, setSubCommentCount] = useState(0);
  const [isCopied, setIsCopied] = useState(false);
  const [showReply, setShowReply] = useState(false);
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    if (blogId) {
      db.collection("posts")
        .doc(blogId)
        .onSnapshot(
          (snapshot) => (
            setBlogHeader(snapshot.data().blogHeader),
            setBackgroundImage(snapshot.data().backgroundImage),
            setBlogBody(snapshot.data().blogBody),
            setCurrentTask(snapshot.data().currentTask),
            setTimestamp(snapshot.data().timestamp),
            setSlugName(snapshot.data().slug_name),
            setNameSlug(snapshot.data().name_slug),
            setLikes(snapshot.data().likes),
            setUid(snapshot.data().uid)
          )
        );
      fetchComments();

      // return;
    }
  }, []);

  function fetchComments() {
    db.collection("posts")
      .doc(blogId)
      .collection("comments")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setComments(
          snapshot.docs.map((doc) => {
            getSubComments(blogId, doc.id);
            return {
              id: doc.id,
              ...doc.data(),
            };
          })
        );
      });
  }

  /********************************************/
  /*** Add A Single Posts Comments ***/
  /********************************************/
  const preventCommentIfUserDoesNotExist = () => {
    if (!user) {
      navigate("/signIn");
    }
  };

  const postComment = (e) => {
    e.preventDefault();

    db.collection("posts").doc(blogId).collection("comments").add({
      message: addComment,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      commentLikes: [],
    });

    setAddComment("");
  };

  /********************************************/
  /*** Fetch Comment Count ***/
  /********************************************/
  const fetchCommentsCount = async () => {
    await db
      .collection("posts")
      .doc(blogId)
      .collection("comments")
      .onSnapshot((snapshot) => setCommentCount(snapshot.size));
  };

  const fetchSubCommentsCount = async (commentId) => {
    await db
      .collection("posts")
      .doc(blogId)
      .collection("comments")
      .doc(commentId)
      .collection("commentReaction")
      .onSnapshot((snapshot) => setSubCommentCount(snapshot.size));
  };
  /********************************************/
  /*** Comment An Existing Comment ***/
  /********************************************/
  const reactToExistingComment = (id, comment) => {
    db.collection("posts")
      .doc(blogId)
      .collection("comments")
      .doc(id)
      .collection("commentReaction")
      .add({
        commentReaction: comment,
        name: user.displayName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
  };

  const replyCommentCallback = (type, id, comment) => {
    switch (type) {
      case "close":
        setShowReply((prev) => !prev);
        break;

      case "reply":
        reactToExistingComment(id, comment);
        setShowReply((prev) => !prev);

        break;

      default:
        break;
    }
  };

  // Get the subcomment Data below
  const getSubComments = (postId, commentId) => {
    db.collection("posts")
      .doc(postId)
      .collection("comments")
      .doc(commentId)
      .collection("commentReaction")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        snapshot.docs.map((doc) =>
          setSubComments((prev) => [
            ...prev,
            {
              commentId,
              id: doc.id,
              ...doc.data(),
            },
          ])
        );
      });
  };

  // Get more posts/articles from a user's profile
  useEffect(() => {
    db.collection("posts")
      .where("displayName", "==", displayName)
      .orderBy("timestamp", "desc")
      .limit(6)
      .onSnapshot((snapshot) =>
        setUserPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  }, []);

  // Return/Render the commnets below
  useEffect(() => {
    fetchCommentsCount();
  }, []);
  useEffect(() => {
    fetchSubCommentsCount();
  }, []);

  const onArticleCopyLink = () => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  const loginToLike = () => {
    if (!user) {
      toast("Please Login To Like This Article");
    }
  };

  // SEO hack
  const meta = {
    title: blogHeader,
    description: blogBody,
    slugName: slug_name,
    image: backgroundImage,
    type: "website",
  };

  return (
    <main
      // onLoad={window.scroll(0, 0)}
      className="max-w-7xl pt-24 mx-wd1 mx-auto flex justify-between pb-24 wd-screen3"
    >
      <Helmet>
        <title>{`${blogHeader}`}</title>
        <meta name="description" content={meta.title} />
        <meta name="description" description={meta.description} />
        <meta name="keywords" content={meta.title} />
      </Helmet>
      <section className="hidden w-28 mt-4 md:fixed lg:block flex-col md:block">
        <span className="flex flex-col items-center mt-10">
          {!user ? (
            <HeartIcon
              onClick={loginToLike}
              className="h-8 cursor-pointer hover:bg-pink-100 duration-150 rounded-full p-1 hover:text-pink-600"
            />
          ) : (
            <div>{user && <LikePost id={blogId} likes={likes} />} </div>
          )}

          <p className=" font-semibold">{likes?.length}</p>
          <p className="text-xs">Likes</p>
        </span>
        <span href="comment" className="flex flex-col items-center mt-10">
          <ChatIcon
            xlinkHref="comment"
            className="h-8 cursor-pointer hover:bg-green-100 duration-150 rounded-full p-1 hover:text-green-600"
          />
          <p className="text-green-700 font-semibold">{commentCount}</p>
          <p className="text-xs">Comments </p>
        </span>
        <Menu as="div" className="ml-10 ">
          <div>
            <Menu.Button className="flex flex-col items-center mt-10">
              <ShareIcon className="h-8 cursor-pointer hover:bg-green-100 duration-150 rounded-full p-1 hover:text-green-600" />
              <p className="text-sm">Share </p>
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
            <Menu.Items className="right-0 mt-2 w-40 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              <CopyToClipboard
                text={`https://melbite.com/${name_slug}/${blogId} `}
                onCopy={onArticleCopyLink}
              >
                <span>
                  {isCopied ? (
                    <p className="block cursor-pointer px-4 py-2 text-sm text-gray-700">
                      Link Copied!
                    </p>
                  ) : (
                    <p className="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:text-purple-900">
                      Copy to Clipboard
                    </p>
                  )}
                </span>
              </CopyToClipboard>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href={`https://twitter.com/intent/tweet?url=https://melbite.com/${name_slug}/${blogId} `}
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
                    href={`https://www.facebook.com/sharer.php?u=https://melbite.com/${name_slug}/${blogId}`}
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
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=https://melbite.com/${name_slug}/${blogId} `}
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
                    href={`https://www.reddit.com/submit?url=https://melbite.com/${name_slug}/${blogId}`}
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
      <section className="bg-white rounded-md mx-wd3 border border-gray-300 h-full ml-32 wd-screen1 xs:mt-8">
        <p
          className="ml-0 w-full object-contain flex items-center justify-center rounded-t-lg"
          dangerouslySetInnerHTML={{ __html: backgroundImage }}
        />

        <div className="mt-4 ml-6 mr-7 flex items-center justify-between">
          <div className="flex items-center justify-between">
            <span className="bg-yellow-300 w-10 font-mono p-1 pl-3 uppercase text-xl text-gray-800 h-10 border-2 border-yellow-300 rounded-full">
              {displayName?.[0]}
            </span>
            <span className="ml-2">
              <p className="text-md">{displayName}</p>
              {/* <p className="text-sm text-gray-500 -mt-1">
              Published{" "}
              <ReactTimeago
                date={new Date(timestamp.timestamp?.toDate()).toUTCString()}
              />
            </p> */}
            </span>
            <span className="md:hidden flex flex-wrap items-center space-x-2 ml-7">
              {!user ? (
                <HeartIcon
                  onClick={loginToLike}
                  className="h-6 cursor-pointer hover:bg-pink-100 duration-150 rounded-full p-1 hover:text-pink-600"
                />
              ) : (
                <div>
                  {user && (
                    <LikePost className="h-6" id={blogId} likes={likes} />
                  )}
                </div>
              )}

              <p className="text-xs font-semibold">{likes?.length}</p>
              <p className="text-xs">Likes</p>
            </span>
          </div>
          <div className="flex space-x-5 items-center"></div>
        </div>
        <div className="ml-7 mr-7 mt-5 mb-4">
          <h2 className="text-lg lg:text-4xl md:text-2xl sm:text-md text-gray-900 md:leading-10">
            {blogHeader}
          </h2>
          <span>
            {!blogBody ? (
              <section className="flex flex-col items-center justify-center w-full mx-auto -mt-16 h-48">
                <img className="flex items-center h-28 w-36 text-center" src={contentLoading} alt="" />
                <p className="-mt-10" >Loading content . . .</p>              
              </section>
            ) : (
                <p
                  className="font-sans pt-8 text-lg leading-7"
                  dangerouslySetInnerHTML={{ __html: blogBody }}
                />
            )}

          </span>
        </div>

        {/*******************************************/}
        {/**** Add Comment Section ****/}
        {/*******************************************/}

        <div className="md:ml-7 md:mr-7 ml-2 border-t border-gray-300 pb-12">
          <h2 className="text-gray-900 pt-7">Comments ({commentCount})</h2>
          <div className="mt-5 flex" id="comment">
            {!user ? (
              <Avatar className="h-8 w-8 md:w-10 md:h-10" />
            ) : (
              <span className="bg-yellow-300 h-8 w-8 md:w-10 md:h-10 font-mono p-1 pl-3 pr-3 uppercase text-md md:text-xl text-gray-800 border-2 border-yellow-300 rounded-full">
                {user.displayName?.[0]}
              </span>
            )}

            <div>
              <textarea
                onClick={preventCommentIfUserDoesNotExist}
                value={addComment}
                onChange={(e) => setAddComment(e.target.value)}
                className="border-2 rounded py-2 px-3 block w-full md:w-full ml-2 md:ml-4 focus:outline-none focus:border-purple-600"
                placeholder="What do you think about this article . . ."
                rows={5}
                cols={60}
              />
              <button
                disabled={!addComment}
                onClick={postComment}
                className="mt-3 ml-4 py-2 px-9 border-2 border-purple-800 rounded-full text-purple-900 hover:bg-purple-800 hover:text-white"
              >
                Post
              </button>
            </div>
          </div>
        </div>
        {comments.map((message) => (
          <div
            className={`md:ml-7 md:mr-7 ml-2 pb-5 mr-10 ${
              message.name === displayName && "chat__reciever"
            }`}
          >
            {/* */}
            {console.log("subComments: ", subComments)}
            <div className="flex">
              <span className="bg-yellow-300 w-8 h-8 md:w-10 md:h-10 font-mono p-1 md:pl-3 md:pr-3 pl-2 uppercase md:text-xl text-gray-800 border-2 border-yellow-300 rounded-full">
                {message.name?.[0]}
              </span>
              <div className="w-full">
                <div className="border border-gray-300 w-full rounded-md ml-3 p-3">
                  <span className="flex">
                    <p className="text-sm text-gray-800 font-bold">
                      {message.name}
                    </p>
                    <p className="text-sm text-gray-700 ml-3">
                      <ReactTimeago
                        date={new Date(
                          message.timestamp?.toDate()
                        ).toUTCString()}
                      />
                    </p>
                  </span>
                  <div className="pt-3">
                    <p>{message.message}</p>
                  </div>
                </div>
                <div className="flex space-x-4 items-center">
                  <div
                    onClick={() => setShowReply((prev) => !prev)}
                    className="text-gray-600 flex space-x-2 items-center ml-3 cursor-pointer rounded-md duration-100 hover:bg-gray-200 w-20 p-1 mt-1"
                  >
                    <ReplyIcon />
                    <p className="text-sm">Reply</p>
                  </div>
                </div>
                <ReplyComment
                  commentId={message.id}
                  show={showReply}
                  cb={replyCommentCallback}
                />
              </div>
            </div>
            {subComments.map(
              (sub) =>
                sub.commentId === message.id && (
                  <div
                    key={sub.id.toString()}
                    className="flex mt-1 ml-8 md:ml-10"
                  >
                    <span className="bg-yellow-200 w-8 h-8 font-mono p-1 pl-2 pr-3 uppercase text-md text-gray-800  border-2 border-yellow-300 rounded-full">
                      {sub.name?.[0]}
                    </span>
                    <div className="w-full">
                      <div className="border bg-green-50 w-full rounded-md ml-3 p-3">
                        <span className="flex items-center flex-wrap">
                          <p className="text-sm text-gray-800 font-bold">
                            {sub.name}
                          </p>
                          <p className="text-xs text-gray-500 ml-2">Replied </p>
                          <p className=" text-xs md:text-sm text-gray-700 ml-2">
                            <ReactTimeago
                              date={new Date(
                                sub.timestamp?.toDate()
                              ).toUTCString()}
                            />
                          </p>
                        </span>
                        <div className="pt-3">
                          <p className="text-sm">{sub.commentReaction}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )
            )}
          </div>
        ))}
      </section>

      <section className="hidden md:block lg:block ml-5 ">
        <section className="profile w-72  rounded-md border border-gray-400 bg-white">
          <div className="bg-c h-20 border-t rounded-t-md flex items-center justify-center">
            <span className="bg-yellow-300 w-16 h-16  mt-20 border-5 border-white font-mono pl-6 font-bold items-center flex uppercase text-2xl text-center text-purple-800 border-2 rounded-full">
              {displayName?.[0]}
            </span>
          </div>
          <div className="flex flex-col text-start p-3 mt-6">
            <h3 className="mt-4 text-center mb-3 text-purple-800">
              Currently Working On{" "}
            </h3>
            <span className="text-gray-800 text-md">
              {!currentTask ? (
                <h3 className="text-center mb-3 text-gray-400 ">
                  {" "}
                  Project Not set
                </h3>
              ) : (
                <p className="text-center mb-3 text-gray-800">{currentTask}</p>
              )}
            </span>
          </div>
        </section>

        <button className="bg-c text-white hover:bg-purple-800 w-full mt-4 p-2 rounded-md">
          Follow
        </button>
        {/* <section className="mt-4 bg-white pl-2 pr-2 rounded-sm border">
          <h2 className="text-lg md:text-xl text-gray-900">More from <span className="text-purple-700">{displayName}</span></h2>

          <MoreFromUser/>

          {userPosts?.map(userPosts) => {
            <section></section>
          }}
        </section>
        
          <MoreFromUser/> */}
      </section>
    </main>
  );
};
export default SelectedBlog;
