import { updateDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../../utils/firebase";

const EditMyArticle = ({ id }) => {
  const navigate = useNavigate();

  return (
    <>
      <button
        onClick={(e) => id(doc.id)}
        className="text-xs cursor-pointer text-green-600 bg-green-200 rounded-sm px-2 py-1 border border-green-600 duration-150 hover:text-white hover:bg-green-600"
      >
        Edit Article
      </button>
    </>
  );
};

export default EditMyArticle;
