import React from "react";
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

const ProfilePreview = () => {
  const navigate = useNavigate();
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
        <article className="flex items-top">
          <img
            className="rounded-md w-48 h-32"
            src="https://media.licdn.com/dms/image/C5603AQHorwJKFNaR3Q/profile-displayphoto-shrink_800_800/0/1604525502427?e=1678924800&v=beta&t=GyjN_4oha_XLHHeaQ3lGRM9RRc4KELCBoj2mcEcRhuE"
            alt=""
          />

          <div className="ml-12">
            <h1 className="text-md md:text-2xl">Evans Mutuku</h1>
            <p className="font-semibold">Founder - Melbite</p>
            <p className="text-purple-600 font-semibold mt-4">
              #JavascriptDaddie
            </p>
          </div>
        </article>
        <article className="mt-16 w-4/6 p-2">
          <h1>About</h1>
          <div className="flex justify-between gap-28 mb-4 mt-3">
            <div className="flex flex-col gap-6 mb-4">
              <span className="font-semibold">User ID</span>
              <span className="font-semibold">Name</span>
              <span className="font-semibold">Email</span>
              <span className="font-semibold">Website</span>
              <span className="font-semibold">Location</span>
              <span className="font-semibold">Work</span>
              <span className="font-semibold">Skills</span>
              <span className="font-semibold">Bio</span>
            </div>

            <div className="flex flex-col gap-6 mb-4">
              <p>JTVSv390jv03J300Pod</p>
              <p>Evans Mutuku</p>
              <p>evansnyamai98@gmail.com</p>
              <a href="https://melbite.com" className="text-purple-500 underlined" target="_blank">https://melbite.com</a>
              <p>Nairobi - Kenya</p>
              <p>Founder - Melbite</p>
              <p>Javascript, React, NodeJs, NextJs, Tailwind, Typescript</p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni
                natus tempora vero sunt dolor voluptatum, fugiat cum? Quaerat
                aperiam sequi veniam sunt, officiis quo mollitia velit tenetur,
                quis minima veritatis.
              </p>
            </div>
          </div>
        </article>
      </section>
    </main>
  );
};

export default ProfilePreview;
