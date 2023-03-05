import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../utils/firebase";

function Article() {
  const { name_slug } = useParams();
  const [userProfile, setUserProfile] = useState(null);
  const [userPosts, setUserPosts] = useState([]);

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

  return (
    <main className="pt-16">
      <section className="flex justify-between items-center bg-white md:mt-8 mx-auto max-w-7xl p-4 shadow-md">
        {userProfile ? (
          <section className="flex justify-between items-center">
            <div className="flex gap-3">
              <div className="">
                <h1 className="bg-yellow-300 font-mono py-10 px-12 uppercase font-bold text-2xl text-gray-800  border-2 border-yellow-300 rounded-full">
                  {userProfile.displayName?.[0]}
                </h1>
              </div>
              <div>
                <h2>{userProfile.displayName}</h2>
                <p>{userProfile.proffesion}</p>
              </div>
            </div>
            <div>
              <p>Bio: {userProfile.biography}</p>
            </div>

            {/* 
            <p>Email: {userProfile.skills}</p>
            */}
          </section>
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
