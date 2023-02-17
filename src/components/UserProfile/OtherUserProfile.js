import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import { db } from "../../utils/firebase";

const OtherUserProfile = ({ match }) => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const displayName = match.params.displayName;
      const usersRef = db.collection("Users");
      const userQuery = usersRef
        .where("displayName", "==", displayName)
        .limit(1);
      const userSnapshot = await userQuery.get();
      if (userSnapshot.empty) {
        setUser(null);
      } else {
        setUser({
          id: userSnapshot.docs[0].id,
          ...userSnapshot.docs[0].data(),
        });
      }
    };
    fetchUser();
  }, [match.params.displayName]);

  useEffect(() => {
    const fetchPosts = async () => {
      if (user) {
        const postsRef = db.collection("posts");
        const postsQuery = postsRef
          .where("uid", "==", user.uid)
          .orderBy("timestamp", "desc");
        const postsSnapshot = await postsQuery.get();
        const newPosts = postsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(newPosts);
      }
    };
    fetchPosts();
  }, [user]);

  return (
    <div>
      {user ? (
        <div className="pt-20 h-[100vh]">
          <h1>{user.name}</h1>
          <p>Username: {user.displayName}</p>
          <h2>Blog Articles</h2>
          <ul>
            {posts.map((post) => (
              <li key={post.id}>
                <h3>{post.blogHeader}</h3>
                <p>{post.blogBody}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>User not found.</p>
      )}
    </div>
  );
};

export default OtherUserProfile;
