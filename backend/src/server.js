const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const db = require('./config/db');
const registerRoutes = require('./routes/registerRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Middleware
app.use(express.json());
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

// Start Server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`🚀 Server is running on port ${port}`);
});

