import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState(() => {
    return JSON.parse(localStorage.getItem('tasks') || '[]');
  });
  const [input, setInput] = useState('');
  const [deadlineDate, setDeadlineDate] = useState('');
  const [deadlineTime, setDeadlineTime] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const newTask = {
      id: Date.now(),
      text: input.trim(),
      completed: false,
      deadline: deadlineDate ? `${deadlineDate} ${deadlineTime}` : null
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
    setInput('');
    setDeadlineDate('');
    setDeadlineTime('');
  };

  const deleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const toggleCompletion = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const getFilteredTasks = () => {
    switch (filter) {
      case 'completed':
        return tasks.filter((task) => task.completed);
      case 'active':
        return tasks.filter((task) => !task.completed);
      default:
        return tasks;
    }
  };

  return (
    <div className="app">
      <h1>To-Do List Activity</h1>
      <form onSubmit={addTask} className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Kegiatan Baru"
          className="input-field"
        />
        <input
          type="date"
          value={deadlineDate}
          onChange={(e) => setDeadlineDate(e.target.value)}
          className="date-field"
        />
        <input
          type="time"
          value={deadlineTime}
          onChange={(e) => setDeadlineTime(e.target.value)}
          className="time-field"
        />
        <button type="submit" className="add-button">
          Tambahkan Kegiatan
        </button>
      </form>
      <div className="filter-container">
        <button
          onClick={() => setFilter('all')}
          className={`filter-button ${filter === 'all' ? 'active' : ''}`}
        >
          Semua Kegiatan
        </button>
        <button
          onClick={() => setFilter('active')}
          className={`filter-button ${filter === 'active' ? 'active' : ''}`}
        >
          Kegiatan Aktif
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`filter-button ${filter === 'completed' ? 'active' : ''}`}
        >
          Kegiatan Selesai
        </button>
      </div>
      <ul className="task-list">
        {getFilteredTasks().map((task) => (
          <li key={task.id} className="task-item">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleCompletion(task.id)}
              className="checkbox"
            />
            <span className={`task-text ${task.completed ? 'completed' : ''}`}>
              {task.text}
            </span>
            {task.deadline && (
              <span className="deadline">Deadline: {new Date(task.deadline).toLocaleString()}</span>
            )}
            <button
              onClick={() => deleteTask(task.id)}
              className="delete-button"
            >
              Hapus
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
