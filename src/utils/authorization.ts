import { type Request, type Response, type NextFunction } from 'express'
import { verify } from 'jsonwebtoken'
import { config } from 'dotenv'

config()
interface AuthenticatedRequest extends Request {
  user?: {
    name: string
    email: string
    password: string
    isAdmin: boolean
  }
}

export const checkAdminPermission = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  const bearerHeader = req.headers.authorization

  if (typeof bearerHeader !== 'undefined') {
    const token = bearerHeader.split(' ')[1]
    if (token !== '') {
      verify(token, process.env.JWT_SECRET as string, (error, decoded) => {
        if (error !== null) {
          res.status(401).json({ _msg: 'unauthorized action', error: 'Sorry You have to be authenticated to perform this action ' })
        } else {
          res.locals.jwt = decoded
          next()
        }
      })
    }
  }
}
