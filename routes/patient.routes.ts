import { Router } from 'express';
import { 
  getPatientProfile,
  updatePatientProfile,
  getPatientAppointments,
  getPatientHealthRecords,
  getPatientPrescriptions
} from '../controllers/patient.controller';
import { authenticate, authorize } from '../middleware/auth';
import { UserRole } from '../types/user.types';

const router = Router();

// All routes require authentication
router.use(authenticate);

// Get current patient profile
router.get('/me', getPatientProfile);

// Update patient profile
router.patch('/me', updatePatientProfile);

// Get patient appointments
router.get('/me/appointments', getPatientAppointments);

// Get patient health records
router.get('/me/health-records', getPatientHealthRecords);

// Get patient prescriptions
router.get('/me/prescriptions', getPatientPrescriptions);

// Admin/Doctor only routes
router.use(authorize([UserRole.ADMIN, UserRole.DOCTOR]));

// Get patient by ID (Admin/Doctor only)
router.get('/:id', getPatientProfile);

// Get patient appointments by ID (Admin/Doctor only)
router.get('/:id/appointments', getPatientAppointments);

// Get patient health records by ID (Admin/Doctor only)
router.get('/:id/health-records', getPatientHealthRecords);

// Get patient prescriptions by ID (Admin/Doctor only)
router.get('/:id/prescriptions', getPatientPrescriptions);

export default router;
