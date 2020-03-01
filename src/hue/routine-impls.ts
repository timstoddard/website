import { calculateXY, getValueFromPoint, UIColor } from './hue-color-conversion'
import { HueApi } from './hue-utils'

export interface Routine {
  hueApi: HueApi
  lightIds: number[]
  init: () => void
  next: () => void
  getNextTimeout: () => number
  setLightIds: (lightIds: number[]) => void
}

export enum RoutineType {
  STROBE,
  RAINBOW,
}

export class StrobeRoutine implements Routine {
  hueApi: HueApi
  lightIds: number[]
  isOn: boolean

  constructor(hueApi: HueApi, lightIds: number[]) {
    this.hueApi = hueApi
    this.lightIds = lightIds
  }

  init = (): void => {
    this.isOn = false // start with lights off
    this.lightIds.forEach((lightId: number): void => {
      this.hueApi.updateLightState(lightId, {
        on: this.isOn,
        bri: 254,
      })
    })
  }

  next = (): void => {
    console.log(this.lightIds)
    this.isOn = !this.isOn
    this.lightIds.forEach((lightId: number): void => {
      this.hueApi.updateLightState(lightId, {
        on: this.isOn,
        bri: 254,
      })
    })
  }

  getNextTimeout = (): number => {
    return 100
  }

  setLightIds = (lightIds: number[]): void => {
    this.lightIds = lightIds
  }
}

// ROUTINE 2

interface ColorControls {
  r: boolean
  g: boolean
  b: boolean
}

export default class ColorChanger {
  r: number
  g: number
  b: number
  incr: ColorControls
  decr: ColorControls
  colorChangeSpeed: number

  constructor() {
    this.r = 255
    this.g = 0
    this.b = 0
    this.incr = {
      r: false,
      g: true,
      b: false,
    }
    this.decr = {
      r: false,
      g: false,
      b: false,
    }
    this.colorChangeSpeed = 4
  }

  nextColor = (): UIColor => {
    const color = new UIColor(this.r, this.g, this.b)
    if (this.incr.g) { // red to yellow
      this.g += this.colorChangeSpeed
      if (this.g >= 255) {
        this.g = 255
        this.incr.g = false
        this.decr.r = true
      }
    } else if (this.decr.r) { // yellow to green
      this.r -= this.colorChangeSpeed
      if (this.r <= 0) {
        this.r = 0
        this.decr.r = false
        this.incr.b = true
      }
    } else if (this.incr.b) { // green to blue-green
      this.b += this.colorChangeSpeed
      if (this.b >= 255) {
        this.b = 255
        this.incr.b = false
        this.decr.g = true
      }
    } else if (this.decr.g) { // blue-green to blue
      this.g -= this.colorChangeSpeed
      if (this.g <= 0) {
        this.g = 0
        this.decr.g = false
        this.incr.r = true
      }
    } else if (this.incr.r) { // blue to purple
      this.r += this.colorChangeSpeed
      if (this.r >= 255) {
        this.r = 255
        this.incr.r = false
        this.decr.b = true
      }
    } else if (this.decr.b) { // purple to red
      this.b -= this.colorChangeSpeed
      if (this.b <= 0) {
        this.b = 0
        this.decr.b = false
        this.incr.g = true
      }
    }
    return color
  }
}

export class RainbowRoutine implements Routine {
  hueApi: HueApi
  lightIds: number[]
  private timeout: number = 200
  private colorChanger: ColorChanger

  constructor(hueApi: HueApi, lightIds: number[]) {
    this.hueApi = hueApi
    this.lightIds = lightIds
  }

  init = (): void => {
    this.colorChanger = new ColorChanger()
    this.updateLights(true)
  }

  next = (): void => {
    this.updateLights()
  }

  getNextTimeout = (): number => {
    return this.timeout
  }

  setLightIds = (lightIds: number[]): void => {
    this.lightIds = lightIds
  }

  private updateLights = (isInit: boolean = false): void => {
    const color = this.colorChanger.nextColor()
    this.lightIds.forEach((lightId: number): void => {
      const model = this.hueApi.getLight(lightId).modelid
      const xy = calculateXY(color, model)
      const options: any = {
        on: true,
        xy: getValueFromPoint(xy),
        bri: 254, // TODO add user control for this
      }
      if (isInit) {
        options.bri = 254
      }
      const transitionTime = Math.floor(this.timeout / 100)
      this.hueApi.updateLightState(lightId, options, transitionTime)
    })
  }
}
