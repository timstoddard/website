import { UIColor } from '../../../hue-color-conversion'
import { BeatStep, LightState } from '../../beat-types'

// a note in a measure
export const createNote = (
  beat: number,
  lights: LightState[],
  transitionMs: number = 0,
): BeatStep => ({ beat, lights, transitionMs })

// control single light
export const lightState = (
  color: UIColor,
  brightness: number = 100,
): LightState => ({
  on: true,
  color,
  brightness,
})
export const lightOff = (): any => ({ on: false })

// controls all lights
export const allLightsState = (
  color: UIColor,
  brightness: number = 100,
): LightState[] => [
  lightState(color, brightness),
  lightState(color, brightness),
]
export const allLightsOff = (): LightState[] => ([
  lightOff(),
  lightOff(),
])
