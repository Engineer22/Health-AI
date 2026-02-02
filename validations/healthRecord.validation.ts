import { body, param, query } from 'express-validator';

export const createHealthRecordSchema = [
  body('patientId')
    .trim()
    .notEmpty()
    .withMessage('Patient ID is required')
    .isString()
    .withMessage('Patient ID must be a string'),
  
  body('recordType')
    .trim()
    .notEmpty()
    .withMessage('Record type is required')
    .isIn(['diagnosis', 'lab_result', 'imaging', 'prescription', 'note', 'other'])
    .withMessage('Invalid record type'),
  
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 255 })
    .withMessage('Title must be less than 255 characters'),
  
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Description is required')
    .isLength({ max: 5000 })
    .withMessage('Description must be less than 5000 characters'),
  
  body('date')
    .optional()
    .isISO8601()
    .withMessage('Invalid date format. Please use ISO 8601 format'),
  
  body('doctorNotes')
    .optional()
    .trim()
    .isLength({ max: 5000 })
    .withMessage('Doctor notes must be less than 5000 characters'),
  
  body('attachments')
    .optional()
    .isArray()
    .withMessage('Attachments must be an array'),
  
  body('attachments.*.name')
    .if(body('attachments').exists())
    .trim()
    .notEmpty()
    .withMessage('Attachment name is required'),
  
  body('attachments.*.url')
    .if(body('attachments').exists())
    .trim()
    .notEmpty()
    .withMessage('Attachment URL is required')
    .isURL()
    .withMessage('Attachment must be a valid URL'),
  
  body('isConfidential')
    .optional()
    .isBoolean()
    .withMessage('isConfidential must be a boolean')
    .toBoolean(),
];

export const updateHealthRecordSchema = [
  param('id')
    .trim()
    .notEmpty()
    .withMessage('Record ID is required'),
  
  body('recordType')
    .optional()
    .trim()
    .isIn(['diagnosis', 'lab_result', 'imaging', 'prescription', 'note', 'other'])
    .withMessage('Invalid record type'),
  
  body('title')
    .optional()
    .trim()
    .isLength({ max: 255 })
    .withMessage('Title must be less than 255 characters'),
  
  body('description')
    .optional()
    .trim()
    .isLength({ max: 5000 })
    .withMessage('Description must be less than 5000 characters'),
  
  body('date')
    .optional()
    .isISO8601()
    .withMessage('Invalid date format. Please use ISO 8601 format'),
  
  body('doctorNotes')
    .optional()
    .trim()
    .isLength({ max: 5000 })
    .withMessage('Doctor notes must be less than 5000 characters'),
  
  body('attachments')
    .optional()
    .isArray()
    .withMessage('Attachments must be an array'),
  
  body('attachments.*.name')
    .if(body('attachments').exists())
    .trim()
    .notEmpty()
    .withMessage('Attachment name is required'),
  
  body('attachments.*.url')
    .if(body('attachments').exists())
    .trim()
    .notEmpty()
    .withMessage('Attachment URL is required')
    .isURL()
    .withMessage('Attachment must be a valid URL'),
  
  body('isConfidential')
    .optional()
    .isBoolean()
    .withMessage('isConfidential must be a boolean')
    .toBoolean(),
];

export const getHealthRecordsSchema = [
  query('patientId')
    .optional()
    .isString()
    .withMessage('Patient ID must be a string'),
  
  query('recordType')
    .optional()
    .isIn(['diagnosis', 'lab_result', 'imaging', 'prescription', 'note', 'other'])
    .withMessage('Invalid record type'),
  
  query('startDate')
    .optional()
    .isISO8601()
    .withMessage('Invalid start date format. Please use ISO 8601 format'),
  
  query('endDate')
    .optional()
    .isISO8601()
    .withMessage('Invalid end date format. Please use ISO 8601 format'),
  
  query('isConfidential')
    .optional()
    .isBoolean()
    .withMessage('isConfidential must be a boolean')
    .toBoolean(),
  
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

export const healthRecordIdSchema = [
  param('id')
    .trim()
    .notEmpty()
    .withMessage('Health record ID is required')
];
