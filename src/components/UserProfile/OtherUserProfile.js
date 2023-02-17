import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { db } from "../../utils/firebase";

const OtherUserProfile = () => {
  console.log("Hello world");
  const { uid } = useParams();
  const [user, setUser] = useState(null);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const userRef = db.collection("Users").doc(uid);
    userRef.get().then((doc) => {
      if (doc.exists) {
        setUser(doc.data());
      } else {
        console.log("No such user!");
      }
    });

    const articlesRef = db.collection("posts").where("uid", "==", uid);
    const unsubscribe = articlesRef.onSnapshot((snapshot) => {
      const articles = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setArticles(articles);
      console.log("uid");
    });
    return unsubscribe;
  }, [uid]);

  return (
    <div>
      <h1>User Profile</h1>
      {user && (
        <div>
          <h2>{user.displayName}</h2>
          <p>Email: {user.email}</p>
        </div>
      )}
      <h3>Blog Articles</h3>
      {articles.map((article) => (
        <div key={article.id}>
          <h4>{article.title}</h4>
          <p>{article.content}</p>
        </div>
      ))}
    </div>
  );
};

export default OtherUserProfile;
