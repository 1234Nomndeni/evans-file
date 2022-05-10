import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { selectUser } from '../../features/userSlice';
import { db } from '../../utils/firebase';


const UserDashboard = () => {
    const navigate = useNavigate();
    const [userPosts, setUserPosts] = useState([])
    const user = useSelector(selectUser);

    
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

    return (
        <main className='mt-24 mx-wd1 mx-auto bg-white border border-3 p-5 '>
            <section>
                <h3 className='text-4xl text-gray-600'>My Dashboard</h3>
            </section>
            <section className='mt-6 mb-6 w-5/6'>
              {!userPosts ? (
                <section className='text-center'>
                    <h1 className='text-gray-400 mt-16 mb-16'>You've not posted yet!</h1>
                    <button onClick={() => navigate('/new')} className='bg-c p-3 pl-6 pr-6 text-lg text-white rounded-md hover:bg-purple-900 '>Create Your First Post</button>
                </section>
              ) : (
                  <section className='flex flex-col justify-between'>
                    {userPosts?.map(({id, data: {backgroundImage,blogHeader, blogBody,currentTask,timestamp}}) => (
                      <div className='border p-3 w-6/6 ml-10 mb-20 overflow-y-auto max-h-96' key={id}>
                        <p className='mb-4' dangerouslySetInnerHTML={{__html:backgroundImage}} />
                        <h3 className='text-2xl mb-4' dangerouslySetInnerHTML={{__html:blogHeader }}/>
                        <p className='text-gray-800'  dangerouslySetInnerHTML={{__html:blogBody }}/>
                        <p className='text-gray-800' dangerouslySetInnerHTML={{__html:currentTask }}/>
                        <button className='mt-5 bg-red-500 text-white pl-4 pr-4 p-2 h-10 rounded-sm hover:bg-red-600 font-semibold'>DELETE</button>
                      </div>
                      
                    ))}
                 </section>
                )}   
            </section>
        </main>
    )
}

export default UserDashboard