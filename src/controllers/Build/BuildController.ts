import { celebrate, Segments } from 'celebrate'
import express from 'express'
import HttpStatus from 'http-status-codes'
import CreateBuildRequestDto from './dto/request/CreateBuildRequestDto'
import Build, { validateBuildSchema } from '../../models/Build'
import CreateBuildResponseDto from './dto/response/CreateBuildResponseDto'

export default class BuildController {
  router: express.Router

  constructor() {
    this.router = express.Router()

    this.router.post('', celebrate({ [Segments.BODY]: validateBuildSchema }), BuildController.indexPost)
    this.router.put('', celebrate({ [Segments.BODY]: validateBuildSchema }), BuildController.indexPut)
  }

  static async indexPost(request: CreateBuildRequestDto, response: CreateBuildResponseDto) {
    try {
      const build = await Build.create(request.body)
      response.status(HttpStatus.CREATED).json(build.toObject({ versionKey: false }))
    } catch (e) {
      console.error(e)
      response.status(HttpStatus.INTERNAL_SERVER_ERROR)
    }
    response.send()
  }

  static async indexPut(request: CreateBuildRequestDto, response: CreateBuildResponseDto) {
    try {
      const build = await Build.findById(request.body._id)
      if (!build) {
        response.status(HttpStatus.NOT_FOUND)
      } else {
        build.set(request.body)
        await build.save()
        response.status(HttpStatus.OK).json(build.toObject({ versionKey: false }))
      }
    } catch (e) {
      console.error(e)
      response.status(HttpStatus.INTERNAL_SERVER_ERROR)
    }
    response.send()
  }
}
