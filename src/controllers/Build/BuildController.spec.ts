import express from 'express'
import supertest from 'supertest'
import mongoose from 'mongoose'
import BuildController from './BuildController'

describe('test the BuildController', () => {
  const app = express()
  app.use('/', new BuildController().router)
})
