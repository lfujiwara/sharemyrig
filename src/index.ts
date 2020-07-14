import dotenv from 'dotenv'
import Server from './services/Server'

dotenv.config()

Server.listen(Number(process.env.SERVER_PORT), `${process.env.SERVER_ADDR}`, () => {
  console.log(`Running on ${process.env.SERVER_ADDR}:${process.env.SERVER_PORT}`)
})
