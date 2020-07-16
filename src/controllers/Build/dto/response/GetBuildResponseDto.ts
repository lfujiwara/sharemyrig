import { Response } from 'express'
import { IBuild } from '@models/Build'

export default interface GetBuildResponseDto extends Response {
  body?: [IBuild]
}
