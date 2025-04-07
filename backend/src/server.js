const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const path = require('path');
const db = require('./config/db');
const registerRoutes = require('./routes/registerRoutes');
const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes');
const app = express();
const searchRoutes = require('./routes/searchRoutes');

// Set up CORS
app.use(cors());

// For parsing application/json
app.use(express.json());

// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Log all requests for debugging
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Serve static files - sửa thứ tự và cấu hình
const publicPath = path.join(__dirname, '../public');
console.log("Public directory path:", publicPath);

// Cấu hình đường dẫn tĩnh - đảm bảo cả hai cách tiếp cận đều hoạt động
app.use('/public', express.static(publicPath));
app.use('/images', express.static(path.join(publicPath, 'images')));

// Root Endpoint
app.get('/', (req, res) => {
    res.send('Welcome to Backend');
});

// Kiểm tra ảnh
app.get('/debug/check-image', (req, res) => {
    const imagePath = req.query.path || '/public/images/default-course-thumbnail.jpg';
    const fullPath = path.join(__dirname, '..', imagePath);
    
    if (require('fs').existsSync(fullPath)) {
        res.send(`Ảnh tồn tại tại đường dẫn: ${fullPath}`);
    } else {
        res.status(404).send(`Ảnh không tồn tại tại đường dẫn: ${fullPath}`);
    }
});

// Routes
app.use('/register', registerRoutes);
app.use('/auth', authRoutes);
app.use('/courses', courseRoutes);
app.use('/search', searchRoutes);

// Start Server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`🚀 Server is running on port ${port}`);
});

