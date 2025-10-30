const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const db = require('./config/db');

// Routes imports
const registerRoutes = require('./routes/registerRoutes');
const homepageRoutes = require('./routes/homepageRoutes');
const forumRoutes = require('./routes/forumRoutes');
const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes');
const searchRoutes = require('./routes/searchRoutes');
const userManagementRoutes = require('./routes/userManagementRoutes');
const courseManagementRoutes = require('./routes/courseManagementRoutes');
const forumManagementRoutes = require('./routes/forumManagementRoutes');

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ extended: true, limit: '40mb' }));

// Database connection
db.connect(err => {
  if (err) console.error('❌ Database connection failed:', err.message);
  else console.log('✅ Connected to MySQL database');
});

// Admin middleware (updated)
// Public forum routes
app.use('/admin/forum-management', forumManagementRoutes);
app.use('/admin/user-management', userManagementRoutes);
app.use('/admin/course-management', courseManagementRoutes);

// Other routes
app.use('/register', registerRoutes);
app.use('/auth', authRoutes);
app.use('/courses', courseRoutes);
app.use('/search', searchRoutes);
app.use('/forum', forumRoutes);
app.use('/homepage', homepageRoutes);

// Root endpoint
app.get('/', (req, res) => res.send('Welcome to Backend'));

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
