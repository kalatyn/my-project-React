import React from "react";

const TodoItem = ({ task, deleteTask, completeTask }) => {
  return (
    <li>
      <input type="checkbox" onChange={() => completeTask(task.id)} />
      <div>
        {task.text} <br />
        <span>{task.date}</span> <span>{task.time}</span>
      </div>

      <button
        onClick={() => {
          deleteTask(task.id);
        }}
      >
        X
      </button>
    </li>
  );
};

export default TodoItem;
