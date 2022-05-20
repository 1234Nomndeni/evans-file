import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { selectUser } from '../../features/userSlice';
import { db } from '../../utils/firebase';


const UserDashboard = ({id, blogHeader, name_slug}) => {
  const navigate = useNavigate();
  const [userPosts, setUserPosts] = useState([])
  const user = useSelector(selectUser);
  const [userProfileData, setUserProfileData] = useState([]); 


  const fetchData = async()=> {
    try { 
      await db.collection(`posts`).doc(user?.uid).collection("userPosts")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setUserPosts(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        );
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, []);

  const deletePost = ()=> {
    db.collection("posts").doc(userPosts.id).delete().then(() => {
      alert("Article Deleted Successfully")
    })
  }

  useEffect(() => {
    db.collection("Users")
    .onSnapshot((snapshot) =>
      setUserProfileData(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
  }, []);
  
    return (
      <main className="min-h-screen mt-24 mx-wd1 mx-auto p-5 ">
        {/* <div>
          {userProfileData.map(
            ({
              id,
              data: { biography, displayName, skills, tagName, website },
            }) => (
              <div key={id}>
                <p> {biography}</p>
              </div>
            )
          )}
        </div> */}
        <section>
          <h3 className="text-4xl text-gray-600 mb-5">My Dashboard</h3>
        </section>
        <section className="flex flex-wrap justify-between">
          <section className="">
            {!userPosts ? (
              <section className="text-center">
                <h1 className="text-gray-400 mt-16 mb-16">
                  You've not posted yet!
                </h1>
                <button
                  onClick={() => navigate("/new")}
                  className="bg-c p-3 pl-6 pr-6 text-lg text-white rounded-md hover:bg-purple-900 "
                >
                  Create Your First Post
                </button>
              </section>
            ) : (
              <section className="flex flex-col justify-between">
                {userPosts?.map(
                  ({
                    id,
                    data: {
                      backgroundImage,
                      blogHeader,
                      blogBody,
                      currentTask,
                      timestamp,
                    },
                  }) => (
                    <div
                      className="bg-white hover:border-purple-500 border-2 rounded-lg p-3 mb-7 overflow-y-auto max-h-96"
                      key={id}
                    >
                      <p
                        className="mb-4"
                        dangerouslySetInnerHTML={{ __html: backgroundImage }}
                      />
                      <h3
                        className="text-2xl mb-4"
                        dangerouslySetInnerHTML={{ __html: blogHeader }}
                      />
                      <p
                        className="text-gray-800"
                        dangerouslySetInnerHTML={{ __html: blogBody }}
                      />
                      <p
                        className="text-gray-800"
                        dangerouslySetInnerHTML={{ __html: currentTask }}
                      />
                      <div className="flex flex-wrap justify-between w-full border-t pt-3">
                        <p className="text-red-600  cursor-pointer hover:text-red-500 font-semibold">
                          Delete
                        </p>
                        {/* <Link
                          to={`/${name_slug}/${id}`}
                          className="text-purple-700  cursor-pointer hover:text-purple-600 font-semibold"
                        > */}
                        <p
                          className="text-purple-700  cursor-pointer hover:text-purple-600 font-semibold"
                        >
                          View
                        </p>
                        <p className="text-green-700 cursor-pointer hover:text-green-500 font-semibold">
                          Edit
                        </p>
                      </div>
                    </div>
                  )
                )}
              </section>
            )}
          </section>
          {/* <section className="profile h-96 ml-10 min-w-max  rounded-md border border-gray-400 bg-white">
            <div className="bg-c h-20 border-t rounded-t-md flex items-center justify-center">
              <span className="bg-yellow-300 w-16 h-16  mt-20 border-5 border-white font-mono pl-6 font-bold items-center flex uppercase text-2xl text-center text-purple-800 border-2 rounded-full">
                E
              </span>
              <p className="relative mt-24 pt-3 ml-2 font-semibold">
                #JavascriptDaddie
              </p>
            </div>
            <div className="flex flex-col text-start p-3 mt-6">
              <button
                onClick={() => navigate("/profile")}
                className="bg-c text-white hover:bg-purple-800 w-full mt-3 p-2 rounded-md"
              >
                Update Profile
              </button>
              <span className="text-gray-800 text-md w-80 mt-3">
                <p className="text-sm">
                  This Is my Bio. have worked with several startups to bring
                  their ideas into reality
                </p>
                <div className="mt-2">
                  <h3 className="text-sm">LOCATION</h3>
                  <p className="text-sm">Nairobi - Kenya</p>
                </div>
                <div className="mt-2">
                  <h3 className="text-sm">WORK</h3>
                  <p className="text-sm">
                    Founder Of Melbite && evansify - tech Softwares
                  </p>
                </div>
                <div className="mt-2">
                  <h3 className="text-sm">WEBSITE</h3>
                  <a className="text-sm" href="https://melbite.com">
                    https://melbite.com
                  </a>
                </div>
              </span>
            </div>
          </section> */}
        </section>
      </main>
    );
}

export default UserDashboard