const mysql = require('mysql2');
const dotenv = require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'DB_HOST',
    user: process.env.DB_USER || 'DB_USER',
    password: process.env.DB_PASSWORD || 'DB_PASSWORD',
    database: process.env.DB_NAME || 'DB_NAME',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

console.log('🔄 Attempting to connect to MySQL...');

// Test the connection
pool.getConnection((err, connection) => {
    if (err) {
        console.error('❌ Database connection failed:', err.message);
    } else {
        console.log('✅ Connected to MySQL database');
        connection.release();
    }
});

// Export the promise-based pool
module.exports = pool.promise();

