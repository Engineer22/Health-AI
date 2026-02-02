import express from 'express';
import { MedicalAlgorithmsController } from '../controllers/medical-algorithms-controller';
import { authenticate } from '../middleware/auth';

const router = express.Router();
const algorithmsController = new MedicalAlgorithmsController();

// Cardiac Risk Calculations
router.get(
  '/cardiac/framingham/:patientId',
  authenticate,
  algorithmsController.calculateFraminghamRisk
);

router.get(
  '/cardiac/chads2vasc/:patientId',
  authenticate,
  algorithmsController.calculateCHADS2VASc
);

// Critical Care Scores
router.get(
  '/critical-care/sofa/:patientId',
  authenticate,
  algorithmsController.calculateSOFA
);

// Liver Disease Scores
router.get(
  '/hepatic/meld/:patientId',
  authenticate,
  algorithmsController.calculateMELD
);

// Drug Dosing Calculations
router.post(
  '/pharmacology/dosing/:patientId',
  authenticate,
  algorithmsController.calculateDrugDosing
);

export default router; 