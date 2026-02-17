# EduSmart Solutions - AI-Powered Tutoring Platform

A comprehensive full-stack application for high school students to receive personalized homework help and learning recommendations powered by AI.

## 🎯 Overview

EduSmart addresses the inefficiency in student support by automating homework help and providing personalized learning recommendations using Claude AI. The system enables:

- **Real-time homework assistance** with AI-powered explanations
- **Personalized learning recommendations** based on student performance
- **Performance tracking** and feedback mechanisms
- **Scalable architecture** to handle growing student demand

## 📋 Table of Contents

- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [MVP Success Metrics](#mvp-success-metrics)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- MongoDB 5.0+
- Claude API key from Anthropic

### Installation

1. **Clone and Setup**
```bash
cd EduSmartTutoring

# Backend setup
cd backend
cp .env.example .env
# Update .env with your configuration
npm install

# Frontend setup
cd ../frontend
npm install
```

2. **Start MongoDB**
```bash
mongod
```

3. **Start Backend** (Terminal 1)
```bash
cd backend
npm run dev
# Runs on http://localhost:5000
```

4. **Start Frontend** (Terminal 2)
```bash
cd frontend
npm run dev
# Runs on http://localhost:3000
```

5. **Open Application**
```
http://localhost:3000
```

## 📁 Project Structure

```
EduSmartTutoring/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.js          # MongoDB connection
│   │   │   └── env.js               # Environment config
│   │   ├── models/
│   │   │   ├── Student.js           # Student schema
│   │   │   ├── Query.js             # Query schema
│   │   │   ├── LearningMaterial.js  # Material schema
│   │   │   └── StudentProgress.js   # Progress schema
│   │   ├── controllers/
│   │   │   ├── studentController.js
│   │   │   ├── queryController.js
│   │   │   └── learningMaterialController.js
│   │   ├── routes/
│   │   │   ├── studentRoutes.js
│   │   │   ├── queryRoutes.js
│   │   │   └── learningMaterialRoutes.js
│   │   ├── services/
│   │   │   └── aiService.js         # Claude API integration
│   │   ├── middleware/
│   │   │   └── auth.js              # JWT & error handling
│   │   └── server.js                # Express app entry
│   ├── .env.example
│   ├── package.json
│   └── README.md
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   └── ChatInterface.jsx
│   │   ├── pages/
│   │   │   ├── LoginPage.jsx
│   │   │   ├── RegisterPage.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── services/
│   │   │   └── apiService.js
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── public/
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── package.json
│   └── README.md
│
└── docs/
    └── API_DOCUMENTATION.md
```

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js with Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **AI Integration**: Anthropic Claude API
- **Utilities**: bcryptjs, axios, cors, dotenv

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **HTTP Client**: Fetch API with custom service layer
- **State Management**: React Context API

### Infrastructure
- **Database**: MongoDB
- **API**: REST API design
- **Authentication**: Bearer token (JWT)
- **CORS**: Enabled for development

## ✨ Features

### 1. **AI Homework Assistant**
- Submit homework questions with subject and topic
- Receive instant AI-powered explanations
- Response time tracking
- Contextual answers based on learning level

### 2. **Student Authentication**
- User registration with profile setup
- Grade and subject selection
- Learning style preference
- Secure login with JWT

### 3. **Personalized Learning**
- AI analyzes student query history
- Generates tailored learning recommendations
- Tracks performance by subject and topic
- Identifies weak and strong areas

### 4. **Feedback System**
- Rate AI responses (1-5 stars)
- Mark responses as helpful/not helpful
- Student feedback improves system
- Response quality tracking

### 5. **Performance Dashboard**
- Total questions answered
- Average response ratings
- Average response time
- Questions by subject distribution
- Success metrics tracking

### 6. **Learning Materials Library**
- Curated resources by subject and difficulty
- Personalized material recommendations
- Multiple learning styles support
- Usage tracking and ratings

## 📊 MVP Success Metrics

Target achievements:
- **Response Time**: < 2 minutes ✓
- **Student Satisfaction**: 80% positive feedback
- **Performance Improvement**: 70% of students show measurable improvement

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication
All protected endpoints require Bearer token:
```
Authorization: Bearer <jwt_token>
```

### Core Endpoints

#### Students
- `POST /students/register` - Register new student
- `POST /students/login` - Login student
- `GET /students/profile` - Get profile (protected)
- `PUT /students/profile` - Update profile (protected)

#### Queries
- `POST /queries/submit` - Submit homework question (protected)
- `GET /queries/my-queries` - Get student's queries (protected)
- `POST /queries/:queryId/feedback` - Submit feedback (protected)
- `GET /queries/recommendations/personalized` - Get recommendations (protected)
- `GET /queries/statistics` - Get stats (protected)

#### Learning Materials
- `GET /learning-materials` - Get materials
- `GET /learning-materials/:id` - Get material details
- `POST /learning-materials` - Create material (admin)
- `PUT /learning-materials/:id` - Update material (admin)
- `DELETE /learning-materials/:id` - Delete material (admin)

## 🌐 Deployment

### Backend Deployment (Heroku Example)
```bash
cd backend
heroku login
heroku create edusmart-api
git push heroku main
```

### Frontend Deployment (Vercel Example)
```bash
cd frontend
npm run build
vercel
```

### Environment Variables Required

**Backend (.env)**
```
MONGODB_URI=<your_mongodb_connection>
PORT=5000
JWT_SECRET=<secure_random_string>
ANTHROPIC_API_KEY=<your_claude_api_key>
CORS_ORIGIN=<frontend_url>
NODE_ENV=production
```

**Frontend (.env)**
```
VITE_API_URL=<backend_api_url>
```

## 🔐 Security Considerations

- JWT tokens for stateless authentication
- Password hashing with bcryptjs
- MongoDB injection prevention via Mongoose
- CORS configuration
- Environment variables for sensitive data
- Request validation on all endpoints

## 🧪 Testing the Application

1. **Register a new account** with grade 9-12 and subjects
2. **Login** with your credentials
3. **Ask homework questions** in the chat interface
4. **Rate responses** and provide feedback
5. **View dashboard** to see performance metrics
6. **Explore learning materials** for additional help

## 📝 Example Queries

Try asking:
- "How do I solve quadratic equations?"
- "Explain photosynthesis in simple terms"
- "What are the causes of World War II?"
- "How does probability work?"

## 🤝 Contributing

To extend the application:

1. Add new AI capabilities in `backend/src/services/aiService.js`
2. Create new React components in `frontend/src/components/`
3. Add new routes in `backend/src/routes/`
4. Update database models as needed

## 📚 Learning Resources

- [Anthropic Claude API Docs](https://docs.anthropic.com)
- [Express.js Guide](https://expressjs.com)
- [React Documentation](https://react.dev)
- [MongoDB University](https://university.mongodb.com)
- [Tailwind CSS Docs](https://tailwindcss.com)

## 🐛 Troubleshooting

**Backend won't start?**
- Check MongoDB is running
- Verify .env file is properly configured
- Check port 5000 isn't in use

**Frontend won't connect?**
- Verify backend is running on port 5000
- Check CORS settings
- Clear browser cache

**AI responses not working?**
- Verify ANTHROPIC_API_KEY is set
- Check API key has valid credits
- Review API response in browser console

## 📧 Support

For issues or questions:
1. Check backend/README.md and frontend/README.md
2. Review API_DOCUMENTATION.md in docs/
3. Check browser console for errors
4. Verify all services are running

## 📄 License

This project is developed for EduSmart Solutions.

---

**Built with ❤️ to help students succeed through AI-powered tutoring**
