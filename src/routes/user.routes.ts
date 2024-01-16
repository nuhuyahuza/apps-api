import { boolean } from 'yup';
// src/routes/user.routes.ts
import express from 'express';
import { body, param } from 'express-validator';
import * as userController from '../controllers/user.controller';
import { checkAdminPermission } from '../utils/authorization';
import validate from '@src/middlewares/validateRequests';
import { createUserSchema, updateUserSchema  } from '@src/dto/userSchema';



const router = express.Router();

router.get('/', checkAdminPermission, userController.listUsers);
router.get('/:id', checkAdminPermission, userController.getUser);
router.post(
  '/add',
  [
    body('name').notEmpty(),
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
    body('isAdmin').notEmpty(),
  ],
  validate(createUserSchema),
  checkAdminPermission,
  userController.addUser
  );

router.put(
  '/:id',
  [
    param('id').isNumeric(),
    body('id').isNumeric(),
    body('name').notEmpty(),
    body('email').notEmpty(),
    body('password').notEmpty(),
  ],
  validate(updateUserSchema),
  checkAdminPermission,
  userController.updateUser
);

router.delete('/:id', [param('id').isNumeric()], checkAdminPermission, userController.deleteUser);


export default router;
