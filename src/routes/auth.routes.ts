// src/routes/auth.routes.ts
import express from 'express';
import { body } from 'express-validator';
import * as authController from '../controllers/auth.controller';
import { validateRequest } from '../utils/validation';

const router = express.Router();

router.post(
  '/login',
  [
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
  ],
  validateRequest,
  authController.login
);

export default router;
