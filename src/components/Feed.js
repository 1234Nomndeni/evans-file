import React from 'react'
import { HeartIcon, ChatIcon, ShareIcon } from '@heroicons/react/outline'
import ReactTimeago from 'react-timeago'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { selectOneBlog } from '../features/blogSlice'


const Feed = ({id, backgroundImage, timestamp, blogHeader, blogBody,currentTask, description, displayName,skills, likeCount }) => {
    const dispatch = useDispatch();

    const openBlog = () => {
        dispatch(selectOneBlog({
            id,backgroundImage, timestamp, blogHeader, blogBody,currentTask, description, displayName,skills,likeCount
        }));
    };


    return (
        <main className="w-full border-2 rounded-md bg-white p-5 mb-2 hover:border-purple-800 duration-150" >
            <section className="flex items-center ">
                <span className="bg-yellow-300 w-10 font-mono p-1 pl-3 uppercase text-xl text-gray-800 h-10 border-2 border-yellow-300 rounded-full">
                    {displayName?.[0]}
                </span>
                <span className="ml-2">
                    <h3 className="text-sm">{displayName }</h3>
                    <p className="text-sm text-gray-500">Published <ReactTimeago date={new Date(timestamp?.toDate()).toUTCString()} /></p>
                </span>

            </section>

            <section className="mt-2">
                <Link to={`/${displayName}/${blogHeader}`} onClick={openBlog}>
                    <h1 className="leading-9 text-3xl text-gray-900 hover:text-purple-900 cursor-pointer">{blogHeader } </h1>
                </Link>
            </section>

            <section className="flex justify-between mt-4">
              
                <span className="flex items-center w-2/5 justify-between text-gray-400">
                    <Link to={`/${displayName}/${blogHeader}`} onClick={openBlog} className="flex items-center hover:bg-gray-200 p-2 rounded-md cursor-pointer">
                        <HeartIcon className="w-6 cursor-pointer "/>
                        <p className="ml-1 text-sm text-gray-500">{likeCount}</p>
                        <p className="hidden sm:block ml-2 text-sm text-gray-600">React</p>

                    </Link>

                    <Link to={`/${displayName}/${blogHeader}`} onClick={openBlog} className="flex items-center hover:bg-gray-200 p-2 rounded-md cursor-pointer">
                        <ChatIcon className="w-6 cursor-pointer text-gray-500 " />
                        <p className="ml-1 text-sm text-gray-500"></p>
                        <p className="hidden sm:block ml-2 text-sm text-gray-600">Comment</p>

                    </Link>
                </span>
                <span onClick={() => { window.open(`http://google.com`, "_blank")}} className="flex items-center hover:bg-gray-200 p-2 rounded-md cursor-pointer">
                    <ShareIcon className="h-7 cursor-pointer rounded-full p-1 text-gray-500 " />

                    <p className="hidden sm:block ml-2 text-sm text-gray-600">Broadcast</p>
                </span>
            </section>
        </main>
    )
}

export default Feed
