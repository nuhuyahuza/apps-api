import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { APIResponse } from '../types/api-response';
import User from '../models/user.model';
import  {validateLoginRequest}  from '../middlewares/login.validation';
import signJWT from '@src/functions/signJWT';

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(401).json({ _msg:"Login Failed",error: 'Invalid credentials' } as APIResponse);
      return;
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, {
      expiresIn: '1h',
    });

    res.json({ _msg:`Login Successful ${user.name}`,data: { token } } as APIResponse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' } as APIResponse);
  }
};
