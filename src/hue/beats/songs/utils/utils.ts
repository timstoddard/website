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

export class LightGenerator {
  private lightTracksCount: number

  constructor(lightTracksCount: number) {
    this.lightTracksCount = lightTracksCount
  }

  allLightsState = (
    color: UIColor,
    brightness: number = 100,
  ): LightState[] => {
    const result: LightState[] = []
    for (let i = 0; i < this.lightTracksCount; i++) {
      result.push(lightState(color, brightness))
    }
    return result
  }

  allLightsOff = (): LightState[] => {
    const result: LightState[] = []
    for (let i = 0; i < this.lightTracksCount; i++) {
      result.push(lightOff())
    }
    return result
  }
}
