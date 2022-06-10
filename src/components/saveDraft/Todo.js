import React, { useState } from "react";
import TodoForm from "./TodoForm";
// import { RiCloseCircleLine } from "react-icons/ri";
// import { TiEdit } from "react-icons/ti";

const Todo = ({ todos, completeTodo, removeTodo, updateTodo }) => {
  const [edit, setEdit] = useState({
    id: null,
    value: "",
    value2: "",
  });

  const submitUpdate = (value, value2) => {
    updateTodo(edit.id, value, value2);
    setEdit({
      id: null,
      value: "",
      value2: "",
    });
  };

  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} />;
  }

  return todos.map((todo, index) => (
    <div
      className={todo.isComplete ? "todo-row complete" : "todo-row"}
      key={index}
    >
      <div key={todo.id} onClick={() => completeTodo(todo.id)}>
        {todo.text}
      </div>
      <div key={todo.id} onClick={() => completeTodo(todo.id)}>
        {todo.title}
      </div>
      <div className="icons">
        <p onClick={() => removeTodo(todo.id)} className="delete-icon">
          DD
        </p>
        <p
          onClick={() =>
            setEdit({ id: todo.id, value: todo.text, value2: todo.title })
          }
          className="edit-icon"
        >
          EE
        </p>
      </div>
    </div>
  ));
};

export default Todo;
