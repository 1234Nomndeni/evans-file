import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../utils/firebase";

const TagsList = () => {
  const [posts, setPosts] = useState([]);
  const { tag } = useParams();

  useEffect(() => {
    const unsubscribe = db
      .collection("posts")
      .where("hashTags", "array-contains", tag)
      .onSnapshot((querySnapshot) => {
        const newPosts = [];
        querySnapshot.forEach((doc) => {
          newPosts.push({ id: doc.id, ...doc.data() });
        });
        setPosts(newPosts);
      });
    return unsubscribe;
  }, [tag]);
  return (
    <div className="">
      <h2 className="pt-20">Posts tagged with "{tag}"</h2>
      {posts.map((post) => (
        <div key={post.id}>
          <h3>{post.blogHeader}</h3>
          <p>{post.blogBody}</p>
        </div>
      ))}
    </div>
  );
};

export default TagsList;
