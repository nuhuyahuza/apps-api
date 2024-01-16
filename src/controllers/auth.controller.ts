import { type Request, type Response } from 'express'
import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { type APIResponse } from '../types/api-response'
import User from '../models/user.model'

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ where: { email } })

    if (!user || !(await compare(password, user.password))) {
      res.status(401).json({ _msg: 'Login Failed', error: 'Invalid credentials' } as APIResponse)
      return
    }
    const expireTime = '1h'
    const token = sign({ userId: user.id }, process.env.JWT_SECRET || '', {
      expiresIn: expireTime
    })

    res.json({ _msg: 'Login Successful', data: { _msg: `Token generated will expire in ${expireTime}`, user, token } } as APIResponse)
  } catch (error) {
    // console.error(error)
    res.status(500).json({ error: 'Internal Server Error' } as APIResponse)
  }
}
