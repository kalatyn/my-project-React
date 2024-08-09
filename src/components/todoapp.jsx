import React, { useEffect, useState } from "react";
import TodoList from "./todolist";
import CompliteList from "./complitelist";

const Todoapp = () => {
  // Загрузка задач из localStorage при загрузке компонента
  const [tasks, setTasks] = useState(
    () => JSON.parse(localStorage.getItem("tasks")) || []
  );
  const [completedTasks, setCompletedTasks] = useState(
    () => JSON.parse(localStorage.getItem("completedTasks")) || []
  );
  const [task, setTask] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  // Сохранение задач в localStorage при их обновлении
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
  }, [completedTasks]);
  const addTask = () => {
    if (task.trim()) {
      setTasks([
        ...tasks,
        { text: task, date: date, time: time, id: Date.now() },
      ]);
      setTask("");
      setDate("");
      setTime("");
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const deleteCompletedTask = (id) => {
    setCompletedTasks(completedTasks.filter((task) => task.id !== id));
  };

  const completeTask = (id) => {
    const completedTask = tasks.find((task) => task.id === id);
    setTasks(tasks.filter((task) => task.id !== id));
    setCompletedTasks([...completedTasks, completedTask]);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <input
        className="inputTask"
        placeholder="Enter task"
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <input
        className="inputTask_date_time"
        type="date"
        value={date}
        placeholder="Enter date"
        onChange={(e) => setDate(e.target.value)}
      />
      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        className="inputTask_date_time"
      />
      <button className="addTask" onClick={addTask}>
        Add Task
      </button>
      <div className="lists">
        <div className="list">
          <h2>Tasks</h2>
          <TodoList
            tasks={tasks}
            deleteTask={deleteTask}
            completeTask={completeTask}
          />
        </div>
        <div className="list">
          <h2>Completed Tasks</h2>
          <CompliteList
            tasks={completedTasks}
            deleteTask={deleteCompletedTask}
            completeTask={completeTask}
          />
        </div>
      </div>
    </div>
  );
};

export default Todoapp;
