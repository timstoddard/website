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
    this.colorChangeSpeed = 1
  }

  setRGB = (r: number, g: number, b: number, incr: boolean, color: keyof ColorControls): void => {
    this.r = r
    this.g = g
    this.b = b
    if (incr !== undefined) {
      this.incr.r = false
      this.incr.g = false
      this.incr.b = false
      this.decr.r = false
      this.decr.g = false
      this.decr.b = false
      if (incr) {
        this.incr[color] = true
      } else {
        this.decr[color] = true
      }
    } else {
      throw new Error('must set incr/decr as well')
    }
  }

  nextColor = (): string => {
    const rgb = `rgba(${this.r},${this.g},${this.b},0.8)`
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
    return rgb
  }
}
