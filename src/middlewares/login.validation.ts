import { Request, Response, NextFunction } from 'express';
import { APIResponse } from '../types/api-response';
import * as yup from 'yup';

export const validateLoginRequest = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  let validationSchema;

  // Choose the validation schema based on the route and method
  switch (req.path) {
    case '/':
      validationSchema = yup.object({
        email: yup.string().email().required(),
        password: yup.string().min(6).required(),
      });
      break;
      
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
