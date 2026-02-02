import { body, param, query } from 'express-validator';

export const createPrescriptionSchema = [
  body('patientId')
    .trim()
    .notEmpty()
    .withMessage('Patient ID is required')
    .isString()
    .withMessage('Patient ID must be a string'),
  
  body('medications')
    .isArray({ min: 1 })
    .withMessage('At least one medication is required'),
  
  body('medications.*.name')
    .trim()
    .notEmpty()
    .withMessage('Medication name is required')
    .isLength({ max: 255 })
    .withMessage('Medication name must be less than 255 characters'),
  
  body('medications.*.dosage')
    .trim()
    .notEmpty()
    .withMessage('Dosage is required')
    .isLength({ max: 100 })
    .withMessage('Dosage must be less than 100 characters'),
  
  body('medications.*.frequency')
    .trim()
    .notEmpty()
    .withMessage('Frequency is required')
    .isLength({ max: 100 })
    .withMessage('Frequency must be less than 100 characters'),
  
  body('medications.*.duration')
    .trim()
    .notEmpty()
    .withMessage('Duration is required')
    .isLength({ max: 100 })
    .withMessage('Duration must be less than 100 characters'),
  
  body('medications.*.instructions')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Instructions must be less than 1000 characters'),
  
  body('notes')
    .optional()
    .trim()
    .isLength({ max: 2000 })
    .withMessage('Notes must be less than 2000 characters'),
  
  body('validUntil')
    .optional()
    .isISO8601()
    .withMessage('Invalid date format. Please use ISO 8601 format')
    .custom((value) => {
      const validDate = new Date(value);
      const now = new Date();
      
      if (validDate <= now) {
        throw new Error('Expiry date must be in the future');
      }
      return true;
    }),
  
  body('isActive')
    .optional()
    .isBoolean()
    .withMessage('isActive must be a boolean')
    .toBoolean(),
];

export const updatePrescriptionSchema = [
  param('id')
    .trim()
    .notEmpty()
    .withMessage('Prescription ID is required'),
  
  body('medications')
    .optional()
    .isArray({ min: 1 })
    .withMessage('At least one medication is required'),
  
  body('medications.*.name')
    .if(body('medications').exists())
    .trim()
    .notEmpty()
    .withMessage('Medication name is required')
    .isLength({ max: 255 })
    .withMessage('Medication name must be less than 255 characters'),
  
  body('medications.*.dosage')
    .if(body('medications').exists())
    .trim()
    .notEmpty()
    .withMessage('Dosage is required')
    .isLength({ max: 100 })
    .withMessage('Dosage must be less than 100 characters'),
  
  body('medications.*.frequency')
    .if(body('medications').exists())
    .trim()
    .notEmpty()
    .withMessage('Frequency is required')
    .isLength({ max: 100 })
    .withMessage('Frequency must be less than 100 characters'),
  
  body('medications.*.duration')
    .if(body('medications').exists())
    .trim()
    .notEmpty()
    .withMessage('Duration is required')
    .isLength({ max: 100 })
    .withMessage('Duration must be less than 100 characters'),
  
  body('medications.*.instructions')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Instructions must be less than 1000 characters'),
  
  body('notes')
    .optional()
    .trim()
    .isLength({ max: 2000 })
    .withMessage('Notes must be less than 2000 characters'),
  
  body('validUntil')
    .optional()
    .isISO8601()
    .withMessage('Invalid date format. Please use ISO 8601 format')
    .custom((value) => {
      const validDate = new Date(value);
      const now = new Date();
      
      if (validDate <= now) {
        throw new Error('Expiry date must be in the future');
      }
      return true;
    }),
  
  body('isActive')
    .optional()
    .isBoolean()
    .withMessage('isActive must be a boolean')
    .toBoolean(),
];

export const getPrescriptionsSchema = [
  query('patientId')
    .optional()
    .isString()
    .withMessage('Patient ID must be a string'),
  
  query('isActive')
    .optional()
    .isBoolean()
    .withMessage('isActive must be a boolean')
    .toBoolean(),
  
  query('startDate')
    .optional()
    .isISO8601()
    .withMessage('Invalid start date format. Please use ISO 8601 format'),
  
  query('endDate')
    .optional()
    .isISO8601()
    .withMessage('Invalid end date format. Please use ISO 8601 format'),
  
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

export const prescriptionIdSchema = [
  param('id')
    .trim()
    .notEmpty()
    .withMessage('Prescription ID is required')
];
