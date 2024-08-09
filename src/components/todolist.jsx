import React from "react";
import TodoItem from "./todoitem.jsx";
const TodoList = ({ tasks, deleteTask, completeTask }) => {
  return (
    <div className="todo_done">
      <div className="todo">
        <ul>
          {tasks.map((task) => (
            <TodoItem
              key={task.id}
              task={task}
              deleteTask={deleteTask}
              completeTask={completeTask}
            />
          ))}
        </ul>
      </div>
      <div className="done">
        <ul></ul>
      </div>
    </div>
  );
};

export default TodoList;
