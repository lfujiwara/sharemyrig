import { celebrate, Segments, errors } from 'celebrate'
import express from 'express'
import HttpStatus from 'http-status-codes'
import Joi from '@hapi/joi'
import CreateBuildRequestDto from './dto/request/CreateBuildRequestDto'
import Build, { validateBuildSchema } from '../../models/Build'
import CreateBuildResponseDto from './dto/response/CreateBuildResponseDto'
import GetBuildRequestDto from './dto/request/GetBuildRequestDto'
import GetBuildResponseDto from './dto/response/GetBuildResponseDto'
import { validateMongooseId } from '../../library'

export default class BuildController {
  router: express.Router

  constructor() {
    this.router = express.Router()

    this.router.get(
      '',
      celebrate({ [Segments.QUERY]: Joi.object().keys({ _id: validateMongooseId }).unknown(true) }),
      errors(),
      BuildController.indexGet,
    )
    this.router.post('', celebrate({ [Segments.BODY]: validateBuildSchema }), errors(), BuildController.indexPost)
    this.router.put('', celebrate({ [Segments.BODY]: validateBuildSchema }), errors(), BuildController.indexPut)
    this.router.delete(
      '',
      celebrate({ [Segments.QUERY]: Joi.object().keys({ _id: validateMongooseId.required() }) }),
      errors(),
      BuildController.indexDelete,
    )
  }

  static async indexGet(request: GetBuildRequestDto, response: GetBuildResponseDto, next: express.NextFunction) {
    try {
      const builds = await Build.find(request.query)
      response.status(HttpStatus.OK).json(builds.map((build) => build.toObject({ versionKey: false })))
    } catch (e) {
      next(e)
    }
  }

  static async indexPost(request: CreateBuildRequestDto, response: CreateBuildResponseDto, next: express.NextFunction) {
    try {
      const build = await Build.create(request.body)
      response.status(HttpStatus.CREATED).json(build.toObject({ versionKey: false }))
    } catch (e) {
      next(e)
    }
  }

  static async indexPut(request: CreateBuildRequestDto, response: CreateBuildResponseDto, next: express.NextFunction) {
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
      next(e)
    }
  }

  static async indexDelete(
    request: express.Request & { query: Object & { _id: String } },
    response: express.Response,
    next: express.NextFunction,
  ) {
    try {
      await Build.deleteOne({ _id: request.query._id }, (err: any) =>
        err ? response.status(HttpStatus.NOT_FOUND).send() : response.status(HttpStatus.OK).send(),
      )
    } catch (e) {
      next(e)
    }
  }
}
