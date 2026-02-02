import { body } from 'express-validator';

export const analyzeSymptomsSchema = [
  body('symptoms')
    .isArray({ min: 1 })
    .withMessage('At least one symptom is required'),
  
  body('symptoms.*')
    .trim()
    .notEmpty()
    .withMessage('Symptom cannot be empty')
    .isLength({ max: 255 })
    .withMessage('Symptom must be less than 255 characters'),
  
  body('severity')
    .optional()
    .isIn(['mild', 'moderate', 'severe'])
    .withMessage('Severity must be one of: mild, moderate, severe'),
  
  body('duration')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Duration must be less than 100 characters'),
  
  body('additionalNotes')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Additional notes must be less than 1000 characters'),
];

export const scheduleAppointmentSchema = [
  body('doctorId')
    .trim()
    .notEmpty()
    .withMessage('Doctor ID is required'),
  
  body('preferredDate')
    .notEmpty()
    .withMessage('Preferred date is required')
    .isISO8601()
    .withMessage('Invalid date format. Please use ISO 8601 format'),
  
  body('preferredTime')
    .trim()
    .notEmpty()
    .withMessage('Preferred time is required')
    .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage('Invalid time format. Please use HH:MM format'),
  
  body('reason')
    .trim()
    .notEmpty()
    .withMessage('Reason for appointment is required')
    .isLength({ max: 1000 })
    .withMessage('Reason must be less than 1000 characters'),
  
  body('symptoms')
    .optional()
    .isArray()
    .withMessage('Symptoms must be an array'),
  
  body('symptoms.*')
    .if(body('symptoms').exists())
    .trim()
    .notEmpty()
    .withMessage('Symptom cannot be empty')
    .isLength({ max: 255 })
    .withMessage('Symptom must be less than 255 characters'),
];

export const getHealthTipsSchema = [
  body('category')
    .optional()
    .trim()
    .isIn(['general', 'nutrition', 'exercise', 'mental', 'chronic', 'preventive'])
    .withMessage('Invalid category'),
  
  body('ageGroup')
    .optional()
    .trim()
    .isIn(['child', 'teen', 'adult', 'senior'])
    .withMessage('Invalid age group'),
  
  body('limit')
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage('Limit must be between 1 and 50')
    .toInt(),
];

export const getMedicationReminderSchema = [
  body('medicationId')
    .trim()
    .notEmpty()
    .withMessage('Medication ID is required'),
  
  body('reminderTime')
    .trim()
    .notEmpty()
    .withMessage('Reminder time is required')
    .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage('Invalid time format. Please use HH:MM format'),
  
  body('days')
    .isArray({ min: 1 })
    .withMessage('At least one day is required'),
  
  body('days.*')
    .isIn(['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'])
    .withMessage('Invalid day of the week'),
  
  body('isActive')
    .optional()
    .isBoolean()
    .withMessage('isActive must be a boolean')
    .toBoolean(),
];
