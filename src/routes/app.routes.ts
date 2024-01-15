// src/routes/app.routes.ts
import express from 'express';
import { body, param } from 'express-validator';
import * as appController from '../controllers/app.controller';
import { validateRequest } from '../utils/validation';
import { checkAdminPermission, checkGuestAccess } from '../utils/authorization';

const router = express.Router();

router.post(
  '/addApp',
  [
    body('name').notEmpty(),
    body('icon').notEmpty(),
    body('url').isURL(),
  ],
  validateRequest,
  checkAdminPermission,
  appController.addApp
);

router.put(
  '/updateApp/:id',
  [
    param('id').isNumeric(),
    body('name').notEmpty(),
    body('icon').notEmpty(),
    body('url').isURL(),
  ],
  validateRequest,
  checkAdminPermission,
  appController.updateApp
);

router.delete('/:id', [param('id').isNumeric()], validateRequest, checkAdminPermission, appController.deleteApp);
router.get('/:id', checkGuestAccess, appController.getApp);
router.get('/', checkGuestAccess, appController.listApps);

export default router;
