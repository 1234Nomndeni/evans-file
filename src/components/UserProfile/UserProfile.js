import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../utils/firebase";

function Article() {
  const { name_slug } = useParams();
  const [article, setArticle] = useState(null);

  async function getUser(name_slug) {
    const querySnapshot = await db
      .collection("users")
      .where("name_slug", "==", name_slug)
      .get();

    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs;

      console.log("Doc: ", doc);
    }

    return "hey";
  }

  useEffect(() => {
    if (!name_slug) return;

    console.log("name_slug: ", name_slug);

    (async () => await getUser())();

    // Query the users db where name_slug == name_slug, get the user_id

    // Query the posts where uid == user_ic

    return;

    const fetchArticle = async () => {
      const db1 = db;
      const querySnapshot = await db1
        .collection("posts")
        .where("name_slug", "==", name_slug)
        .get();
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        setArticle({ id: doc.id, ...doc.data() });
      }
    };
    fetchArticle();
  }, [name_slug]);

  if (!article) {
    return <div>Loading article...</div>;
  }

  return (
    <div className="h-screen">
      <h1>{article.blogHeader}</h1>
      <p>{article.content}</p>
      <ul>
        {article.tags.map((tag) => (
          <li key={tag} className="tag">
            {tag}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Article;
