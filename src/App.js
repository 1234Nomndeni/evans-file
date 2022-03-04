import React from 'react';
import './App.css';
import Header from './components/Header';
import HomePage from './components/HomePage';
import { Routes, Route } from 'react-router-dom';
import CreatePost from './components/CreatePost';
import SignUp from './components/SignUp';
import SelectedBlog from './components/SelectedBlog';
import QuillEditor from './tests/QuillEditor';
import Footer from './components/Footer';
import LikePost from './tests/LikePost';
import UpdateProfile from './components/UserProfile/UpdateProfile';
import AboutUs from './components/Pages/AboutUs'

function App() {


  return (
    <main className="">
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/new" element={<CreatePost />} />
        <Route path="/signIn" element={<SignUp />} />
        <Route path={"/posts/:postId"} element={<SelectedBlog />} />
        <Route path="/quill" element={<QuillEditor />} />
        <Route path="/like" element={<LikePost/>} />
        <Route path="/profile" element={<UpdateProfile/>} />
        <Route path="/about" element={<AboutUs />} />
      </Routes>
      <Footer/>
    </main>
  );
}

export default App;
