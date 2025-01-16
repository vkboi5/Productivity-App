import React, { useState, useEffect } from 'react';
import { FaEllipsisV, FaTrash, FaEdit, FaCheck, FaTimes } from 'react-icons/fa';
import styles from './Todo.module.css'; // Import CSS module

const Todo = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [taskDetails, setTaskDetails] = useState('');
  const [selectedTask, setSelectedTask] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // State to manage editing mode
  const [editedTaskText, setEditedTaskText] = useState(''); // State to store edited task text

  // Fetch tasks from localStorage on initial load
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
  }, []);

  // Save tasks to localStorage whenever tasks array changes
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Add a new task to the list
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

  // Delete a task
  const deleteTask = (id) => setTasks(tasks.filter((task) => task.id !== id));

  // Toggle task completion status
  const toggleCompletion = (id) =>
    setTasks(tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));

  // Show or hide menu for a task
  const handleMenuToggle = (id) => {
    setSelectedTask(id);
    setShowMenu(!showMenu);
  };

  // Close the menu
  const closeMenu = () => setShowMenu(false);

  // Start editing task text
  const startEditing = (task) => {
    setIsEditing(true);
    setEditedTaskText(task.text); // Prepopulate with current task text
    setSelectedTask(task.id); // Set selected task to the one being edited
  };

  // Save the edited task text
  const saveEdit = (id) => {
    setTasks(tasks.map((task) =>
      task.id === id ? { ...task, text: editedTaskText } : task
    ));
    setIsEditing(false); // Exit edit mode
    setSelectedTask(null); // Close the menu
  };

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
              {isEditing && selectedTask === task.id ? (
                <input
                  type="text"
                  value={editedTaskText}
                  onChange={(e) => setEditedTaskText(e.target.value)}
                  className={styles.editInput}
                />
              ) : (
                <span>{task.text}</span>
              )}
              <span className={styles.taskDate}>{new Date(task.id).toLocaleString()}</span>
              <FaEllipsisV onClick={() => handleMenuToggle(task.id)} />
            </div>

            {showMenu && selectedTask === task.id && !isEditing && (
              <div className={styles.menu}>
                <button className={styles.closeButton} onClick={closeMenu}>
                  <FaTimes />
                </button>
                <button onClick={() => toggleCompletion(task.id)}>
                  <FaCheck /> Mark as Done
                </button>
                <button onClick={() => startEditing(task)}>
                  <FaEdit /> Edit
                </button>
                <button onClick={() => deleteTask(task.id)} className={styles.deleteButton}>
                  <FaTrash /> Delete
                </button>
              </div>
            )}

            {isEditing && selectedTask === task.id && (
              <div className={styles.saveCancelButtons}>
                <button onClick={() => saveEdit(task.id)} className={styles.saveButton}>Save</button>
                <button onClick={() => setIsEditing(false)} className={styles.cancelButton}>Cancel</button>
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
