import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Modal } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { XIcon } from "@heroicons/react/outline";
import { useSelector, useDispatch } from "react-redux";
// import { selectUser, logout, login } from "../../features/userSlice";
// import { auth, db, storage } from "../utils/firebase";
// import SignUp from "../SignUp";
import firebase from "firebase/compat/app";
// import brandLogo from "../images/melbite.jpg";

/******************************************************** */
/*text editor dependancies */
/******************************************************** */

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";
import SignUp from "../components/SignUp";
import { selectUser, logout, login } from "../features/userSlice";
import { auth, db, storage } from "../utils/firebase";
import BackgroundImage from "../components/AddArticle/BackgroundImage";
// Text editor
toast.configure({
  position: toast.POSITION.TOP_CENTER,
  autoClose: 3000,
  pauseOnFocusLoss: false,
  className: {
    backgroundColor: "red-red-200",
  },
  bodyClassName: {
    backgroundColor: "blue",
    height: "100%",
    width: "100%",
  },
});

const modules = {
  syntax: {
    highlight: (text) => hljs.highlightAuto(text).value,
  },
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic", "underline"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    [{ align: [] }],
    ["image", "code-block", "blockquote", "link", "formula", "strike"],
    ["clean"],
  ],
};

const modules2 = {
  syntax: {
    highlight: (text) => hljs.highlightAuto(text).value,
  },
  toolbar: [["image"]],
};

const MelbiteCreatePost = () => {
  const [blogHeader, setBlogHeader] = useState("");
  const [blogBody, setBlogBody] = useState("");
  const [currentTask, setCurrentTask] = useState("");
  const [backgroundImage, setBackgroundImage] = useState(null); //
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(true);
  const [uploadedImage, setUploadedImage] = useState("");

  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const handleChange = (value, delta, source, editor) => {
    setBlogBody(value);
  };

  // let uploadedImage = "";
  React.useEffect(() => {
    console.log("Uploaded Image Is: ", uploadedImage);
  }, [uploadedImage]);

  // const handleBackgroundChange = (value, delta, source, editor) => {
  //   setBackgroundImage(value);
  // };

  const publishBlog = (e) => {
    e.preventDefault();

    try {
      const uploadTask = storage
        .ref(`images/${backgroundImage.name}`)
        .put(backgroundImage);
      console.log("Hello 1");

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          let progress;
          progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(progress);
          console.log("Hello 2");
        },
        (err) => {
          console.log(err);
        },
        async () => {
          const imageUrl = await storage
            .ref("images/")
            .child(backgroundImage.name)
            .getDownloadURL();
          console.log("Hello 3");
          console.log("Image is: ", imageUrl);

          setUploadedImage(imageUrl);
        }
      );
    } catch (error) {
      console.log(error.message);
    } finally {
      // console.log("Uploaded Image Is: ", uploadedImage);
      if (blogHeader && blogBody) {
        db.collection("posts")
          .add({
            uid: user.uid,
            blogHeader: blogHeader,
            slug_name: blogHeader.replace(/\s/g, "-"),
            blogBody: blogBody,
            currentTask: currentTask,
            description: user.email,
            displayName: user.displayName,
            name_slug: user.displayName.replace(/\s/g, "-"),
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            likes: [],
            backgroundImage: uploadedImage,
          })
          .then(() => {
            setBackgroundImage(null);
            setBlogHeader("");
            setBlogBody("");
            setCurrentTask("");
            toast("Article Published Successfully");
          });
      } else {
        setError(true);
      }
    }
  };

  //validate and keep the user loggedIn
  useEffect(() => {
    auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        dispatch(
          login({
            email: userAuth.email,
            uid: userAuth.uid,
            displayName: userAuth.displayName,
            profilePic: userAuth.photoURL,
          })
        );
      } else {
        dispatch(logout);
      }
    });
  }, [dispatch]);

  return (
    <>
      {!user ? (
        <SignUp />
      ) : (
        <div className="bg-white pt-32 mx-auto min-w-full  min-h-screen">
          <Helmet>
            <title>Melbite | New Post</title>
          </Helmet>
          <Modal
            className=" bg-white overflow-auto min-h-screen"
            open={open}
            onClose={(e) => setOpen(false)}
          >
            <main className="bg-white min-h-screen">
              <div className="flex justify-between items-center bg-white mx-auto border-b-2 border-fuchsia-600 pb-4  mx-wd2 pt-6 ">
                <div className="w-full flex justify-between">
                  <div className="flex-shrink-0 flex md:w-3/5 items-center  ">
                    <div className=" hidden lg:block ">
                      <h2>Melbite.com</h2>
                    </div>
                  </div>
                  <div className="flex items-center justify-between ">
                    <button
                      onClick={publishBlog}
                      disabled={!blogHeader}
                      className="text-xs md:text-sm border border-purple-600 text-purple-800 hover:bg-purple-800 hover:text-white px-7 hover:ease-in-out duration-150 py-2 rounded-full transform hover:scale-105 cursor-pointer"
                    >
                      Publish
                    </button>
                  </div>
                </div>
                <span className=" pl-10">
                  <XIcon
                    onClick={() => navigate("/")}
                    className="w-5 md:w-8 rounded-lg hover:text-red-500  cursor-pointer"
                  />
                </span>
              </div>

              <section className="mx-wd2 mx-auto pt-4">
                <div className="flex flex-wrap mb-5 justify-between outline-none">
                  {/* <ReactQuill
                    className="w-3/6 rounded-t-lg outline-none border-none"
                    value={backgroundImage || ""}
                    onChange={handleBackgroundChange}
                    theme="snow"
                    modules={modules2}
                    placeholder="Click The Icon To Add Background Image"
                  /> */}
                  <BackgroundImage setBackgroundImage={setBackgroundImage} />

                  <textarea
                    value={currentTask}
                    onChange={(e) => setCurrentTask(e.target.value)}
                    className="border-gray-300 border max-h-52 w-2/6 focus:outline-none rounded-sm p-3"
                    placeholder="Am currently working on..."
                  ></textarea>
                </div>

                <input
                  value={blogHeader}
                  onChange={(e) => setBlogHeader(e.target.value)}
                  className="focus:outline-none mt-10 mb-3 text-4xl font-bold text-gray-900 w-full"
                  type="text"
                  required
                  placeholder="Type your title here . . ."
                />
                {error && (
                  <p className="text-red-500">Please Fill title & content </p>
                )}
              </section>

              <section className="mx-wd2 mt-10 pb-12 mx-auto">
                <ReactQuill
                  value={blogBody || ""}
                  onChange={handleChange}
                  theme="snow"
                  modules={modules}
                  placeholder="Write Your Article.."
                />
              </section>
            </main>
          </Modal>
        </div>
      )}
    </>
  );
};

export default MelbiteCreatePost;
