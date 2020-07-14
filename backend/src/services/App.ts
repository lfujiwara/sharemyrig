import express from 'express'
import HealthController from '../controllers/HealthController'

export default class App {
  express: express.Express

  constructor() {
    this.express = express()
    this.routes()
  }

  routes() {
    this.express.use('/health', new HealthController().router)
  }
}
