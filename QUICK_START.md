# EduSmart Solutions - Quick Start Guide

## 🎯 Project Overview

**EduSmart Tutoring** is a full-stack AI-powered educational platform that provides:
- Real-time homework assistance using Claude AI
- Personalized learning recommendations
- Performance tracking and analytics
- Student feedback system

## 📦 What's Included

### Backend (Node.js + Express + MongoDB)
- RESTful API with JWT authentication
- Claude AI integration for homework help
- Student profile management
- Query logging and feedback
- Learning materials management
- Personalized recommendations engine

### Frontend (React + Vite + Tailwind CSS)
- Modern, responsive UI
- Real-time chat interface
- Student authentication
- Performance dashboard
- Learning materials browser

### Database (MongoDB)
- Student profiles
- Query history with AI responses
- Learning materials
- Progress tracking
- Feedback data

## 🚀 Installation & Setup (5 minutes)

### Step 1: Prerequisites
```bash
# Check Node.js version (need 16+)
node --version
npm --version

# Start MongoDB (in separate terminal)
mongod
```

### Step 2: Backend Setup
```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file from example
cp .env.example .env

# Edit .env and add your Claude API key
# ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxx
```

### Step 3: Frontend Setup
```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install
```

### Step 4: Run Application
```bash
# Terminal 1: Start Backend
cd backend
npm run dev
# Runs on http://localhost:5000

# Terminal 2: Start Frontend
cd frontend
npm run dev
# Runs on http://localhost:3000
```

### Step 5: Access Application
```
Open http://localhost:3000 in your browser
```

## 🧪 Testing the Platform

### 1. Register New Account
- Click "Sign Up"
- Fill in: Name, Email, Password, Grade (10-12), Subjects, Learning Style
- Submit to create account (auto-login)

### 2. Test Chat Interface
- Go to "Ask Questions" tab
- Select subject (e.g., Mathematics)
- Enter topic (e.g., Quadratic Equations)
- Ask homework question
- Get instant AI response with feedback options

### 3. View Dashboard
- Go to "Dashboard" tab
- See query statistics
- View performance metrics
- Check success targets

## 📊 Key Features to Try

### AI Homework Help
- Real-time responses to homework questions
- Subject and topic-specific answers
- Response time tracking
- Feedback rating system

### Personalized Recommendations
- AI analyzes your question history
- Suggests weak areas to focus on
- Recommends relevant learning materials
- Provides study tips based on learning style

### Performance Analytics
- Total questions answered
- Average response ratings
- Questions by subject
- Progress tracking

## 🔑 Environment Variables Needed

### Backend (.env)
```env
# Database
MONGODB_URI=mongodb://localhost:27017/edusmart

# Server
PORT=5000
NODE_ENV=development

# JWT
JWT_SECRET=your_secure_random_string_here_min_32_chars
JWT_EXPIRE=7d

# Claude AI
ANTHROPIC_API_KEY=sk-ant-your-key-here

# CORS
CORS_ORIGIN=http://localhost:3000
```

## 🎓 Example Homework Questions

Try asking:

**Mathematics**
- How do I solve x² + 5x + 6 = 0?
- Explain the Pythagorean theorem
- How do derivatives work?

**English**
- Can you explain symbolism in literature?
- What's the difference between simile and metaphor?

**Science**
- How does photosynthesis work?
- Explain the water cycle in detail

**History**
- What caused World War II?
- Explain the French Revolution

## 📁 Project Structure

```
EduSmartTutoring/
├── backend/               # Node.js + Express API
│   ├── src/
│   │   ├── models/        # Database schemas
│   │   ├── routes/        # API endpoints
│   │   ├── controllers/   # Business logic
│   │   ├── services/      # AI integration
│   │   ├── middleware/    # Auth & validation
│   │   └── server.js
│   └── package.json
│
├── frontend/              # React SPA
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API calls
│   │   ├── context/       # State management
│   │   └── App.jsx
│   └── package.json
│
└── docs/
    ├── README.md
    ├── API_DOCUMENTATION.md
    └── This file
```

## 🔐 Security Features

- Password hashing with bcryptjs
- JWT authentication
- Protected API routes
- Environment variable protection
- MongoDB injection prevention
- CORS configuration

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| MongoDB connection error | Ensure MongoDB is running: `mongod` |
| API not responding | Check backend is running on port 5000 |
| Frontend blank page | Check browser console for errors |
| Claude API error | Verify API key in .env file |
| Port already in use | Change PORT in .env or kill process |
| CORS errors | Verify CORS_ORIGIN in backend .env |

## 📞 Useful Commands

```bash
# Backend
cd backend
npm run dev        # Development with auto-reload
npm start          # Production mode
npm test           # Run tests

# Frontend
cd frontend
npm run dev        # Development server
npm run build      # Build for production
npm run preview    # Preview production build

# Database
# In MongoDB shell
use edusmart       # Switch to database
db.students.find() # View all students
db.queries.find()  # View all queries
```

## 🌐 API Base URL
```
http://localhost:5000/api
```

## 📚 Available Endpoints

```
# Auth
POST   /students/register
POST   /students/login
GET    /students/profile (protected)
PUT    /students/profile (protected)

# Queries
POST   /queries/submit (protected)
GET    /queries/my-queries (protected)
POST   /queries/:id/feedback (protected)
GET    /queries/recommendations/personalized (protected)
GET    /queries/statistics (protected)

# Learning Materials
GET    /learning-materials
GET    /learning-materials/:id (protected)
POST   /learning-materials (protected - admin)
```

## 🎯 Success Metrics

The application tracks:
- ✅ Response Time Target: < 2 minutes
- ✅ Student Satisfaction: Average feedback rating
- ✅ Performance Improvement: Subject-wise progress

## 🚀 Next Steps

1. ✅ Install all dependencies
2. ✅ Create accounts and test features
3. ✅ Ask AI homework questions
4. ✅ Rate responses and provide feedback
5. ✅ View performance dashboard
6. ✅ Explore learning recommendations
7. 🔄 Deploy to production (when ready)

## 📖 Additional Documentation

- **[Backend README](./backend/README.md)** - Backend setup details
- **[Frontend README](./frontend/README.md)** - Frontend setup details
- **[API Documentation](./docs/API_DOCUMENTATION.md)** - Complete API reference
- **[Main README](./README.md)** - Full project overview

## 🎓 Learning Resources

- [Claude API Docs](https://docs.anthropic.com)
- [Express.js Guide](https://expressjs.com)
- [React Docs](https://react.dev)
- [MongoDB Manual](https://docs.mongodb.com)
- [Tailwind CSS](https://tailwindcss.com)

## 💡 Tips for Success

1. **Test Early**: Create account and ask questions immediately
2. **Rate Responses**: Your feedback helps improve AI responses
3. **Check Dashboard**: Monitor your learning progress
4. **Explore Materials**: Use recommended learning resources
5. **Ask Specific Questions**: Better questions = better answers

## 🤝 Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review the detailed README files
3. Check API documentation
4. Review browser console for errors
5. Verify all services are running

## 0️⃣ Quick Health Check

```bash
# Backend health
curl http://localhost:5000/api/health

# Should return:
# {"success": true, "message": "EduSmart API is running"}
```

---

**Happy Learning! 🎉**

**Last Updated**: February 2024
Version: 1.0.0
