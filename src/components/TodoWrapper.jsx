import React, { useEffect, useState } from "react";
import { TodoForm } from "./TodoForm";
import { FaTrashAlt } from "react-icons/fa";
import { Todo } from "./Todo";
import { v4 as uuidv4 } from "uuid";
import TodoHeading from "./TodoHeading";
import style from "./TodoWrapper.module.css";

export const TodoWrapper = () => {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [showMessage, setShowMessage] = useState(false);


  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleCheckboxChange = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const addTodo = (todo) => {
    if (todo.trim() === "") {
      setShowMessage(true)
    } else {
      setTodos([
        ...todos,
        { id: uuidv4(), task: todo, completed: false, isEditing: false },
      ]);
      setShowMessage(false);
    }
  };

  const editTodo = (id, newTask) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, task: newTask } : todo
      )
    );
  };

  const deletAlltodo = () => {
    setTodos([]);
  };

  return (
    <div className={style.todoWrapper}>
      {showMessage && (<div className={style.popupDiv}>
        <h3>Empty todo cannot be inserted..</h3>
        <button onClick={()=>setShowMessage(false)}>ok</button>
      </div>)}
      <TodoHeading />
      <TodoForm addTodo={addTodo} />{todos.length > 1 && (
        <button className={style.deleteAll} onClick={deletAlltodo}>
        All{" "} <FaTrashAlt />
        </button>
      )}
      {todos.length > 0 ? (
        <ul className={style.todoList}>
          {todos.map((todo) => (
            <Todo
              task={todo}
              key={todo.id}
              deleteTodo={handleDelete}
              handleCheckboxChange={handleCheckboxChange}
              editTodo={editTodo}
            />
          ))}
        </ul>
      ) : (
        <p className={style.emptyTodo}>No todos</p>
      )}
    </div>
  );
};
