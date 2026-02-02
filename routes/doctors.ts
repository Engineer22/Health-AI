import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticate, authorize } from '../middleware/auth';

const router = express.Router();
const prisma = new PrismaClient();

// Get doctor's patients
router.get('/patients', authenticate, authorize(['DOCTOR']), async (req, res) => {
  try {
    const doctorId = req.user.doctor?.id;

    if (!doctorId) {
      return res.status(400).json({ error: 'Doctor ID not found' });
    }

    const patients = await prisma.patient.findMany({
      where: {
        appointments: {
          some: {
            doctorId
          }
        }
      },
      include: {
        user: {
          select: {
            email: true
          }
        }
      }
    });

    res.json(patients);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching patients' });
  }
});

// Get doctor's appointments
router.get('/appointments', authenticate, authorize(['DOCTOR']), async (req, res) => {
  try {
    const doctorId = req.user.doctor?.id;

    if (!doctorId) {
      return res.status(400).json({ error: 'Doctor ID not found' });
    }

    const appointments = await prisma.appointment.findMany({
      where: { doctorId },
      include: {
        patient: {
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

// Get patient's health records (doctor's view)
router.get('/patients/:patientId/health-records', authenticate, authorize(['DOCTOR']), async (req, res) => {
  try {
    const { patientId } = req.params;
    const doctorId = req.user.doctor?.id;

    if (!doctorId) {
      return res.status(400).json({ error: 'Doctor ID not found' });
    }

    // Verify that the patient has appointments with this doctor
    const hasAppointments = await prisma.appointment.findFirst({
      where: {
        patientId,
        doctorId
      }
    });

    if (!hasAppointments) {
      return res.status(403).json({ error: 'Not authorized to view this patient\'s records' });
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

// Add health record for a patient
router.post('/patients/:patientId/health-records', authenticate, authorize(['DOCTOR']), async (req, res) => {
  try {
    const { patientId } = req.params;
    const doctorId = req.user.doctor?.id;
    const { type, value, unit, notes } = req.body;

    if (!doctorId) {
      return res.status(400).json({ error: 'Doctor ID not found' });
    }

    // Verify that the patient has appointments with this doctor
    const hasAppointments = await prisma.appointment.findFirst({
      where: {
        patientId,
        doctorId
      }
    });

    if (!hasAppointments) {
      return res.status(403).json({ error: 'Not authorized to add records for this patient' });
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

// Update appointment status
router.patch('/appointments/:id', authenticate, authorize(['DOCTOR']), async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const doctorId = req.user.doctor?.id;

    if (!doctorId) {
      return res.status(400).json({ error: 'Doctor ID not found' });
    }

    const appointment = await prisma.appointment.update({
      where: { 
        id,
        doctorId // Ensure the doctor can only update their own appointments
      },
      data: { status }
    });

    res.json(appointment);
  } catch (error) {
    res.status(500).json({ error: 'Error updating appointment' });
  }
});

export default router; 