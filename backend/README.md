# EduSmart Backend Setup Guide

## Prerequisites

- Node.js 16+ and npm/yarn
- MongoDB 5.0+
- Claude API key (from Anthropic)

## Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Configuration**
   - Copy `.env.example` to `.env`
   - Update with your configuration:
     ```
     MONGODB_URI=mongodb://localhost:27017/edusmart
     PORT=5000
     JWT_SECRET=your_secure_random_string
     ANTHROPIC_API_KEY=your_claude_api_key
     NODE_ENV=development
     ```

3. **MongoDB Setup**
   ```bash
   # Using MongoDB locally
   mongod
   
   # Or using MongoDB Atlas (update MONGODB_URI in .env)
   ```

## Running the Server

```bash
# Development with hot reload
npm run dev

# Production
npm start
```

Server will start on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/students/register` - Register new student
- `POST /api/students/login` - Login student
- `GET /api/students/profile` - Get student profile (protected)
- `PUT /api/students/profile` - Update student profile (protected)

### Queries (Homework Help)
- `POST /api/queries/submit` - Submit homework question (protected)
- `GET /api/queries/my-queries` - Get student's queries (protected)
- `POST /api/queries/:queryId/feedback` - Submit feedback (protected)
- `GET /api/queries/recommendations/personalized` - Get personalized recommendations (protected)
- `GET /api/queries/statistics` - Get query statistics (protected)

### Learning Materials
- `GET /api/learning-materials` - Get learning materials
- `GET /api/learning-materials/:id` - Get material details
- `POST /api/learning-materials` - Create material (admin)
- `PUT /api/learning-materials/:id` - Update material (admin)
- `DELETE /api/learning-materials/:id` - Delete material (admin)

## Database Models

### Student
- name, email, password, grade
- subjects, learningStyle
- totalQueriesAnswered, averagePerformanceScore
- weakAreas, strongAreas, feedbackScore

### Query
- studentId, subject, topic, question
- aiResponse, difficulty
- studentFeedback (rating, comment, helpful)
- responseTime, resolutionStatus

### LearningMaterial
- title, subject, topic, description
- content, difficulty, grade
- learningStyle, resourceUrl, tags
- estimatedReadTime, usageCount, rating

### StudentProgress
- studentId, subject
- topicScore (map of topics to scores)
- overallScore, improvementTrend
- recommendedTopics, learningPaceScore

## AI Integration (Claude API)

The backend uses Anthropic's Claude API for:
- Processing homework questions with context
- Generating personalized learning recommendations
- Analyzing student performance trends
- Providing educational guidance

### Environment Variable
```
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxx
```

## Error Handling

All endpoints return JSON responses with structure:
```json
{
  "success": true/false,
  "message": "Success/Error message",
  "data": {}
}
```

## Testing

API health check:
```bash
curl http://localhost:5000/api/health
```

## Production Deployment

1. Set `NODE_ENV=production` in .env
2. Use MongoDB Atlas for cloud database
3. Set strong JWT_SECRET
4. Configure CORS_ORIGIN to frontend URL
5. Deploy using services like:
   - Heroku
   - AWS (EC2, EB, Lambda)
   - DigitalOcean
   - Azure App Service

## Troubleshooting

- **MongoDB Connection Error**: Ensure MongoDB is running
- **Claude API Error**: Verify ANTHROPIC_API_KEY is set correctly
- **CORS Issues**: Check CORS_ORIGIN matches frontend URL
- **Port Already in Use**: Change PORT in .env or kill process using the port

## Support

For issues or questions, create an issue in the project repository.
