import mongoose from 'mongoose'
export interface IComponent {
  _id?: String
  description: String
  price?: Number
  storeName?: String
  href?: String
  imageHrefs: [String]
}

export function isComponentValid(obj) {}

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
})
