import React from "react";

const DoneItems = ({ tasksDone, deleteTask, done, setDone }) => {
  return (
    <li>
      {tasksDone.text}
      <input type="checkbox" />
      <button
        onClick={() => {
          deleteTask(tasksDone.id);
        }}
      >
        X
      </button>
    </li>
  );
};

export default DoneItems;
