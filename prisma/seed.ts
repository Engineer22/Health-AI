import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

// Define enums to match Prisma schema
const Role = {
  ADMIN: 'ADMIN',
  DOCTOR: 'DOCTOR',
  PATIENT: 'PATIENT'
} as const;

const Gender = {
  MALE: 'MALE',
  FEMALE: 'FEMALE',
  OTHER: 'OTHER'
} as const;

const RecordType = {
  BLOOD_PRESSURE: 'BLOOD_PRESSURE',
  HEART_RATE: 'HEART_RATE',
  BLOOD_SUGAR: 'BLOOD_SUGAR',
  WEIGHT: 'WEIGHT',
  HEIGHT: 'HEIGHT',
  TEMPERATURE: 'TEMPERATURE',
  VIRTUAL_ASSISTANT: 'VIRTUAL_ASSISTANT'
} as const;

const AppointmentStatus = {
  SCHEDULED: 'SCHEDULED',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
  NOSHOW: 'NOSHOW'
} as const;

const prisma = new PrismaClient();

async function main() {
  // Create a test doctor
  const doctorUser = await prisma.user.create({
    data: {
      email: 'doctor@example.com',
      password: await bcrypt.hash('doctor123', 10),
      role: Role.DOCTOR,
      doctor: {
        create: {
          firstName: 'John',
          lastName: 'Doe',
          specialization: 'General Practitioner',
          phone: '1234567890',
        },
      },
    },
    include: {
      doctor: true,
    },
  });

  // Create a test patient
  const patientUser = await prisma.user.create({
    data: {
      email: 'patient@example.com',
      password: await bcrypt.hash('patient123', 10),
      role: Role.PATIENT,
      patient: {
        create: {
          firstName: 'Jane',
          lastName: 'Smith',
          dateOfBirth: new Date('1990-01-01'),
          gender: Gender.FEMALE,
          phone: '0987654321',
          address: '123 Health St, Wellness City',
        },
      },
    },
    include: {
      patient: true,
    },
  });

  console.log('Created test users:');
  console.log('Doctor:', { id: doctorUser.id, email: doctorUser.email });
  console.log('Patient:', { id: patientUser.id, email: patientUser.email });

  // Create some health records for the patient
  if (patientUser.patient) {
    await prisma.healthRecord.createMany({
      data: [
        {
          patientId: patientUser.patient.id,
          type: RecordType.BLOOD_PRESSURE,
          value: 120,
          unit: 'mmHg',
          notes: 'Normal blood pressure',
        },
        {
          patientId: patientUser.patient.id,
          type: RecordType.HEART_RATE,
          value: 72,
          unit: 'bpm',
          notes: 'Resting heart rate',
        },
      ],
    });
  }

  // Create an appointment
  if (doctorUser.doctor && patientUser.patient) {
    await prisma.appointment.create({
      data: {
        patientId: patientUser.patient.id,
        doctorId: doctorUser.doctor.id,
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        status: AppointmentStatus.SCHEDULED,
        notes: 'Routine checkup',
      },
    });
  }

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
