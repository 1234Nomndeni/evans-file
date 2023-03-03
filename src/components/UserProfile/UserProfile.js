import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../utils/firebase";

function Article() {
  const { name_slug } = useParams();
  const [userProfile, setUserProfile] = useState(null);
  const [userPosts, setUserPosts] = useState([]);

  const fetchUserProfile = async () => {
    db.collection("Users")
      .where("name_slug", "==", name_slug)
      .onSnapshot((querySnapshot) => {
        const userData = [];
        querySnapshot.forEach((doc) => {
          userData.push({ id: doc.id, ...doc.data() });
        });
        setUserProfile(userData);
      });
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
    <div className="mt-20">
      {userProfile ? (
        <div>
          <h2>{userProfile.displayName}'s Profile</h2>
          <p>Email: {userProfile.skills}</p>
          <p>Bio: {userProfile.biography}</p>
        </div>
      ) : (
        <p>Loading user profile...</p>
      )}
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
    </div>
  );
}

export default Article;
