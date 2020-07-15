import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import HealthController from '../controllers/HealthController'
import BuildController from '../controllers/Build/BuildController'

export default class App {
  express: express.Express

  constructor() {
    dotenv.config()
    this.express = express()
    this.services()
    this.middlewares()
    this.routes()
  }

  async services() {
    await mongoose.connect(`${process.env.MONGODB_CONN_STRING}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
  }

  middlewares() {
    this.express.use(express.json())
  }

  routes() {
    this.express.use('/health', new HealthController().router)
    this.express.use('/builds', new BuildController().router)
  }
}
