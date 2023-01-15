import React, { useState, useEffect } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import NotificationImportantIcon from "@mui/icons-material/NotificationImportant";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import SettingsIcon from "@mui/icons-material/Settings";
import EditIcon from "@mui/icons-material/Edit";
import PreviewIcon from "@mui/icons-material/Preview";
import LogoutIcon from "@mui/icons-material/Logout";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { db, storage } from "../../utils/firebase";

const EditProfile = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [profilePic, setProfilePic] = useState(null);
  const [uploadedImage, setUploadedImage] = useState("");
  const [tagName, setTagName] = useState();
  const [website, setWebsite] = useState();
  const [location, setLocation] = useState("");
  const [workExperience, setWorkExperience] = useState("");
  const [skills, setSkills] = useState("");
  const [biography, setBiography] = useState("");
  const [progress, setProgress] = useState(0);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setProfilePic(e.target.files[0]);
    }
  };
  const updateProfile = (e) => {
    e.preventDefault();

    try {
      const uploadTask = storage
        .ref(`images/${profilePic.name}`)
        .put(profilePic);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (err) => {
          console.log(err);
        },
        () => {
          storage
            .ref("images")
            .child(profilePic?.name)
            .getDownloadURL()
            .then((uploadedImage) => {
              setUploadedImage(uploadedImage);
              console.log(uploadedImage)

              db.collection("Users").doc(user?.uid).set(
                {
                  uid: user.uid,
                  profileImage: uploadedImage,
                  tagName: tagName,
                  website: website,
                  location: location,
                  workExperience: workExperience,
                  skills: skills,
                  biography: biography,
                },
                { merger: true }
              );
              setProgress(0);
              setProfilePic(null);
              setTagName("");
              setWebsite("");
              setLocation("");
              setWorkExperience("");
              setSkills("");
              setBiography("");
            });
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="pt-20 md:pt-28 mx-wd1 flex justify-between mx-auto">
      <section className="flex flex-col justify-between mx-h bg-white py-5 px-8 shadow-md">
        <section>
          <div
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 mb-6 cursor-pointer"
          >
            <DashboardIcon className="text-green-400" />
            <p className="text-md md:text-xl">Dashboard</p>
          </div>
          <div
            onClick={() => navigate("/notifications")}
            className="flex items-center gap-2 mb-6 cursor-pointer"
          >
            <NotificationImportantIcon className="text-yellow-400" />
            <p className="text-md md:text-xl">Notifications</p>
          </div>
          <div
            onClick={() => navigate("/settings")}
            className="flex items-center gap-2 mb-6 cursor-pointer"
          >
            <SettingsIcon className="text-pink-500" />
            <p className="text-md md:text-xl">Settings</p>
          </div>
          <div
            onClick={() => navigate("/analytics")}
            className="flex items-center gap-2 mb-6 cursor-pointer"
          >
            <AnalyticsIcon className="text-blue-500" />
            <p className="text-md md:text-xl">Analytics</p>
          </div>
          <div className="flex gap-2 mb-3">
            <ManageAccountsIcon className="text-purple-600" />
            <div>
              <p className="text-md md:text-xl">Profile</p>
              <span
                onClick={() => navigate("/editprofile")}
                className="flex ml-2 mt-2 cursor-pointer"
              >
                <EditIcon className="w-6 h-2 mr-1 text-green-400" />
                <p className="">Edit</p>
              </span>
              <span
                onClick={() => navigate("/previewprofile")}
                className="flex ml-2 mt-2 cursor-pointer"
              >
                <PreviewIcon className="w-6 h-2 mr-1 text-yellow-600" />
                <p>View</p>
              </span>
            </div>
          </div>
        </section>
        <section>
          <div className="flex items-between gap-2 cursor-pointer mb-4 font-semibold">
            <ContactSupportIcon className="text-green-500" />
            <p>Support</p>
          </div>
          <div className="flex items-between gap-2 cursor-pointer mb-4 font-semibold">
            <LogoutIcon className="text-purple-600" />
            <p className="">Log Out</p>
          </div>
        </section>
      </section>

      <section className="w-full ml-20">
        <div className="bg-white rounded-md shadow-md px-5 py-4 flex justify-between gap-3 items-center">
          <h2 className="text-xl">Edit Profile</h2>
          <span className="flex gap-6 items-center">
            <NotificationImportantIcon className="text-pink-500" />
            <img
              className="rounded-full h-10 w-10 border-2 ring-4 ring-opacity-5"
              src="https://media.licdn.com/dms/image/C5603AQHorwJKFNaR3Q/profile-displayphoto-shrink_800_800/0/1604525502427?e=1678924800&v=beta&t=GyjN_4oha_XLHHeaQ3lGRM9RRc4KELCBoj2mcEcRhuE"
              alt=""
            />
          </span>
        </div>

        <section className="flex gap-7">
          <div className="mt-5 w-full">
            <div className="flex flex-col">
              <label for="" className="font-semibold">
                Profile Image
              </label>
              <input
                type="file"
                accept=".jpeg, .jpg, .png"
                onChange={handleImageChange}
                required
                className="mb-3 mt-1"
              />
              {/* <progress className=" text-blue-600" value={progress} max="100"/> */}
              {/* <p>My Name isb {user?.tagName}</p> */}
            </div>
            <div className="flex flex-col">
              <label for="" className="font-semibold">
                #TagName
              </label>
              <input
                value={tagName}
                onChange={(e) => setTagName(e.target.value)}
                className="mt h-10 p-3 border border-gray-300 focus:outline-none focus:border-purple-700 rounded mt-1"
                placeholder="#letsLearn, #javascript"
              />
              {/* <p>My Name isb {user?.tagName}</p> */}
            </div>
            <div className="flex flex-col mt-5">
              <label className="font-semibold">Add Website</label>
              <input
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="mt h-10 p-3 border border-gray-300 focus:outline-none focus:border-purple-700 rounded mt-1"
                placeholder="https://example.com"
              />
            </div>
            <div className="flex flex-col mt-5">
              <label className="font-semibold">Add Location</label>
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="mt h-10 p-3 border border-gray-300 focus:outline-none focus:border-purple-700 rounded mt-1"
                placeholder="Nairobi, Califonia, USA etc"
              />
            </div>

            <div className="flex flex-col mt-5">
              <label for="" className="font-semibold">
                Work Experience
              </label>
              <input
                value={workExperience}
                onChange={(e) => setWorkExperience(e.target.value)}
                className="mt h-10 p-3 border border-gray-300 focus:outline-none focus:border-purple-700 rounded mt-1"
                placeholder="Tech Lead,CEO etc.."
              />
            </div>
            <div className="flex flex-col mt-5">
              <label for="" className="font-semibold">
                Add Skills
              </label>
              <textarea
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                className="mt h-18 p-3 pt-1 border border-gray-300 focus:outline-none focus:border-purple-700 rounded mt-1"
                placeholder="Lawyer, software dev, Content Creator"
              ></textarea>
            </div>
            <div className="flex flex-col mt-5">
              <label for="" className="font-semibold">
                Add Bio
              </label>
              <textarea
                value={biography}
                onChange={(e) => setBiography(e.target.value)}
                className="mt h-32 p-3 border border-gray-300 focus:outline-none focus:border-purple-700 rounded mt-1"
                placeholder="Add your bio"
              ></textarea>
            </div>

            <div className="flex justify-between items-center flex-wrap mt-5">
              <button
                onClick={updateProfile}
                className="bg-c p-3 px-11 text-white rounded-md hover:bg-purple-700 duration-100"
              >
                Update Profile
              </button>
              <button className="bg-red-600 p-3 text-white rounded-md hover:bg-red-700 duration-100">
                Delete Account
              </button>
            </div>
          </div>
          <div className="w-2/6 bg-white mt-5 px-5 py-3 shadow-md h-1/6">
            <p className="font-semibold text-gray-700 mb-3">
              Choose your Main Interest
            </p>
            {/* <li class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600"> */}
            <div className="flex items-center pl-3 h-">
              <input
                id="all-checkbox"
                type="checkbox"
                value=""
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
              />
              <label
                for="all-checkbox"
                class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                All
              </label>
            </div>
            <div class="flex items-center pl-3">
              <input
                id="art-checkbox"
                type="checkbox"
                value=""
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
              />
              <label
                for="art-checkbox"
                class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Art
              </label>
            </div>
            <div class="flex items-center pl-3">
              <input
                id="programming-checkbox"
                type="checkbox"
                value=""
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
              />
              <label
                for="programming-checkbox"
                class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Programming
              </label>
            </div>
            <div class="flex items-center pl-3">
              <input
                id="crypto-checkbox"
                type="checkbox"
                value=""
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
              />
              <label
                for="crypto-checkbox"
                class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Crypto & Money
              </label>
            </div>
            <div class="flex items-center pl-3">
              <input
                id="health-checkbox"
                type="checkbox"
                value=""
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
              />
              <label
                for="health-checkbox"
                class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Health
              </label>
            </div>
            <div class="flex items-center pl-3">
              <input
                id="business-checkbox"
                type="checkbox"
                value=""
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
              />
              <label
                for="business-checkbox"
                class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Business
              </label>
            </div>
            {/* </li> */}
          </div>
        </section>
      </section>
    </main>
  );
};

export default EditProfile;
