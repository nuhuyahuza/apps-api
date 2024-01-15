import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { APIResponse } from '../types/api-response';
import User from '../models/user.model';
import { boolean } from 'yup';

export const addUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password,isAdmin } = req.body;

    // Check if the user is an admin
    if (!isAdmin) {
      // Annotating the response object with APIResponse type
      const response: APIResponse = { error: 'Permission Denied' };
      const status:any = res.status(403).json(response);
      return status;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Creating a new user with annotated properties
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      isAdmin: false, // Assuming you set isAdmin to false for all new users
    });

    // Annotating the response object with APIResponse type
    const response: APIResponse = { data: newUser };
    res.status(201).json(response);
  } catch (error) {
    console.error(error);

    // Annotating the response object with APIResponse type
    const response: APIResponse = { error: 'Internal Server Error' };
    res.status(500).json(response);
  }
};
