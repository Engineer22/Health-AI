import express, { Request } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticate } from '../middleware/auth';

// Extend the Express Request type to include user
interface AuthRequest extends Request {
  user?: any; // Replace 'any' with a proper user type if available
}

const router = express.Router();
const prisma = new PrismaClient();

// Get vitals for a patient
router.get('/:patientId', authenticate, async (req: AuthRequest, res) => {
  try {
    const { patientId } = req.params;
    const userId = req.user.id;

    // Verify permissions
    if (req.user.role !== 'DOCTOR' && req.user.patient?.id !== patientId) {
      return res.status(403).json({ error: 'Unauthorized to view these vitals' });
    }

    const vitals = await prisma.healthRecord.findMany({
      where: { 
        patientId,
        type: { in: ['BLOOD_PRESSURE', 'HEART_RATE', 'BLOOD_SUGAR', 'WEIGHT', 'HEIGHT', 'TEMPERATURE'] }
      },
      orderBy: { recordedAt: 'desc' },
      take: 100 // Limit to most recent 100 records
    });

    res.json(vitals);
  } catch (error) {
    console.error('Error fetching vitals:', error);
    res.status(500).json({ error: 'Failed to fetch vitals' });
  }
});

// Add new vital record
router.post('/', authenticate, async (req: AuthRequest, res) => {
  try {
    const { patientId, type, value, unit, notes } = req.body;
    
    // Verify permissions
    if (req.user.role !== 'DOCTOR' && req.user.patient?.id !== patientId) {
      return res.status(403).json({ error: 'Unauthorized to add vitals for this patient' });
    }

    const vital = await prisma.healthRecord.create({
      data: {
        patientId,
        type,
        value,
        unit,
        notes,
        recordedAt: new Date()
      }
    });

    res.status(201).json(vital);
  } catch (error) {
    console.error('Error adding vital:', error);
    res.status(500).json({ error: 'Failed to add vital record' });
  }
});

export default router;
