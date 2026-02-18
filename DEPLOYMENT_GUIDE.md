# EduSmartTutoring - Production Setup Guide

## 🎉 Frontend - Live on AWS S3

### Frontend URL (Live)
```
http://edusmart-frontend-243807.s3-website-us-east-1.amazonaws.com
```

**Status:** ✅ Frontend is now live and accessible!

---

## 🚀 Backend Deployment Options

Your backend can be deployed using one of the following services:

### Option 1: Railway.app (Recommended - Easy)
1. Go to https://railway.app
2. Sign up with GitHub
3. Create new project → Deploy from GitHub
4. Select: `amaanmoizuddin4-lab/EduSmart-Solutions`
5. Railway auto-detects the Node.js backend
6. Set environment variables:
   ```
   PORT=3000
   NODE_ENV=production
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ANTHROPIC_API_KEY=your_claude_api_key
   FRONTEND_URL=http://edusmart-frontend-243807.s3-website-us-east-1.amazonaws.com
   ```
7. Click Deploy - Done in 2-3 minutes!

### Option 2: Render.com
1. Go to https://render.com
2. Sign up with GitHub
3. New Web Service → Connect GitHub repo
4. Set build command: `npm install`
5. Set start command: `npm start`
6. Add environment variables (same as above)
7. Free tier includes: 750 hours/month

### Option 3: AWS EC2 (Advanced)
1. Launch EC2 instance (t2.micro - Free Tier eligible)
2. Install Node.js and npm
3. Clone repository: `git clone https://github.com/amaanmoizuddin4-lab/EduSmart-Solutions.git`
4. Navigate to backend: `cd backend`
5. Install: `npm install`
6. Create `.env` file with your configuration
7. Start: `npm start`
8. Configure Security Group to allow port 3000

### Option 4: Local Development
```bash
cd backend
npm install
npm start
```
Then update FRONTEND_URL in `.env` to your production S3 URL.

---

## 📋 Configuration

### Required Environment Variables
- `MONGODB_URI` - MongoDB connection string (use MongoDB Atlas for free tier)
- `JWT_SECRET` - Secret key for JWT tokens
- `ANTHROPIC_API_KEY` - Your Claude AI API key
- `FRONTEND_URL` - Frontend S3 URL provided above

### For MongoDB (Free)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free cluster
3. Get connection string
4. Add to `.env` as `MONGODB_URI`

---

## ✅ Testing

### Test Frontend
Open in browser: http://edusmart-frontend-243807.s3-website-us-east-1.amazonaws.com

### Test Backend API
```bash
curl http://your-backend-url/api/health
```

---

## 📊 Summary

| Component | Status | URL |
|-----------|--------|-----|
| Frontend | ✅ Live | http://edusmart-frontend-243807.s3-website-us-east-1.amazonaws.com |
| Backend | 📝 Ready to Deploy | Use Railway/Render/EC2 |
| GitHub | ✅ Connected | https://github.com/amaanmoizuddin4-lab/EduSmart-Solutions |
| S3 Bucket | ✅ Active | edusmart-frontend-243807 |

---

## 🔗 Quick Links

- **GitHub Repo:** https://github.com/amaanmoizuddin4-lab/EduSmart-Solutions
- **Frontend (Live):** http://edusmart-frontend-243807.s3-website-us-east-1.amazonaws.com
- **MongoDB Atlas:** https://www.mongodb.com/cloud/atlas
- **Railway:** https://railway.app
- **Render:** https://render.com

---

## 📞 Next Steps

1. Deploy your backend using one of the options above
2. Update the `REACT_APP_API_BASE_URL` in frontend if needed
3. Rebuild and redeploy frontend: `npm run build && aws s3 sync dist s3://edusmart-frontend-243807`
4. Test the complete application

Everything is set up and ready! 🚀
