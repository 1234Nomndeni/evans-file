import React from "react";
import { useSelector } from "react-redux";
import { selectOpenBlog } from "../features/blogSlice";
import {  HeartIcon, BookmarkIcon,UserCircleIcon } from '@heroicons/react/outline'

const SelectedBlog = () => {

  const selectedBlog = useSelector(selectOpenBlog)

  return (
    <main className="pt-24 mx-wd1 mx-auto flex justify-between pb-24 ">

      <section className="w-28 mt-8 fixed">
        <span className="flex flex-col items-center">
          <HeartIcon className="h-8 cursor-pointer hover:bg-red-100 duration-150 rounded-full p-1 hover:text-red-600"/>
          <p className="text-sm">24 </p>
        </span>
         <span className="flex flex-col items-center mt-10">
          <BookmarkIcon className="h-8 cursor-pointer hover:bg-green-100 duration-150 rounded-full p-1 hover:text-green-600"/>
          <p className="text-sm">Save </p>
        </span>
      </section>
      <section className="bg-white rounded-md mx-wd3 border border-gray-300 ml-32" >
        <img className="rounded-t-md" src="https://res.cloudinary.com/practicaldev/image/fetch/s--j7qmZp1D--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/g5az3tyb9xyt3scmezmu.png" alt="" />

       <div className="mt-4 ml-6 flex items-center">
         <UserCircleIcon className="w-12 mr-2"/>
         <span>
           <p className="text-md">{selectedBlog?.description} </p>
           <p className="text-sm text-gray-500 -mt-1">Posted 2hrs ago</p>
           {/* <p className="text-sm text-gray-500 -mt-1">{selectedBlog.timestamp}</p> */}
         </span>
       </div>

        <div className="ml-7 mr-7 mt-5 mb-4">
          <h2 className=" lg:text-4xl md:text-2xl sm:text-md text-black">{selectedBlog?.blogHeader}</h2>
          <span>
          <p className="font-sans pt-3 text-md leading-7" dangerouslySetInnerHTML={{ __html: selectedBlog?.blogBody }}/>
          </span>
        </div>

        <div className="mt-6 ml-7 mr-7 border-t border-gray-300">
          <h2 className="text-xl text-gray-900 pt-3" >Comments ({17})</h2>
        </div>
      </section>
      <section className="w-72 h-72 p-3 rounded-md bg-red-300">
        lorem ipasdgfjk asdh sadlj 
      </section>
      
      
    </main>
  );
};
export default SelectedBlog;
