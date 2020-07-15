import mongoose from 'mongoose'
import { Joi } from 'celebrate'

interface IComponentDetail {
  key: String
  value: String
}

export interface IComponent {
  _id?: String
  description: String
  price?: Number
  storeName?: String
  href?: String
  imageHrefs: [String]
  details: [IComponentDetail]
}

export const validateComponentSchema = Joi.object()
  .keys({
    _id: Joi.string(),
    description: Joi.string().min(1).required(),
    price: Joi.number().min(0.01),
    storeName: Joi.string(),
    href: Joi.string(),
    imageHrefs: Joi.array().items(Joi.string()),
    details: Joi.object(),
  })
  .unknown(true)

export const ComponentSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  price: Number,
  storeName: String,
  href: String,
  imageHrefs: {
    type: [String],
    default: [],
    required: true,
  },
  details: Object,
})
