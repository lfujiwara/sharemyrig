import HttpStatus from 'http-status-codes'
import express from 'express'
import supertest from 'supertest'
import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import BuildController from './BuildController'

const makeBuild = () => ({
  cpu: { description: 'Ryzen 5 1600AF', price: 599.99, storeName: 'Kabum' },
  motherboard: { description: 'B450M-DS3H', price: 699.99, storeName: 'Terabyteshop' },
  memory: [
    {
      description: 'Crucial Ballistix DDR4',
      price: 499.99,
      storeName: 'Kabum',
      details: {
        Frequency: '3466MHz',
      },
    },
  ],
  storageDrives: [
    {
      description: 'Samsung 970 EVO Plus 1TB',
      price: 1099.99,
      storeName: 'MercadoLivre',
      href: 'mercadolivre.com.br',
    },
  ],
  psu: { description: 'Corsair CX500', price: 299.99, storeName: 'Pichau' },
})

describe('test the BuildController', () => {
  const mongod = new MongoMemoryServer()
  const app = express()
  app.use(express.json())

  app.use('/', new BuildController().router)

  it('perform create, read and update operations', async (done) => {
    mongoose.connect(await mongod.getConnectionString(), { useNewUrlParser: true, useUnifiedTopology: true })

    let response = await supertest(app).post('/').send(makeBuild()).type('application/json')
    expect(response).toBeTruthy()
    expect(response.body).toBeTruthy()
    expect(response.status).toBe(HttpStatus.CREATED)
    expect(response.body._id).toBeTruthy()

    const updatedKeys = {
      description: 'Ryzen 7 3700X',
      price: 2199.9,
    }
    response.body.cpu = { ...response.body.cpu, ...updatedKeys }
    response = await supertest(app).put('/').send(response.body).type('application/json')
    expect(response).toBeTruthy()
    expect(response.body).toBeTruthy()
    expect(response.status).toBe(HttpStatus.OK)
    expect(response.body._id).toBeTruthy()
    Object.entries(updatedKeys).forEach(([k, v]) => expect(response.body.cpu[k]).toStrictEqual(v))

    done()
  })
})
