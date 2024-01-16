import { type Request, type Response } from 'express'
import { hash } from 'bcrypt'
import { type APIResponse } from '../types/api-response'
import User from '../models/user.model'

export const addUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body

    const hashedPassword = await hash(password, 10)

    // Creating a new user with annotated properties
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword
    })

    // Annotating the response object with APIResponse type
    const response: APIResponse = { data: newUser }
    res.status(201).json({ _msg: 'User Added Successfully', data: response } as APIResponse)
  } catch (error: any) {
    // console.error(error);
    // Annotating the response object with APIResponse type
    const response: APIResponse = { error: 'Internal Server Error' }
    res.status(500).json({ _msg: 'Failed to add User', data: response, error } as APIResponse)
  }
}
export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    // const { id } = req.params;
    const { id, name, email, password } = req.body

    const user = await User.findByPk(id)

    if (!user) {
      res.status(404).json({ error: 'User not found' } as APIResponse)
      return
    }

    user.name = name
    user.email = email
    user.password = password

    await user.save()

    res.json({ _msg: 'Record Updated Successfully', data: user, error: '' } as APIResponse)
  } catch (error) {
    // console.error(error);
    res.status(500).json({ _msg: 'Failed To Update Record', error: 'Internal Server Error' } as APIResponse)
  }
}

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params
    const user = await User.findByPk(id)

    if (!user) {
      res.status(404).json({ _msg: 'Record retrieved.', error: 'User not found' } as APIResponse)
      return
    }

    await user.destroy()

    res.json({ _msg: 'Record deleted successfully', data: { } } as APIResponse)
  } catch (error) {
    // console.error(error);
    res.status(500).json({ _msg: '', error: 'Internal Server Error' } as APIResponse)
  }
}

export const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params
    const user = await User.findByPk(id)

    if (!user) {
      res.status(404).json({ _msg: 'Record not Found', error: 'User not found' } as APIResponse)
      return
    }
    res.status(200).json({ _msg: 'User Retrieved', data: user, error: '' } as APIResponse)
  } catch (error) {
    // console.error(error);
    res.status(500).json({ _msg: 'Request Failed', data: {}, error: 'Internal Server Error' } as APIResponse)
  }
}

export const listUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.findAll()
    res.status(200).json({ _msg: 'Users Retrieved', data: users, error: '' } as APIResponse)
  } catch (error) {
    // console.error(error);
    res.status(500).json({ _msg: 'Users Retrieved', data: {}, error: 'Internal Server Error' } as APIResponse)
  }
}
