import { Router } from 'express';
import { login, register, refreshToken } from '../controllers/auth.controller';
import { validate } from '../middleware/validation';
import { loginSchema, registerSchema } from '../validations/auth.validation';

const router = Router();

// Public routes
router.post('/login', validate(loginSchema), login);
router.post('/register', validate(registerSchema), register);
router.post('/refresh-token', refreshToken);

export default router;
