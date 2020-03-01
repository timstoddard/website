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

// TODO remove
// export interface LightStateMap {
//   [key: number]: LightState
// }

interface Step { // TODO rename?
  lights: LightState[],
}

export interface BeatStep extends Step {
  beat: number
}

export interface MsStep extends Step {
  ms: number
}
