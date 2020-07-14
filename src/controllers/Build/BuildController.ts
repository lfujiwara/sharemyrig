import express from 'express'

export default class BuildController {
  router: express.Router

  constructor() {
    this.router = express.Router()

    this.router.post('', BuildController.indexPost)
  }

  static indexPost(_: express.Request, response: express.Response) {
    response.status(200).send()
  }
}
