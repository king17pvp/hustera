const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const db = require('./config/db');
const registerRoutes = require('./routes/registerRoutes');
const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes');
const forumRoutes = require('./routes/forumRoutes');
const app = express();
const searchRoutes = require('./routes/searchRoutes');
// Middleware
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));
app.use(cors({
    origin: 'http://localhost:5173', // Updated to match Vite's default port
    credentials: true,
}));

// Test Database Connection
console.log('🔄 Attempting to connect to MySQL...');

db.connect(err => {
    if (err) {
        console.error('❌ Database connection failed:', err.message);
    } else {
        console.log('✅ Connected to MySQL database');
    }
});

// Root Endpoint
app.get('/', (req, res) => {
    res.send('Welcome to Backend');
});

app.use('/register', registerRoutes);
app.use('/auth', authRoutes);
app.use('/courses', courseRoutes);
app.use('/search', searchRoutes);
app.use('/forum', forumRoutes);
// Start Server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`🚀 Server is running on port ${port}`);
});

