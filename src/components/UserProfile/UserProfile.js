import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../utils/firebase";

function Article() {
  const { slug_name } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      const db1 = db;
      const querySnapshot = await db1
        .collection("posts")
        .where("slug_name", "==", slug_name)
        .get();
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        setArticle({ id: doc.id, ...doc.data() });
      }
    };
    fetchArticle();
  }, [slug_name]);

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
