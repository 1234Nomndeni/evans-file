import React, { useState, useEffect, useRef } from 'react';
import { Modal } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { XIcon, EyeIcon } from '@heroicons/react/outline';
import ImageUpload from './ImageUpload';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, logout, login } from '../features/userSlice';
import { auth, db } from '../utils/firebase';
import SignUp from './SignUp';
import firebase from 'firebase/compat/app'
import Editor from "react-markdown-editor-lite";
import ReactMarkdown from "react-markdown";
import "react-markdown-editor-lite/lib/index.css";


const CreatePost = () => {
    const [open, setOpen] = useState(true);

    const mdEditor = useRef(null);
    const navigate = useNavigate()
    const user = useSelector(selectUser)
    const dispatch = useDispatch();


    // Accept user inputs of the actual blog
    const [blogHeader, setBlogHeader] = useState("");
    const [blogBody, setBlogBody] = useState("");
    const [image, setImage] = useState(null)



    const publishBlog = (e) => {

        e.preventDefault();
        db.collection('posts').add({
            blogHeader: blogHeader,
            blogBody: blogBody,
            description: user.email,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });

        setBlogHeader('');
        setBlogBody('');
    }

    const handleEditorChange = ({ html, text }) => {
        const newValue = text.replace(/\d/g, "");
        console.log(newValue);
        setBlogBody(newValue);
    };


    //validate and keep the user loggedIn
    useEffect(() => {
        auth.onAuthStateChanged(userAuth => {
            if (userAuth) {
                dispatch(login({
                    email: userAuth.email,
                    uid: userAuth.uid,
                    displayName: userAuth.displayName,
                    profilePic: userAuth.profilePic
                }))
            } else {
                dispatch(logout)
            }
        })
    }, [dispatch])

    return  (
        <>
            {!user ? (
                <SignUp />
            ) : (
                    <div className="bg-white pt-32 mx-auto  min-h-screen">
                        <Modal className=" bg-white overflow-auto min-h-screen" open={open} onClose={(e) => setOpen(false)}>
                            <main className="bg-white min-h-screen">
                                {/* <ImageUpload /> */}
                                <div className="flex justify-between items-center bg-white mx-auto border-b-2 border-fuchsia-600 pb-4  mx-wd2 pt-6 ">
                                    <span className="w-full flex justify-between">
                                        <div className="flex-shrink-0 flex w-3/5 items-center  ">
                                            <h3 onClick={() => navigate("/")} className=" hidden lg:hidden cursor-pointer h-8 w-auto items-center color text-xl">Evansify</h3>

                                            <div className=" hidden lg:block  h-8 w-auto color text-3xl ">
                                                <h2 onClick={() => navigate("/")} className="cursor-pointer">Evansify</h2>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between ">
                                            <button onClick={publishBlog} className="p-2 border-2 mr-10  border-gray-400 text-sm bg-blue-200 rounded-md hover:bg-blue-300 py-2 px-8 font-bold text-gray-900">Publish</button>
                                            <button className="bg-gray-200 p-2 transition-all text-gray-900 border-2 text-sm border-gray-300 font-bold rounded-sm transform hover:scale-105 ">Save Draft</button>
                                        </div>
                                    </span>
                                    <span className=" pl-10">
                                        <XIcon onClick={() => navigate('/')} className="w-8 rounded-lg hover:text-red-500  cursor-pointer" />
                                    </span>
                                </div>


                                <section className="mx-wd2 mx-auto pt-4">
                                    <span className="flex w-full justify-between ">
                                        <ImageUpload image={image} />

                                        <span className="flex inset-0 items-center h-12 cursor-pointer bg-gray-100 rounded-md hover:bg-gray-200 p-2">
                                            <EyeIcon className="w-7 text-gray-600" />
                                            <p className="text-lg ml-3 text-gray-600 ">Preview</p>
                                        </span>
                                    </span>


                                    <input value={blogHeader} onChange={(e) => setBlogHeader(e.target.value)} className="focus:outline-none mt-10 mb-3 text-4xl font-bold text-gray-900 w-full" type="text" placeholder="Your Post Title.." />
                                </section>

                                <section className="mx-wd2 mt-10 mx-auto">
                                    <Editor
                                        ref={mdEditor}
                                        value={blogBody}
                                        style={{
                                            height: "500px"
                                        }}
                                        onChange={handleEditorChange}
                                        renderHTML={text => <ReactMarkdown source={text} />}
                                    />
                                </section>
                            </main>


                        </Modal>
                    </div>
                )
            }
        </>

    )
}

export default CreatePost
