import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Modal } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { XIcon } from "@heroicons/react/outline";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, logout, login } from "../../features/userSlice";
import { auth, db } from "../../utils/firebase";
import SignUp from "../SignUp";
import firebase from "firebase/compat/app";
import brandLogo from "../images/melbite.jpg";

/******************************************************** */
/*text editor dependancies */
/******************************************************** */

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";
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
    ["image", "video", "code-block", "blockquote", "link", "formula", "strike"],
    ["clean"],
  ],
};

const modules2 = {
  syntax: {
    highlight: (text) => hljs.highlightAuto(text).value,
  },
  toolbar: [["image"]],
};

const CreatePost = () => {
  const [blogHeader, setBlogHeader] = useState("");
  const [blogBody, setBlogBody] = useState("");
  const [backgroundImage, setBackgroundImage] = useState("");
  const [currentTask, setCurrentTask] = useState("");
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState("");
  const [open, setOpen] = useState(true);
  // Selection to blog in a specific community
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const [joinedCommunities, setJoinedCommunities] = useState([]);

  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const handleChange = (value) => {
    setBlogBody(value);
  };

  const handleBackgroundChange = (value) => {
    setBackgroundImage(value);
  };

  useEffect(() => {
    const storedValues = JSON.parse(localStorage.getItem("blogPostValues"));
    if (storedValues) {
      setBlogHeader(storedValues.blogHeader);
      setBlogBody(storedValues.blogBody);
      setBackgroundImage(storedValues.backgroundImage);
      setCurrentTask(storedValues.currentTask);
      setSelectedTag(storedValues.selectedTag);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "blogPostValues",
      JSON.stringify({
        blogHeader,
        blogBody,
        backgroundImage,
        currentTask,
        selectedTag,
      })
    );
  }, [blogHeader, blogBody, backgroundImage, currentTask, selectedTag]);

  const handleAddTag = (event) => {
    // event.preventDefault();
    if (selectedTag && !tags.includes(selectedTag)) {
      setTags([...tags, selectedTag]);
      setSelectedTag("");
    }
  };
  handleAddTag();

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const publishBlog = (e) => {
    e.preventDefault();
    if (blogHeader && blogBody) {
      db.collection("posts").add({
        uid: user.uid,
        backgroundImage: backgroundImage,
        blogHeader: blogHeader,
        slug_name: blogHeader.replace(/\s/g, "-"),
        hashTags: tags,
        blogBody: blogBody,
        currentTask: currentTask,
        description: user.email,
        displayName: user.displayName,
        name_slug: user.displayName.replace(/\s/g, "-"),
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        likes: [],
      });

      setBackgroundImage("");
      setBlogHeader("");
      setBlogBody("");
      setCurrentTask("");
      setTags([]);
      setSelectedTag("");
      toast("Article Published Successfully");
      localStorage.removeItem("blogPostValues");
    }
  };

  useEffect(() => {
    db.collection("communities")
      .where("communityMembers", "array-contains", user.uid)
      .onSnapshot((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setJoinedCommunities(data);
        console.log(data);
      });
  }, [user]);

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
                      <img
                        onClick={() => navigate("/")}
                        className="h-11 cursor-pointer"
                        src={brandLogo}
                        alt="Melbite Logo"
                      />
                    </div>
                  </div>
                  {/* <div className="flex items-center justify-between ">
                    <button
                      disabled={!blogHeader}
                      className="text-xs md:text-sm border border-purple-600 text-purple-800 hover:bg-purple-800 hover:text-white px-7 hover:ease-in-out duration-150 py-2 rounded-full transform hover:scale-105 cursor-pointer"
                    >
                      Save draft
                    </button>
                  </div> */}
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
                  <ReactQuill
                    className="w-3/6 rounded-t-lg outline-none border-none"
                    value={backgroundImage || ""}
                    onChange={handleBackgroundChange}
                    theme="snow"
                    modules={modules2}
                    placeholder="Click The Icon To Add Background Image"
                  />

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
                  className="focus:outline-none mt-10 mb-3 text:2xl md:text-4xl h-20 break-words font-bold text-gray-900 w-full"
                  type="text"
                  required
                  placeholder="Type your title here . . ."
                />
              </section>
              <section className="border mx-wd2 mx-auto p-3 rounded-lg">
                {joinedCommunities.length > 0 && (
                  <div>
                    <select
                      id="communitySelect"
                      className=" p-2 cursor-pointer bg-white border rounded-md shadow-sm outline-none focus:border-indigo-600"
                      onChange={(e) =>
                        setSelectedCommunity(
                          joinedCommunities.find((c) => c.id === e.target.value)
                        )
                      }
                    >
                      <option value="">Select a community</option>
                      {joinedCommunities.map((community) => (
                        <option key={community.id} value={community.id}>
                          {community.communityName}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </section>
              <section className="border mx-wd2 mx-auto p-3 rounded-lg">
                <div>
                  <select
                    id="tag"
                    // className="w-28 p-1 cursor-pointer hover:bg-gray-100"
                    className="w-40 p-2 cursor-pointer bg-white border rounded-md shadow-sm outline-none focus:border-indigo-600"
                    value={selectedTag}
                    onChange={(e) => setSelectedTag(e.target.value)}
                  >
                    <option value="">Select a tag</option>
                    <option value="MentalHealth">MentalHealth</option>
                    <option value="General">General</option>
                    <option value="Programming">Programming</option>
                    <option value="Javascript">JavaScript</option>
                    <option value="Python">Python</option>
                    <option value="React">React</option>
                    <option value="NextJs">NextJs</option>
                    <option value="Firebase">Firebase</option>
                    <option value="Productivity">Productivity</option>
                    <option value="Beginners">Beginners</option>
                    <option value="Career">Career</option>
                    <option value="MachineLearning" title="">
                      MachineLearning
                    </option>
                    <option value="Melbite">Melbite</option>
                  </select>
                </div>
                <div className="flex gap-3 mt-1">
                  {tags.map((tag) => (
                    <div
                      key={tag}
                      className="flex items-center gap-1 rounded-md bg-green-100 py-1 px-2"
                    >
                      #{tag}
                      <span
                        className="text-sm ml-1 hover:text-red-500 cursor-pointer font-semibold"
                        onClick={() => handleRemoveTag(tag)}
                      >
                        X
                      </span>
                    </div>
                  ))}
                </div>
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

export default CreatePost;
