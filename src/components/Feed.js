import React from 'react'
import { UserCircleIcon, HeartIcon, ChatIcon, BookmarkIcon } from '@heroicons/react/outline'
import ReactTimeago from 'react-timeago'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { navigate } from '@reach/router'
import { selectOneBlog } from '../features/blogSlice'



const Feed = ({id, timestamp, blogHeader, blogBody, description, profilePic }) => {
      const dispatch = useDispatch();

    const openBlog = () => {
        dispatch(selectOneBlog({
            id, timestamp, blogHeader, blogBody, description, 
        }));

        navigate(`/posts/${id}`)
    };

    return (
        <main className="w-full border-2 rounded-md bg-white p-5 mb-2">

            <section className="flex items-center ">
                <UserCircleIcon className="w-10" />
                <span className="ml-2">
                    <h3 className="text-sm">{description}</h3>
                    <p className="text-sm text-gray-500">Posted <ReactTimeago date={new Date(timestamp?.toDate()).toUTCString()} /></p>
                </span>

            </section>


            <section className="mt-2">
                
                <Link to={`/posts/${id}`} onClick={openBlog}>
                    <h1 className="leading-9 text-3xl leading-none text-gray-900 hover:text-gray-500 cursor-pointer">{blogHeader}</h1>
                    <p className="truncate pt-2 " dangerouslySetInnerHTML={{ __html: blogBody }}></p>
                </Link>
            </section>

            <section className="flex justify-between mt-4">
                <span className="flex items-center w-2/5 justify-between text-gray-400">
                    <span className="flex items-center hover:bg-gray-200 p-2 rounded-md cursor-pointer">
                        <HeartIcon className="w-6 cursor-pointer color " fill="currentColor" />
                        <p className="ml-1 text-sm text-gray-500">122</p>
                        <p className="hidden sm:block ml-2 text-sm text-gray-600">Reactions</p>

                    </span>
                    <span className="flex items-center hover:bg-gray-200 p-2 rounded-md cursor-pointer">
                        <ChatIcon className="w-6 cursor-pointer text-gray-500 " />
                        <p className="ml-1 text-sm text-gray-500">23</p>
                        <p className="hidden sm:block ml-2 text-sm text-gray-600">Comments</p>

                    </span>
                </span>
                <span className="flex items-center hover:bg-gray-200 p-2 rounded-md cursor-pointer">
                    <BookmarkIcon className="w-6 cursor-pointer text-gray-500 " />
                    <p className="hidden sm:block ml-2 text-sm text-gray-600">Bookmark</p>
                </span>
            </section>



        {/* <CreatePost/> */}
        </main>
    )
}

export default Feed
