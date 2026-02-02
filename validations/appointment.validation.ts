import { body, param, query } from 'express-validator';
import { AppointmentStatus } from '@prisma/client';

export const createAppointmentSchema = [
  body('doctorId')
    .trim()
    .notEmpty()
    .withMessage('Doctor ID is required')
    .isString()
    .withMessage('Doctor ID must be a string'),
  
  body('scheduledTime')
    .notEmpty()
    .withMessage('Scheduled time is required')
    .isISO8601()
    .withMessage('Invalid date format. Please use ISO 8601 format')
    .custom((value) => {
      const appointmentDate = new Date(value);
      const now = new Date();
      
      if (appointmentDate <= now) {
        throw new Error('Appointment must be scheduled for a future time');
      }
      return true;
    }),
  
  body('reason')
    .trim()
    .notEmpty()
    .withMessage('Reason for appointment is required')
    .isLength({ max: 1000 })
    .withMessage('Reason must be less than 1000 characters'),
  
  body('notes')
    .optional()
    .trim()
    .isLength({ max: 2000 })
    .withMessage('Notes must be less than 2000 characters'),
];

export const updateAppointmentSchema = [
  param('id')
    .trim()
    .notEmpty()
    .withMessage('Appointment ID is required'),
  
  body('scheduledTime')
    .optional()
    .isISO8601()
    .withMessage('Invalid date format. Please use ISO 8601 format')
    .custom((value) => {
      const appointmentDate = new Date(value);
      const now = new Date();
      
      if (appointmentDate <= now) {
        throw new Error('Appointment must be scheduled for a future time');
      }
      return true;
    }),
  
  body('status')
    .optional()
    .isIn(Object.values(AppointmentStatus))
    .withMessage('Invalid appointment status'),
  
  body('reason')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Reason must be less than 1000 characters'),
  
  body('notes')
    .optional()
    .trim()
    .isLength({ max: 2000 })
    .withMessage('Notes must be less than 2000 characters'),
  
  body('diagnosis')
    .optional()
    .trim()
    .isLength({ max: 2000 })
    .withMessage('Diagnosis must be less than 2000 characters'),
  
  body('prescription')
    .optional()
    .trim()
    .isLength({ max: 2000 })
    .withMessage('Prescription must be less than 2000 characters'),
];

export const getAppointmentsSchema = [
  query('status')
    .optional()
    .isIn(Object.values(AppointmentStatus))
    .withMessage('Invalid status filter'),
  
  query('startDate')
    .optional()
    .isISO8601()
    .withMessage('Invalid start date format. Please use ISO 8601 format'),
  
  query('endDate')
    .optional()
    .isISO8601()
    .withMessage('Invalid end date format. Please use ISO 8601 format'),
  
  query('doctorId')
    .optional()
    .isString()
    .withMessage('Doctor ID must be a string'),
  
  query('patientId')
    .optional()
    .isString()
    .withMessage('Patient ID must be a string'),
  
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer')
    .toInt(),
  
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100')
    .toInt(),
];

export const appointmentIdSchema = [
  param('id')
    .trim()
    .notEmpty()
    .withMessage('Appointment ID is required')
];
