import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../utils/firebase";

const notifyDeleteSuccess = () =>
  toast("Article deleted successfully", { position: "top-center" });
const notifyDeleteError = () =>
  toast("Error deleting article", { type: "error" });

const DeleteMyArticle = ({ id }) => {
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this article?")) {
      try {
        await deleteDoc(doc(db, "posts", id));
        notifyDeleteSuccess();
      } catch (error) {
        notifyDeleteError();
      }
    }
  };

  return (
    <div>
      <button
        onClick={handleDelete}
        className="text-xs cursor-pointer text-pink-600 bg-pink-200 rounded-sm px-2 py-1 border border-pink-600 duration-150 hover:text-white hover:bg-pink-600"
      >
        Delete
      </button>
    </div>
  );
};

export default DeleteMyArticle;
