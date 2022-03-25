import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import { auth, db } from '../../utils/firebase';

const UpdateProfile = () => {
  const user = useSelector(selectUser);
  const [userData, setUserData] = useState()
  const [tagName, setTagName] = useState("")
  const [website, setWebsite] = useState("")
  const [workExperience, setWorkExperience] = useState("")
  const [skills, setSkills] = useState("")
  const [biography, setBiography] = useState("")

  const updateProfile = (e) => {
    e.preventDefault()
    db.collection('Users').doc(user.uid).update({
      tagName:tagName,
      website:website,
      workExperience: workExperience,
      skills:skills,
      biography:biography
    }, { merge: true})

    setTagName("")
    setWebsite("")
    setWorkExperience("")
    setSkills("")
    setBiography("")
  }

  // useEffect(() => {
  //   db.collection('Users').doc(user.uid).onSnapshot((snapshot) => setUserData(
  //     snapshot.docs.map((doc) => ({
  //       id: doc.id,
  //       data: doc.data()
  //     }))
  //   ))
  // }, [])

  return (
    <main className='pt-24 mx-wd1 flex justify-between mx-auto'>
       <section className='w-2/3 mr-12'>
        <section className='bg-white rounded-sm border border-gray-300'>
            <div className='rounded-t-md bg-c flex items-center flex-col justify-center h-24'>
                <img className='h-24 w-24 rounded-full cursor-pointer border-4 border-white -mb-9' src='https://media-exp1.licdn.com/dms/image/C5603AQHorwJKFNaR3Q/profile-displayphoto-shrink_200_200/0/1604525502427?e=1651104000&v=beta&t=qQWYuaSO3aJXzhEWBd1rH-Jckg6R407_GGU-2DMWhxw' alt=''/>
                <input type="file" className='hidden md:block ml-52 -mb-16 cursor-pointer text-purple-900 font-semibold'/>
            </div>

            <div className='mt-12'>
              <h1 className='text-center text-xl'>{user?.displayName}</h1>
              <div className='p-6 pt-3'>
                <div className='flex flex-col'>
                  <label for="">#TagName</label>
                  <input value={tagName} onChange={(e) => setTagName(e.target.value)} className='mt h-10 p-3 border border-gray-300 focus:outline-none focus:border-purple-700 rounded mt-1' placeholder={user?.tagName}/>
                  {/* <p>My Name isb {user?.tagName}</p> */}
                </div>
                <div className='flex flex-col mt-5'>
                  <label >Website</label>
                  <input  value={website} onChange={(e) => setWebsite(e.target.value)} className='mt h-10 p-3 border border-gray-300 focus:outline-none focus:border-purple-700 rounded mt-1' placeholder='https://www.example.com'/>
                </div>
                <div className='flex flex-col mt-5'>
                  <label for="">Work Experience</label>
                  <input  value={workExperience} onChange={(e) => setWorkExperience(e.target.value)} className='mt h-10 p-3 border border-gray-300 focus:outline-none focus:border-purple-700 rounded mt-1' placeholder='Software Dev, Journalist etc' />
                </div>
                <div className='flex flex-col mt-5'>
                  <label for="">Skills</label>
                  <textarea  value={skills} onChange={(e) => setSkills(e.target.value)} className='mt h-18 p-3 pt-1 border border-gray-300 focus:outline-none focus:border-purple-700 rounded mt-1' placeholder='Lawyer, software dev'></textarea>
                </div>
                <div className='flex flex-col mt-5'>
                  <label for="">Add Bio</label>
                  <textarea  value={biography} onChange={(e) => setBiography(e.target.value)} className='mt h-32 p-3 border border-gray-300 focus:outline-none focus:border-purple-700 rounded mt-1' placeholder='Add your bio'></textarea>
                </div>
              </div>
                
            </div>
        </section>
        <div className='flex justify-between items-center flex-wrap mt-5'>
          <button onClick={updateProfile} className='bg-c p-3 text-white rounded-md hover:bg-purple-700 duration-100'>Update Profile</button>
          <button className='bg-red-600 p-3 text-white rounded-md hover:bg-red-700 duration-100'>Delete Account</button>      
        </div>

       </section>


       <section className='bg-white w-1/3 p-3 h-72 rounded-sm border border-gray-300'>
          <h3 className='text-gray-700 text-xl pb-3'>My Profile preview</h3>
          <span>
            <p className='text-gray-900'>My Tag Name</p>
            {/* <p>{userData?.tagName}</p> */}
          </span>

          <div></div>
          
          <button className='bg-c text-white p-1 w-full mt-5 font-bold'>My blogs</button>
       </section>
    </main>
  )
}

export default UpdateProfile