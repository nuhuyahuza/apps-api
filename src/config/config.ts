import { config } from 'dotenv'

config()

const SERVER_TOKEN_EXPIRETIME = process.env.SERVER_TOKEN_EXPIRETIME || 3600
const SERVER_TOKEN_ISSUER = process.env.SERVER_TOKEN_ISSUER || 'appLinks-Api'
const SERVER_TOKEN_SECRET = process.env.SERVER_TOKEN_SECRET || 'my_jwt_secret_key'

const SERVER = {
  token: {
    expireTime: SERVER_TOKEN_EXPIRETIME,
    issuer: SERVER_TOKEN_ISSUER,
    secret: SERVER_TOKEN_SECRET
  }
}

export default SERVER
