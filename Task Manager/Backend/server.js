const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); // Agar frontend bisa akses backend
app.use(express.json()); // Agar bisa baca data format JSON

// Database sementara (In-Memory)
let tasks = [
  { id: 1, title: "Belajar Fullstack Dasar", completed: false },
  { id: 2, title: "Buat Prototype Portofolio", completed: false }
];

// 1. Ambil semua tugas (GET)
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// 2. Tambah tugas baru (POST)
app.post('/tasks', (req, res) => {
  const newTask = {
    id: Date.now(), // ID unik dari timestamp
    title: req.body.title,
    completed: false
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  tasks = tasks.filter(task => task.id !== parseInt(id));
  res.json({ message: "Tugas berhasil dihapus" });
});

app.listen(5000, () => console.log("Server jalan di http://localhost:5000"));

app.patch('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const task = tasks.find(t => t.id === parseInt(id));
    if (task) {
        task.completed = !task.completed; // Toggle status
        res.json(task);
    } else {
        res.status(404).json({ message: "Tugas tidak ditemukan" });
    }
});

// ... app.listen ...