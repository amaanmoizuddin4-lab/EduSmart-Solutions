# EduSmart API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
All protected endpoints require JWT Bearer token in Authorization header:
```
Authorization: Bearer <jwt_token>
```

---

## Student Endpoints

### 1. Register Student
**POST** `/students/register`

**Public** | No authentication required

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "grade": "10",
  "subjects": ["Mathematics", "Physics"],
  "learningStyle": "Visual"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Student registered successfully",
  "token": "jwt_token_here",
  "student": {
    "id": "student_id",
    "name": "John Doe",
    "email": "john@example.com",
    "grade": "10",
    "subjects": ["Mathematics", "Physics"],
    "learningStyle": "Visual"
  }
}
```

---

### 2. Login Student
**POST** `/students/login`

**Public** | No authentication required

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "jwt_token_here",
  "student": {
    "id": "student_id",
    "name": "John Doe",
    "email": "john@example.com",
    "grade": "10"
  }
}
```

---

### 3. Get Student Profile
**GET** `/students/profile`

**Protected** | Requires JWT token

**Response (200 OK):**
```json
{
  "success": true,
  "student": {
    "_id": "student_id",
    "name": "John Doe",
    "email": "john@example.com",
    "grade": "10",
    "subjects": ["Mathematics", "Physics"],
    "learningStyle": "Visual",
    "totalQueriesAnswered": 15,
    "averagePerformanceScore": 78,
    "weakAreas": ["Calculus"],
    "strongAreas": ["Algebra"],
    "feedbackScore": 4.2,
    "createdAt": "2024-02-14T10:30:00Z"
  }
}
```

---

### 4. Update Student Profile
**PUT** `/students/profile`

**Protected** | Requires JWT token

**Request Body:**
```json
{
  "subjects": ["Mathematics", "Chemistry"],
  "learningStyle": "Kinesthetic"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "student": {
    "id": "student_id",
    "name": "John Doe",
    "subjects": ["Mathematics", "Chemistry"],
    "learningStyle": "Kinesthetic"
  }
}
```

---

## Query Endpoints

### 1. Submit Homework Question
**POST** `/queries/submit`

**Protected** | Requires JWT token

**Request Body:**
```json
{
  "subject": "Mathematics",
  "topic": "Quadratic Equations",
  "question": "How do I solve x^2 + 5x + 6 = 0?",
  "difficulty": "Intermediate"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Query processed successfully",
  "query": {
    "_id": "query_id",
    "studentId": "student_id",
    "subject": "Mathematics",
    "topic": "Quadratic Equations",
    "question": "How do I solve x^2 + 5x + 6 = 0?",
    "aiResponse": "To solve the quadratic equation x^2 + 5x + 6 = 0, we can factor it...",
    "responseTime": 1234,
    "resolutionStatus": "Resolved",
    "createdAt": "2024-02-14T10:30:00Z"
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Please provide subject, topic, and question"
}
```

---

### 2. Get Student's Queries
**GET** `/queries/my-queries?page=1&limit=10`

**Protected** | Requires JWT token

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Results per page (default: 10)

**Response (200 OK):**
```json
{
  "success": true,
  "queries": [
    {
      "_id": "query_id",
      "subject": "Mathematics",
      "topic": "Quadratic Equations",
      "question": "How do I solve...?",
      "aiResponse": "To solve this...",
      "studentFeedback": {
        "rating": 5,
        "comment": "Very helpful!",
        "helpful": true
      },
      "responseTime": 1234,
      "createdAt": "2024-02-14T10:30:00Z"
    }
  ],
  "pagination": {
    "total": 25,
    "page": 1,
    "pages": 3
  }
}
```

---

### 3. Submit Query Feedback
**POST** `/queries/:queryId/feedback`

**Protected** | Requires JWT token

**Request Body:**
```json
{
  "rating": 5,
  "comment": "Great explanation!",
  "helpful": true
}
```

