const mysql = require('mysql2');
const dotenv = require('dotenv').config();

const db = mysql.createConnection({
    host: process.env.DB_HOST || 'DB_HOST',
    user: process.env.DB_USER || 'DB_USER',
    password: process.env.DB_PASSWORD || 'DB_PASSWORD',
    database: process.env.DB_NAME || 'DB_NAME',
});

console.log('🔄 Attempting to connect to MySQL...');

db.connect(err => {
    if (err) {
        console.error('❌ Database connection failed:', err.message);
    } else {
        console.log('✅ Connected to MySQL database');
    }
});

module.exports = db.promise();