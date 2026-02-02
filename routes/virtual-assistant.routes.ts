import { Router, Request, Response, NextFunction, RequestHandler } from 'express';
import { authenticate } from '../middleware/auth';
import { validate } from '../middleware/validation';
import { 
  analyzeSymptomsSchema, 
  scheduleAppointmentSchema, 
  getHealthTipsSchema, 
  getMedicationReminderSchema 
} from '../validations/virtual-assistant.validation';
import * as virtualAssistantController from '../controllers/virtualAssistant.controller';
import { AnalyzeSymptomsBody, ScheduleAppointmentBody, HealthTipsQuery, SetReminderBody, HealthInfoParams } from '../controllers/virtualAssistant.controller';

const router = Router();

// Middleware to ensure only authenticated users can access these routes
router.use(authenticate);

// Define routes with proper type annotations
router.post(
  '/symptoms/analyze', 
  validate(analyzeSymptomsSchema) as RequestHandler,
  async (req: Request<{}, {}, AnalyzeSymptomsBody>, res: Response, next: NextFunction) => {
    try {
      await virtualAssistantController.analyzeSymptoms(req, res, next);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/appointments/schedule', 
  validate(scheduleAppointmentSchema) as RequestHandler,
  async (req: Request<{}, {}, ScheduleAppointmentBody>, res: Response, next: NextFunction) => {
    try {
      await virtualAssistantController.scheduleAppointment(req, res, next);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/health-tips', 
  validate(getHealthTipsSchema) as RequestHandler,
  async (req: Request<{}, {}, {}, HealthTipsQuery>, res: Response, next: NextFunction) => {
    try {
      await virtualAssistantController.getHealthTips(req, res, next);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/medication-reminders', 
  validate(getMedicationReminderSchema) as RequestHandler,
  async (req: Request<{}, {}, SetReminderBody>, res: Response, next: NextFunction) => {
    try {
      await virtualAssistantController.setMedicationReminder(req, res, next);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/health-info/:topic', 
  async (req: Request<HealthInfoParams>, res: Response, next: NextFunction) => {
    try {
      await virtualAssistantController.getHealthInfo(req, res, next);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
