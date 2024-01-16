// src/__tests__/app.test.ts
import request from 'supertest'
import app from '../app'

describe('App Integration Tests', () => {
  it('should return "Public route" for GET /public', async () => {
    const response = await request(app).get('/public')
    expect(response.status).toBe(200)
    expect(response.text).toBe('Public route')
  })

  it('should return "Protected route" for GET /protected with a valid token', async () => {
    // You'll need a valid JWT token for this test
    // Replace 'your_valid_token_here' with an actual token
    const validToken = 'your_valid_token_here'

    const response = await request(app)
      .get('/protected')
      .set('Authorization', validToken)

    expect(response.status).toBe(200)
    expect(response.text).toBe('Protected route')
  })

  it('should return 401 for GET /protected without a token', async () => {
    const response = await request(app).get('/protected')
    expect(response.status).toBe(401)
  })
})
