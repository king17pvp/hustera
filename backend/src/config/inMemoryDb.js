const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');

// Initialize in-memory database
const db = new Database(':memory:', { verbose: console.log });

// Setup basic schema
function setupDatabase() {
  // Create users table
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Create courses table
  db.exec(`
    CREATE TABLE IF NOT EXISTS courses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      instructor TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Insert some sample data
  const insertUser = db.prepare('INSERT OR IGNORE INTO users (username, email, password) VALUES (?, ?, ?)');
  insertUser.run('testuser', 'test@example.com', 'password123');
  
  const insertCourse = db.prepare('INSERT OR IGNORE INTO courses (title, description, instructor) VALUES (?, ?, ?)');
  insertCourse.run('Introduction to Programming', 'Learn the basics of programming', 'Dr. Smith');
  insertCourse.run('Database Systems', 'Understanding database design and SQL', 'Prof. Johnson');
  insertCourse.run('Web Development', 'HTML, CSS, and JavaScript', 'Jane Doe');

  console.log('✅ In-memory database setup completed');
}

// Wrapper methods to mimic MySQL interface
const inMemoryDb = {
  connect: (callback) => {
    try {
      setupDatabase();
      callback(null);
    } catch (err) {
      callback(err);
    }
  },
  
  query: (sql, params, callback) => {
    try {
      if (typeof params === 'function') {
        callback = params;
        params = [];
      }
      
      // Handle SELECT queries
      if (sql.trim().toLowerCase().startsWith('select')) {
        const stmt = db.prepare(sql);
        const rows = stmt.all(params);
        callback(null, rows, null);
      } 
      // Handle INSERT, UPDATE, DELETE queries
      else {
        const stmt = db.prepare(sql);
        const info = stmt.run(params);
        callback(null, info, null);
      }
    } catch (err) {
      callback(err, null, null);
    }
  },
  
  end: () => {
    db.close();
  }
};

module.exports = inMemoryDb;