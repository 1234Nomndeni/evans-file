import React from 'react';
import './App.css';
import Header from './components/Header';
import HomePage from './components/HomePage';
import { Routes, Route } from 'react-router-dom';
import CreatePost from './components/CreatePost';
import SignUp from './components/SignUp';
import SelectedBlog from './components/SelectedBlog';
// import Editor from './tests/RichTextEditor';

function App() {


  return (
    <main className="">
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/our_story" element={<Editor />} /> */}
        <Route path="/new" element={<CreatePost />} />
        <Route path="/signIn" element={<SignUp />} />
        <Route path={"/posts/:postId"} element={<SelectedBlog />} />
        {/* <Route path="/feed" element={<Feed/>}/> */}
      </Routes>
    </main>
  );
}

export default App;
