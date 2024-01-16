// src/routes/app.routes.ts
import express from 'express';
import { body, param } from 'express-validator';
import * as appController from '../controllers/app.controller';
import { checkAdminPermission, checkGuestAccess } from '../utils/authorization';
import validate from '@src/middlewares/validateRequests';
import { createAppSchema, updateAppSchema } from '@src/dto/appSchema';

const router = express.Router();

router.post(
  '/add',
  [
    body('name').notEmpty(),
    body('icon').notEmpty(),
    body('url').isURL(),
  ],
  validate(createAppSchema),
  checkAdminPermission,
  appController.addApp
);

router.put(
  '/update/:id',
  [
    param('id').isNumeric(),
    body('name').notEmpty(),
    body('icon').notEmpty(),
    body('url').isURL(),
  ],
  validate(updateAppSchema),
  checkAdminPermission,
  appController.updateApp
);

router.delete('/:id', [param('id').isNumeric()], checkAdminPermission, appController.deleteApp);
router.get('/:id',  [param('id').isNumeric()],checkGuestAccess, appController.getApp);
router.get('/',  [param('id').isNumeric()], checkGuestAccess, appController.listApps);

export default router;
