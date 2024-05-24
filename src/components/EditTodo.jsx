import React, { useState } from "react";

const EditTodoForm = ({ task, id, updateTodo, cancelEdit }) => {
  const [newTask, setNewTask] = useState(task);

  const handleChange = (e) => {
    setNewTask(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateTodo(id, newTask);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={newTask} onChange={handleChange} />
      <button type="submit">Save</button>
      <button type="button" onClick={cancelEdit}>Cancel</button>
    </form>
  );
};

export default EditTodoForm;
