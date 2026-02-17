import {
  getQueryStatistics,
  getRecommendations,
  getStudentQueries,
  submitQuery,
  submitQueryFeedback,
} from '../controllers/queryController.js';

import { authMiddleware } from '../middleware/auth.js';
import express from 'express';

const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

// Query routes
router.post('/submit', submitQuery);
router.get('/my-queries', getStudentQueries);
router.post('/:queryId/feedback', submitQueryFeedback);
router.get('/statistics', getQueryStatistics);

// Recommendations
router.get('/recommendations/personalized', getRecommendations);

export default router;
