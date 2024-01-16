import request from 'supertest'
import app from '../app'
import { config } from 'dotenv'

config()

describe('App Integration Tests', () => {
  it('should return apps object for GET /apps', async () => {
    const response = await request(app).get('/apps')
    expect(response.status).toBe(200)
  })

  it('should return "Protected route" for GET /users with a valid token', async () => {
    const validToken = process.env.TOKEN || 'my_jwt_secret'

    const response = await request(app)
      .get('/users')
      .set('Authorization', validToken)
    expect(response.status).toBe(200)
  })
})
