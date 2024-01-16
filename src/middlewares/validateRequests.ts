import { type AnySchema } from 'yup'
import { type Request, type Response, type NextFunction } from 'express'
import { type APIResponse } from '../types/api-response'

const validate = (schema: AnySchema) => async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await schema.validate(
      req.body
    )
    next()
  } catch (error: any) {
    return res.status(400).json({ _msg: 'Validation Failed', error } as APIResponse)
  }
}

export default validate
