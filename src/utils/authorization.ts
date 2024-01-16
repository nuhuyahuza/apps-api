import { type Request, type Response, type NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

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
      verify(token, 'my_jwt_secret_key', (error, decoded) => {
        if (error !== null) {
          res.status(401).json({ _msg: 'unauthorized action', error: 'Invalid Token ' })
        } else {
          res.locals.jwt = decoded
          next()
        }
      })
    }
    // if (!decodedToken.isAdmin) {
    //   res.status(403).json({ _msg: "unauthorized action", error: 'Permission Denied' });
    //   return;
    // }
  }
}
