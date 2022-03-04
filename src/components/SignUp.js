import React, { useState } from 'react'
import googleIcon from './images/google-icon.png'
import { auth, db, gitProvider, provider } from '../utils/firebase';
import { useDispatch, useSelector } from 'react-redux'
import { login, selectUser } from '../features/userSlice'
import TextField from '@mui/material/TextField'
import HomePage from './HomePage';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState("")
    const [tagName, setTagName] = useState("")
    const [website, setWebsite] = useState("")
    const [workExperience, setWorkExperience] = useState("")
    const [skills, setSkills] = useState("")
    const [biography, setBiography] = useState("")
    const dispatch = useDispatch()
    const user = useSelector(selectUser)

    const loginToApp = (e) => {
        e.preventDefault();
        auth.signInWithEmailAndPassword(email, password, displayName).then((userAuth) => {
            dispatch(login({
                email: userAuth.user.email,
                uid: userAuth.user.uid,
            }))
        }).catch((error) => alert(error.message))
    }

    const register = (e) => {
        e.preventDefault();

        auth.createUserWithEmailAndPassword(email, password, displayName).then((userCredentials) => {
            return db.collection("Users").doc(userCredentials.user.uid).set({
                email: email,
                displayName: displayName
            })
        }).then(() => {
           
        
        }) 
    }

            // auth.createUserWithEmailAndPassword(email, password, displayName).then((userCredential) => {



            //     // send verification mail.
                
            //     userCredential.user.sendEmailVerification();
            //     auth.signOut();
            //     createUserDocument(user, {displayName})
            //     alert("Verification Email sent to your inbox");
            // }).then((userAuth) => {
            //     userAuth.user.updateProfile({
            //         // displayName: name,
            //     }).then(() => {
            //         dispatch(login({
            //             email: userAuth.user.email,
            //             uid: userAuth.user.uid,
            //             // displayName: displayName,
            //         }));
            //     })
    
    
            // })



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
        }).catch(error => alert(error.message));
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
        })
    }

    return (
        <>
            {!user ? (
                <div className="mt-24 w-3/6 mx-auto items-center" to="/">
                    <h1 className="text-center text-gray-600 font-bold">Welcome to melbite</h1>

                    <section className="border-lg w-4/5 mx-auto mt-5 border-2 p-6 index-50 bg-white ">
                        <h2 className="mb-8 text-gray-600 text-2xl"> Login / SignIn</h2>

                        <form >
                            <span className="pb-8">
                                 <TextField
                                    className="input rounded-md p-3 focus:outline-none w-100 w-full border-2 bg-white  focus:ring-2 focus:ring-red-600 "
                                    required
                                    id="outlined-required"
                                    label="Display Name"
                                    type="text"
                                    value={displayName}
                                    onChange={(e) => setDisplayName(e.target.value)}
                                /> <br />  <br />
                                <TextField
                                    className="input rounded-md p-3 focus:outline-none w-100 w-full border-2 bg-white  focus:ring-2 focus:ring-red-600 "
                                    required
                                    id="outlined-required"
                                    label="Email Address"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                /> <br />  <br />

                                <TextField
                                    className="input rounded-md p-3 focus:outline-none w-100 w-full bg-white border-2 focus:ring-2 focus:ring-red-600"
                                    id="outlined-password-input"
                                    label="Password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </span><br />

                        </form>

                        <button onClick={loginToApp} className="bg-c text-white mt-8 mb-4 w-full p-3 rounded-md font-bold hover:bg-purple-900"> Login  </button>

                        <button onClick={register} disabled={!displayName || !email || !password} className="bg-c text-white  w-full p-3 rounded-md font-bold hover:bg-purple-900"> Create Account  </button>


                        <span onClick={googleSignIn} className="flex items-center justify-center text-white mx-auto font-bold w-full bg-blue-500 hover:bg-blue-600  rounded-md cursor-pointer mt-4">
                            <img src={googleIcon} className="w-12" alt="" />
                            <h3 className="text-white ">Continue with Google </h3>
                        </span>
                        <span onClick={githubSignUp} className="flex items-center justify-center text-white mx-auto font-bold w-full bg-gray-800 hover:bg-gray-600  rounded-md cursor-pointer mt-4">
                            <img src={googleIcon} className="w-12" alt="" />
                            <h3 className="text-white ">SignUp with Github </h3>
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
