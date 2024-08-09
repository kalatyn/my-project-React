import React from "react";

const CompliteItem = ({ task, deleteTask }) => {
  return (
    <li>
      <div>{task.text}</div>

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

export default CompliteItem;
