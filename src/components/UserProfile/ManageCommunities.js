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

const ManageCommunities = () => {
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
  return <main></main>;
};

export default ManageCommunities;
