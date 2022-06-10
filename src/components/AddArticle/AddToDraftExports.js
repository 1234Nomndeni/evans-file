import { useEffect, useState } from "react";
import DraftItem from "./DraftItem";
import AddDraft from "./AddDraft";
import EditDraft from "./EditDraft";

export default function AddToDraftExports() {
  const [postDrafts, setPostDrafts] = useState(() => {
    const savedDrafts = localStorage.getItem("postDrafts");
    if (savedDrafts) {
      return JSON.parse(savedDrafts);
    } else {
      return [];
    }
  });

  const [draft, setDraft] = useState("");
  const [blogHeaderDraft, setBlogHeaderDraft] = useState("");
  const [blogBodyDraft, setBlogBodyDraft] = useState("");
  const [backgroundImageDraft, setBackgroundImageDraft] = useState("");
  const [currentTaskDraft, setCurrentTaskDraft] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentDraft, setCurrentDraft] = useState({});

  useEffect(() => {
    localStorage.setItem("postDrafts", JSON.stringify(postDrafts));
  }, [postDrafts]);

  function handleAddInputChange(e) {
    setDraft(e.target.value);
  }

  function handleEditInputChange(e) {
    setCurrentDraft({ ...currentDraft, text: e.target.value });
    console.log(currentDraft);
  }

  function handleAddDraftSubmit(e) {
    e.preventDefault();

    if (
      draft !== "" ||
      blogHeaderDraft !== "" ||
      blogBodyDraft !== "" ||
      backgroundImageDraft !== "" ||
      currentTaskDraft !== ""
    ) {
      setPostDrafts([
        ...postDrafts,
        {
          id: new Date(),
          text: draft.trim(),
        },
      ]);
    }

    setDraft("");
    setBlogHeaderDraft("");
    setBlogBodyDraft("");
    setBackgroundImageDraft("");
    setCurrentTaskDraft("");
  }

  function handleEditDraftSubmit(e) {
    e.preventDefault();

    handleUpdateDraft(currentDraft.id, currentDraft);
  }

  function handleDeleteClick(id) {
    const removeItem = postDrafts.filter((draft) => {
      return draft.id !== id && blogHeaderDraft.id !== id;
    });
    setPostDrafts(removeItem);
  }

  function handleUpdateDraft(id, updatedTodo) {
    const updatedItem = postDrafts.map((draft, blogHeaderDraft) => {
      //   draft.id === id ? updatedTodo : draft;
      return (
        (blogHeaderDraft.id === id ? updatedTodo : blogHeaderDraft) &&
        (draft.id === id ? updatedTodo : draft)
      );
    });
    setIsEditing(false);
    setPostDrafts(updatedItem);
  }

  function handleEditClick(draft) {
    setIsEditing(true);
    setCurrentDraft({ ...draft });
  }

  return (
    <div className="mt-24 bg-red-300 h-screen">
      {isEditing ? (
        <EditDraft
          currentDraft={currentDraft}
          setIsEditing={setIsEditing}
          onEditInputChange={handleEditInputChange}
          onEditFormSubmit={handleEditDraftSubmit}
        />
      ) : (
        <AddDraft
          draft={draft}
          onAddInputChange={handleAddInputChange}
          onAddFormSubmit={handleAddDraftSubmit}
        />
      )}

      <ul className="draft-list">
        {postDrafts.map((draft) => (
          <DraftItem
            draft={draft}
            onEditClick={handleEditClick}
            onDeleteClick={handleDeleteClick}
          />
        ))}
      </ul>
    </div>
  );
}
