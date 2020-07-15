import { Response } from 'express'
import { IBuild } from '@models/Build'

export default interface CreateBuildResponseDto extends Response {
  body?: IBuild
}
