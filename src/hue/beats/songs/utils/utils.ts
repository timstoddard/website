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

export class ColorGenerator {
  private colorList: UIColor[]
  private currentIndex: number

  constructor(colorList: UIColor[]) {
    this.init(colorList)
  }

  init = (colorList: UIColor[]) => {
    this.colorList = colorList
    this.currentIndex = 0
  }

  next = () => {
    if (this.colorList.length > 0) {
      const nextColor = this.colorList[this.currentIndex]
      this.currentIndex = (this.currentIndex + 1) % this.colorList.length
      return nextColor
    }
    return null
  }

  reset = () => {
    this.currentIndex = 0
    return this
  }
}
