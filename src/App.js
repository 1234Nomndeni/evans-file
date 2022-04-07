import React,{useEffect} from 'react';
import './App.css';
import { Helmet } from "react-helmet";
import Header from './components/Header';
import HomePage from './components/HomePage';
import { Routes, Route } from 'react-router-dom';
import CreatePost from './components/CreatePost';
import SignUp from './components/SignUp';
import SelectedBlog from './components/SelectedBlog';
import Footer from './components/Footer';
import LikePost from './tests/LikePost';
import UpdateProfile from './components/UserProfile/UpdateProfile';
import AboutUs from './components/StaticPages/AboutUs'
import UserDashboard from './components/UserProfile/UserDashboard';
import Contacts from './components/StaticPages/Contacts';
import Privacy from './components/StaticPages/Privacy';
import CodeOfConduct from './components/StaticPages/CodeOfConduct';
import HowToBlogHere from './components/StaticPages/HowToBlogHere';
// import ComingSoon from './components/StaticPages/ComingSoon';
import ReactGA from 'react-ga'


ReactGA.initialize(process.env.TRACK_ID);
function App() {

  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  },[])

  return (
    <main className="">
      <Helmet>
        <title>Melbite | Home</title>
      </Helmet>
      <Header />
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/new" element={<CreatePost />} />
        <Route path="/signIn" element={<SignUp />} />
        <Route path={`/:displayName/:blogHeader`} element={<SelectedBlog />} />
        <Route path="/like" element={<LikePost/>} />
        <Route path="/profile" element={<UpdateProfile/>} />
        <Route path="/myDashboard" element={<UserDashboard/>} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact-us" element={<Contacts/>} />
        <Route path="/privacy-policy" element={<Privacy/>} />
        <Route path="/code-of-conduct" element={<CodeOfConduct/>} />
        <Route path="/how-to-blog-at-melbite" element={<HowToBlogHere/>} />
      </Routes>
      <Footer/>
      {/* <ComingSoon /> */}

    </main>
  );
}

export default App;
