import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { db } from "../../utils/firebase";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import AddIcon from "@mui/icons-material/Add";
import DoneIcon from "@mui/icons-material/Done";
import LanguageIcon from "@mui/icons-material/Language";
import EditLocationIcon from "@mui/icons-material/EditLocation";

const CommunityProfile = () => {
  const { communityName } = useParams();
  const user = useSelector(selectUser);
  const [communityProfile, setCommunityProfile] = useState(null);
  const [communityPosts, setCommunityPosts] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followers, setFollowers] = useState([]);

  const fetchCommunityProfile = async () => {
    const snapshot = await db
      .collection("communities")
      .where("communityName", "==", communityName)
      .get();
    const userData = snapshot.docs.map((doc) => doc.data())[0];
    setCommunityProfile(userData);
  };

  const fetchCommunityPosts = async () => {
    db.collection("posts")
      .where("communityName", "==", communityName)

      .onSnapshot((querySnapshot) => {
        const postData = [];
        querySnapshot.forEach((doc) => {
          postData.push({ id: doc.id, ...doc.data() });
        });
        setCommunityPosts(postData);
      });
  };

  useEffect(() => {
    fetchCommunityPosts();
    fetchCommunityProfile();
  }, [communityName]);

  useEffect(() => {
    const userRef = db.collection("communityFollowers").doc(communityName);

    // Get the current list of followers for this displayName
    const unsubscribe = userRef.onSnapshot((doc) => {
      if (doc.exists) {
        setFollowers(doc.data().followers || []);
        setIsFollowing(doc.data().followers?.includes(user?.uid));
      }
    });

    return unsubscribe;
  }, [communityName]);

  const handleFollowWriter = () => {
    if (!user) {
      toast("Please Login To follow This Writer");
    } else {
      const tagRef = db.collection("communityFollowers").doc(communityName);

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
        {communityProfile ? (
          <>
            <section className="flex justify-between w-full flex-wrap">
              <div className="flex gap-5 flex-wrap mb-2">
                <div className="">
                  {communityProfile.communityProfileImage ? (
                    <img
                      className="w-32 h-32 rounded-full"
                      src={communityProfile.communityProfileImage}
                      alt=""
                    />
                  ) : (
                    <h1 className="bg-yellow-300 font-mono py-10 px-12 uppercase font-bold text-2xl text-gray-800  border-2 border-yellow-300 rounded-full">
                      {communityProfile.communityName?.[0]}
                    </h1>
                  )}
                </div>
                <div>
                  <h2 className="text-xl">{communityProfile.communityName}</h2>
                  <span className="flex gap-2 mb-1">
                    <EditLocationIcon className="text-gray-500" />
                    <p>World Wide</p>
                  </span>

                  {!communityProfile.communityWebsite ? (
                    <></>
                  ) : (
                    <span className="flex gap-2">
                      <LanguageIcon className="text-gray-500" />
                      <a
                        className="text-purple-900"
                        href={communityProfile.communityWebsite}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {communityProfile.communityWebsite}
                      </a>
                    </span>
                  )}
                </div>
              </div>
              <div className="">
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
                    <div className=" p-2 px-5 flex justify-center text-purple-800">
                      <AddIcon />
                      <p className="ml-1">Follow</p>
                    </div>
                  )}
                </button>
                <p>
                  <p className="mt-3 md:text-center text-gray-600">
                    {followers.length} Followers
                  </p>
                </p>
              </div>
            </section>
            <section className="ml-3 mt-3">
              <h2 className="text-2xl">About</h2>
              {!communityProfile.communityBio ? (
                <p>Bio Not Found!</p>
              ) : (
                <p className="leading-7">{communityProfile.communityBio}</p>
              )}
            </section>
          </>
        ) : (
          <p>404 Bio not found</p>
        )}
      </section>
    </main>
  );
};

export default CommunityProfile;
