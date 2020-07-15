import { celebrate, Segments } from 'celebrate'
import express from 'express'
import HttpStatus from 'http-status-codes'
import CreateBuildRequestDto from './dto/request/CreateBuildRequestDto'
import Build, { validateBuildSchema } from '../../models/Build'

export default class BuildController {
  router: express.Router

  constructor() {
    this.router = express.Router()

    this.router.post('', celebrate({ [Segments.BODY]: validateBuildSchema }), BuildController.indexPost)
  }

  static async indexPost(request: CreateBuildRequestDto, response: express.Response) {
    try {
      const build = await Build.create(request.body)
      response.status(HttpStatus.CREATED).json(build)
    } catch (e) {
      console.error(e)
      response.status(HttpStatus.INTERNAL_SERVER_ERROR)
    }
    response.send()
  }
}
