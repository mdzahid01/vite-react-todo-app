import React from "react";
import { useState } from "react";
import style from "./TodoForm.module.css";
export const TodoForm = ({ addTodo }) => {
  const [value, setValue] = useState("");
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo(value);
    // const todoAdded = addTodo(todo);
    setValue("");
  };
  return (
    <form className={style.TodoForm} onSubmit={handleSubmit}>
      <input
        type="text"
        className={style.todoInput}
        placeholder="Enter Task here.."
        name="todoText"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        onKeyDown={handleKeyDown}
        onBlur={handleKeyDown}
        autoFocus
      />
      <button type="submit" className={style.todoButton}> Add Task </button>
    </form>
  );
};
