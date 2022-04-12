import { ChatIcon, HeartIcon, ShareIcon } from '@heroicons/react/outline';
import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import pinIcon from '../images/pin.png'

const WelcomeNote = ({commentCount}) => {
  const navigate = useNavigate()
  return (
    <main className="w-full border-2 rounded-md bg-white p-5 mb-2 hover:border-purple-800 duration-150">
      <section className="flex justify-between">
        <section className="flex items-center ">
          <span className="bg-yellow-300 w-10 font-mono p-1 pl-3 uppercase text-xl text-gray-800 h-10 border-2 border-yellow-300 rounded-full">
            M
          </span>
          <span className="ml-2">
            <h3 className="text-sm">Melbite verified</h3>
            <p className="text-sm text-gray-500">Published Apr/8/2022</p>
          </span>
        </section>
        <div className="flex flex-col items-center mr-2">
          <img className="h-6" src={pinIcon} alt="" />
          <p className="text-sm text-purple-900 font-bold">Pinned</p>
        </div>
      </section>

      <section className="mt-2">
        <span
          onClick={() =>
            navigate(
              "/Welcome-to-Melbite-the-official-blogging-site-or-the-world"
            )
          }
        >
          <h1 className="leading-9 text-3xl text-gray-900 hover:text-purple-900 cursor-pointer">
            Welcome to Melbite, We are glad to have you on board!{" "}
          </h1>
        </span>
      </section>

      <section className="flex justify-between mt-4">
        <span className="flex items-center w-2/5 justify-between text-gray-400">
          <Link
            to=""
            className="flex items-center hover:bg-gray-200 p-2 rounded-md cursor-pointer"
          >
            <HeartIcon className="w-6 cursor-pointer " />
            <p className="ml-1 text-sm text-gray-500"></p>
            <p className="hidden sm:block ml-2 text-sm text-gray-600">React</p>
          </Link>

          <Link
            to=""
            className="flex items-center hover:bg-gray-200 p-2 rounded-md cursor-pointer"
          >
            <ChatIcon className="w-6 cursor-pointer text-gray-500 " />
            <p className="ml-1 text-sm text-gray-500">{commentCount}</p>
            <p className="hidden sm:block ml-2 text-sm text-gray-600">
              Comment
            </p>
          </Link>
        </span>
        <span
          onClick={() => {
            window.open(`http://google.com`, "_blank");
          }}
          className="flex items-center hover:bg-gray-200 p-2 rounded-md cursor-pointer"
        >
          <ShareIcon className="h-7 cursor-pointer rounded-full p-1 text-gray-500 " />

          <p className="hidden sm:block ml-2 text-sm text-gray-600">
            Broadcast
          </p>
        </span>
      </section>
    </main>
  );
}

export default WelcomeNote