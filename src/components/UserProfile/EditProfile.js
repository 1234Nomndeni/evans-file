import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import NotificationImportantIcon from "@mui/icons-material/NotificationImportant";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import SettingsIcon from "@mui/icons-material/Settings";
import EditIcon from "@mui/icons-material/Edit";
import PreviewIcon from "@mui/icons-material/Preview";
import LogoutIcon from "@mui/icons-material/Logout";

const EditProfile = () => {
  return (
    <main className="pt-20 md:pt-28 mx-wd1 flex justify-between mx-auto">
      <section className="flex flex-col justify-between mx-h">
        <section>
          <div className="flex items-center gap-2 mb-3">
            <DashboardIcon className="text-green-400" />
            <p className="text-xl font-sans">Dashboard</p>
          </div>
          <div className="flex items-center gap-2 mb-3">
            <NotificationImportantIcon className="text-yellow-400" />
            <p className="text-xl font-serif">Notifications</p>
          </div>
          <div className="flex items-center gap-2 mb-3">
            <SettingsIcon className="text-pink-500" />
            <p className="text-xl">Settings</p>
          </div>
          <div className="flex gap-2 mb-3">
            <ManageAccountsIcon className="text-purple-600" />
            <div>
              <p className="text-sm md:text-xl">Profile</p>
              <span className="flex ml-3 mt-2">
                <EditIcon className="w-6 h-2 mr-1 text-green-400" />
                <p className="">Edit</p>
              </span>
              <span className="flex ml-3 mt-2">
                <PreviewIcon className="w-6 h-2 mr-1 text-yellow-600" />
                <p>View</p>
              </span>
            </div>
          </div>
        </section>
        <div className="flex items-between gap-2 cursor-pointer mb-4 font-semibold">
          <LogoutIcon className="text-purple-600" />
          <p className="">Log Out</p>
        </div>
      </section>


      <section></section>
    </main>
  );
};

export default EditProfile;
