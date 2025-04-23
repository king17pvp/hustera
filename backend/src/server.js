const express = require('express');
const cors = require('cors');
const session = require('express-session');
const dotenv = require('dotenv').config();
const db = require('./config/db');

// Routes imports
const registerRoutes = require('./routes/registerRoutes');
const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes');
const searchRoutes = require('./routes/searchRoutes');
const userManagementRoutes = require('./routes/userManagementRoutes');
const courseManagementRoutes = require('./routes/courseManagementRoutes');
const forumManagementRoutes = require('./routes/forumManagementRoutes');

const app = express();

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Set secure: true in production with HTTPS
}));

// Middleware
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// Database connection
db.connect(err => {
  if (err) console.error('❌ Database connection failed:', err.message);
  else console.log('✅ Connected to MySQL database');
});

// Admin middleware (updated)
const isAdmin = (req, res, next) => {
  if (req.session.user?.role === 'admin') next();
  else res.status(403).json({ success: false, message: 'Admin access required' });
};

// Routes (fixed structure)
app.use('/admin', (req, res, next) => {
  console.log(`Admin route accessed: ${req.method} ${req.path}`);
  next();
});

// Public forum routes
app.use('/admin/forum-management', forumManagementRoutes);

// Protected admin routes
app.use('/admin/user-management', isAdmin, userManagementRoutes);
app.use('/admin/course-management', isAdmin, courseManagementRoutes);

// Other routes
app.use('/register', registerRoutes);
app.use('/auth', authRoutes);
app.use('/courses', courseRoutes);
app.use('/search', searchRoutes);

// Root endpoint
app.get('/', (req, res) => res.send('Welcome to Backend'));

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
