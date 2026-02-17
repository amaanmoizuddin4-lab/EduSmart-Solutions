import {
  createLearningMaterial,
  deleteLearningMaterial,
  getLearningMaterialById,
  getLearningMaterials,
  updateLearningMaterial,
} from '../controllers/learningMaterialController.js';

import { authMiddleware } from '../middleware/auth.js';
import express from 'express';

const router = express.Router();

// Public routes
router.get('/', getLearningMaterials);
router.get('/:id', authMiddleware, getLearningMaterialById);

// Admin routes (would need admin middleware in production)
router.post('/', authMiddleware, createLearningMaterial);
router.put('/:id', authMiddleware, updateLearningMaterial);
router.delete('/:id', authMiddleware, deleteLearningMaterial);

export default router;
