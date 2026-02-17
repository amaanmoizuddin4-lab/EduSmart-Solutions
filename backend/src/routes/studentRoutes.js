import {
  getStudentProfile,
  loginStudent,
  registerStudent,
  updateStudentProfile,
} from '../controllers/studentController.js';

import { authMiddleware } from '../middleware/auth.js';
import express from 'express';

const router = express.Router();

// Public routes
router.post('/register', registerStudent);
router.post('/login', loginStudent);

// Protected routes
router.get('/profile', authMiddleware, getStudentProfile);
router.put('/profile', authMiddleware, updateStudentProfile);

export default router;
