import { Router } from 'express';
import {
  createPrescription,
  getPrescription,
  updatePrescription,
  deletePrescription,
  getPatientPrescriptions,
  getDoctorPrescriptions
} from '../controllers/prescription.controller';
import { authenticate, authorize } from '../middleware/auth';
import { UserRole } from '../types/user.types';
import { validate } from '../middleware/validation';
import { createPrescriptionSchema, updatePrescriptionSchema } from '../validations/prescription.validation';

const router = Router();

// All routes require authentication
router.use(authenticate);

// Create new prescription (Doctors/Admins only)
router.post(
  '/',
  authorize([UserRole.DOCTOR, UserRole.ADMIN]),
  validate(createPrescriptionSchema),
  createPrescription
);

// Get current user's prescriptions
router.get('/me', getPatientPrescriptions);

// Get specific prescription
router.get('/:id', getPrescription);

// Update prescription (Doctors/Admins only)
router.patch(
  '/:id',
  authorize([UserRole.DOCTOR, UserRole.ADMIN]),
  validate(updatePrescriptionSchema),
  updatePrescription
);

// Delete prescription (Admins only)
router.delete('/:id', authorize([UserRole.ADMIN]), deletePrescription);

// Doctor's prescriptions (for doctors to see what they've prescribed)
router.get('/doctor/me', getDoctorPrescriptions);

// Admin/Doctor only routes
router.use(authorize([UserRole.ADMIN, UserRole.DOCTOR]));

// Get patient's prescriptions by patient ID
router.get('/patient/:patientId', getPatientPrescriptions);

// Get doctor's prescriptions by doctor ID (Admin only)
router.get('/doctor/:doctorId', authorize([UserRole.ADMIN]), getDoctorPrescriptions);

export default router;
