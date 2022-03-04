import React, { useState } from "react";
import "quill/dist/quill.snow.css";
import { db } from "../utils/firebase";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import firebase from "firebase/compat/app";
import hljs from 'highlight.js'
import "highlight.js/styles/github.css";

const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ align: [] }],
  ["image", "blockquote", "code-block"],
  ["clean"],
];

hljs.configure({
  languages: ["javascript", "ruby", "python", "rust"],
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
    [{ color: [] }, { background: ["red"] }],
    [{ script: "sub" }, { script: "super" }],
    [{ align: [] }],
    ["image", "blockquote", "code-block"],
    ["clean"],
  ],
};


const QuillEditor = () => {
  const [blogBody, setBlogBody] = useState("");

  const handleChange = (value, delta, source, editor) => {
    setBlogBody(value );
  };

  // console.log(handleChange.value);
  const postBlog = (e) => {
    e.preventDefault();

    db.collection("posts").add({
      blogBody: blogBody,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setBlogBody("");
  };


  return (
    <div className="mt-32 ml-20">
      <ReactQuill
        value={blogBody || ""}
        onChange={handleChange}
        theme="snow"
        modules={modules}
        // placeholder="Write Here.."
        
      />

      <button onClick={postBlog} className="bg-red-300 p-2">
        Send
      </button>
    </div>
  );
};

export default QuillEditor;
