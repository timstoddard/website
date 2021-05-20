import { UIColor } from '../hue-color-conversion'

export interface LightState {
  color?: UIColor
  brightness?: number
  on: boolean
}

interface Step { // TODO rename?
  lights: LightState[]
  // must be in increments of 100ms
  transitionMs: number // TODO should be in LightState?
}

export interface BeatStep extends Step {
  beat: number
}

export interface MsStep extends Step {
  ms: number
}
