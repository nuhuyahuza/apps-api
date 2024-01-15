import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface AuthenticatedRequest extends Request {
  user?: {
    name: string;
    email: string;
    password: string;
    isAdmin: boolean;
  };
}

export const checkAdminPermission = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  const bearerHeader = req.headers['authorization'];

  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];

    try {
      const decodedToken: any = jwt.verify(bearerToken, process.env.JWT_SECRET as string);

      if (!decodedToken.isAdmin) {
        res.status(403).json({ _msg: "unauthorized action", error: 'Permission Denied' });
        return;
      }
    } catch (error) {
      // Handle token verification errors (e.g., expired or invalid token)
      res.status(401).json({ _msg: "unauthorized action", error: 'Invalid Token' });
      return;
    }
  } else if (!(req.user)?.isAdmin) {
    res.status(403).json({ _msg: "unauthorized action", error: 'Permission Denied' });
    return;
  }

  // Call next to proceed to the next middleware or route handler
  next();
};

export const checkGuestAccess = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  if ((req.user)?.isAdmin) {
    res.status(403).json({ _msg: "oh no", error: 'Permission Denied' });
    return;
  }

  // Call next to proceed to the next middleware or route handler
  next();
};
