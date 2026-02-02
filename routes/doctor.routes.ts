import { Router } from 'express';
import {
  getDoctorProfile,
  updateDoctorProfile,
  getDoctorAppointments,
  getDoctorPatients,
  getDoctorSchedule,
  updateDoctorSchedule
} from '../controllers/doctor.controller';
import { authenticate, authorize } from '../middleware/auth';
import { UserRole } from '../types/user.types';

const router = Router();

// All routes require authentication
router.use(authenticate);

// Get current doctor profile
router.get('/me', getDoctorProfile);

// Update doctor profile
router.patch('/me', updateDoctorProfile);

// Get doctor's appointments
router.get('/me/appointments', getDoctorAppointments);

// Get doctor's patients
router.get('/me/patients', getDoctorPatients);

// Get doctor's schedule
router.get('/me/schedule', getDoctorSchedule);

// Update doctor's schedule
router.patch('/me/schedule', updateDoctorSchedule);

// Admin only routes
router.use(authorize([UserRole.ADMIN]));

// Get doctor by ID (Admin only)
router.get('/:id', getDoctorProfile);

// Get doctor's appointments by ID (Admin only)
router.get('/:id/appointments', getDoctorAppointments);

// Get doctor's patients by ID (Admin only)
router.get('/:id/patients', getDoctorPatients);

// Get doctor's schedule by ID (Admin only)
router.get('/:id/schedule', getDoctorSchedule);

// Update doctor's schedule by ID (Admin only)
router.patch('/:id/schedule', updateDoctorSchedule);

export default router;
