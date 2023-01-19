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
import { logout, selectUser } from "../../features/userSlice";
import { auth } from "../../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import DashboardNavigator from "./DashboardNavigator";

const Notifications = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const signOutOfApp = () => {
    dispatch(logout);
    auth.signOut();
    window.location.reload(false);

    if (user) {
      auth.signOut();
    }
    navigate("/");
  };

  return (
    <main className="md:pt-28 mx-wd1 flex justify-between md:flex-row flex-col mx-auto">
      <div className="block md:hidden">
        <DashboardNavigator />
      </div>

      <section className="hidden md:flex flex-col justify-between mx-h bg-white py-5 px-8 shadow-md">
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
            onClick={() => navigate("")}
            className="flex items-center gap-2 mb-6 cursor-pointer"
          >
            <SettingsIcon className="text-pink-500" />
            <p className="text-md md:text-xl">Settings</p>
          </div>
          <div
            onClick={() => navigate("")}
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
          <div onClick={() => navigate("/contact-us")} className="flex items-between gap-2 cursor-pointer mb-4 font-semibold">
            <ContactSupportIcon className="text-green-500" />
            <p>Support</p>
          </div>
          <div
            onClick={signOutOfApp}
            className="flex items-between gap-2 cursor-pointer mb-4 font-semibold"
          >
            <LogoutIcon className="text-purple-600" />
            <p className="">Log Out</p>
          </div>
        </section>
      </section>


      <section className="w-full ml-0 md:ml-20">
        <h1>Notifications</h1>
        <p className="mt-20">Your Notifications will appear here</p>
      </section>
    </main>
  );
};

export default Notifications;
