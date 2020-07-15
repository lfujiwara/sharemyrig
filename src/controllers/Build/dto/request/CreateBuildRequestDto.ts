import { IBuild } from '@models/Build'
import { Request } from 'express'

export default interface CreateBuildRequestDto extends Request {
  body: IBuild
}
