import React, { useEffect, useState } from "react";
import { db } from "../../utils/firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import firebase from "firebase/compat/app";
import { Link } from "react-router-dom";

const Communities = () => {
  const user = useSelector(selectUser);

  const [communities, setCommunities] = useState([]);

  useEffect(() => {
    const unsubscribe = db
      .collection("communities")
      .onSnapshot((querySnapshot) => {
        const fetchedCommunities = [];
        querySnapshot.forEach((doc) => {
          fetchedCommunities.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setCommunities(fetchedCommunities);
      });
    return unsubscribe;
  }, []);

  const handleJoinCommunity = async (communityId) => {
    await db
      .collection("communities")
      .doc(communityId)
      .update({
        pendingRequests: firebase.firestore.FieldValue?.arrayUnion(user.uid),
      });
  };

  const isRequested = (community) => {
    return community.data.pendingRequests?.includes(user.uid);
  };

  const isJoined = (community) => {
    return community.data.communityMembers?.includes(user.uid);
  };

  return (
    <main className="bg-white mt-24 mx-auto max-w-7xl px-5 py-7 border rounded-md">
      <h1>Available Communities</h1>
      {communities.map((community) => (
        <article
          className="w-full border-2 rounded-md bg-white p-5 mb-2 hover:border-purple-800 duration-150"
          key={community.id}
        >
          <section>
            <section className="flex justify-between flex-wrap">
              <div className="flex gap-4 flex-wrap">
                <div>
                  <img
                    src={community.data.communityProfileImage}
                    className="w-28 h-28 rounded-md"
                    alt=""
                  />
                </div>
                <div>
                  <Link to={`/community/${community.data.communityName}`}>
                    <h1 className="text-sm hover:text-purple-900 md:text-2xl">
                      {community.data.communityName}
                    </h1>
                  </Link>
                  <a
                    className="text-purple-900 hover:text-pink-700"
                    href={community.communityWebsite}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {community.data.communityWebsite}
                  </a>
                  <p className="text-semibold mt-2">
                    {community.data.communityMembers.length} Members
                  </p>
                </div>
              </div>

              {isRequested(community) ? (
                <button
                  disabled
                  className="border-2 border-purple-600 h-12 py-2 px-5 rounded-lg bg-purple-600 hover:text-white text-white"
                >
                  Pending ...
                </button>
              ) : isJoined(community) ? (
                <button
                  disabled
                  className="text-sm md:text-lg border-2 border-purple-600 h-12 py-2 px-5 rounded-lg bg-purple-600 hover:text-white text-white"
                >
                  Already a Member
                </button>
              ) : (
                <button
                  onClick={() => handleJoinCommunity(community.id)}
                  className="border-2 border-purple-600 h-12 py-2 px-5 rounded-lg hover:bg-purple-600 hover:text-white text-purple-600"
                >
                  Join Community
                </button>
              )}
            </section>
            <div className="mt-3 mb-3">
              <p>{community.data.communityBio}</p>
            </div>
          </section>
        </article>
      ))}
    </main>
  );
};

export default Communities;
