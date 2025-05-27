// backend/src/routes/authRoutes.js

import { Router } from 'express';
import { signup, login } from '../controllers/authController.js';

const router = Router();

// Registo de novo utilizador
router.post('/signup', signup);

// Login e emissão de JWT
router.post('/login', login);

export default router;
