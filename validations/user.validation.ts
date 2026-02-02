import { body, param } from 'express-validator';
import { UserRole } from '../types/user.types';

export const updateProfileSchema = [
  body('firstName')
    .optional()
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('First name must be between 1 and 50 characters'),
  
  body('lastName')
    .optional()
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('Last name must be between 1 and 50 characters'),
  
  body('dateOfBirth')
    .optional()
    .isISO8601()
    .withMessage('Invalid date format. Please use YYYY-MM-DD'),
  
  body('gender')
    .optional()
    .isIn(['male', 'female', 'other'])
    .withMessage('Gender must be male, female, or other'),
  
  body('phone')
    .optional()
    .isMobilePhone('any')
    .withMessage('Please provide a valid phone number'),
  
  body('address')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Address must be less than 500 characters'),
  
  body('profilePicture')
    .optional()
    .isURL()
    .withMessage('Profile picture must be a valid URL'),
];

export const updateDoctorProfileSchema = [
  ...updateProfileSchema,
  
  body('specialization')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Specialization must be between 2 and 100 characters'),
  
  body('qualifications')
    .optional()
    .isArray()
    .withMessage('Qualifications must be an array'),
  
  body('qualifications.*.degree')
    .if(body('qualifications').exists())
    .trim()
    .notEmpty()
    .withMessage('Degree is required')
    .isLength({ max: 100 })
    .withMessage('Degree must be less than 100 characters'),
  
  body('qualifications.*.institution')
    .if(body('qualifications').exists())
    .trim()
    .notEmpty()
    .withMessage('Institution is required')
    .isLength({ max: 255 })
    .withMessage('Institution must be less than 255 characters'),
  
  body('qualifications.*.year')
    .if(body('qualifications').exists())
    .isInt({ min: 1900, max: new Date().getFullYear() })
    .withMessage(`Year must be between 1900 and ${new Date().getFullYear()}`)
    .toInt(),
  
  body('experience')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Experience must be a positive number')
    .toInt(),
  
  body('bio')
    .optional()
    .trim()
    .isLength({ max: 2000 })
    .withMessage('Bio must be less than 2000 characters'),
  
  body('consultationFee')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Consultation fee must be a positive number')
    .toFloat(),
  
  body('availableDays')
    .optional()
    .isArray()
    .withMessage('Available days must be an array'),
  
  body('availableDays.*')
    .if(body('availableDays').exists())
    .isIn(['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'])
    .withMessage('Invalid day of the week'),
  
  body('availableHours.start')
    .optional()
    .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage('Invalid time format. Please use HH:MM format'),
  
  body('availableHours.end')
    .optional()
    .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage('Invalid time format. Please use HH:MM format'),
];

export const changePasswordSchema = [
  body('currentPassword')
    .trim()
    .notEmpty()
    .withMessage('Current password is required'),
  
  body('newPassword')
    .trim()
    .isLength({ min: 8 })
    .withMessage('New password must be at least 8 characters long')
    .matches(/[0-9]/)
    .withMessage('New password must contain at least one number')
    .matches(/[a-z]/)
    .withMessage('New password must contain at least one lowercase letter')
    .matches(/[A-Z]/)
    .withMessage('New password must contain at least one uppercase letter'),
  
  body('confirmPassword')
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.newPassword) {
        throw new Error('Passwords do not match');
      }
      return true;
    }),
];

export const userIdSchema = [
  param('id')
    .trim()
    .notEmpty()
    .withMessage('User ID is required')
];

export const updateUserRoleSchema = [
  param('id')
    .trim()
    .notEmpty()
    .withMessage('User ID is required'),
  
  body('role')
    .isIn(Object.values(UserRole))
    .withMessage('Invalid user role'),
];
