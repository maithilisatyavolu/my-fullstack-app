// frontend/src/App.jsx
import { useState, useEffect } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  // 1. Fetch tasks from the Node.js backend API
  useEffect(() => {
    fetch('http://localhost:5000/api/tasks')
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error('Error fetching data:', err));
  }, []);

  // 2. Post a new task to the Node.js backend API
  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    fetch('http://localhost:5000/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTaskTitle }),
    })
      .then((res) => res.json())
      .then((newTask) => {
        setTasks([...tasks, newTask]); // Update UI with the new item
        setNewTaskTitle(''); // Clear input
      })
      .catch((err) => console.error('Error adding task:', err));
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Task Manager</h1>
      
      {/* Form to submit data */}
      <form onSubmit={handleAddTask} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Enter a new task..."
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          style={{ padding: '8px', marginRight: '8px' }}
        />
        <button type="submit" style={{ padding: '8px 12px' }}>Add Task</button>
      </form>

      {/* Render list items dynamically */}
      <ul>
        {tasks.map((task) => (
          <li key={task.id} style={{ margin: '8px 0' }}>
            {task.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;