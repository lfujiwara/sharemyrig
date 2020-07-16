import mongoose, { Schema } from 'mongoose'
import { Joi } from 'celebrate'
import { IComponent, ComponentSchema, validateComponentSchema } from './Component'

export interface IBuild {
  _id?: String
  cpu: IComponent
  cpuCooler?: IComponent
  gpus: [IComponent]
  motherboard: IComponent
  memory: [IComponent]
  storageDrives: [IComponent]
  case?: IComponent
  psu: IComponent
  accessories: [IComponent]
  monitors: [IComponent]
  headphone?: IComponent
  microphone?: IComponent
  keyboard?: IComponent
  soundCard?: IComponent
  mouse?: IComponent
  mousePad?: IComponent
  creatorId?: String
}

export const validateBuildSchema = Joi.object()
  .keys({
    _id: Joi.string(),
    cpu: validateComponentSchema.required(),
    cpuCooler: Joi.array().items(validateComponentSchema),
    gpus: Joi.array().items(validateComponentSchema),
    motherboard: validateComponentSchema.required(),
    memory: Joi.array().items(validateComponentSchema).min(1),
    storageDrives: Joi.array().items(validateComponentSchema).min(1),
    case: validateComponentSchema,
    psu: validateComponentSchema.required(),
    accessories: Joi.array().items(validateComponentSchema),
    monitors: Joi.array().items(validateComponentSchema),
    headphone: validateComponentSchema,
    microphone: validateComponentSchema,
    keyboard: validateComponentSchema,
    soundCard: validateComponentSchema,
    mouse: validateComponentSchema,
    mousePad: validateComponentSchema,
    creatorId: Joi.string(),
  })
  .unknown(true)

const BuildSchema = new mongoose.Schema({
  cpu: { type: ComponentSchema, required: true },
  cpuCooler: ComponentSchema,
  motherboard: { type: ComponentSchema, required: true },
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
  psu: { type: ComponentSchema, required: true },
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
  creatorId: { type: Schema.Types.ObjectId, ref: 'User' },
})

export default mongoose.model<IBuild & mongoose.Document>('Build', BuildSchema)
