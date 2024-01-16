// src/routes/app.routes.ts
import { Router } from 'express'
import { body, param } from 'express-validator'
import * as appController from '../controllers/app.controller'
import { checkAdminPermission } from '../utils/authorization'
import validate from '../middlewares/validateRequests'
import { createAppSchema, updateAppSchema } from '../dto/appSchema'

const router = Router()

router.post(
  '/add',
  [
    body('name').notEmpty(),
    body('icon').notEmpty(),
    body('url').isURL()
  ],
  validate(createAppSchema),
  checkAdminPermission,
  appController.addApp
)

router.put(
  '/update/:id',
  [
    param('id').isNumeric(),
    body('name').notEmpty(),
    body('icon').notEmpty(),
    body('url').isURL()
  ],
  validate(updateAppSchema),
  checkAdminPermission,
  appController.updateApp
)

router.delete('/:id', [param('id').isNumeric()], checkAdminPermission, appController.deleteApp)
router.get('/:id', [param('id').isNumeric()], appController.getApp)
router.get('/', [param('id').isNumeric()], appController.listApps)

export default router
