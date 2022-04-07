import { Link } from '@reach/router';
import React, { useEffect, useState } from 'react'
import { db } from '../utils/firebase';

const AllBlogs = () => {
    const [posts, setPosts] = useState([])

  const fetchData = async () => {
    try {
      await db
        .collection("posts")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setPosts(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="mt-24">
      <h1>Am rendering all the blog posts</h1>
      {posts.map(
        ({
          id,
          data: {
            uid,
            backgroundImage,
            profilePic,
            blogHeader,
            blogBody,
            currentTask,
            timestamp,
            description,
            displayName,
            skills,
            likeCount,
          },
        }) => (
          <div key={id} className="w-3/6 bg-white">
            <Link to={`/${displayName}/${blogHeader}`} className="">
              <h1 className="text-lg text-purple-800">{blogHeader}</h1>
            </Link>
            {/* <h1 className="text-lg">{blogHeader}</h1> */}
            <p
              className="text-sm mt-3"
              dangerouslySetInnerHTML={{ __html: blogBody }}
            ></p>
            {/* <h1>{blogHeader}</h1> */}
          </div>
        )
      )}
    </div>
  );
}

export default AllBlogs