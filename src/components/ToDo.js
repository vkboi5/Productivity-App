// src/components/Todo.js
import React, { useState, useEffect } from 'react';
import { FaEllipsisV, FaTrash, FaEdit, FaCheck, FaShareAlt, FaTimes } from 'react-icons/fa';
import styles from './Todo.module.css'; // Import CSS module

const Todo = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [taskDetails, setTaskDetails] = useState('');
  const [selectedTask, setSelectedTask] = useState(null);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim()) {
      const task = {
        id: Date.now(),
        text: newTask,
        details: taskDetails,
        completed: false,
      };
      setTasks([...tasks, task]);
      setNewTask('');
      setTaskDetails('');
    }
  };

  const deleteTask = (id) => setTasks(tasks.filter((task) => task.id !== id));

  const toggleCompletion = (id) =>
    setTasks(tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));

  const handleMenuToggle = (id) => {
    setSelectedTask(id);
    setShowMenu(!showMenu);
  };

  const closeMenu = () => setShowMenu(false); // Close the menu

  return (
    <div className={styles.todoContainer}>
      <h1>Todo List</h1>

      <div className={styles.inputSection}>
        <input
          type="text"
          placeholder="Enter a new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <textarea
          placeholder="Enter task details..."
          value={taskDetails}
          onChange={(e) => setTaskDetails(e.target.value)}
        ></textarea>
        <button onClick={addTask}>Add Task</button>
      </div>

      <div className={styles.taskList}>
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`${styles.task} ${task.completed ? styles.completed : ''}`}
          >
            <div className={styles.taskHeader}>
              <span>{task.text}</span>
              <span className={styles.taskDate}>{new Date(task.id).toLocaleString()}</span>
              <FaEllipsisV onClick={() => handleMenuToggle(task.id)} />
            </div>

            {showMenu && selectedTask === task.id && (
              <div className={styles.menu}>
                <button className={styles.closeButton} onClick={closeMenu}>
                  <FaTimes />
                </button>
                <button onClick={() => toggleCompletion(task.id)}>
                  <FaCheck /> Mark as Done
                </button>
                <button>
                  <FaEdit /> Edit
                </button>
                <button>
                  <FaShareAlt /> Share
                </button>
                <button onClick={() => deleteTask(task.id)} className={styles.deleteButton}>
                  <FaTrash /> Delete
                </button>
              </div>
            )}

            <p className={styles.taskDetails}>{task.details}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Todo;
