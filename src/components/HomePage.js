import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Feed from "./Feed";
import { db } from "../utils/firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import WelcomeNote from "./StaticPages/WelcomeNote";

const HomePage = () => {
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  /******************************************************** */ 
  /*Make the blog visible from the firebase to the front-end*/
  /******************************************************** */ 


  useEffect(() => {
    const unsubscribe = db.collection('posts')
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setArticles(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
      
      return () => {
        unsubscribe();
      }
  }, []);
  
  return (
    <main>
      <section className="mb-20">
        <nav className="w-full  bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500">
          <div className=" pb-8 mt-14 mx-auto mx-wd p-10">
            <h1 className="lg:text-3xl md:w-1/2 text-2xl mb-14 text-gray-700 prose  font-serif">
              Hello world! let's read, write and learn through melbite
            </h1>
            {!user ? (
              <button onClick={() => navigate('/signIn')} className="border border-purple-600 text-purple-800 px-5 hover:ease-in-out duration-150 py-2 rounded-full transform hover:scale-105 ">
                Sign Me Up
              </button>
            ): (
              <button onClick={() => navigate('/new')} className="border border-purple-600 text-purple-800 px-5 hover:ease-in-out duration-150 py-2 rounded-full transform hover:scale-105 ">
                Start Writting
              </button>
            )}
            
          </div>
        </nav>

        <main className="mt-5 mx-auto mx-wd1 ">
          <section className="flex justify-between h-full mt-5">

            <div className=" lg:w-3/5 sm:w-full">
              <WelcomeNote/>
              {articles.map(article => (
                <Feed key={article.id} id={article.id} blogHeader={article.data.blogHeader} blogBody={article.data.blogBody} displayName={article.data.displayName} backgroundImage={article.data.backgroundImage} timestamp={article.data.timestamp}  slug_name={article.data.slug_name} name_slug={article.data.name_slug} currentTask={article.data.currentTask} description={article.data.description} skills={article.data.skills} likeCount={article.data.likeCount} />
              ))}
              {/* {posts.map( 
                ({
                  id,
                  data: { uid, backgroundImage,profilePic, blogHeader,slug_name, blogBody,currentTask, timestamp, description,displayName,skills, likeCount },
                }) => (
                  <Feed
                    key={id}
                    id={id}
                    uid={uid}
                    backgroundImage={backgroundImage}
                    profilePic={profilePic}
                    blogHeader={blogHeader}
                    slug_name={slug_name}
                    blogBody={blogBody}
                    currentTask={currentTask}
                    timestamp={timestamp}
                    displayName={displayName}
                    skills={skills}
                    description={description}
                    likeCount={likeCount}
                  />
                )
              )}  */}
            </div> 

            <div className="hidden md:block ml-3 w-72 h-72">
              <div className=" border-2 flex-wrap bg-white p-4">
                <p onClick={() => navigate('/about') } className="text-sm cursor-pointer hover:text-purple-800 mb-2">About Us</p>
                <p onClick={() => navigate('/contact-us') } className="text-sm cursor-pointer hover:text-purple-800 mb-2">Contact Us</p>
                <p onClick={() => navigate('/myDashboard') } className="text-sm cursor-pointer hover:text-purple-800 mb-2">Your Account</p>
                <p onClick={() => navigate('/') } className="text-sm cursor-pointer hover:text-purple-800 mb-2">Sponser Us</p>
                <p onClick={() => navigate('/how-to-blog-at-melbite') } className="text-sm cursor-pointer hover:text-purple-800 mb-2">How to Blog Here</p>
                <p onClick={() => navigate('/privacy-policy') } className="text-sm cursor-pointer hover:text-purple-800 mb-2">Privacy Policy</p>
                <p onClick={() => navigate('/code-of-conduct') } className="text-sm cursor-pointer hover:text-purple-800">Code of Conduct</p>
              </div>
              <button onClick={() => navigate('/new')} className="bg-c text-white w-full py-2 mt-5 rounded-sm">Start Writing</button>
            </div>
          </section>
        </main>
      </section>
    </main>
  );
};

export default HomePage;
