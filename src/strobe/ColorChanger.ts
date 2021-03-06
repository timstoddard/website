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
  flashStrobe: boolean

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
    this.flashStrobe = false
  }

  nextColor = (): string => {
    let rgb = 'rgb(0,0,0)'
    if (this.flashStrobe) {
      rgb = `rgb(${this.r},${this.g},${this.b})`
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
    }
    this.flashStrobe = !this.flashStrobe
    return rgb
  }
}
