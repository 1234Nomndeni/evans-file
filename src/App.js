import { useEffect } from "react";
import { Helmet } from "react-helmet";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import { Routes, Route } from "react-router-dom";
import CreatePost from "./components/AddArticle/CreatePost";
import SignUp from "./components/SignUp";
import SelectedBlog from "./components/FetchArticles/SelectedBlog";
// import SelectedBlog2 from './components/SelectedBlog2';
import Footer from "./components/StaticPages/Footer";
import AboutUs from "./components/StaticPages/AboutUs";
import UserDashboard from "./components/UserProfile/UserDashboard";
import Contacts from "./components/StaticPages/Contacts";
import Privacy from "./components/StaticPages/Privacy";
import CodeOfConduct from "./components/StaticPages/CodeOfConduct";
import HowToBlogHere from "./components/StaticPages/HowToBlogHere";
import ReactGA from "react-ga";
import WelcomeBlog from "./components/StaticPages/WelcomeBlog";
import Donate from "./components/SuperActions/Donate";
import PageNotFound from "./components/StaticPages/PageNotFound";
// import Subscriptions from './components/StaticPages/Subscriptions';
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import MyDrafts from "./components/UserProfile/MyDrafts";
import EditProfile from "./components/UserProfile/EditProfile";
import ProfilePreview from "./components/UserProfile/ProfilePreview";
import Notifications from "./components/UserProfile/Notifications";
import DashboardNavigator from "./components/UserProfile/DashboardNavigator";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";
import UserProfile from "./components/UserProfile/UserProfile";
import TagsList from "./components/FetchArticles/TagsList";
import CreateCommunity from "./components/Community/CreateCommunity";
import Communities from "./components/Community/Communities";
import CommunityDashboard from "./components/Community/CommunityDashboard";
import ManageCommunities from "./components/UserProfile/ManageCommunities";

ReactGA.initialize(process.env.TRACK_ID);
function App() {
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  const user = useSelector(selectUser);

  return (
    <main className="max-w-8xl mx-auto">
      <Helmet>
        <title>Melbite - Home Of Creators</title>
        <meta
          content="Welcome to the melbite community. Melbite is a platform to read, learn, and share knowledge and skills
    through written articles"
          name="description"
        />
        <meta
          name="keywords"
          content="How to, where to, learning, melbite, blogging, programming, coding, careers, articles "
        />
      </Helmet>
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/new" element={<CreatePost />} />
        <Route path="/signIn" element={<SignUp />} />
        <Route path={`/:displayName/:blogId`} element={<SelectedBlog />} />
        {user && <Route path="/dashboard" element={<UserDashboard />} />}
        {user && <Route path="/editprofile" element={<EditProfile />} />}
        {user && <Route path="/previewprofile" element={<ProfilePreview />} />}
        {user && <Route path="/notifications" element={<Notifications />} />}
        {user && <Route path="/my-drafts" element={<MyDrafts />} />}
        {user && (
          <Route path="/create-community" element={<CreateCommunity />} />
        )}
        <Route path="/communities" element={<Communities />} />
        <Route path="/myCommunities" element={<ManageCommunities />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/contact-us" element={<Contacts />} />
        <Route path="/privacy-policy" element={<Privacy />} />
        <Route path="/code-of-conduct" element={<CodeOfConduct />} />
        <Route path="/how-to-blog-at-melbite" element={<HowToBlogHere />} />
        <Route path="*" element={<PageNotFound />} />
        <Route
          path="/Welcome-to-Melbite-the-official-blogging-site-or-the-world"
          element={<WelcomeBlog />}
        />

        {/* Melbite Premiers */}
        {/* <Route path="/register" element={<WritingChallenge />} /> */}
        <Route path="/tags/:tag" element={<TagsList />} />
        <Route path="/users/:name_slug" element={<UserProfile />} />
        {user && <Route path="/adminDash" element={<AdminDashboard />} />}
        <Route path="/dashNavigator" element={<DashboardNavigator />} />

        {/* <Route path="/subscriptions" element={<Subscriptions/>} /> */}
      </Routes>
      <Footer />
    </main>
  );
}

export default App;
