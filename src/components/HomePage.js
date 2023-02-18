import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import PageLinks from "./StaticPages/PageLinks";
import { useStickyBox } from "react-sticky-box";
import FetchMostRead from "./FilterCategory/FetchMostRead";
import FilterCategory from "./FilterCategory/FilterCategory";
import PaginatedPage from "./FetchArticles/PaginatedPage";
// import WelcomeNote from "./StaticPages/WelcomeNote";
// import { collection, getDocs } from "firebase/firestore";

const HomePage = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const stickyRef = useStickyBox({ offsetTop: 100, offsetBottom: 20 });
  const stickyRightRef = useStickyBox({ offsetTop: 80, offsetBottom: 20 });

  /******************************************************** */
  /*Make the blog visible from the firebase to the front-end*/
  /******************************************************** */

  return (
    <main className="">
      <section className="mb-20">
        <nav className="w-full  bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500">
          <div className="max-w-7xl pb-8 mt-16 mx-auto mx-wd pt-10 md:px-8 xl:px-0">
            <h1 className="lg:text-3xl md:w-1/2 text-2xl mb-14 text-gray-700 prose  font-serif">
              Hello world! let's read, write and learn through melbite
            </h1>
            {!user ? (
              <button
                onClick={() => navigate("/signIn")}
                className="border border-purple-600 text-purple-800 px-5 hover:ease-in-out duration-150 py-2 rounded-full transform hover:scale-105 "
              >
                Sign Me Up
              </button>
            ) : (
              <button
                onClick={() => navigate("/new")}
                className="border border-purple-600 text-purple-800 px-5 hover:ease-in-out duration-150 py-2 rounded-full transform hover:scale-105 "
              >
                Start Writing
              </button>
            )}
          </div>
        </nav>

        <main className="max-w-7xl mt-3 mx-auto mx-wd1 ">
          <div className="md:hidden flex justify-center items-center space-x-16">
            <a
              href="https://twitter.com/melbite1"
              target="_blank"
              rel="noreferrer"
            >
              <TwitterIcon className="hover:text-purple-700 " />
            </a>
            <a
              href="https://www.linkedin.com/company/melbite-community"
              target="_blank"
              rel="noreferrer"
            >
              <LinkedInIcon className=" hover:text-purple-700" />
            </a>
            <a
              href="https://www.facebook.com/learnthroughmelbite"
              target="_blank"
              rel="noreferrer"
            >
              <FacebookIcon className=" hover:text-purple-700" />
            </a>
          </div>
          <section className="flex justify-between h-full mt-5">
            <div className="hidden md:block max-w-xl pr-4">
              <aside ref={stickyRef}>
                <FilterCategory />
                <PageLinks />
              </aside>
            </div>

            <div className=" lg:w-3/5 sm:w-full">
              {/* <WelcomeNote /> */}
              <PaginatedPage />
            </div>

            <div className="hidden md:block pl-4 w-80 ">
              <div ref={stickyRightRef} className="">
                <div>
                  <FetchMostRead />
                </div>
              </div>
            </div>
          </section>
        </main>
      </section>
    </main>
  );
};

export default HomePage;
