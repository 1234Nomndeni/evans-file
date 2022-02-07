import React from 'react';
import { Fragment, useEffect, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon, SearchIcon } from '@heroicons/react/outline'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, login, logout } from '../features/userSlice';
import { auth } from '../utils/firebase';
// import { Avatar } from '@mui/material/core';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Header = () => {
    const [show, handleShow] = useState(false);
    const [isOpen, setIsOpen] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    const user = useSelector(selectUser)
    const dispatch = useDispatch()


    const { pathname } = location
    const getLocation = pathname.split('/')

    const toogle = () => {
        setIsOpen(!isOpen)
    }

    const transitionNavBar = () => {
        if (window.scrollY > 100) {
            handleShow(true)
        } else {
            handleShow(false)
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", transitionNavBar);
        return () => window.removeEventListener("scroll", transitionNavBar)
    }, [])

    const signoutOfApp = () => {
        dispatch(logout);
        auth.signOut()

        // if (user) {
        //     auth.signOut()
        // }

    }


    //validate and keep the user loggedIn
    useEffect(() => {
        auth.onAuthStateChanged(userAuth => {
            if (userAuth) {
                dispatch(login({
                    email: userAuth.email,
                    uid: userAuth.uid,
                    displayName: userAuth.displayName,
                }))
            } else {
                dispatch(logout)
            }
        })
    }, [dispatch])

    return (
        <Disclosure as="nav" className={`nav ${show && 'bg-white p-1'} `}>
            {({ open }) => (
                <>
                    <div className="w-7xl mx-auto px-2 p-1 sm:px-6 xl:px-8 border-b-2 shadow-md bg-white">
                        <div className="relative flex items-center justify-between h-16 mx-auto mx-wd">
                            <div className="absolute inset-y-0 left-0 flex items-center lg:hidden" >
                                {/* Mobile menu button*/}
                                <Disclosure.Button onClick={toogle} className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
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
                                    <h3 onClick={() => navigate("/")} className=" hidden lg:hidden cursor-pointer h-8 w-auto items-center color text-xl">Evansify</h3>

                                    <div className=" hidden lg:block  h-8 w-auto color text-2xl ">
                                        <h2 onClick={() => navigate("/")} className="cursor-pointer">Evansify</h2>
                                    </div>
                                </div>
                                <div className="hidden lg:block ml-10 w-3/5 ">
                                    <div className="flex space-x-9 items-center border-2 rounded-lg pr-4">

                                        <input type="text" className="rounded-lg p-2 text-sm focus:outline-none w-100 w-full " placeholder="Search topic..." />
                                        <SearchIcon className=" block h-5 w-5 mr-10 cursor-pointer" />

                                    </div>
                                </div>
                            </div>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                <li className={getLocation[1] === "our_story" ? "list-none text-gray-900 font-bold  w-40" : "list-none"}>
                                    <Link to='/our_story' className="text-md  pl-2 cursor-pointer mr-10  p-2  ">
                                        Our Story
                                    </Link>

                                </li>

                                <p onClick={() => navigate("/new")} className="text-gray-700 border-4 px-6  hover:bg-gray-200 font-bold text-md p-2 cursor-pointer rounded-md" >Start Writing</p>
                                <span onClick={() => navigate('/notifications')} className="hidden cursor-pointer transform hover:scale-105  ml-12 mr-10 sm:block">
                                    <p className="absolute animate-pulse bg-c text-md text-center h-6 w-6 text-white rounded-full font-bold -mt-3 ml-4 z-50 ">
                                        7
                                    </p>
                                    <BellIcon className="text-sm h-8 relative text-gray-700 " />
                                </span>

                                {/* Profile dropdown */}
                                {!user ? (
                                    <>
                                        <button onClick={() => navigate('/signIn')} className="p-2 font-bold bg-c rounded-sm text-white hover:bg-red-600 mr-4">Login</button>
                                        <button onClick={() => navigate('/signIn')} className="p-2 font-bold bg-c rounded-sm text-white hover:bg-red-600 ">Sign In</button>
                                    </>
                                ) : (

                                        <Menu as="div" className="ml-3 relative">
                                            <div>
                                                <Menu.Button className="bg-green-800 flex text-sm rounded-full ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                    {/* <span className="p-3 font-bold text-sm text-white"> {user?.email[0]}</span> */}

                                                    <span className="bg-green-200 w-12 font-mono p-2 uppercase text-2xl color h-12 border-2 border-gray-900 rounded-full text-center">
                                                        {user?.email[0]}{user?.email[1]}
                                                    </span>
                                                    <img src={user.photoURL} alt="" />
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

                                                <Menu.Items className="origin-top-right absolute right-0 mt-2 w-400 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <Link className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')} to={user && '/'}>
                                                                <div className="header__option">
                                                                    <span className="header__optionLineOne">Hello {!user ? 'Guest' : user.email}</span>

                                                                </div>
                                                            </Link>
                                                        )}
                                                    </Menu.Item>
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <a
                                                                href="/settings"
                                                                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                            >
                                                                Settings
                                                            </a>

                                                        )}
                                                    </Menu.Item>
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <Link className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')} to={!user && '/'}>
                                                                <div onClick={signoutOfApp} className="header__option">
                                                                    <span className="header__optionLineTwo">Logout</span>
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

                    <Disclosure.Panel className="lg:hidden bg-black z-100">
                        <div className={!isOpen ? "lg:hidden bg-black px-2 pt-2 pb-3 space-y-1 " : ''} onClick={toogle}>
                            <p onClick={() => navigate("/")} className="text-gray-300 hover:bg-gray-900 hover:text-white text-lg p-2 cursor-pointer rounded-md" >Home</p>
                            <p onClick={() => navigate("/contacts")} className="text-gray-300 hover:bg-gray-700 hover:text-white text-lg p-2 cursor-pointer rounded-md" >Contacts</p>
                        </div>

                    </Disclosure.Panel>
                </>
            )
            }
        </Disclosure >
    )
}

export default Header
