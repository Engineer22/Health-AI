export enum UserRole {
  PATIENT = 'PATIENT',
  DOCTOR = 'DOCTOR',
  ADMIN = 'ADMIN',
}

export interface IUser {
  id: string;
  email: string;
  password: string;
  role: UserRole;
  isEmailVerified: boolean;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPatient extends IUser {
  role: UserRole.PATIENT;
  patientProfile: IPatientProfile;
}

export interface IDoctor extends IUser {
  role: UserRole.DOCTOR;
  doctorProfile: IDoctorProfile;
}

export interface IAdmin extends IUser {
  role: UserRole.ADMIN;
}

export interface IPatientProfile {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  gender: string;
  phone?: string;
  address?: string;
  bloodType?: string;
  height?: number; // in cm
  weight?: number; // in kg
  allergies?: string[];
  medicalConditions?: string[];
  medications?: string[];
  emergencyContact?: {
    name: string;
    relationship: string;
    phone: string;
  };
  insuranceProvider?: string;
  insuranceNumber?: string;
  primaryCarePhysician?: string;
  preferredPharmacy?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IDoctorProfile {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  specialization: string;
  phone?: string;
  address?: string;
  education: {
    degree: string;
    university: string;
    year: number;
  }[];
  experience: {
    position: string;
    hospital: string;
    startDate: Date;
    endDate?: Date;
    current: boolean;
  }[];
  schedule: {
    day: string;
    startTime: string;
    endTime: string;
    isAvailable: boolean;
  }[];
  consultationFee: number;
  availableForAppointments: boolean;
  rating?: number;
  totalRatings?: number;
  totalReviews?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface IAuthResponse extends IAuthTokens {
  user: Omit<IUser, 'password'>;
}
