// src/routes/auth.routes.ts
import { Router } from 'express'
import { body } from 'express-validator'
import * as authController from '../controllers/auth.controller'
import validate from '@src/middlewares/validateRequests'
import { loginSchema } from '@src/dto/loginSchema'

const router = Router()

router.post(
  '/',
  [
    body('email').isEmail(),
    body('password').isLength({ min: 6 })
  ],
  validate(loginSchema),
  authController.login
)

export default router
