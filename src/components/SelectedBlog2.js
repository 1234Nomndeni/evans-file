import React, {Fragment, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Menu, Transition } from "@headlessui/react";
import Avatar from '@mui/material/Avatar';
import {
  HeartIcon,
  ChatIcon,
  ShareIcon,
} from "@heroicons/react/outline";
// import {HeartIcon} from "@heroicons/react/solid"
import { db } from "../utils/firebase";
import ReactTimeago from "react-timeago";
import { selectUser } from "../features/userSlice";
import {useNavigate, useParams } from "react-router-dom";
import firebase from "firebase/compat/app";
import {useSelector } from "react-redux";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const SelectedBlog2 = () => {
  const navigate = useNavigate()
  const user = useSelector(selectUser);
  const {blogId,displayName} = useParams()
  const [blogHeader, setBlogHeader] = useState("");
  const [blogBody, setBlogBody] = useState("");
  const [backgroundImage, setBackgroundImage] = useState("");
  const [currentTask, setCurrentTask] = useState("");
  const [slug_name, setSlugName] = useState("")
  const [name_slug, setNameSlug] = useState("")
  const [addComment, setAddComment] = useState("")
  const [comments, setComments] = useState([])
  const [commentCount, setCommentCount] = useState(0);
  // const [likesCount, setLikesCount] = useState(0);
  

  useEffect(() => {
    if(blogId){
      db.collection('testPosts').doc(blogId).onSnapshot(snapshot => (
        setBlogHeader(snapshot.data().blogHeader),
        setBackgroundImage(snapshot.data().backgroundImage),
        setBlogBody(snapshot.data().blogBody),
        setCurrentTask(snapshot.data().currentTask),
        setSlugName(snapshot.data().slug_name),
        setNameSlug(snapshot.data().name_slug)
      ))

      db.collection('testPosts').doc(blogId).collection('comments').orderBy('timestamp', 'desc').onSnapshot(snapshot => (
        setComments(snapshot.docs.map(doc => doc.data()))
      ))
    }
  }, []);


  /********************************************/
  /*** Add A Single Posts Comments ***/
  /********************************************/
  const preventCommetIfUserDoesNotExist = () => {
    if (!user) {
      navigate("/signIn");
    }
  };

  const postComment = (e) => {
    e.preventDefault();

    db.collection('testPosts').doc(blogId).collection('comments').add({
      message: addComment,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })

    setAddComment("")
  }

  const fetchCommentsCount = async () => {
    await db
      .collection("testPosts").doc(blogId).collection("comments")
      .onSnapshot((snapshot) =>
        setCommentCount(snapshot.size)
    )
  };

  useEffect(() => {
    fetchCommentsCount()
  }, [])
 
  return (
    <main
      className="pt-24 mx-wd1 mx-auto flex justify-between pb-24 wd-screen3"
    >
      <Helmet>
        <title>{`${slug_name}`}</title>
      </Helmet>
      <section className="hidden w-28 mt-8 fixed lg:block flex-col md:block">
        {/* <span href="comment" className="flex flex-col items-center mt-10">
          <HeartIcon className="h-8 cursor-pointer hover:bg-pink-100 duration-150 rounded-full p-1 hover:text-pink-600" />
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6" viewBox="0 0 20 20" fill="currentColor">
            <path className="h-8 cursor-pointer text-pink-600 hover:bg-pink-100 duration-150 rounded-full p-1 hover:text-pink-600" fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
          </svg>
          <p className="text-pink-600 font-semibold">{likesCount}</p>
          <p className="text-sm">Like</p>
        </span> */}
        <span href="comment" className="flex flex-col items-center mt-10">
          <ChatIcon xlinkHref="comment" className="h-8 cursor-pointer hover:bg-green-100 duration-150 rounded-full p-1 hover:text-green-600" />
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

        <p className="ml-0 w-full object-contain flex items-center justify-center rounded-t-lg" 
        dangerouslySetInnerHTML={{ __html: backgroundImage }}
        />

        <div className="mt-4 ml-6 flex items-center">
          <span className="bg-yellow-300 w-10 font-mono p-1 pl-3 uppercase text-xl text-gray-800 h-10 border-2 border-yellow-300 rounded-full">
            {displayName?.[0]}
          </span>
          <span className="ml-2">
            <p className="text-md">{displayName}</p>
            {/* <p className="text-sm text-gray-500 -mt-1">Published <ReactTimeago date={new Date(timestamp?.toDate()).toUTCString()} /></p> */}
          </span>
        </div>
        <div className="ml-7 mr-7 mt-5 mb-4">
          <h2 className=" lg:text-4xl md:text-2xl sm:text-md text-gray-900 leading-10">
            {blogHeader}
          </h2>
          <span>
            <p
              className="font-sans pt-3 text-lg leading-7"
              dangerouslySetInnerHTML={{ __html:blogBody }}
            />
          </span>
        </div>

        {/*******************************************/}
        {/**** Add Comment Section ****/}
        {/*******************************************/}

        <div className="ml-7 mr-7 border-t border-gray-300 pb-12">
          <h2 className="text-gray-900 pt-7">Comments ({commentCount})</h2>
          <div className="mt-5 flex" id="comment">
            {!user ? (<Avatar/>) : (
              <span className="bg-yellow-300 w-10 font-mono p-1 pl-3 pr-3 uppercase text-xl text-gray-800 h-10 border-2 border-yellow-300 rounded-full">
              {displayName?.[0]}
            </span>
            )}
            
            <div>
              <textarea onClick={preventCommetIfUserDoesNotExist} value={addComment} onChange={(e) => setAddComment(e.target.value)} className='border-2 rounded py-2 px-3 block w-full ml-4 focus:outline-none focus:border-purple-600' placeholder='What do you think about this article . . .' rows={5} cols={60}/>
              <button  disabled={!addComment} onClick={postComment} className="mt-3 ml-4 py-2 px-9 border-2 border-purple-800 rounded-full text-purple-900 hover:bg-purple-800 hover:text-white">Post</button>
            </div>
          </div>
        </div>
        {comments.map(message => (
            <p className={`pb-5 ml-7 mr-14 flex  ${message.name === displayName && "chat__reciever"}`}>
                <span className="bg-yellow-300 w-10 font-mono p-1 pl-3 pr-3 uppercase text-xl text-gray-800 h-10 border-2 border-yellow-300 rounded-full">
                  {message.name?.[0]}
                </span>
                <div className="border border-gray-300 w-full rounded-md ml-3 p-3">
                  <span className="flex">
                    <p className="text-sm text-gray-800 font-bold">
                      {message.name}
                    </p>
                    <p className="text-sm text-gray-700 ml-3">
                      <ReactTimeago
                        date={new Date(message.timestamp?.toDate()).toUTCString()}
                      />
                    </p>
                  </span>
                  <div className="pt-3">
                    <p>{message.message}</p>
                  </div>
                </div>
            </p>
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
            {/* <h3 className="text-xl text-center"></h3> */}
            <h3 className="mt-4 text-center mb-3 text-purple-800">Currently Working On </h3>
              <span className="text-gray-800 text-md">
              {!currentTask ? (<h3 className="text-center text-gray-400 "> Project Not set</h3>) : (<p className="text-center text-gray-800">{currentTask}</p>)}
            </span>
          </div>
        </section>

        <button className="bg-c text-white hover:bg-purple-800 w-full mt-4 p-2 rounded-md">
          Follow 
        </button>
      </section>
    </main>
  );
}
export default SelectedBlog2;
