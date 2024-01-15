// src/routes/user.routes.ts
import express from 'express';
import { body } from 'express-validator';
import * as userController from '../controllers/user.controller';
import { validateRequest } from '../utils/validation';
import { checkAdminPermission } from '../utils/authorization';

const router = express.Router();

router.post(
  '/add',
  [
    body('name').notEmpty(),
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
  ],
  validateRequest,
  checkAdminPermission,
  userController.addUser
);

export default router;
