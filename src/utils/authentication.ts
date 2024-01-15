import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const generateToken = (userId: number): string => {
  const secretKey = process.env.JWT_SECRET as string;

  if (!secretKey) {
    throw new Error('JWT_SECRET is not defined in the environment variables.');
  }

  return jwt.sign({ userId }, secretKey, { expiresIn: '1h' });
};
