import React from 'react'
import { UserCircleIcon, HeartIcon, ChatIcon, BookmarkIcon, ShareIcon } from '@heroicons/react/outline'
import ReactTimeago from 'react-timeago'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { navigate } from '@reach/router'
import { selectOneBlog } from '../features/blogSlice'
import { useSelector } from 'react-redux'
import { selectUser } from '../features/userSlice'
import { Avatar } from '@mui/material'



const Feed = ({id, backgroundImage, timestamp, blogHeader, blogBody, description, displayName,skills, likeCount, profilePic }) => {
    const dispatch = useDispatch();
    const user = useSelector(selectUser)

    const openBlog = () => {
        dispatch(selectOneBlog({
            id,backgroundImage, timestamp, blogHeader, blogBody, description, displayName,skills,likeCount
        }));

        navigate(`/posts/${id}`)
    };


    return (
        <main className="w-full border-2 rounded-md bg-white p-5 mb-2 hover:border-purple-800 duration-150">

            <section className="flex items-center ">
                {/* <UserCircleIcon className="w-10" /> */}
                  {/* <Avatar src= {profilePic}/> */}
                <span className="bg-yellow-300 w-10 font-mono p-1 pl-3 uppercase text-xl text-gray-800 h-10 border-2 border-yellow-300 rounded-full">
                    {displayName?.[0]}
                </span>
                <span className="ml-2">
                    <h3 className="text-sm">{displayName }</h3>
                    <p className="text-sm text-gray-500">Published <ReactTimeago date={new Date(timestamp?.toDate()).toUTCString()} /></p>
                </span>

            </section>


            <section className="mt-2">
                <Link to={`/posts/${id}`} onClick={openBlog}>
                    <h1 className="leading-9 text-3xl text-gray-900 hover:text-purple-900 cursor-pointer">{blogHeader}</h1>
                    {/* <p className="truncate pt-2 " dangerouslySetInnerHTML={{ __html: blogBody }}></p> */}
                </Link>
                {/* <img className="h-40" src={imageUrl} alt="Background_Image" /> */}
            </section>

            <section className="flex justify-between mt-4">
                <span className="flex items-center w-2/5 justify-between text-gray-400">
                    <span className="flex items-center hover:bg-gray-200 p-2 rounded-md cursor-pointer">
                        <HeartIcon className="w-6 cursor-pointer "/>
                        <p className="ml-1 text-sm text-gray-500">{likeCount}</p>
                        <p className="hidden sm:block ml-2 text-sm text-gray-600">Reactions</p>

                    </span>
                    <span className="flex items-center hover:bg-gray-200 p-2 rounded-md cursor-pointer">
                        <ChatIcon className="w-6 cursor-pointer text-gray-500 " />
                        <p className="ml-1 text-sm text-gray-500">23</p>
                        <p className="hidden sm:block ml-2 text-sm text-gray-600">Comments</p>

                    </span>
                </span>
                <span onClick={() => { window.open(`http://google.com`, "_blank")}} className="flex items-center hover:bg-gray-200 p-2 rounded-md cursor-pointer">
                    {/* <BookmarkIcon className="w-6 cursor-pointer text-gray-500 " /> */}
                    <ShareIcon className="h-7 cursor-pointer rounded-full p-1 text-gray-500 " />

                    <p className="hidden sm:block ml-2 text-sm text-gray-600">Broadcast</p>
                </span>
            </section>



        {/* <CreatePost/> */}
        </main>
    )
}

export default Feed
