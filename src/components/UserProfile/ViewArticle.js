import { Menu, Transition } from "@headlessui/react";
import { useState, useEffect, Fragment } from "react";
import { Helmet } from "react-helmet";
import { ChatIcon, ShareIcon } from "@heroicons/react/outline";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectUser } from "../../features/userSlice";
import { db } from "../../utils/firebase";
import CopyToClipboard from "react-copy-to-clipboard";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const ViewArticle = () => {
  const user = useSelector(selectUser);
  const { postId, displayName } = useParams();
  const [blogHeader, setBlogHeader] = useState("");
  const [blogBody, setBlogBody] = useState("");
  const [backgroundImage, setBackgroundImage] = useState("");
  const [setCurrentTask] = useState("");
  const [setSlugName] = useState("");
  const [setUid] = useState("");
  const [name_slug, setNameSlug] = useState("");
  const [setLikes] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (postId) {
      db.collection(`posts`)
        .doc(user?.uid)
        .collection("userPosts")
        .doc(postId)
        .onSnapshot(
          (snapshot) => (
            setBlogHeader(snapshot.data().blogHeader),
            setBackgroundImage(snapshot.data().backgroundImage),
            setBlogBody(snapshot.data().blogBody),
            setCurrentTask(snapshot.data().currentTask),
            setSlugName(snapshot.data().slug_name),
            setNameSlug(snapshot.data().name_slug),
            setLikes(snapshot.data().likes),
            setUid(snapshot.data().uid)
          )
        );
    }
  }, []);

  const onArticleCopyLink = () => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  return (
    <main className="pt-24 mx-wd1 mx-auto flex justify-between pb-24 wd-screen3">
      <Helmet>
        <title>Preview Post</title>
      </Helmet>

      <section className="hidden w-28 mt-8 fixed lg:block flex-col md:block">
        <span href="comment" className="flex flex-col items-center mt-10">
          <ChatIcon
            xlinkHref="comment"
            className="h-8 cursor-pointer hover:bg-green-100 duration-150 rounded-full p-1 hover:text-green-600"
          />
          <p className="text-green-700 font-semibold">{0}</p>
          <p className="text-sm">Reactions </p>
        </span>
        <Menu as="div" className="ml-10 ">
          <div>
            <Menu.Button className="flex flex-col items-center mt-10">
              <ShareIcon className="h-8 cursor-pointer hover:bg-green-100 duration-150 rounded-full p-1 hover:text-green-600" />
              <p className="text-sm">Share </p>
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="right-0 mt-2 w-40 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              <CopyToClipboard
                text={`https://melbite.com/${name_slug}/${postId} `}
                onCopy={onArticleCopyLink}
              >
                <span>
                  {isCopied ? (
                    <p className="block cursor-pointer px-4 py-2 text-sm text-gray-700">
                      Link Copied!
                    </p>
                  ) : (
                    <p className="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:text-purple-900">
                      Copy to Clipboard
                    </p>
                  )}
                </span>
              </CopyToClipboard>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href={`https://twitter.com/intent/tweet?url=https://melbite.com/${name_slug}/${postId} `}
                    target="_blank"
                    rel="noreferrer"
                    className={classNames(
                      active ? "bg-white" : "",
                      "block px-4 py-2 text-sm text-gray-700 hover:text-purple-900"
                    )}
                  >
                    Share on Twitter
                  </a>
                )}
              </Menu.Item>

              <Menu.Item>
                {({ active }) => (
                  <a
                    href={`https://www.facebook.com/sharer.php?u=https://melbite.com/${name_slug}/${postId}`}
                    target="_blank"
                    rel="noreferrer"
                    className={classNames(
                      active ? "bg-white" : "",
                      "block px-4 py-2 text-sm text-gray-700 hover:text-purple-900"
                    )}
                  >
                    Share on Facebook
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=https://melbite.com/${name_slug}/${postId} `}
                    target="_blank"
                    rel="noreferrer"
                    className={classNames(
                      active ? "bg-white" : "",
                      "block px-4 py-2 text-sm text-gray-700 hover:text-purple-900"
                    )}
                  >
                    Share on LinkedIn
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href={`https://www.reddit.com/submit?url=https://melbite.com/${name_slug}/${postId}`}
                    target="_blank"
                    rel="noreferrer"
                    className={classNames(
                      active ? "bg-white" : "",
                      "block px-4 py-2 text-sm text-gray-700 hover:text-purple-900"
                    )}
                  >
                    Share on Reddit
                  </a>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </section>
      <section className="bg-white rounded-md mx-wd3 border border-gray-300 h-full ml-32 wd-screen1 xs:mt-8">
        <p
          className="ml-0 w-full object-contain flex items-center justify-center rounded-t-lg"
          dangerouslySetInnerHTML={{ __html: backgroundImage }}
        />

        <div className="mt-4 ml-6 flex items-center">
          <span className="bg-yellow-300 w-10 font-mono p-1 pl-3 uppercase text-xl text-gray-800 h-10 border-2 border-yellow-300 rounded-full">
            {displayName?.[0]}
          </span>
          <span className="ml-2">
            <p className="text-md">{displayName}</p>
          </span>
        </div>
        <div className="ml-7 mr-7 mt-5 mb-4">
          <h2 className="lg:text-4xl md:text-2xl sm:text-md text-gray-900 leading-10">
            {blogHeader}
          </h2>
          <span>
            <p
              className="font-sans pt-8 text-lg leading-7"
              dangerouslySetInnerHTML={{ __html: blogBody }}
            />
          </span>
        </div>
      </section>
    </main>
  );
};

export default ViewArticle;
