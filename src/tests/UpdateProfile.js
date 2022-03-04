import { useNavigate } from '@reach/router';
import React, { useEffect, useState } from 'react'
import { auth, db } from '../utils/firebase';

const UpdateProfile = () => {

    const [name, setName] = useState("");
    const [profession, setProffesion] = useState("")

    const setProfile = (userID) => {
        db.collection('users').doc("userId", "==", userID).add({
            name: name,
            proffession: profession
        })
        setName("")
        setProffesion("")
    }


    

  return (
    <div className='mt-28'>
        <form>
            Update Name: <input value={name} onChange={(e) => setName(e.target.value)}/>
            Set Proffesion: <input value={profession} onChange={(e) => setProffesion(e.target.value)}/>
        </form>
        <button onClick={setProfile} className='bg-blue-300 text-red-900 p-1'>UpdateProfile</button>
    </div>
  )
}

export default UpdateProfile