# Hustera - Online Learning Platform

A full-stack web application for online course management and learning community, developed as a capstone project at Hanoi University of Science and Technology.

## ✨ Features

### For Students
- 🔐 User authentication and authorization
- 📚 Browse and search courses
- 📝 Course enrollment and management
- ⭐ Course reviews and ratings
- 💬 Community forum for discussions
- 🔍 Advanced search functionality
- 👤 User profile management

### For Administrators
- 👥 User management
- 📖 Course management
- 🗨️ Forum moderation and management
- 📊 Content oversight

## 📦 Prerequisites

- **Docker Desktop** (recommended) OR
- **Node.js** (v18 or higher)
- **MySQL** (v8.0 or higher)
- **npm** or **yarn**

## 🚀 Installation & Setup

### Option 1: Using Docker (Recommended)

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd hustera
   ```

2. **Start all services with Docker Compose**
   ```bash
   docker-compose up --build
   ```

   This will:
   - Set up MySQL database with initial data
   - Build and start the backend server on port 5001
   - Build and start the frontend on port 5173

3. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5001

### Option 2: Manual Setup

#### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the backend directory:
   ```env
   PORT=5000
   DB_HOST=localhost
   DB_USER=hustera
   DB_PASSWORD=hustera
   DB_NAME=hustera_db
   ```

4. **Set up MySQL database**
   - Create a database named `hustera_db`
   - Run SQL scripts in the following order (see `backend/sql/README.txt`):
     1. `husteradb_final.sql`
     2. `admin.sql`
     3. `tags.sql`
     4. `instructors.sql`
     5. `courses.sql`
     6. `enroll.sql`
     7. `reviews.sql`
     8. `threads.sql`

5. **Start the backend server**
   ```bash
   node src/server.js
   ```

#### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

## 🎯 Usage

### Default Admin Account
After running the database scripts, you can log in with the admin account (if admin.sql was executed):
- Check the `admin.sql` file for credentials

### User Flow
1. **Register** a new account or **Login** with existing credentials
2. **Browse courses** on the homepage
3. **Search** for specific courses or topics
4. **Enroll** in courses
5. **Write reviews** for completed courses
6. **Participate** in forum discussions
7. **Manage profile** in user settings

### Admin Flow
1. **Login** with admin credentials
2. Access **admin panels**:
   - User Management: `/admin/user-management`
   - Course Management: `/admin/course-management`
   - Forum Management: `/admin/forum-management`

## 🔌 API Endpoints

### Authentication
- `POST /auth/login` - User login
- `POST /register` - User registration

### Courses
- `GET /courses` - Get all courses
- `GET /courses/:id` - Get course details
- `POST /courses` - Create new course (Admin)
- `PUT /courses/:id` - Update course (Admin)
- `DELETE /courses/:id` - Delete course (Admin)

### Forum
- `GET /forum` - Get forum threads
- `GET /forum/:id` - Get thread details
- `POST /forum` - Create new thread
- `POST /forum/:id/reply` - Reply to thread

### Search
- `GET /search` - Search courses and forums

### Admin
- `GET /admin/user-management` - Get all users
- `GET /admin/course-management` - Manage courses
- `GET /admin/forum-management` - Manage forum

### Homepage
- `GET /homepage` - Get homepage data

## 🗄️ Database Schema

The application uses MySQL with the following main tables:
- **users** - User accounts and authentication
- **courses** - Course information
- **instructors** - Course instructors
- **tags** - Course categorization
- **enrollments** - Student enrollments
- **reviews** - Course reviews and ratings
- **threads** - Forum discussions
- **replies** - Forum thread replies

For detailed schema, refer to `backend/sql/husteradb_final.sql`

## 🤝 Contributing

This is a student project for educational purposes. If you'd like to contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is developed as part of an academic course at Hanoi University of Science and Technology.

## 👥 Team

Capstone Project Team - Introduction to Software Engineering Course

---

**Note**: This project is for educational purposes only.
