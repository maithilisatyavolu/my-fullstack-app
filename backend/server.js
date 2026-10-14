const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Enable CORS so the React app can access this API
app.use(cors());

// Middleware to parse incoming JSON payloads
app.use(express.json());

// Sample data acting as a temporary database
let tasks = [
    { id: 1, title: "Learn Node.js" },
    { id: 2, title: "Build a React Frontend" }
];

// GET Route: Fetch all tasks
app.get('/api/tasks', (req, res) => {
    res.json(tasks);
});

// POST Route: Add a new task
app.post('/api/tasks', (req, res) => {
    const newTask = {
        id: tasks.length + 1,
        title: req.body.title
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

app.listen(PORT, () => {
    console.log(`Backend server is running on http://localhost:${PORT}`);
});