import { useNavigate } from "react-router-dom";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import DirectionsOutlinedIcon from "@mui/icons-material/DirectionsOutlined";
import PrivacyTipOutlinedIcon from "@mui/icons-material/PrivacyTipOutlined";
import CodeOffOutlinedIcon from "@mui/icons-material/CodeOffOutlined";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import ForumIcon from "@mui/icons-material/Forum";

const PageLinks = () => {
  const navigate = useNavigate();
  return (
    <>
      <main className="mb-3">
        <h3 className="text-bold mb-3">Navigations</h3>
        <section className="space-y-3">
        
        <span className="flex space-x-2 text-sm items-center cursor-pointer hover:text-purple-800 mb-2">
            <ForumIcon className="text-green-600" />
            <p onClick={() => navigate("/create-community")}>Create Community</p>
          </span>
          <span className="flex space-x-2 text-sm items-center cursor-pointer hover:text-purple-800 mb-2">
            <InfoOutlinedIcon className="text-green-600" />
            <p onClick={() => navigate("/about")}>About Us</p>
          </span>
          <span className="flex space-x-2 text-sm items-center cursor-pointer hover:text-purple-800 mb-2">
            <EmailOutlinedIcon className=" text-purple-900" />
            <p onClick={() => navigate("/contact-us")}>Contact Us</p>
          </span>
          <span className="flex space-x-2 text-sm items-center cursor-pointer hover:text-purple-800 mb-2">
            <FavoriteIcon className="text-pink-600 font-bold" />
            <p onClick={() => navigate("/")}>Sponser Us</p>
          </span>
          <span className="flex space-x-2 text-sm items-center cursor-pointer hover:text-purple-800 mb-2">
            <DirectionsOutlinedIcon className="text-green-600" />
            <p onClick={() => navigate("/how-to-blog-at-melbite")}>
              How to Blog Here
            </p>
          </span>
          <span className="flex space-x-2 text-sm items-center cursor-pointer hover:text-purple-800 mb-2">
            <PrivacyTipOutlinedIcon className="text-yellow-500" />
            <p onClick={() => navigate("/privacy-policy")}>Privacy Policy</p>
          </span>
          <span className="flex space-x-2 text-sm items-center cursor-pointer hover:text-purple-800 mb-2">
            <CodeOffOutlinedIcon className="text-pink-600" />
            <p onClick={() => navigate("/code-of-conduct")}>Code of Conduct</p>
          </span>
        </section>

        <div className="hidden md:flex flex-col mt-6">
          <p className="font-bold">Social media</p>
          <div className="mt-3 flex space-x-5">
            <a
              href="https://twitter.com/melbite1"
              target="_blank"
              rel="noreferrer"
            >
              <TwitterIcon className="hover:text-purple-700 text-gray-500 " />
            </a>
            <a
              href="https://www.linkedin.com/company/melbite-community"
              target="_blank"
              rel="noreferrer"
            >
              <LinkedInIcon className=" hover:text-purple-700  text-gray-500" />
            </a>
            <a
              href="https://www.facebook.com/learnthroughmelbite"
              target="_blank"
              rel="noreferrer"
            >
              <FacebookIcon className=" hover:text-purple-700  text-gray-500" />
            </a>
          </div>
          <span className="flex items-center text-center mt-4 text-gray-500">
            <p className="mt-1 text-md pr-1 ">©</p>
            <p className="text-sm mt-1">Melbite 2023</p>
          </span>
        </div>
      </main>
    </>
  );
};

export default PageLinks;
