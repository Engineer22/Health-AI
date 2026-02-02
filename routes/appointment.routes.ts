import { Router } from 'express';
import {
  createAppointment,
  getAppointment,
  updateAppointment,
  cancelAppointment,
  getAppointmentsByDate,
  getDoctorAppointments,
  getPatientAppointments
} from '../controllers/appointment.controller';
import { authenticate, authorize } from '../middleware/auth';
import { UserRole } from '../types/user.types';
import { validate } from '../middleware/validation';
import { createAppointmentSchema, updateAppointmentSchema } from '../validations/appointment.validation';

const router = Router();

// All routes require authentication
router.use(authenticate);

// Create new appointment (Patients only)
router.post(
  '/',
  authorize([UserRole.PATIENT]),
  validate(createAppointmentSchema),
  createAppointment
);

// Get appointments for specific date
router.get('/date/:date', getAppointmentsByDate);

// Get doctor's appointments
router.get('/doctor/me', getDoctorAppointments);

// Get patient's appointments
router.get('/patient/me', getPatientAppointments);

// Get appointment by ID
router.get('/:id', getAppointment);

// Update appointment (Doctors/Admins only)
router.patch(
  '/:id',
  authorize([UserRole.DOCTOR, UserRole.ADMIN]),
  validate(updateAppointmentSchema),
  updateAppointment
);

// Cancel appointment
router.patch('/:id/cancel', cancelAppointment);

// Admin only routes
router.use(authorize([UserRole.ADMIN]));

// Get appointments for specific doctor (Admin only)
router.get('/doctor/:doctorId', getDoctorAppointments);

// Get appointments for specific patient (Admin only)
router.get('/patient/:patientId', getPatientAppointments);

export default router;
