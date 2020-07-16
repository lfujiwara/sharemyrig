import { Request } from 'express'
import { IBuild } from '@models/Build'

export default interface CreateBuildRequestDto extends Request {
  body: IBuild
}
