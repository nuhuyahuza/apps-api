import { sign } from 'jsonwebtoken'

export const generateToken = (userId: number): string => {
  const secretKey = process.env.JWT_SECRET

  if (!secretKey) {
    throw new Error('JWT_SECRET is not defined in the environment variables.')
  }

  return sign({ userId }, secretKey, { expiresIn: '1h' })
}
