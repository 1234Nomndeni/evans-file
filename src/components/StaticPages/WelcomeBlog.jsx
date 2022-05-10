import React, { Fragment, useEffect, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { Helmet } from "react-helmet";
import { HeartIcon, ChatIcon, ShareIcon } from "@heroicons/react/outline";
import { useSelector } from "react-redux";
import { db } from "../../utils/firebase";
import firebase from 'firebase/compat/app'
import { useNavigate } from "react-router-dom";
import { selectUser } from "../../features/userSlice";
import ReactTimeago from "react-timeago";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const WelcomeBlog = () => {
  const [addComment, setAddComment] = useState("");
  const [getBlogComments, setGetBlogComments] = useState([]);
  const [commentCount, setCommentCount] = useState(0);
  const user = useSelector(selectUser);
  const navigate = useNavigate()
  const [like, setLike] = useState(true);
  const [likeCount, setLikeCount] = useState(0)

  
  /********************************************/
  /*** Add A Single Posts Comments ***/
  /********************************************/


  // const handleBackgroundChange = (value, delta, source, editor) => {
  //   setBackgroundImage(value);
  // };
  const postComment = (e) => {
      e.preventDefault();
      db.collection("welcomeComments").add({
        uid: user.uid,
        addComment: addComment,
        displayName: user.displayName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
      setAddComment("");
  };

  const preventCommetIfUserDoesNotExist = () => {
    if (!user) {
        navigate("/signIn");
    }
  };
  
  const fetchWelcomeComments = async () => {
    try {
      await db
        .collection("welcomeComments")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => 
          setGetBlogComments(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          ),
          )
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCommentsCount = async () => {
    await db
      .collection("welcomeComments")
      .onSnapshot((snapshot) =>
        setCommentCount(snapshot.size)
      )
  };

  const likePost = (e) => {
   if(like){
     setLikeCount(likeCount+1).limit(1)
   }
  }

  useEffect(() => {
    fetchWelcomeComments();
  }, []);

  useEffect(() => {
    fetchCommentsCount();
  }, []);

  return (
    <main className="pt-24 mx-wd1 mx-auto flex justify-between pb-24 wd-screen3">
      <Helmet>
        <title>Welcome to Melbite!</title>
      </Helmet>
      <section className="hidden sm:absolute w-28 mt-6 fixed lg:block flex-col md:block">
        {/* <span href="comment" className="flex flex-col items-center mt-10">
          {like ? (
            <HeartIcon
              onClick={likePost}
              className="h-8 cursor-pointer hover:bg-pink-100 rounded-full p-1 hover:text-pink-600"
            />
          ) : (
            <svg
              onClick={() => setLike(true)}
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 translate-ease-in-out"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                className="cursor-pointer text-pink-600 hover:bg-pink-100 rounded-full p-1 hover:text-pink-600"
                fill-rule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clip-rule="evenodd"
              />
            </svg>
          )}
          <p className="text-pink-600 font-semibold">{12}</p>
          <p className="text-pink-600 font-semibold">{likeCount}</p>
          <p className="text-sm">Like</p>
        </span> */}
        <span href="comment" className="flex flex-col items-center mt-10">
          <ChatIcon className="h-8 cursor-pointer hover:bg-green-100 duration-150 rounded-full p-1 hover:text-green-600" />
          <p className="text-green-700 font-semibold">{commentCount}</p>
          <p className="text-sm">Reactions </p>
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
              <Menu.Item>
                {({ active }) => (
                  <a
                    href={`https://twitter.com/intent/tweet?url=https://melbite.com/Welcome-to-Melbite-the-official-blogging-site-or-the-world `}
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
                    href={`https://www.facebook.com/sharer.php?u=https://melbite.com/Welcome-to-Melbite-the-official-blogging-site-or-the-world `}
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
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=https://melbite.com/Welcome-to-Melbite-the-official-blogging-site-or-the-world `}
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
                    href={`https://www.reddit.com/submit?url=https://melbite.com/Welcome-to-Melbite-the-official-blogging-site-or-the-world `}
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
      <section className="bg-white rounded-md mx-wd3 border border-gray-300 h-full ml-32 wd-screen1 md:w-full xs:mt-8">
        <img src="https://wallpaperaccess.com/full/3214529.jpg" alt="" />

        <div className="mt-4 ml-6 flex items-center">
          <span className="bg-yellow-300 w-10 font-mono p-1 pl-3 uppercase text-xl text-gray-800 h-10 border-2 border-yellow-300 rounded-full">
            M
          </span>
          <span className="ml-2">
            <p className="text-md">Melbite verified </p>
            <p className="text-sm text-gray-500 -mt-1">Published Apr/8/2022</p>
          </span>
        </div>

        <div className="ml-7 mr-7 mt-5 mb-4 border-b pb-7">
          <h2 className=" lg:text-4xl md:text-2xl sm:text-md text-gray-900 leading-10">
            Welcome to Melbite, We are glad to have you on board!
          </h2>
          <article className="pt-5">
            <h3 className="mt-4 mb-2 text-xl text-gray-900 leading-7">
              Hi there!
            </h3>
            <p className="mt-5 leading-7 text-md text-gray-900 ">
              Welcome to the Melbite Family! I am glad that you are reading this
              article
            </p>
            <h2 className="mt-4 mb-2 text-xl text-gray-900 leading-7">
              What is melbite?
            </h2>
            <p className="mt-5 leading-7 text-md text-gray-900">
              Melbite is a blogging or content creating platform that gives
              chance for everyone to share their knowledge, ideas, skills or
              even views on a particular topic of their interest.{" "}
            </p>
            <h2 className="mt-4 mb-2 text-xl text-gray-900 leading-7">
              What's unique about melbite
            </h2>
            <p className="mt-5  leading-7 text-md text-gray-900">
              At melbite we make use of an editor that gives you an instant
              preview as you format your content. This feature makes it possible
              for everyone to create their content. This editor gets rid of the
              traditional markdown editors that make it difficult for writters
              while writing their content.
            </p>
            <h2 className="mt-4 mb-2 text-xl text-gray-900 leading-7">
              How to Create an article
            </h2>
            <li className="mt-5 ml-5 leading-7 text-md text-gray-900">
              Click on the start writing button that will direct you to the
              writing page,
            </li>
            <li className="mt-1 ml-5 leading-7 text-md text-gray-900">
              Click the Image Icon and upload a background Image - This will
              show on the top of your article,
            </li>
            <li className="mt-1 ml-5 leading-7 text-md text-gray-900">
              Write your article title,{" "}
            </li>
            <li className="mt-1 ml-5 leading-7 text-md text-gray-900">
              Tell us more on amazing project you are working on,
            </li>
            <li className="mt-1 ml-5 leading-7 text-md text-gray-900">
              Write your interisting article using the best editor available.
            </li>
            <li className="mt-1 ml-5 leading-7 text-md text-gray-900">
              Click the publish button and your article will be published to
              everyone instantly.
            </li>
            <p className="mt-5 mb-5 leading-7 text-md text-gray-900">
              We shall be happy to see you join the melbite team and connect
              with other writters and learn from their articles.
            </p>
            <p
              className="leading-7 text-md text-purple-900 font-bold hover:text-purple-700 cursor-pointer"
              onClick={() => navigate("/new")}
            >
              Write your first article
            </p>
            <p
              className="leading-7 text-md text-purple-900 font-bold hover:text-purple-700 cursor-pointer"
              onClick={() => navigate("/about")}
            >
              More about melbite{" "}
            </p>
            <p
              className="leading-7 text-md text-purple-900 font-bold hover:text-purple-700 cursor-pointer"
              onClick={() => navigate("/contact-us")}
            >
              Contact us{" "}
            </p>

            <h3 className="mt-4 text-xl text-gray-900 leading-7">
              See you there!
            </h3>
          </article>
          <p className="mt-5 leading-7 text-md text-gray-900">
            We would love to hear your feedback. Leave us a comment
          </p>
        </div>

        <section className="lg:hidden md:flex sm:flex flex pt-2 pb-2 w-full items-center justify-between pr-10 pl-10">
          {/* <span href="comment" className="flex flex-col items-center">
            {like ? (
              <HeartIcon
                onClick={() => setLike(false)}
                className="h-8 cursor-pointer hover:bg-pink-100 rounded-full p-1 hover:text-pink-600"
              />
            ) : (
              <svg
                onClick={() => setLike(true)}
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 translate-ease-in-out"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  className="cursor-pointer text-pink-600 hover:bg-pink-100 rounded-full p-1 hover:text-pink-600"
                  fill-rule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clip-rule="evenodd"
                />
              </svg>
            )}
            <p className="text-pink-600 font-semibold">{12}</p>
            <p className="text-sm">Like</p>
          </span> */}
          <span href="comment" className="flex flex-col items-center">
            <ChatIcon className="h-8 cursor-pointer hover:bg-green-100 duration-150 rounded-full p-1 hover:text-green-600" />
            <p className="text-green-700 font-semibold">{commentCount}</p>
            <p className="text-sm">Reactions </p>
          </span>
          <Menu as="div" className="ml-10 ">
            <div>
              <Menu.Button className="flex flex-col items-center">
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
              <Menu.Items className="right-20 mt-2 w-40 absolute rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href={`https://twitter.com/intent/tweet?url=https://melbite.com/Welcome-to-Melbite-the-official-blogging-site-or-the-world `}
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
                      href={`https://www.facebook.com/sharer.php?u=https://melbite.com/Welcome-to-Melbite-the-official-blogging-site-or-the-world `}
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
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=https://melbite.com/Welcome-to-Melbite-the-official-blogging-site-or-the-world `}
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
                      href={`https://www.reddit.com/submit?url=https://melbite.com/Welcome-to-Melbite-the-official-blogging-site-or-the-world `}
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

        {/*******************************************/}
        {/**** Add Comment Section ****/}
        {/*******************************************/}

        <div className="mt-12 ml-7 mr-7 border-t border-gray-300 pb-12">
          <h2 className="text-gray-900 pt-7">Comments ({commentCount})</h2>
          <div className="mt-5 flex">
            <span className="bg-yellow-300 w-10 font-mono p-1 pl-3 pr-3 uppercase text-xl text-gray-800 h-10 border-2 border-yellow-300 rounded-full">
              M
            </span>
            <div>
              <textarea
                onClick={preventCommetIfUserDoesNotExist}
                value={addComment}
                onChange={(e) => setAddComment(e.target.value)}
                className="border-2 rounded py-2 px-3 block w-full ml-4 focus:outline-none focus:border-purple-600"
                placeholder="What do you think about this article . . ."
                rows={5}
                cols={60}
              />
              {/* {!user? ( <SignUp/> ) : (<></>)} */}
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

        {/*******************************************/}
        {/**** GET ALL COMMENTS  ****/}
        {/*******************************************/}

        {getBlogComments?.map(
          ({ id, data: { displayName, addComment, timestamp } }) => (
            <div key={id} className="pb-8 ml-7 mr-14 flex">
              <span className="bg-yellow-300 w-10 font-mono p-1 pl-3 pr-3 uppercase text-xl text-gray-800 h-10 border-2 border-yellow-300 rounded-full">
                {displayName?.[0]}
              </span>
              <div className="border border-gray-300 w-full rounded-md ml-3 p-3">
                <span className="flex">
                  <p className="text-sm text-gray-800 font-bold">
                    {displayName}
                  </p>
                  <p className="text-sm text-gray-700 ml-3">
                    <ReactTimeago
                      date={new Date(timestamp?.toDate()).toUTCString()}
                    />
                  </p>
                </span>
                <div className="pt-3">
                  <p>{addComment}</p>
                </div>
              </div>
            </div>
          )
        )}
      </section>

      <section className="hidden md:hidden lg:block ml-5 ">
        <section className="profile w-72  rounded-md border border-gray-400 bg-white">
          <div className="bg-c h-20 border-t rounded-t-md flex items-center justify-center">
            <span className="bg-yellow-300 w-16 h-16  mt-20 border-5 border-white font-mono pl-6 font-bold items-center flex uppercase text-2xl text-center text-purple-800 border-2 rounded-full">
              M
            </span>
          </div>
          <div className="flex flex-col text-start p-3 mt-6">
            <h3 className="text-xl text-center">Melbite Verified</h3>
            <h3 className="mt-4 text-center mb-3 text-purple-800">
              Currently Working On{" "}
            </h3>
            <span className="text-gray-800 text-md text-center">
              Making melbite the best platform for all writters and learners to
              write and learn from.
            </span>
          </div>
        </section>

        <button className="bg-c text-white hover:bg-purple-800 w-full mt-4 p-2 rounded-md">
          Follow Melbite verified
        </button>
      </section>
    </main>
  );
}

export default WelcomeBlog