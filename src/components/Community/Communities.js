import React, { useEffect, useState } from "react";
import { db } from "../../utils/firebase";

const Communities = () => {
  const [communities, setCommunities] = useState([]);

  useEffect(() => {
    const fetchComm = db.collection("communities").onSnapshot((snapshot) => {
      const communityData = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        communityData.push({ id: doc.id, ...data });
      });
      setCommunities(communityData);
    });
    return () => fetchComm();
  }, []);
  return <div>Communities</div>;
};

export default Communities;
