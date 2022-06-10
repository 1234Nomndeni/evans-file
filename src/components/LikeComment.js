import React from "react";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../utils/firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { HeartIcon } from "@heroicons/react/outline";

const LikeComment = ({ blogId, commentLikeId, commentLikes }) => {
  const user = useSelector(selectUser);

  const likesRef = doc(db, "posts", blogId, "comments", commentLikeId);

  const handleLike = () => {
    if (commentLikes?.includes(user.uid)) {
      updateDoc(likesRef, {
        commentLikes: arrayRemove(user.uid),
      })
        .then(() => {
          console.log("unliked");
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      updateDoc(likesRef, {
        commentLikes: arrayUnion(user.uid),
      })
        .then(() => {
          console.log("liked");
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };
  return (
    <div>
      <HeartIcon
        onClick={handleLike}
        className={`${
          !commentLikes?.includes(user.uid)
            ? " h-8 cursor-pointer hover:bg-pink-100 duration-150 rounded-full p-1 hover:text-pink-600"
            : "cursor-pointer text-pink-600 bg-pink-200 rounded-full h-8 p-1 border-2 border-pink-600 duration-150"
        } `}
      />
    </div>
  );
};

export default LikeComment;