**Parameters:**
- `queryId`: The query ID to provide feedback for

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Feedback submitted successfully",
  "query": {
    "_id": "query_id",
    "studentFeedback": {
      "rating": 5,
      "comment": "Great explanation!",
      "helpful": true
    }
  }
}
```

---

### 4. Get Query Statistics
**GET** `/queries/statistics`

**Protected** | Requires JWT token

**Response (200 OK):**
```json
{
  "success": true,
  "statistics": {
    "totalQueries": 15,
    "averageRating": 4.5,
    "averageResponseTime": 1450,
    "helpfulCount": 12,
    "subjectDistribution": {
      "Mathematics": 8,
      "Physics": 4,
      "Chemistry": 3
    }
  }
}
```

---

### 5. Get Personalized Recommendations
**GET** `/queries/recommendations/personalized`

**Protected** | Requires JWT token

**Response (200 OK):**
```json
{
  "success": true,
  "recommendations": {
    "studentId": "student_id",
    "recommendations": "Based on your learning history...\n\n1. Priority Topics:\n- Calculus\n- Trigonometry\n\n2. Study Tips:\n- Use visual diagrams...",
    "suggestedMaterials": [
      {
        "_id": "material_id",
        "title": "Understanding Calculus Basics",
        "subject": "Mathematics",
        "difficulty": "Intermediate"
      }
    ],
    "generatedAt": "2024-02-14T10:30:00Z"
  }
}
```

---

## Learning Material Endpoints

### 1. Get Learning Materials
**GET** `/learning-materials?subject=Mathematics&difficulty=Intermediate&grade=10&page=1&limit=10`

**Public** | No authentication required

**Query Parameters:**
- `subject`: Filter by subject
- `difficulty`: Filter by difficulty level
- `grade`: Filter by grade
- `page`: Page number
- `limit`: Results per page

**Response (200 OK):**
```json
{
  "success": true,
  "materials": [
    {
      "_id": "material_id",
      "title": "Introduction to Quadratic Equations",
      "subject": "Mathematics",
      "topic": "Algebra",
      "description": "Learn the basics of quadratic equations...",
      "difficulty": "Intermediate",
      "grade": ["10", "11"],
      "learningStyle": ["Visual", "Reading/Writing"],
      "resourceUrl": "https://example.com/resource",
      "tags": ["algebra", "equations", "quadratic"],
      "estimatedReadTime": 15,
      "usageCount": 142,
      "rating": 4.7
    }
  ],
  "pagination": {
    "total": 45,
    "page": 1,
    "pages": 5
  }
}
```

---

### 2. Get Learning Material by ID
**GET** `/learning-materials/:id`

**Protected** | Requires JWT token

**Parameters:**
- `id`: Material ID

**Response (200 OK):**
```json
{
  "success": true,
  "material": {
    "_id": "material_id",
    "title": "Introduction to Quadratic Equations",
    "subject": "Mathematics",
    "content": "Full content here...",
    "difficulty": "Intermediate",
    "rating": 4.7,
    "usageCount": 143
  }
}
```

---

### 3. Create Learning Material
**POST** `/learning-materials`

**Protected** | Requires JWT token (Admin)

**Request Body:**
```json
{
  "title": "Advanced Calculus Concepts",
  "subject": "Mathematics",
  "topic": "Calculus",
  "description": "Deep dive into calculus...",
  "content": "Full content of the material...",
  "difficulty": "Advanced",
  "grade": ["11", "12"],
  "learningStyle": ["Reading/Writing", "Kinesthetic"],
  "resourceUrl": "https://example.com/resource",
  "tags": ["calculus", "advanced", "mathematics"]
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Learning material created successfully",
  "material": {
    "_id": "new_material_id",
    "title": "Advanced Calculus Concepts",
    "subject": "Mathematics",
    "rating": 0,
    "usageCount": 0,
    "createdAt": "2024-02-14T10:30:00Z"
  }
}
```

---

### 4. Update Learning Material
**PUT** `/learning-materials/:id`

**Protected** | Requires JWT token (Admin)

**Request Body:** (All fields optional)
```json
{
  "title": "Updated Title",
  "description": "Updated description",
  "rating": 4.8
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Learning material updated successfully",
  "material": { ... }
}
```

---

### 5. Delete Learning Material
**DELETE** `/learning-materials/:id`

**Protected** | Requires JWT token (Admin)

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Learning material deleted successfully"
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Please provide all required fields"
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Invalid or expired token"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Resource not found"
}
```

### 409 Conflict
```json
{
  "success": false,
  "message": "Email already registered"
}
```

### 500 Server Error
```json
{
  "success": false,
  "message": "Internal server error"
}
```

---

## Rate Limiting

Currently no rate limiting implemented. This should be added in production using:
- `express-rate-limit` package
- Redis for distributed rate limiting

---

## CORS Configuration

Frontend: `http://localhost:3000`
Backend: `http://localhost:5000`

---

## Webhook Events (Future Implementation)

Planned webhook events:
- `query.submitted`
- `feedback.received`
- `recommendation.generated`
- `performance.milestone`

---

## API Example with cURL

```bash
# Register
curl -X POST http://localhost:5000/api/students/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "grade": "10",
    "subjects": ["Mathematics"]
  }'

# Login
curl -X POST http://localhost:5000/api/students/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'

# Submit Query
curl -X POST http://localhost:5000/api/queries/submit \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "subject": "Mathematics",
    "topic": "Algebra",
    "question": "How do I solve 2x + 5 = 13?"
  }'
```

---

**Last Updated**: February 2024
