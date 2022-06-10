import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../utils/firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { HeartIcon } from "@heroicons/react/outline";

const LikePost = ({ id, likes }) => {
  const user = useSelector(selectUser);

  const likesRef = doc(db, "posts", id);

  const handleLike = () => {
    if (likes?.includes(user.uid)) {
      updateDoc(likesRef, {
        likes: arrayRemove(user.uid),
      })
        .then(() => {
          console.log("unliked");
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      updateDoc(likesRef, {
        likes: arrayUnion(user.uid),
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
          !likes?.includes(user.uid)
            ? " h-8 cursor-pointer hover:bg-pink-100 duration-150 rounded-full p-1 hover:text-pink-600"
            : "cursor-pointer text-pink-600 bg-pink-200 rounded-full h-8 p-1 border-2 border-pink-600 duration-150"
        } `}
      />
    </div>
  );
};

export default LikePost;
