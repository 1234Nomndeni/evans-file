import { updateDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { db } from "../../utils/firebase";

const notifyDeleteSuccess = () =>
  toast("Article deleted successfully", { position: "top-center" });
const notifyDeleteError = () =>
  toast("Error deleting article", { type: "error" });

const EditArticle = ({ id }) => {
  const handleEdit = async () => {
    if (window.confirm("Are you sure you want to delete this article?")) {
      try {
        await updateDoc(doc(db, "posts", id));
        notifyDeleteSuccess();
      } catch (error) {
        notifyDeleteError();
      }
    }
  };
  return (
    <>
      <button
        onClick={handleEdit}
        className="text-xs cursor-pointer text-green-600 bg-green-200 rounded-sm px-2 py-1 border border-green-600 duration-150 hover:text-white hover:bg-green-600"
      >
        Edit Article
      </button>
    </>
  );
};

export default EditArticle;
