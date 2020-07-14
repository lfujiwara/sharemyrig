import mongoose from 'mongoose'
export interface IUser {
  _id?: String
  name: String
  email: String
  passwordHash: String
}

export const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
})

export default mongoose.model('User', UserSchema)
