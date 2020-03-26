import { UIColor } from '../hue-color-conversion';

export enum BeatTypes {
  ONE_BEAT = 1,
  HALF_BEAT = 1 / 2,
  THIRD_BEAT = 1 / 3,
  QUARTER_BEAT = 1 / 4,
  EIGHTH_BEAT = 1 / 8,
  SIXTEENTH_BEAT = 1 / 16,
}

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
