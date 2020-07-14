import express from 'express'
import supertest from 'supertest'
import HealthController from './HealthController'

describe('test the HealthController', () => {
  const app = express()
  app.use('/', new HealthController().router)
  const agent = supertest.agent(app)

  it('should return 200', async (done) => {
    const response = await agent.get('/')
    expect(response.status).toBe(200)
    done()
  })
})
