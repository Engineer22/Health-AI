import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticate, authorize } from '../middleware/auth';

const router = express.Router();
const prisma = new PrismaClient();

// Get all patients for a provider
router.get('/', async (req: any, res) => {
  try {
    const patients = await prisma.patient.findMany({
      where: {
        providerId: req.user.id,
      },
      include: {
        medicalHistory: true,
        vitals: {
          orderBy: {
            timestamp: 'desc',
          },
          take: 5,
        },
      },
    });
    res.json(patients);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch patients' });
  }
});

// Get single patient
router.get('/:id', async (req: any, res) => {
  try {
    const patient = await prisma.patient.findUnique({
      where: {
        id: req.params.id,
        providerId: req.user.id,
      },
      include: {
        medicalHistory: true,
        vitals: true,
        appointments: true,
      },
    });
    
    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }
    
    res.json(patient);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch patient' });
  }
});

// Create new patient
router.post('/', async (req: any, res) => {
  try {
    const patient = await prisma.patient.create({
      data: {
        ...req.body,
        providerId: req.user.id,
      },
    });
    res.status(201).json(patient);
  } catch (error) {
    res.status(400).json({ error: 'Unable to create patient' });
  }
});

// Update patient
router.put('/:id', async (req: any, res) => {
  try {
    const patient = await prisma.patient.update({
      where: {
        id: req.params.id,
        providerId: req.user.id,
      },
      data: req.body,
    });
    res.json(patient);
  } catch (error) {
    res.status(400).json({ error: 'Unable to update patient' });
  }
});

// Get patient's health records
router.get('/health-records', authenticate, authorize(['PATIENT', 'DOCTOR']), async (req, res) => {
  try {
    const patientId = req.user.role === 'PATIENT' ? req.user.patient?.id : req.query.patientId;

    if (!patientId) {
      return res.status(400).json({ error: 'Patient ID is required' });
    }

    const records = await prisma.healthRecord.findMany({
      where: { patientId },
      orderBy: { recordedAt: 'desc' }
    });

    res.json(records);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching health records' });
  }
});

// Add new health record
router.post('/health-records', authenticate, authorize(['PATIENT', 'DOCTOR']), async (req, res) => {
  try {
    const { type, value, unit, notes } = req.body;
    const patientId = req.user.role === 'PATIENT' ? req.user.patient?.id : req.body.patientId;

    if (!patientId) {
      return res.status(400).json({ error: 'Patient ID is required' });
    }

    const record = await prisma.healthRecord.create({
      data: {
        patientId,
        type,
        value,
        unit,
        notes
      }
    });

    res.status(201).json(record);
  } catch (error) {
    res.status(500).json({ error: 'Error creating health record' });
  }
});

// Get patient's appointments
router.get('/appointments', authenticate, authorize(['PATIENT', 'DOCTOR']), async (req, res) => {
  try {
    const patientId = req.user.role === 'PATIENT' ? req.user.patient?.id : req.query.patientId;

    if (!patientId) {
      return res.status(400).json({ error: 'Patient ID is required' });
    }

    const appointments = await prisma.appointment.findMany({
      where: { patientId },
      include: {
        doctor: {
          include: {
            user: {
              select: {
                email: true
              }
            }
          }
        }
      },
      orderBy: { date: 'asc' }
    });

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching appointments' });
  }
});

// Create new appointment
router.post('/appointments', authenticate, authorize(['PATIENT', 'DOCTOR']), async (req, res) => {
  try {
    const { doctorId, date, notes } = req.body;
    const patientId = req.user.role === 'PATIENT' ? req.user.patient?.id : req.body.patientId;

    if (!patientId || !doctorId) {
      return res.status(400).json({ error: 'Patient ID and Doctor ID are required' });
    }

    const appointment = await prisma.appointment.create({
      data: {
        patientId,
        doctorId,
        date,
        notes
      },
      include: {
        doctor: {
          include: {
            user: {
              select: {
                email: true
              }
            }
          }
        }
      }
    });

    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({ error: 'Error creating appointment' });
  }
});

// Update appointment status
router.patch('/appointments/:id', authenticate, authorize(['PATIENT', 'DOCTOR']), async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const appointment = await prisma.appointment.update({
      where: { id },
      data: { status }
    });

    res.json(appointment);
  } catch (error) {
    res.status(500).json({ error: 'Error updating appointment' });
  }
});

export default router; 