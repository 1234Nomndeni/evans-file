import React, { useState } from "react";
import { db, storage } from "../../utils/firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";

const CreateCommunity = () => {
  const user = useSelector(selectUser);
  const [communityName, setCommunityName] = useState("");
  const [communityImage, setCommunityImage] = useState(null);
  const [communityProfileImage, setCommunityProfileImage] = useState("");
  const [communityWebsite, setCommunityWebsite] = useState("");
  const [communityBio, setCommunityBio] = useState("");
  const [myCommunities, setMyCommunities] = useState([]);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setCommunityImage(e.target.files[0]);
    }
  };
  const createCommunity = (e) => {
    e.preventDefault();
    try {
      const uploadTask = storage
        .ref(`communityProfiles/${communityImage.name}`)
        .put(communityImage);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
        },
        (err) => {
          console.log("Create community error ", err);
        },
        () => {
          storage
            .ref("communityProfiles")
            .child(communityImage?.name)
            .getDownloadURL()
            .then((communityProfileImage) => {
              setCommunityProfileImage(communityProfileImage);
              console.log("Uploaded Image");
              db.collection("communities").add({
                communityName: communityName,
                communityProfileImage: communityProfileImage,
                communityWebsite: communityWebsite,
                communityBio: communityBio,
                communityMembers: [user.uid],
              });
              setCommunityName("");
              setCommunityImage(null);
              setCommunityWebsite("");
              setCommunityBio("");
            });
        }
      );
    } catch (error) {
      console.log("Error creating community", communityName);
    }
  };

  return (
    <main className="bg-white mt-24 mx-auto max-w-7xl px-5 py-7 border rounded-md">
      <h1>Create A Community</h1>
      <section className="mt-5 mx-wd3">
        <div className="mb-8">
          <h3 className="text-semibold">
            {" "}
            Community Name <span className="text-red-500">*</span>
          </h3>
          <input
            value={communityName}
            onChange={(e) => setCommunityName(e.target.value)}
            type="text"
            placeholder="Community Name"
            required
            className="w-full p-2 text:sm md:text-md text-gray-900 border border-gray-300 rounded-lg bg-white 
              focus:border-transparent"
          />
        </div>
        <div className="mb-8">
          <h3>
            {" "}
            Community Profile Image <span className="text-red-500">*</span>
          </h3>
          <input
            type="file"
            required
            accept=".jpeg, .jpg, .png"
            onChange={handleImageChange}
          />
        </div>
        <div className="mb-8">
          <h3> Community Website</h3>
          <input
            value={communityWebsite}
            onChange={(e) => setCommunityWebsite(e.target.value)}
            type="text"
            placeholder="Community Website"
            className="w-full p-2 text:sm md:text-md text-gray-900 border border-gray-300 rounded-lg bg-white 
              focus:border-transparent"
          />
        </div>
        <div className="mb-8">
          <h3>
            {" "}
            Community Bio <span className="text-red-500">*</span>
          </h3>
          <textarea
            cols="30"
            rows="10"
            value={communityBio}
            onChange={(e) => setCommunityBio(e.target.value)}
            placeholder="Community Description"
            required
            className="w-full p-2 text:sm md:text-md text-gray-900 border border-gray-300 rounded-lg bg-white 
              focus:border-transparent"
          ></textarea>
        </div>
        <button
          onClick={createCommunity}
          className="text-xs md:text-sm border border-purple-600 text-purple-800 hover:bg-purple-800 hover:text-white px-7 hover:ease-in-out duration-150 py-2 rounded-full transform hover:scale-105 cursor-pointer"
        >
          Create Community
        </button>
      </section>
    </main>
  );
};

export default CreateCommunity;
