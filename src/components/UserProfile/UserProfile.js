import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../utils/firebase";

function Article() {
  const { displayName } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    console.log("displayName: ", displayName);

    const fetchArticle = async () => {
      const db1 = db;
      const querySnapshot = await db1
        .collection("posts")
        .where("displayName", "==", displayName)
        .get();
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        setArticle({ id: doc.id, ...doc.data() });
      }
    };
    fetchArticle();
  }, [displayName]);

  if (!article) {
    return <div>Loading article...</div>;
  }

  return (
    <div className="h-screen">
      <h1>{article.blogHeader}</h1>
      <p>{article.content}</p>
      <ul>
        {article?.map((tag) => (
          <li key={tag} className="tag">
            {tag}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Article;
