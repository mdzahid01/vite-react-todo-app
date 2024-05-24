import React, { useState, useRef,useEffect } from "react";
import { BiEdit } from "react-icons/bi";
import { FaTrashAlt } from "react-icons/fa";
import style from "./Todo.module.css";

export const Todo = (props) => {
  const { id, task, completed } = props.task;
  const [isEditing, setIsEditing] = useState(false);
  const [editTask, setEditTask] = useState(task);
  const inputRef = useRef(null);

  const handleCheckbox = () => {
    props.handleCheckboxChange(id);
  };

  const handleDelete = () => {
    props.deleteTodo(id);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleEditSubmit = (e) => {
    if (e.key === "Enter") {
      props.editTodo(id, editTask);
      setIsEditing(false);
    }
  };

  useEffect(() => {
    // Check if the component is in edit mode (isEditing is true)
    // and if the input element reference (inputRef.current) has value.
    // If both conditions are true, execute the code inside the block.
    if (isEditing && inputRef.current) {
      inputRef.current.select();
    }
  }, [isEditing]);

  return (
    <li>
      <input
        type="checkbox"
        id={`checkbox-${id}`}
        name={`checkbox-${id}`}
        checked={completed}
        onChange={handleCheckbox}
      />
      <label htmlFor={`checkbox-${id}`}></label>
      {isEditing ? (
        <input
          type="text"
          value={editTask}
          ref={inputRef}
          onChange={(e) => setEditTask(e.target.value)}
          onKeyDown={handleEditSubmit}
          onBlur={() => {
            props.editTodo(id, editTask);
            setIsEditing(false);
          }}
          className={style.editInput}
          autoFocus
        />
      ) : (
        <p className={`${completed ? style.completed : ""}`}>{task}</p>
      )}
      <BiEdit className={style.editBtn} onClick={handleEditClick} />
      <FaTrashAlt className={style.deleteBtn} onClick={handleDelete} />
    </li>
  );
};
