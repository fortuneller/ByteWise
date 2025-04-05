const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('./config/db');

// Load env and connect DB
dotenv.config();
connectDB();

const app = express();

// Middleware (must come BEFORE your routes)
app.use(cors());
app.use(express.json()); // ✅ enables req.body

// Routes
const authRoutes = require('./routes/authRoutes');
const lessonRoutes = require('./routes/lessonRoutes');
const folderRoutes = require('./routes/folderRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/lessons', lessonRoutes);
app.use('/api/folders', folderRoutes); // ✅ only one instance here

// Root test route
app.get('/', (req, res) => res.send('ByteWise API Running'));

// Start server
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
