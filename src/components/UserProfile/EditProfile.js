import { useState, useEffect } from "react";
import NotificationImportantIcon from "@mui/icons-material/NotificationImportant";

import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { db, storage } from "../../utils/firebase";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import DashboardNavigator from "./DashboardNavigator";
import DashboardLinks from "./DashboardLinks";

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

const EditProfile = ({ uid, editLocation }) => {
  const user = useSelector(selectUser);
  const [profilePic, setProfilePic] = useState(null);
  const [uploadedImage, setUploadedImage] = useState("");
  const [tagName, setTagName] = useState();
  const [website, setWebsite] = useState();
  const [location, setLocation] = useState("" || editLocation);
  const [workExperience, setWorkExperience] = useState("");
  const [skills, setSkills] = useState("");
  const [biography, setBiography] = useState("");
  const [progress, setProgress] = useState(0);

  const [userProfileDetails, setUserProfileDetails] = useState([]);

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
              console.log(uploadedImage);

              db.collection("Users")
                .doc(user?.uid)
                .set(
                  {
                    uid: user.uid,
                    profileImage: uploadedImage,
                    tagName: tagName,
                    website: website,
                    location: location,
                    workExperience: workExperience,
                    skills: skills,
                    biography: biography,
                    description: user.email,
                    displayName: user.displayName,
                    name_slug: user.displayName.replace(/\s/g, "-"),
                  },
                  { merge: true }
                );
              setProgress(0);
              setProfilePic(null);
              setTagName("");
              setWebsite("");
              setLocation("");
              setWorkExperience("");
              setSkills("");
              setBiography("");
              toast("Profile Details updated Successfully");
            });
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  // This function calculates the sum of two numbers
  const fetchUserProfileDetails = async () => {
    await db
      .collection("Users")
      .where("uid", "==", user?.uid)
      .onSnapshot((snapshot) => {
        setUserProfileDetails(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
      });
  };
  useEffect(() => {
    fetchUserProfileDetails();
  }, []);

  return (
    <main className="md:pt-28 mx-wd1 flex justify-between md:flex-row flex-col mx-auto">
      <div className="block md:hidden">
        <DashboardNavigator />
      </div>
      <section>
        <DashboardLinks />
      </section>

      <section className="w-full ml-0 md:ml-20">
        <div className="bg-white rounded-md shadow-md px-5 py-4 flex justify-between gap-3 items-center">
          <h2 className="text-xl">Edit Profile</h2>
          <span className="flex gap-6 items-center">
            <NotificationImportantIcon className="text-pink-500" />
            {userProfileDetails &&
              userProfileDetails.map((userData) => {
                return (
                  <article>
                    {!profilePic ? (
                      <img
                        className="rounded-full h-10 w-10 border-2 ring-4 ring-opacity-5"
                        src={userData.profileImage}
                        alt=""
                      />
                    ) : (
                      <span className="bg-c w-10 font-mono p-1 uppercase text-lg text-white h-10 border-2 rounded-full text-center">
                        {user?.displayName[0] || user?.email[0]}
                      </span>
                    )}
                  </article>
                );
              })}
          </span>
        </div>

        <section className="flex gap-7">
          <div className="mt-5 w-full">
            <div className="flex flex-col">
              <label for="" className="font-semibold">
                Profile Image
              </label>
              <input
                required
                type="file"
                accept=".jpeg, .jpg, .png"
                onChange={handleImageChange}
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
                required
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
                required
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="mt h-10 p-3 border border-gray-300 focus:outline-none focus:border-purple-700 rounded mt-1"
                placeholder="https://example.com"
              />
            </div>
            <div className="flex flex-col mt-5">
              <label className="font-semibold">Add Location</label>
              <input
                required
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
                required
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
                required
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
                required
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
              {/* <button className="bg-red-600 p-3 text-white rounded-md hover:bg-red-700 duration-100">
                Delete Account
              </button> */}
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
