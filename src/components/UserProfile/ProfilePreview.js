import React, { useEffect, useState } from "react";
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
import { db } from "../../utils/firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";

const ProfilePreview = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [userProfileDetails, setUserProfileDetails] = useState([]);

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

      <section className="w-full ml-20 bg-white">
        {userProfileDetails &&
          userProfileDetails.map((userData) => {
            return (
              <>
                {/* <div className="blog-container">
                  <h4>{userData.location}</h4>
                  <p>{userData.skills}</p>
                </div> */}

                <article className="flex items-top">
                  <img
                    className="rounded-md w-48 h-32"
                    src={userData.profileImage}
                    alt=""
                  />

                  <div className="ml-12">
                    <h1 className="text-md md:text-2xl">{user.displayName}</h1>
                    <p className="font-semibold">{userData?.workExperience}</p>
                    <p className="text-purple-600 font-semibold mt-4 flex items-center">#
                    {userData?.tagName}
                    </p>
                  </div>
                </article>
                <article className="mt-16 w-4/6 p-2">
                  <h1>About</h1>
                  <div className="flex justify-between gap-28 mb-4 mt-3">
                    <div className="flex flex-col gap-6 mb-4">
                      <span className="font-semibold">User ID</span>
                      <span className="font-semibold">Name</span>
                      {/* <span className="font-semibold">Email</span> */}
                      <span className="font-semibold">Website</span>
                      <span className="font-semibold">Location</span>
                      <span className="font-semibold">Work</span>
                      <span className="font-semibold">Skills</span>
                      <span className="font-semibold">Bio</span>
                    </div>

                    <div className="flex flex-col gap-6 mb-4">
                      <p>{userData.uid}</p>
                      <p>{user.displayName}</p>
                      {/* <p>{userData.emailAddress}</p> */}
                      <a
                        href="https://melbite.com"
                        className="text-purple-500 underlined"
                        target="_blank"
                      >
                        {userData.website}
                      </a>
                      <p>{userData.location}</p>
                      <p>{userData.workExperience}</p>
                      <p>
                        {userData.skills}
                      </p>
                      <p>
                      {userData.biography}
                      </p>
                    </div>
                  </div>
                </article>
              </>
            );
          })}
      </section>
    </main>
  );
};

export default ProfilePreview;
