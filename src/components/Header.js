import { Fragment, useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  MenuIcon,
  XIcon,
  BellIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/outline";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, login, logout } from "../features/userSlice";
import { auth } from "../utils/firebase";
import brandLogo from "./images/melbiteLogo.png";
import brandLogo1 from "./images/melbite.jpg";
import SearchBar from "./SuperActions/SearchBar";
import LatestUpdates from "./LatestUpdates";
// import Ether from "../tests/Ether";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Header = () => {
  const [show, handleShow] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [active] = useState(false);

  const { pathname } = location;
  const getLocation = pathname.split("/");

  const toogle = () => {
    setIsOpen(!isOpen);
  };

  const closeOnNavigate = () => {
    setIsOpen(isOpen);
  };

  const transitionNavBar = () => {
    if (window.scrollY > 100) {
      handleShow(true);
    } else {
      handleShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", transitionNavBar);
    return () => window.removeEventListener("scroll", transitionNavBar);
  }, []);

  const signOutOfApp = () => {
    dispatch(logout);
    auth.signOut();
    window.location.reload(false);

    if (user) {
      auth.signOut();
    }
    navigate("/");
  };

  /******************************************************** */
  /*/validate and keep the user loggedIn*/
  /******************************************************** */

  useEffect(() => {
    auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        dispatch(
          login({
            email: userAuth.email,
            uid: userAuth.uid,
            displayName: userAuth.displayName,
          })
        );
      } else {
        dispatch(logout);
      }
    });
  }, [dispatch]);

  return (
    <Disclosure as="nav" className={`nav ${show && "bg-white p-1"} `}>
      {({ open }) => (
        <>
          <div className="w-7xl mx-auto px-2 p-1 sm:px-6 xl:px-8 border-b-2 shadow-md bg-white">
            <div className="relative flex items-center justify-between h-16 mx-auto mx-wd">
              <div className="absolute inset-y-0 left-0 flex items-center lg:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button
                  onClick={toogle}
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                >
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className=" flex-1 p-2 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <div className=" hidden lg:block w-auto ">
                    {/* <img
                      className="h-10 w-40 cursor-pointer"
                      onClick={() => navigate("/")}
                      src={brandLogo}
                      alt="melbite Logo"
                    /> */}

                    <img
                      className="h-11 w-36 cursor-pointer"
                      onClick={() => navigate("/")}
                      src={brandLogo1}
                      alt="melbite Logo"
                    />
                    {/* <h2 onClick={() => navigate("/")} className="text-2xl text-purple-900 cursor-pointer">Melbite</h2> */}
                  </div>
                </div>
                <div className="hidden lg:block ml-10 w-4/5 ">
                  {/* <SearchBar/> */}
                  <SearchBar />
                </div>
              </div>
              <div className="absolute space-x-5 inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <li
                  className={
                    getLocation[1] === "about"
                      ? "list-none text-purple-900 font-bold"
                      : "list-none"
                  }
                >
                  <Link
                    to="/about"
                    className="hidden md:block text-md pl-2 cursor-pointer mr-10  p-2  "
                  >
                    Our Story
                  </Link>
                </li>

                <p
                  onClick={() => navigate("/new")}
                  className="hidden text-sm md:block border border-purple-600 text-purple-800 px-5 hover:ease-in-out duration-150 py-2 rounded-full transform hover:scale-105 cursor-pointer"
                >
                  Start Writing
                </p>
                {/* <Ether/> */}
                {/* <span
                  onClick={() => navigate("/notifications")}
                  className="hidden cursor-pointer transform hover:scale-105  ml-12 mr-10 sm:block"
                >
                  <p className="absolute animate-pulse bg-c text-md text-center h-6 w-6 text-white rounded-full font-bold -mt-3 ml-4 z-50 ">
                    0
                  </p>
                  <BellIcon className="text-sm h-8 relative text-gray-700 " />
                </span> */}

                {/* Dark/Light Mode */}
                {/* <div>
                  {active ? (<> <MoonIcon className="w-7 cursor-pointer text-gray-600 "/></>) : (<><SunIcon className="w-7 cursor-pointer text-gray-600 "/></>)}
                  <MoonIcon className="w-7 cursor-pointer text-gray-600 "/>
                  <SunIcon className="w-7 cursor-pointer text-gray-600 "/>
                </div> */}

                {/* Profile dropdown */}
                <Menu as="div" className="relative">
                  <div className="">
                    <Menu.Button className="mt-4">
                      <span className=" cursor-pointer transform hover:scale-105  mr-4 md:mr-10">
                        <p className=" animate-pulse bg-red-500 text-xs text-center h-5 w-5 pt-0.5 text-white rounded-full font-bold -mb-3 ml-4 z-50 ">8</p>
                        <BellIcon className="h-7 md:h-8 font-thin text-gray-500 " />
                      </span>
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items>
                      <Menu.Item className="w-64 md:w-80 origin-top-right absolute -right-20 md:-right-16 -mt-1  w-400 rounded-md shadow-lg pb-2 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="">
                          <LatestUpdates />
                        </div>
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
                {!user ? (
                  <>
                    <button
                      onClick={() => navigate("/signIn")}
                      className="border text-sm border-purple-600 text-purple-800 px-5 hover:ease-in-out duration-150 py-2 rounded-full transform hover:scale-105 cursor-pointer"
                    >
                      Get Started
                    </button>
                  </>
                ) : (
                  <Menu as="div" className="relative">
                    <div>
                      <Menu.Button className="bg-green-800 flex text-sm rounded-full ring-1 ring-opacity-5 focus:outline-none">
                        <span className="bg-c w-10 font-mono p-1 uppercase text-lg text-white h-10 border-2 rounded-full text-center">
                          {user?.displayName[0] || user?.email[0]}
                        </span>
                        {/* <img src={user.photoURL} alt="" /> */}
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="origin-top-right absolute right-0 mt-3 w-400 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                              to={user && "/"}
                            >
                              <div className="w-60">
                                <span className="">
                                  Hello, {!user ? "Guest" : user.displayName}
                                </span>
                              </div>
                            </Link>
                          )}
                        </Menu.Item>
                        {/* <Menu.Item>
                          {({ active }) => (
                            <a
                              href="/profile"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Settings
                            </a>
                          )}
                        </Menu.Item> */}
                        {/* <Menu.Item>
                          {({ active }) => (
                            <a
                              href="/dashboard"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              My Dashboard
                            </a>
                          )}
                        </Menu.Item> */}
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="/profile"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              My Profile & Dashboard
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                              to={!user && "/"}
                            >
                              <div
                                onClick={signOutOfApp}
                                className="header__option"
                              >
                                <span className="header__optionLineTwo">
                                  Logout
                                </span>
                              </div>
                            </Link>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                )}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="lg:hidden white z-100">
            <div
              className={
                !isOpen
                  ? "lg:hidden bg-white px-2 pt-2 pb-3 space-y-1 border-b-2 "
                  : ""
              }
              onClick={toogle}
            >
              <p
                onClick={() => navigate("/")}
                className="text-gray-900 hover:text-purple-800  text-lg p-2 cursor-pointer rounded-md"
              >
                Home
              </p>
              <p
                onClick={() => navigate("/about")}
                className="text-gray-900 hover:text-purple-800 text-lg p-2 cursor-pointer rounded-md"
              >
                About Us
              </p>
              <p
                onClick={() => navigate("/contact-us")}
                className="text-gray-900 hover:text-purple-800 text-lg p-2 cursor-pointer rounded-md"
              >
                Contacts
              </p>
              <p
                onClick={() => navigate("/privacy-policy")}
                className="text-gray-900 hover:text-purple-900 text-lg p-2 cursor-pointer rounded-md"
              >
                Privacy Policy
              </p>
              <p
                onClick={() => navigate("/code-of-conduct")}
                className="text-gray-900 hover:text-purple-800 text-lg p-2 cursor-pointer rounded-md"
              >
                Code of Conduct
              </p>
              <p
                onClick={() => navigate("/new")}
                className="text-gray-900 hover:text-purple-800 text-lg p-2 cursor-pointer rounded-md"
              >
                Start Writing
              </p>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Header;
