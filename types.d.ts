import { User, Patient, Doctor } from '@prisma/client';

declare global {
  namespace Express {
    interface Request {
      user?: User & {
        patient?: Patient | null;
        doctor?: Doctor | null;
      };
    }
  }
}

export {};
