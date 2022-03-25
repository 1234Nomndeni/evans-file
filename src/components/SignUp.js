import React, { useState } from 'react'
import googleIcon from './images/google-icon.png'
import gitHubIcon from './images/github.png'
import twitterIcon from './images/twitter.png'
import { auth, db, gitProvider, provider, twitterProvider } from '../utils/firebase';
import { useDispatch, useSelector } from 'react-redux'
import { login, selectUser } from '../features/userSlice'
// import TextField from '@mui/material/TextField'
import HomePage from './HomePage';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState("")
    const [tagName, setTagName] = useState("")
    const [website, setWebsite] = useState("")
    const [workExperience, setWorkExperience] = useState("")
    const [skills, setSkills] = useState("")
    const [biography, setBiography] = useState("")
    const dispatch = useDispatch()
    const user = useSelector(selectUser)

    // Google SignIn Method 
    const googleSignIn = () => {
        auth.signInWithPopup(provider).then(result => {
            db.collection("Users").doc(result.user.uid).set({
                email: email,
                displayName: displayName,
                tagName: tagName,
                website: website,
                workExperience:workExperience,
                skills: skills,
                biography:biography
            });
            setTagName("");
            setWebsite('')
            setWorkExperience("")
            setSkills("")
            setBiography("")
        }).catch((error) => {
            alert(error.message)
        }).then(() => {
            navigate("/")
        });
    }

    const githubSignUp = (e) => {
        e.preventDefault()
        auth.signInWithPopup(gitProvider).then((result) => {
            db.collection("Users").doc(result.user.uid).set({
                email: email,
                displayName: displayName,
                tagName: tagName,
                website: website,
                workExperience:workExperience,
                skills: skills,
                biography:biography
            });
        }).catch((error) => {
            alert(error.message)
        }).then(() => {
            navigate("/")
        })
    }

    const twitterSignUp = (e) => {
        e.preventDefault()
        auth.signInWithPopup(twitterProvider).then((result) => {
            db.collection("Users").doc(result.user.uid).set({
                email: email,
                tagName: tagName,
                website: website,
                workExperience:workExperience,
                skills: skills,
                biography:biography
            })
        }).catch((error) => {
            alert(error.message)
        })

    }

    return (
        <>
            {!user ? (
                <div className="mt-24 w-3/6 mx-auto items-center" to="/">
                    <h1 className="text-center text-gray-600 font-bold">Welcome to melbite</h1>

                    <section className="border-lg w-4/5 mx-auto mt-5 border-2 p-6 index-50 bg-white ">

                        <span onClick={googleSignIn} className="flex items-center justify-center mx-auto font-bold w-full text-yellow-600 border-2 border-gray-900 rounded-md cursor-pointer mt-4">
                            <img src={googleIcon} className="w-12" alt="" />
                            <h3 className=" ">Continue with Google </h3>
                        </span>
                        <span onClick={githubSignUp} className="flex items-center justify-center text-gray-800 p-2 mx-auto font-bold w-full border-2 border-gray-900 rounded-md cursor-pointer mt-4">
                            <img src={gitHubIcon} className="w-8" alt="" />
                            <h3 className="ml-3 ">SignUp with github </h3>
                        </span>
                        <span onClick={twitterSignUp} className="flex items-center justify-center p-2 mx-auto font-bold w-full border-2 border-gray-900 rounded-md cursor-pointer mt-4">
                            <img src={twitterIcon} className="w-8" alt="" />
                            <h3 className="ml-3 twitter">SignUp with twitter </h3>
                        </span>
                    </section>

                </div>
            ) : (
               <HomePage/>
            )}
        </>

    )
}

export default SignUp
