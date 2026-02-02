import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Export type definitions for request bodies
export interface AnalyzeSymptomsBody {
  symptoms: string[];
  severity: string;
  duration: string;
  additionalNotes?: string;
}

export interface ScheduleAppointmentBody {
  doctorId: string;
  preferredDate: string;
  preferredTime: string;
  reason: string;
  symptoms?: string[];
}

export interface SetReminderBody {
  medicationId: string;
  reminderTime: string;
  days: string[];
  isActive?: boolean;
}

export interface HealthInfoParams {
  topic: string;
}

export interface HealthTipsQuery {
  category?: string;
  ageGroup?: string;
}

// Response type for better type safety
interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
}

/**
 * @desc    Analyze symptoms and get possible conditions
 * @route   POST /api/assistant/symptoms/analyze
 * @access  Private
 */
export async function analyzeSymptoms(req: Request<{}, {}, AnalyzeSymptomsBody>, res: Response, next: NextFunction): Promise<void> {
  try {
    const { symptoms, severity, duration, additionalNotes } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: 'User not authenticated'
      });
      return;
    }

    // Validate symptoms
    if (!symptoms || symptoms.length === 0) {
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: 'Please provide at least one symptom'
      });
      return;
    }

    // Analyze symptoms and provide recommendations
    const recommendations = {
      possibleConditions: [
        { condition: 'Common Cold', probability: 0.7 },
        { condition: 'Allergies', probability: 0.6 },
        { condition: 'Flu', probability: 0.5 },
      ],
      recommendations: [
        'Get plenty of rest',
        'Stay hydrated',
        'Consider over-the-counter pain relievers if needed',
        'Consult a doctor if symptoms worsen'
      ]
    };

    // Save analysis to database
    await prisma.symptomAnalysis.create({
      data: {
        userId,
        symptoms: symptoms.join(', '),
        severity,
        duration,
        recommendations: JSON.stringify(recommendations),
        additionalNotes
      }
    });

    res.status(StatusCodes.OK).json({
      success: true,
      data: recommendations
    });
  } catch (error) {
    next(error);
  }
}

/**
 * @desc    Schedule an appointment with a doctor
 * @route   POST /api/assistant/appointments/schedule
 * @access  Private
 */
export async function scheduleAppointment(req: Request<{}, {}, ScheduleAppointmentBody>, res: Response, next: NextFunction): Promise<void> {
  try {
    const { doctorId, preferredDate, preferredTime, reason, symptoms } = req.body;
    const patientId = req.user?.id;

    if (!patientId) {
      res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: 'User not authenticated'
      });
      return;
    }

    // Validate required fields
    if (!doctorId || !preferredDate || !preferredTime || !reason) {
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: 'Missing required appointment details'
      });
      return;
    }

    // Check if doctor exists
    const doctor = await prisma.doctor.findUnique({
      where: { id: doctorId }
    });

    if (!doctor) {
      res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: 'Doctor not found'
      });
      return;
    }

    // Create appointment
    const appointment = await prisma.appointment.create({
      data: {
        patientId,
        doctorId,
        appointmentDate: new Date(preferredDate),
        appointmentTime: preferredTime,
        reason,
        symptoms: symptoms ? symptoms.join(', ') : null
      }
    });

    res.status(StatusCodes.CREATED).json({
      success: true,
      data: appointment
    });
  } catch (error) {
    next(error);
  }
}

/**
 * @desc    Get health tips based on user profile
 * @route   GET /api/assistant/health-tips
 * @access  Private
 */
export async function getHealthTips(req: Request<{}, {}, {}, HealthTipsQuery>, res: Response, next: NextFunction): Promise<void> {
  try {
    const { category, ageGroup } = req.query;
    const userId = req.user?.id;

    if (!userId) {
      res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: 'User not authenticated'
      });
      return;
    }

    // Get health tips based on category and age group
    const tips = [
      'Drink at least 8 glasses of water daily',
      'Aim for 7-9 hours of sleep each night',
      'Incorporate at least 30 minutes of moderate exercise into your daily routine',
      'Eat a balanced diet with plenty of fruits and vegetables',
      'Take regular breaks if you sit for long periods',
      'Practice stress-reduction techniques like meditation or deep breathing'
    ];

    res.status(StatusCodes.OK).json({
      success: true,
      data: tips
    });
  } catch (error) {
    next(error);
  }
}

/**
 * @desc    Set up medication reminders
 * @route   POST /api/assistant/medication-reminders
 * @access  Private
 */
export async function setMedicationReminder(req: Request<{}, {}, SetReminderBody>, res: Response, next: NextFunction): Promise<void> {
  try {
    const { medicationId, reminderTime, days, isActive = true } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: 'User not authenticated'
      });
      return;
    }

    // Validate required fields
    if (!medicationId || !reminderTime || !days || days.length === 0) {
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: 'Missing required reminder details'
      });
      return;
    }

    // Create reminder
    const reminder = await prisma.medicationReminder.create({
      data: {
        userId,
        medicationId,
        reminderTime,
        days: days.join(','),
        isActive
      }
    });

    res.status(StatusCodes.CREATED).json({
      success: true,
      data: {
        reminder: {
          ...reminder,
          days: JSON.parse(reminder.days as string),
        },
        message: 'Medication reminder set successfully'
      }
    });
  } catch (error) {
    next(error);
  }
}

/**
 * @desc    Get general health information on a specific topic
 * @route   GET /api/assistant/health-info/:topic
 * @access  Private
 */

interface HealthInfo {
  title: string;
  description: string;
  content: string[];
}

const healthInfo: Record<string, HealthInfo> = {
  'physical-health': {
    title: 'Physical Health',
    description: 'Strategies for maintaining good physical health',
    content: [
      'Exercise regularly (at least 150 minutes of moderate exercise per week)',
      'Maintain a healthy weight',
      'Avoid smoking and limit alcohol consumption',
      'Get regular check-ups',
      'Practice good hygiene'
    ]
  },
  'mental-health': {
    title: 'Mental Health',
    description: 'Tips for maintaining good mental health',
    content: [
      'Practice mindfulness and meditation',
      'Connect with others',
      'Get enough sleep',
      'Manage stress effectively',
      'Seek professional help when needed'
    ]
  },
  'nutrition': {
    title: 'Nutrition',
    description: 'Healthy eating guidelines',
    content: [
      'Eat a balanced diet with variety',
      'Stay hydrated',
      'Limit processed foods',
      'Include fruits and vegetables',
      'Choose whole grains'
    ]
  }
};

export async function getHealthInfo(req: Request<HealthInfoParams>, res: Response, next: NextFunction): Promise<void> {
  try {
    const { topic } = req.params;

    // Get health information based on topic
    const info = healthInfo[topic.toLowerCase()] || {
      title: topic,
      description: 'Information not available',
      content: ['No specific information found for this topic.'],
    };

    res.status(StatusCodes.OK).json({
      success: true,
      data: {
        topic,
        information: info,
      }
    });
  } catch (error) {
    console.error('Error getting health information:', error);
    next(error);
  }
}
};
