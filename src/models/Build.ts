import mongoose from 'mongoose'
import { IComponent, ComponentSchema } from './Component'
import { IUser, UserSchema } from './User'

export interface IBuild {
  _id?: String
  cpu?: IComponent
  cpuCooler?: IComponent
  gpus: [IComponent]
  motherboard?: IComponent
  memory: [IComponent]
  storageDrives: [IComponent]
  case?: IComponent
  psu?: IComponent
  accessories: [IComponent]
  monitors: [IComponent]
  headphone?: IComponent
  microphone?: IComponent
  keyboard?: IComponent
  soundCard?: IComponent
  mouse?: IComponent
  mousePad?: IComponent
  url?: String
  creator?: IUser
}

const BuildSchema = new mongoose.Schema({
  cpu: ComponentSchema,
  cpuCooler: ComponentSchema,
  gpus: {
    type: [ComponentSchema],
    required: true,
    default: [],
  },
  memory: {
    type: [ComponentSchema],
    required: true,
    default: [],
  },
  storageDrives: {
    type: [ComponentSchema],
    required: true,
    default: [],
  },
  case: ComponentSchema,
  psu: ComponentSchema,
  accessories: {
    type: [ComponentSchema],
    required: true,
    default: [],
  },
  monitors: {
    type: [ComponentSchema],
    required: true,
    default: [],
  },
  headphone: ComponentSchema,
  microphone: ComponentSchema,
  keyboard: ComponentSchema,
  mouse: ComponentSchema,
  mousePad: ComponentSchema,
  url: String,
  creator: UserSchema,
})

export default mongoose.model('Build', BuildSchema)
