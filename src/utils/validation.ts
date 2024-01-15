import { Request, Response, NextFunction } from 'express';
import { APIResponse } from '../types/api-response';
import * as yup from 'yup';

export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  let validationSchema;

  // Choose the validation schema based on the route and method
  switch (req.path) {
    case '/login':
      validationSchema = yup.object({
        email: yup.string().email().required(),
        password: yup.string().min(6).required(),
      });
      break;
    case '/addApp':
      validationSchema = yup.object({
        name: yup.string().required(),
        icon: yup.string().required(),
        url: yup.string().required(),
      });
      break;
    case '/updateApp/:id':
      validationSchema = yup.object({
        id: yup.string().uuid().required(),
        name: yup.string().required(),
        icon: yup.string().required(),
        url: yup.string().url().required(),
      });
      break;
    case '/:id':
      validationSchema = yup.object({
        id: yup.string().uuid().required(),
      });
      break;
    case '/registerUser':
      validationSchema = yup.object({
        name: yup.string().required(),
        email: yup.string().email().required(),
        password: yup.string().min(6).required(),
      });
      break;
    case '/updateUser':
      validationSchema = yup.object({
        id: yup.string().uuid().required(),
        name: yup.string().required(),
        email: yup.string().email().required(),
        password: yup.string().min(6).required(),
      });
      break;
    case '/deleteUser':
      validationSchema = yup.object({
        id: yup.string().uuid().required(),
      });
      break;
    // Add more cases for other routes if needed
    default:
      return res.status(400).json({ error: 'Invalid route for validation' } as APIResponse);
  }

  try {
    validationSchema.validateSync(req.body, { abortEarly: false });
    next();
  } catch (error: any) {
    const errors = error.inner.map((e: any) => ({ field: e.path, message: e.message }));
    return res.status(400).json({ error: 'Validation Error', data: errors } as APIResponse);
  }
};
