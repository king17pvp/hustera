# HUSTera E-Learning Platform

HUSTera is an online learning platform that provides courses, community forums, and personalized learning experiences.

## Prerequisites

- Node.js (v16 or later)
- MySQL (v8.0 or later)
- npm or yarn

## Setup Instructions

### 1. Database Setup

1. Install MySQL and MySQL Workbench if not already installed
2. Open MySQL Workbench and connect to your local MySQL server
3. Create a new schema (database) called `hustera_db`:
   ```sql
   CREATE DATABASE hustera_db;
   ```
4. Import the database structure and data:
   - Go to Server > Data Import
   - Select "Import from Self-Contained File"
   - Browse to `backend/src/config/hustera_db.sql`
   - Select `hustera_db` as the Default Target Schema
   - Click "Start Import"

### 2. Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Install nodemon globally (if not already installed):
   ```
   npm install -g nodemon
   ```

4. Create a `.env` file in the backend directory with the following content:
   ```
   PORT=5000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_NAME=hustera_db
   JWT_SECRET=hustera_development_secret
Replace your_mysql_password with your actual MySQL password.

