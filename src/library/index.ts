import { Joi } from 'celebrate'
export function isString(s: any) {
  return !(s instanceof String) && !(typeof s !== 'string')
}

export const validateMongooseId = Joi.string().length(24).hex()
