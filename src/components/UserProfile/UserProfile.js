import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectUser } from "../../features/userSlice";
import { db } from "../../utils/firebase";
import AddIcon from "@mui/icons-material/Add";
import DoneIcon from "@mui/icons-material/Done";
import LanguageIcon from "@mui/icons-material/Language";
import EditLocationIcon from "@mui/icons-material/EditLocation";
import { toast } from "react-toastify";

function Article() {
  const { name_slug, displayName } = useParams();
  const user = useSelector(selectUser);
  const [userProfile, setUserProfile] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followers, setFollowers] = useState([]);

  const fetchUserProfile = async () => {
    const snapshot = await db
      .collection("Users")
      .where("name_slug", "==", name_slug)
      .get();
    const userData = snapshot.docs.map((doc) => doc.data())[0];
    setUserProfile(userData);
  };

  const fetchUserPosts = async () => {
    db.collection("posts")
      .where("name_slug", "==", name_slug)
      .onSnapshot((querySnapshot) => {
        const postData = [];
        querySnapshot.forEach((doc) => {
          postData.push({ id: doc.id, ...doc.data() });
        });
        setUserPosts(postData);
      });
  };

  useEffect(() => {
    fetchUserPosts();
    fetchUserProfile();
  }, [name_slug]);

  useEffect(() => {
    const userRef = db.collection("UsersFollowers").doc(displayName);

    // Get the current list of followers for this displayName
    const unsubscribe = userRef.onSnapshot((doc) => {
      if (doc.exists) {
        setFollowers(doc.data().followers || []);
        setIsFollowing(doc.data().followers?.includes(user?.uid));
      }
    });

    return unsubscribe;
  }, [displayName]);

  const handleFollowWriter = () => {
    if (!user) {
      toast("Please Login To follow This Writer");
    } else {
      const tagRef = db.collection("UsersFollowers").doc(displayName);

      if (isFollowing) {
        const updatedFollowers = followers.filter(
          (follower) => follower !== user?.uid
        );
        tagRef.set({ followers: updatedFollowers }, { merge: true });
        setIsFollowing(false);
      } else {
        const updatedFollowers = [...followers, user?.uid];
        tagRef.set({ followers: updatedFollowers }, { merge: true });
        setIsFollowing(true);
      }
    }
  };

  return (
    <main className="pt-16">
      <section className="bg-white md:mt-8 mx-auto max-w-7xl p-4 shadow-md">
        {userProfile ? (
          <>
            <section className="flex justify-between w-full flex-wrap">
              <div className="flex gap-3 flex-wrap">
                <div className="">
                  {userProfile.profileImage ? (
                    <img
                      className="w-32 h-32 rounded-full"
                      src={userProfile.profileImage}
                      alt=""
                    />
                  ) : (
                    <h1 className="bg-yellow-300 font-mono py-10 px-12 uppercase font-bold text-2xl text-gray-800  border-2 border-yellow-300 rounded-full">
                      {userProfile.displayName?.[0]}
                    </h1>
                  )}
                </div>
                <div>
                  <h2 className="text-xl">{userProfile.displayName}</h2>
                  <p className="mb-1">{userProfile.workExperience}</p>
                  <span className="flex gap-2 mb-1">
                    <EditLocationIcon />
                    <p>{userProfile.location}</p>
                  </span>
                  <span className="flex gap-2">
                    <LanguageIcon />
                    <a
                      className="text-purple-900"
                      href={userProfile.website}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {userProfile.website}
                    </a>
                  </span>
                </div>
              </div>
              <div>
                <button
                  onClick={handleFollowWriter}
                  className="border-2 border-purple-600 w-full  rounded-lg"
                >
                  {isFollowing ? (
                    <div className=" p-2 px-3 text-white bg-purple-800 ">
                      <DoneIcon className="mr-1 h-1 w-4" />
                      Following
                    </div>
                  ) : (
                    <div className="p-2 px-5 flex justify-center text-purple-800">
                      <AddIcon />
                      <p className="ml-1">Follow</p>
                    </div>
                  )}
                </button>
                <p>
                  <p className="mb-2 text-gray-600 font-semibold">
                    {followers.length} Followers
                  </p>
                </p>
              </div>
            </section>
            <section className="ml-3 mt-3">
              <h2 className="text-2xl">About</h2>
              <p>{userProfile.biography}</p>
            </section>
          </>
        ) : (
          <p>Loading user profile...</p>
        )}
      </section>

      <h1>Posts</h1>
      <h3>{userPosts.length} Posts</h3>
      <div>
        {userPosts &&
          userPosts?.map((post) => (
            <li key={post.id}>
              <h4>{post.blogHeader}</h4>
              <p>{post.content}</p>
              {/* <ul>
                {post.tags.map((tag) => (
                  <li key={tag} className="tag">
                    {tag}
                  </li>
                ))}
              </ul> */}
            </li>
          ))}
      </div>
    </main>
  );
}

export default Article;
