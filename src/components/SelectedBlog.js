import React, { forwardRef, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { selectOpenBlog} from "../features/blogSlice";
import {
  HeartIcon,
  ChatIcon,
  ShareIcon,
} from "@heroicons/react/outline";
import { db } from "../utils/firebase";
import ReactTimeago from "react-timeago";
import { selectUser } from "../features/userSlice";
import { useNavigate, useParams } from "react-router-dom";
import firebase from "firebase/compat/app";
import SignUp from "./SignUp";

const SelectedBlog = forwardRef(({id}, ref) => {
    const navigate = useNavigate()
    const selectedBlog = useSelector(selectOpenBlog);
    const [addComment, setAddComment] = useState("");
    const [getBlogComments, setGetBlogComments] = useState([]);
    const user = useSelector(selectUser);
    const blog = useParams();

    // const [allComments, setAllComments] = useState([]);


  //    useEffect(() => {
  //   // za komentiranje na slika
  //   if (postId) {
  //     db.collection("posts")
  //       .doc(postId)
  //       .collection("comments")
  //       .orderBy("timestamp", "desc")
  //       .onSnapshot((snapshot) => {
  //         setAllComments(snapshot.docs.map((doc) => doc.data()));
  //       });
  //   }
  // }, [postId]);

    // useEffect(() => {
    //   let unsubscribe;
    //   if (selectedBlog) {
    //      unsubscribe =  db.collection('posts').doc(selectedBlog).onSnapshot(snapshot => (
    //         setAllComments(snapshot.data())
    //       ))

    //     db.collection("posts")
    //       .doc(selectedBlog)
    //       .collection("comments")
    //       .orderBy("timestamp", "desc")
    //       .onSnapshot((snapshot) => {
    //         setAllComments(snapshot.docs.map((doc) => doc.data()))
    //       });
    //   }

    //    return () => {
    //      unsubscribe();
    //     };
    // }, [selectedBlog]);

    

  //   const handleChange = (value, delta, source, editor) => {
  //     setComment(value);
  //   };

  // Like  this post function
   const likePost = (postID) => {
    const likeDocument = db.collection("likes")
      .where("userId", "==",user?.uid)
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

  // selected blog id: QQyhiP4w0wzEbGYK9pIH

    /********************************************/
    /*** Add A Single Posts Comments ***/
    /********************************************/
 
    const postComment = (e) => {
      e.preventDefault();

      db.collection("posts").doc(blog?.id).collection("comments").add({
        uid:user.uid,
        addComment: addComment,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
      setAddComment("");
    };

    /********************************************/
    /*** Get The A Single Posts Comments ***/
    /********************************************/

    const fetchAllPostsComments = async()=> {
    try { 
      await db.collection('posts').doc(blog?.id).collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setGetBlogComments(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        );
    
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchAllPostsComments()
  }, []);

  const preventCommetIfUserDoesNotExist = () => {
    if(!user){
      navigate('/signIn')
    }
  }
  
    return (
      <main onLoad={window.scroll(0, 0)}
        className="pt-24 mx-wd1 mx-auto flex justify-between pb-24 wd-screen3"
        ref={ref}
      >
        <Helmet>
          <title>Melbite | Selected Article</title>
        </Helmet>
        <section className="hidden w-28 mt-8 fixed lg:block flex-col md:block">
          <span className="flex flex-col items-center">
            <HeartIcon className="h-8 cursor-pointer hover:bg-red-100 duration-150 rounded-full p-1 hover:text-red-600" />
            <p className="text-sm text-red-500 font-semibold">{selectedBlog.likeCount}</p>
            <p>Likes</p>
          </span>
          <span href="comment" className="flex flex-col items-center mt-10">
            <ChatIcon className="h-8 cursor-pointer hover:bg-green-100 duration-150 rounded-full p-1 hover:text-green-600" />
            <p className="text-green-700 font-semibold"></p>
            <p className="text-sm">Reactions </p>
          </span>
          <span onClick={() => { window.open("http://google.com", "_blank")}} className="flex flex-col items-center mt-10" >
            <ShareIcon className="h-8 cursor-pointer hover:bg-green-100 duration-150 rounded-full p-1 hover:text-green-600" />
            <p className="text-sm">Share </p>
          </span>
        </section>
        <section className="bg-white rounded-md mx-wd3 border border-gray-300 h-full ml-32 wd-screen1 xs:mt-8">

         <p className="ml-0 w-full object-contain rounded-t-lg" dangerouslySetInnerHTML={{ __html: selectedBlog?.backgroundImage }}/>

          <div className="mt-4 ml-6 flex items-center">
            <span className="bg-yellow-300 w-10 font-mono p-1 pl-3 uppercase text-xl text-gray-800 h-10 border-2 border-yellow-300 rounded-full">
              {selectedBlog.displayName?.[0]}
            </span>
            <span className="ml-2">
              <p className="text-md">{selectedBlog?.displayName} </p>
              <p className="text-sm text-gray-500 -mt-1">Published <ReactTimeago date={new Date(selectedBlog.timestamp?.toDate()).toUTCString()} /></p>
            </span>
          </div>

          <div className="ml-7 mr-7 mt-5 mb-4">
            <h2 className=" lg:text-4xl md:text-2xl sm:text-md text-gray-900 leading-10">
              {selectedBlog?.blogHeader}
            </h2>
            <span>
              <p
                className="font-sans pt-3 text-lg leading-7"
                dangerouslySetInnerHTML={{ __html: selectedBlog?.blogBody }}
              />
            </span>
          </div>

          {/*******************************************/}
          {/**** Add Comment Section ****/}
          {/*******************************************/}

          <div className="mt-12 ml-7 mr-7 border-t border-gray-300 pb-12">
            <h2 className="text-gray-900 pt-7">Comments ({})</h2>
            <div className="mt-5 flex">
              <span className="bg-yellow-300 w-10 font-mono p-1 pl-3 pr-3 uppercase text-xl text-gray-800 h-10 border-2 border-yellow-300 rounded-full">
                {selectedBlog.displayName?.[0]}
              </span>
              <div>
                <textarea onClick={preventCommetIfUserDoesNotExist} value={addComment} onChange={(e) => setAddComment(e.target.value)} className='border-2 rounded py-2 px-3 block w-full ml-4 focus:outline-none focus:border-purple-600' placeholder='What do you think about this article . . .' rows={5} cols={60}/>
                {/* {!user? ( <SignUp/> ) : (<></>)} */}
                <button  disabled={!addComment} onClick={postComment} className="mt-3 ml-4 py-2 px-9 border-2 border-purple-800 rounded-full text-purple-900 hover:bg-purple-800 hover:text-white">Post</button>
              </div>
            </div>
          </div>
        </section>

        <section className="hidden md:block lg:block ml-5 ">
          <section className="profile w-72  rounded-md border border-gray-400 bg-white">
            <div className="bg-c h-20 border-t rounded-t-md flex items-center justify-center">
               <span className="bg-yellow-300 w-16 h-16  mt-20 border-5 border-white font-mono pl-6 font-bold items-center flex uppercase text-2xl text-center text-purple-800 border-2 rounded-full">
              {selectedBlog.displayName?.[0]}
            </span>
            </div>
            <div className="flex flex-col text-start p-3 mt-6">
              <h3 className="text-xl text-center">{selectedBlog?.displayName}</h3>
              <h3 className="mt-4 text-center mb-3 text-purple-800">Currently Working On </h3>
               <span className="text-gray-800 text-md">
                {!selectedBlog?.currentTask ? (<h3 className="text-center text-gray-400 "> Project Not set</h3>) : (<p className="text-center text-gray-800">{selectedBlog?.currentTask}</p>)}
              </span>
            </div>
          </section>

          <button className="bg-c text-white hover:bg-purple-800 w-full mt-4 p-2 rounded-md">
            Follow {selectedBlog?.displayName}
          </button>
        </section>
      </main>
    );
  }
);

export default SelectedBlog;
