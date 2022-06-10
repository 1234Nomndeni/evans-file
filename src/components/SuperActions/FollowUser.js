import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../utils/firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";

const FollowUser = ({ id, followers }) => {
  const user = useSelector(selectUser);

  const followRef = doc(db, "Users", id);

  const handleLike = () => {
    if (followers?.includes(user.uid)) {
      updateDoc(followRef, {
        followers: arrayRemove(user.uid),
      })
        .then(() => {
          //   console.log("unFollowed");
          return;
        })
        .catch((error) => {
          console.log(error);
          return;
        });
    } else {
      updateDoc(followRef, {
        followers: arrayUnion(user.uid),
      })
        .then(() => {
          console.log("follows");
        })
        .catch((error) => {
          console.log(error);
          return;
        });
    }
  };
  return (
    <div>
      <div
        onClick={handleLike}
        className={`${
          !followers?.includes(user?.uid)
            ? " h-8 cursor-pointer hover:bg-pink-100 duration-150 rounded-full p-1 hover:text-pink-600"
            : "cursor-pointer text-pink-600 bg-pink-200 rounded-full h-8 p-1 border-2 border-pink-600 duration-150"
        } `}
      />
    </div>
  );
};

export default FollowUser;
