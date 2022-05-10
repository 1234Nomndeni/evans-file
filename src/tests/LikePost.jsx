import React, { useEffect, useState } from 'react'
import { db } from '../utils/firebase';
import { useSelector } from "react-redux";
import { selectOpenBlog, selectPostComment } from "../features/blogSlice";
import {
  HeartIcon,
  BookmarkIcon,
  UserCircleIcon,
  ShareIcon,
} from "@heroicons/react/outline";

const LikePost = ({description}) => {
  const [posts, setPosts] = useState([])
  
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

  // Like functionality
  const likePost = (postID) => {
    const likeDocument = db
      .collection("likes")
    //   .where("userId", "==", userId)
      .where("postId", "==", postID)
      .limit(1);
    let postData;
    const postDocument = db.collection("posts").doc(postID);
    postDocument
      .get()
      .then((doc) => {
        if (doc.exists) {
          postData = doc.data();
          postData.screamId = doc.id;
          return likeDocument.get();
        } else {
          console.log("Scream not found");
        }
      })
      .then((data) => {
        if (data.empty) {
          db.collection("likes")
            .add({
              postId: postID,
            //   userId: userId,
            })
            .then(() => {
              postData.likeCount++;
              return postDocument.update({ likeCount: postData.likeCount });
            })
            .then(() => {
              return postData;
            });
        } else {
          console.log("Already liked");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const postLiked = (postID) => {
    const likeDocument = db
      .collection("likes")
    //   .where("userId", "==", userId)
      .where("postId", "==", postID)
      .limit(1);
    let returnedValue;
    return likeDocument
      .get()
      .then((data) => {
        if (data.empty) {
          console.log("false");
          returnedValue = false;
        } else {
          console.log("true");
          returnedValue = true;
        }
      })
      .then(() => {
        return returnedValue;
      });
  };

  return (
    <main className="pt-24 mx-wd1 mx-auto flex justify-between pb-24 wd-screen3">
      <section className="hidden w-28 mt-8 fixed lg:flex flex-col md:flex sm:hidden">
        {posts?.map((post) => (
          <span className="flex flex-col items-center">
            <HeartIcon
              onClick={() => likePost(post.id)}
              className="h-8 cursor-pointer hover:bg-red-100 duration-150 rounded-full p-1 hover:text-red-600"
            />
            <p className="text-sm">{post.likeCount}</p>
          </span>
        ))}

        <span className="flex flex-col items-center mt-10">
          <BookmarkIcon className="h-8 cursor-pointer hover:bg-green-100 duration-150 rounded-full p-1 hover:text-green-600" />
          <p className="text-sm">Save </p>
        </span>
        <span
          onClick={() => {
            window.open("http://google.com", "_blank");
          }}
          className="flex flex-col items-center mt-10"
        >
          <ShareIcon className="h-8 cursor-pointer hover:bg-green-100 duration-150 rounded-full p-1 hover:text-green-600" />
          <p className="text-sm">Share </p>
        </span>
      </section>
      <section className="bg-white rounded-md mx-wd3 border border-gray-300 h-full ml-32 wd-screen1">


        <div className="mt-4 ml-6 flex items-center">
          <UserCircleIcon className="w-12 mr-2" />
          <span>
            {/* <p className="text-md">{description} </p> */}
            <p className="text-sm text-gray-500 -mt-1">Posted 2hrs ago</p>
            {/* <p className="text-sm text-gray-500 -mt-1">{selectedBlog?.timestamp}</p> */}
          </span>
        </div>

        <div className="ml-7 mr-7 mt-5 mb-4">
          {/* <h2 className=" lg:text-4xl md:text-2xl sm:text-md text-black">
            {blogHeader}
          </h2> */}
          <span>
            {/* <p
              className="font-sans pt-3 text-md leading-7"
              dangerouslySetInnerHTML={{ __html: blogBody }}
            /> */}
          </span>
        </div>

        {/* <div className="mt-6 ml-7 mr-7 border-t border-gray-300">
            <h2 className="text-xl text-gray-900 pt-3">Comments ({17})</h2>
            <div className="mt-5">
            <UserCircleIcon className="h-9" />
            <ReactQuill
              value={comment}
              onChange={handleChange}
              theme="snow"
              modules={modules}
              placeholder="Write Here.."
              // className=""
            />

            <button  disabled={!comment} onClick={postComment} className="p-2 bg-red-500 text-white">Send Comment</button>
          </div>
          <div>
            {allComments.map((comment) => (
            <p>
              <b>{comment.text}</b> 
            </p>
          ))}
          </div>
          </div> */}
      </section>

      <section>
        <section className="profile w-72 h-72 rounded-md border border-gray-400 bg-white">
          <div className="bg-c h-20 border-t rounded-t-md flex items-center justify-center">
            <UserCircleIcon className="h-16 mt-20 bg-white rounded-full cursor-pointer" />
          </div>
          <div className="flex flex-col text-start p-3 mt-8">
            <h3 className="text-xl text-center">Evans Mutuku</h3>
            <p className="text-gray-800 text-md">
              FreeLance Web Developer || Javascript Developer || Web Developer
              || Open Source Contributer
            </p>
            <p></p>
          </div>
        </section>

        <button className="bg-c text-white hover:bg-purple-800 w-full mt-4 p-2 rounded-md">
          Follow Evans Mutuku
        </button>
      </section>
    </main>
  );
}

export default LikePost