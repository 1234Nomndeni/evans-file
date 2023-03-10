import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
import { db } from "../../utils/firebase";
import MostReadArticle from "./MostReadArticle";

const FetchMostRead = () => {
  const [mostRead, setMostRead] = useState([]);
  // const { id } = useParams();
  // const sortLikes =
  useEffect(() => {
    const unsubscribe = db
      .collection("posts")
      // .where("likes", ">=", 3)
      .orderBy("likes", "desc")
      .limit(5)
      .onSnapshot((snapshot) =>
        setMostRead(
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
    <div>
      <h3 className="text-bold mb-3">Most trending articles on melbite</h3>
      {mostRead.map((article) => (
        <MostReadArticle
          key={article.id}
          id={article.id}
          blogHeader={article.data.blogHeader}
          blogBody={article.data.blogBody}
          displayName={article.data.displayName}
          backgroundImage={article.data.backgroundImage}
          timestamp={article.data.timestamp}
          slug_name={article.data.slug_name}
          name_slug={article.data.name_slug}
          currentTask={article.data.currentTask}
          description={article.data.description}
          skills={article.data.skills}
          likes={article.data.likes}
          uid={article.data.uid}
        />
      ))}
    </div>
  );
};

export default FetchMostRead;
