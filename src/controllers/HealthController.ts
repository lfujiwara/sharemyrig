import express from 'express'

export default class HealthController {
  router: express.Router

  constructor() {
    this.router = express.Router()

    this.router.get('', HealthController.index)
  }

  static index(_: express.Request, response: express.Response) {
    response.status(200).send()
  }
}
