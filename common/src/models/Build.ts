import Component from './Component'
import User from './User'

export default interface Build {
  cpu: Component
  cpuCooler: Component
  gpus: [Component]
  motherboard: Component
  memory: [Component]
  storageDrives: [Component]
  case: Component
  psu: Component
  accessories: Component
  monitors: [Component]
  headphone: Component
  microphone: Component
  keyboard: Component
  soundCard: Component
  mouse: Component
  mousePad: Component
  url?: String
  creator?: User
}
