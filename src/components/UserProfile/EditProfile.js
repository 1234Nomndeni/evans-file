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
      <section className="flex flex-col justify-between mx-h bg-white py-5 px-8 shadow-md">
        <section>
          <div className="flex items-center gap-2 mb-6 cursor-pointer">
            <DashboardIcon className="text-green-400" />
            <p className="text-md md:text-xl">Dashboard</p>
          </div>
          <div className="flex items-center gap-2 mb-6 cursor-pointer">
            <NotificationImportantIcon className="text-yellow-400" />
            <p className="text-md md:text-xl">Notifications</p>
          </div>
          <div className="flex items-center gap-2 mb-6 cursor-pointer">
            <SettingsIcon className="text-pink-500" />
            <p className="text-md md:text-xl">Settings</p>
          </div>
          <div className="flex gap-2 mb-3">
            <ManageAccountsIcon className="text-purple-600" />
            <div>
              <p className="text-md md:text-xl">Profile</p>
              <span className="flex ml-3 mt-2 cursor-pointer">
                <EditIcon className="w-6 h-2 mr-1 text-green-400" />
                <p className="">Edit</p>
              </span>
              <span className="flex ml-3 mt-2 cursor-pointer">
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

      <section className="w-full ml-20">
        <div className="bg-white rounded-md shadow-md px-5 py-4 flex justify-between gap-3 items-center">
          <h2 className="text-xl">Edit Profile</h2>
          <span className="flex gap-6">
            <NotificationImportantIcon />
            <span>M</span>
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
                //   value={tagName}
                //   onChange={(e) => setTagName(e.target.value)}
                className="mb-3 mt-1"
                placeholder="#letsLearn, #javascript"
              />
              {/* <p>My Name isb {user?.tagName}</p> */}
            </div>
            <div className="flex flex-col">
              <label for="" className="font-semibold">
                #TagName
              </label>
              <input
                //   value={tagName}
                //   onChange={(e) => setTagName(e.target.value)}
                className="mt h-10 p-3 border border-gray-300 focus:outline-none focus:border-purple-700 rounded mt-1"
                placeholder="#letsLearn, #javascript"
              />
              {/* <p>My Name isb {user?.tagName}</p> */}
            </div>
            <div className="flex flex-col mt-5">
              <label className="font-semibold">Add Website</label>
              <input
                //   value={website}
                //   onChange={(e) => setWebsite(e.target.value)}
                className="mt h-10 p-3 border border-gray-300 focus:outline-none focus:border-purple-700 rounded mt-1"
                placeholder="https://example.com"
              />
            </div>
            <div className="flex flex-col mt-5">
              <label className="font-semibold">Add Location</label>
              <input
                //   value={location}
                //   onChange={(e) => setLocation(e.target.value)}
                className="mt h-10 p-3 border border-gray-300 focus:outline-none focus:border-purple-700 rounded mt-1"
                placeholder="Nairobi, Califonia, USA etc"
              />
            </div>

            <div className="flex flex-col mt-5">
              <label for="" className="font-semibold">
                Work Experience
              </label>
              <input
                //   value={workExperience}
                //   onChange={(e) => setWorkExperience(e.target.value)}
                className="mt h-10 p-3 border border-gray-300 focus:outline-none focus:border-purple-700 rounded mt-1"
                placeholder="Tech Lead,CEO etc.."
              />
            </div>
            <div className="flex flex-col mt-5">
              <label for="" className="font-semibold">
                Add Skills
              </label>
              <textarea
                //   value={skills}
                //   onChange={(e) => setSkills(e.target.value)}
                className="mt h-18 p-3 pt-1 border border-gray-300 focus:outline-none focus:border-purple-700 rounded mt-1"
                placeholder="Lawyer, software dev, Content Creator"
              ></textarea>
            </div>
            <div className="flex flex-col mt-5">
              <label for="" className="font-semibold">
                Add Bio
              </label>
              <textarea
                //   value={biography}
                //   onChange={(e) => setBiography(e.target.value)}
                className="mt h-32 p-3 border border-gray-300 focus:outline-none focus:border-purple-700 rounded mt-1"
                placeholder="Add your bio"
              ></textarea>
            </div>

            <div className="flex justify-between items-center flex-wrap mt-5">
              <button
                // onClick={updateProfile}
                className="bg-c p-3 px-11 text-white rounded-md hover:bg-purple-700 duration-100"
              >
                Update Profile
              </button>
              <button className="bg-red-600 p-3 text-white rounded-md hover:bg-red-700 duration-100">
                Delete Account
              </button>
            </div>
          </div>
          <div className="w-2/6 bg-white mt-5 px-5 py-3 shadow-md ">
            <p className="font-semibold text-gray-700 mb-3">
              Choose your Main Interest
            </p>
            {/* <li class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600"> */}
            <div class="flex items-center pl-3">
              <input
                id="vue-checkbox"
                type="checkbox"
                value=""
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
              />
              <label
                for="vue-checkbox"
                class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                All
              </label>
            </div>
            <div class="flex items-center pl-3">
              <input
                id="vue-checkbox"
                type="checkbox"
                value=""
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
              />
              <label
                for="vue-checkbox"
                class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Art
              </label>
            </div>
            <div class="flex items-center pl-3">
              <input
                id="vue-checkbox"
                type="checkbox"
                value=""
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
              />
              <label
                for="vue-checkbox"
                class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Programming
              </label>
            </div>
            <div class="flex items-center pl-3">
              <input
                id="vue-checkbox"
                type="checkbox"
                value=""
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
              />
              <label
                for="vue-checkbox"
                class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Health
              </label>
            </div>
            <div class="flex items-center pl-3">
              <input
                id="vue-checkbox"
                type="checkbox"
                value=""
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
              />
              <label
                for="vue-checkbox"
                class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Business
              </label>
            </div>
            <div class="flex items-center pl-3">
              <input
                id="vue-checkbox"
                type="checkbox"
                value=""
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
              />
              <label
                for="vue-checkbox"
                class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Vue JS
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
