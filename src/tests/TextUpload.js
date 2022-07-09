import React, { useState } from "react";
import BackgroundImage from "../components/AddArticle/BackgroundImage";
import { db, storage } from "../utils/firebase";

const TextUpload = () => {
  const [data, setData] = useState({
    name: "",
    lName: "",
    email: "",
    age: "",
    image: null,
  });

  function HandleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setData((prev) => {
      return { ...prev, [name]: value };
    });
  }

  function publishBlog(e) {
    e.preventDefault();

    const uploadTask = storage.ref(`images/${data.image.name}`).put(data.image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        let progress;
        progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress);
      },
      (err) => {
        console.log(err);
      },
      () => {
        storage
          .ref("images/")
          .child(data.image.name)
          .getDownloadURL()
          .then((imageUrl) => {
            db.collection("postsImages")
              .add({
                name: data.name,
                lName: data.lName,
                email: data.email,
                age: data.age,
                image: imageUrl,
              })
              .then(() => {
                setData({
                  name: "",
                  lName: "",
                  email: "",
                  age: "",
                  image: null,
                });
              });
          });
      }
    );
  }
  return (
    <div className="h-screen pt-28 flex flex-col space-y-6">
      <input
        placeholder="First Name"
        name="name"
        onChange={HandleChange}
        value={data?.name}
      />
      <input
        placeholder="Last Name"
        name="lName"
        onChange={HandleChange}
        value={data.lName}
      />
      <input
        placeholder="Email"
        name="email"
        onChange={HandleChange}
        value={data.email}
      />
      <input
        placeholder="Age"
        name="age"
        onChange={HandleChange}
        value={data.age}
      />

      <BackgroundImage setData={setData} />

      <button onClick={publishBlog}>Publish Changes</button>
    </div>
  );
};

export default TextUpload;
