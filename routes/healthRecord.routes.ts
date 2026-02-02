import { Router } from 'express';
import {
  createHealthRecord,
  getHealthRecord,
  updateHealthRecord,
  deleteHealthRecord,
  getPatientHealthRecords,
  getHealthRecordsByType
} from '../controllers/healthRecord.controller';
import { authenticate, authorize } from '../middleware/auth';
import { UserRole } from '../types/user.types';
import { validate } from '../middleware/validation';
import { createHealthRecordSchema, updateHealthRecordSchema } from '../validations/healthRecord.validation';

const router = Router();

// All routes require authentication
router.use(authenticate);

// Create new health record (Doctors/Admins only)
router.post(
  '/',
  authorize([UserRole.DOCTOR, UserRole.ADMIN]),
  validate(createHealthRecordSchema),
  createHealthRecord
);

// Get current user's health records
router.get('/me', getPatientHealthRecords);

// Get health records by type for current user
router.get('/me/type/:type', getHealthRecordsByType);

// Get specific health record
router.get('/:id', getHealthRecord);

// Update health record (Doctors/Admins only)
router.patch(
  '/:id',
  authorize([UserRole.DOCTOR, UserRole.ADMIN]),
  validate(updateHealthRecordSchema),
  updateHealthRecord
);

// Delete health record (Admins only)
router.delete('/:id', authorize([UserRole.ADMIN]), deleteHealthRecord);

// Admin/Doctor only routes
router.use(authorize([UserRole.ADMIN, UserRole.DOCTOR]));

// Get patient's health records by patient ID
router.get('/patient/:patientId', getPatientHealthRecords);

// Get patient's health records by type and patient ID
router.get('/patient/:patientId/type/:type', getHealthRecordsByType);

export default router;
