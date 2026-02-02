import express from 'express';
import { AdvancedSpecializedController } from '../controllers/advanced-specialized-controller';
import { authenticate } from '../middleware/auth';

const router = express.Router();
const advancedController = new AdvancedSpecializedController();

// Neurological Analysis
router.get(
  '/neurological/:patientId',
  authenticate,
  advancedController.analyzeNeurologicalCondition
);

// Oncology Analysis
router.get(
  '/oncology/:patientId',
  authenticate,
  advancedController.analyzeOncologyCase
);

// Immunology Analysis
router.get(
  '/immunology/:patientId',
  authenticate,
  advancedController.analyzeImmunologyProfile
);

// Pediatric Analysis
router.get(
  '/pediatric/:patientId',
  authenticate,
  advancedController.analyzePediatricDevelopment
);

// Geriatric Analysis
router.get(
  '/geriatric/:patientId',
  authenticate,
  advancedController.analyzeGeriatricHealth
);

export default router; 