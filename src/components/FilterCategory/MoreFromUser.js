import React, { useEffect, useState } from "react";
import { db } from "../../utils/firebase";
import MoreUserPostMap from "./MoreUserPostMap";

const MoreFromUser = ({ displayName }) => {
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const unsubscribe = db
      .collection("posts")
      .where("displayName", "===", displayName)
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setUserPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );

    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <div className="">
      {userPosts.map((article) => (
        <MoreUserPostMap
          key={article.id}
          id={article.id}
          blogHeader={article.data.blogHeader}
          blogBody={article.data.blogBody}
          displayName={article.data.displayName}
        />
      ))}
    </div>
  );
};

export default MoreFromUser;
