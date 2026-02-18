# ✅ Testing All App Features

## 🎯 Quick Test Guide

Run these curl commands to test backend features:

---

## 1️⃣ **STUDENT REGISTRATION**
```bash
curl -X POST http://localhost:5000/api/students/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Student",
    "email": "test@example.com",
    "password": "password123",
    "grade": "10",
    "subjects": ["Math", "Science"],
    "learningStyle": "Visual"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Student registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "student": { ... }
}
```

---

## 2️⃣ **STUDENT LOGIN**
```bash
curl -X POST http://localhost:5000/api/students/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "student": { ... }
}
```

---

## 3️⃣ **GET STUDENT PROFILE**
```bash
# Replace TOKEN with actual token from login
curl -X GET http://localhost:5000/api/students/profile \
  -H "Authorization: Bearer TOKEN"
```

---

## 4️⃣ **SUBMIT QUERY**
```bash
curl -X POST http://localhost:5000/api/queries/submit \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{
    "subject": "Math",
    "topic": "Quadratic Equations",
    "description": "How do I solve quadratic equations?",
    "proficiencyLevel": "Intermediate"
  }'
```

---

## 5️⃣ **GET MY QUERIES**
```bash
curl -X GET "http://localhost:5000/api/queries/my-queries?page=1&limit=10" \
  -H "Authorization: Bearer TOKEN"
```

---

## 6️⃣ **GET LEARNING MATERIALS**
```bash
curl -X GET "http://localhost:5000/api/learning-materials?subject=Math&grade=10" \
  -H "Authorization: Bearer TOKEN"
```

---

## 7️⃣ **SUBMIT QUERY FEEDBACK**
```bash
curl -X POST http://localhost:5000/api/queries/{queryId}/feedback \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{
    "rating": 5,
    "feedback": "Great answer!",
    "helpful": true
  }'
```

---

## 📱 **Frontend Features**

### ✅ Working Features:
- ✅ **Registration Page** - Create new student account
- ✅ **Login Page** - Sign in with credentials
- ✅ **Dashboard** - View profile and learning materials
- ✅ **Chat Interface** - Submit queries and get AI responses
- ✅ **Navigation** - Switch between pages
- ✅ **Authentication Context** - Token management

### 🔄 Testing Frontend:
1. Open: http://edusmart-frontend-243807.s3-website-us-east-1.amazonaws.com
2. Click "Sign up here" to register
3. Use the credentials to login
4. View dashboard and submit a query

---

## 🗄️ **Database Support**

### MongoDB (Recommended)
- **Local:** `mongodb://localhost:27017/edusmart`
- **Cloud:** Use MongoDB Atlas free tier

### Demo Store (Works without DB)
- App automatically uses demo data if MongoDB is unavailable
- All features work in demo mode

---

## 📊 **Status Check**

Run this to verify all services:

```bash
# Check Backend
curl http://localhost:5000/api/students/profile

# Check Frontend
curl http://edusmart-frontend-243807.s3-website-us-east-1.amazonaws.com

# Check GitHub
git remote -v
```

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| "No token provided" | Need to login first |
| "Login failed" | Check email/password, ensure backend is running |
| "Cannot reach backend" | Verify backend on port 5000 is running |
| "Database connection failed" | MongoDB not running or connection string wrong |
| Frontend not loading | Clear browser cache, hard refresh (Ctrl+Shift+R) |

---

## 🚀 All Features Status

| Feature | Status | Notes |
|---------|--------|-------|
| User Registration | ✅ | Working |
| User Login | ✅ | Fixed - now connects to backend |
| Student Profile | ✅ | Protected route |
| Submit Query | ✅ | AI-powered responses |
| Get Queries | ✅ | Paginated |
| Learning Materials | ✅ | Filtered by subject/grade |
| Query Feedback | ✅ | Rate and review responses |
| Recommendations | ✅ | Personalized suggestions |
| Statistics | ✅ | Query analytics |

---

## ✨ Ready to Use!

Your app is now fully functional with:
- ✅ Frontend live on AWS S3
- ✅ Backend running on localhost:5000
- ✅ All API endpoints working
- ✅ GitHub connected

**Frontend URL:** http://edusmart-frontend-243807.s3-website-us-east-1.amazonaws.com
