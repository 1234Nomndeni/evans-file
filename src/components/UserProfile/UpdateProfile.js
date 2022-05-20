import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import { auth, db } from '../../utils/firebase';
import { useNavigate } from "react-router-dom";
import { DriveEta } from '@mui/icons-material';

const UpdateProfile = (props) => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [tagName, setTagName] = useState();
  const [website, setWebsite] = useState();
  const [location, setLocation] = useState("");
  const [workExperience, setWorkExperience] = useState("");
  const [skills, setSkills] = useState("");
  const [biography, setBiography] = useState("");

  const updateProfile = (e) => {
    e.preventDefault();
    db.collection("Users").doc(user?.uid).update(
      {
        tagName: tagName,
        website: website,
        workExperience: workExperience,
        skills: skills,
        biography: biography,
        uid: user.uid,
      },
      { merge: true }
    );

    setTagName("");
    setWebsite("");
    setWorkExperience("");
    setSkills("");
    setBiography("");
  };

  // useEffect(() => {
  //   db.collection('Users').doc(user.uid).onSnapshot((snapshot) => setUserData(
  //     snapshot.docs.map((doc) => ({
  //       id: doc.id,
  //       data: doc.data()
  //     }))
  //   ))
  // }, [])

  return (
    <main className="pt-24 mx-wd1 flex flex-wrap justify-between mx-auto">
      <section className=" mr-12 md:w-2/3 sm:w-full">
        <section className="bg-white rounded-sm border border-gray-300">
          <div className="rounded-t-md bg-c flex items-center flex-col justify-center h-24">
            {/* <img
              className="h-24 w-24 rounded-full cursor-pointer border-4 border-white -mb-9"
              src="https://media-exp1.licdn.com/dms/image/C5603AQHorwJKFNaR3Q/profile-displayphoto-shrink_200_200/0/1604525502427?e=1651104000&v=beta&t=qQWYuaSO3aJXzhEWBd1rH-Jckg6R407_GGU-2DMWhxw"
              alt=""
            />
            <input
              type="file"
              className="hidden md:block ml-52 -mb-16 cursor-pointer text-purple-900 font-semibold"
            /> */}
          </div>

          <div className="mt-12">
            <h1 className="text-center text-xl">{user?.displayName}</h1>
            <div className="p-6 pt-3">
              <div className="flex flex-col">
                <label for="">#TagName</label>
                <input
                  value={tagName}
                  onChange={(e) => setTagName(e.target.value)}
                  className="mt h-10 p-3 border border-gray-300 focus:outline-none focus:border-purple-700 rounded mt-1"
                  placeholder="#letsLearn, #javascript"
                />
                {/* <p>My Name isb {user?.tagName}</p> */}
              </div>
              <div className="flex flex-col mt-5">
                <label>Add Website</label>
                <input
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="mt h-10 p-3 border border-gray-300 focus:outline-none focus:border-purple-700 rounded mt-1"
                  placeholder="https://example.com"
                />
              </div>
              <div className="flex flex-col mt-5">
                <label>Add Location</label>
                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="mt h-10 p-3 border border-gray-300 focus:outline-none focus:border-purple-700 rounded mt-1"
                  placeholder="Nairobi, Califonia, USA etc"
                />
              </div>
              <div className="flex flex-col mt-5">
                <label for="">Work Experience</label>
                <input
                  value={workExperience}
                  onChange={(e) => setWorkExperience(e.target.value)}
                  className="mt h-10 p-3 border border-gray-300 focus:outline-none focus:border-purple-700 rounded mt-1"
                  placeholder="Tech Lead,CEO etc.."
                />
              </div>
              <div className="flex flex-col mt-5">
                <label for="">Add Skills</label>
                <textarea
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  className="mt h-18 p-3 pt-1 border border-gray-300 focus:outline-none focus:border-purple-700 rounded mt-1"
                  placeholder="Lawyer, software dev, Content Creator"
                ></textarea>
              </div>
              <div className="flex flex-col mt-5">
                <label for="">Add Bio</label>
                <textarea
                  value={biography}
                  onChange={(e) => setBiography(e.target.value)}
                  className="mt h-32 p-3 border border-gray-300 focus:outline-none focus:border-purple-700 rounded mt-1"
                  placeholder="Add your bio"
                ></textarea>
              </div>
            </div>
          </div>
        </section>
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
      </section>

      <section className="rounded-sm">
        <button
          onClick={() => navigate("/dashboard")}
          className="bg-c text-white py-2 px-12 w-full mt-5 font-bold"
        >
          My Articles
        </button>
      </section>
    </main>
  );
}

export default UpdateProfile