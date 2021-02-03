import * as React from 'react'
import { hexToColor } from '../hue/hue-utils'
import styles from './scss/LightStrips.scss'

interface LightPixel {
  color: string // hex (?)
  brightness: number
  on: boolean // TODO needed? or just use bri=0?
}

interface LightStrip {
  name: string
  lengthInches: number
  pixelDensityPerInch: number
  msPerCycle: number
  pixels: LightPixel[]
}

interface State {
  lightStrips: LightStrip[]
  pixelsPerInch: number
  startTimeMs: number // TODO should be prop eventually, passed in from controller to canvas comp
}

export default class LightStrips extends React.Component<{}, State> {
  private animationFrame: number
  private canvasElement: React.RefObject<HTMLCanvasElement> = React.createRef()

  constructor(props: {}) {
    super(props)

    this.state = {
      lightStrips: [
        {
          name: 'Light Strip 1',
          lengthInches: 20,
          pixelDensityPerInch: 2,
          msPerCycle: 20,
          pixels: [],
        },
        {
          name: 'Light Strip 2',
          lengthInches: 48,
          pixelDensityPerInch: 2.8,
          msPerCycle: 20,
          pixels: [],
        },
        {
          name: 'Light Strip 3',
          lengthInches: 72,
          pixelDensityPerInch: 3,
          msPerCycle: 20,
          pixels: [],
        },
      ],
      pixelsPerInch: 1,
      startTimeMs: Date.now(),
    }
  }

  private getPixelsPerInch = () => {
    const { pixelsPerInch } = this.state
    return Math.pow(2, pixelsPerInch)
  }

  componentDidMount = () => {
    this.animationFrame = window.requestAnimationFrame(this.next)
  }

  componentWillUnmount = () => {
    window.cancelAnimationFrame(this.animationFrame)
  }

  render(): JSX.Element {
    document.title = 'Light Strips'

    // const { getCanvasHeight } = this
    const getCanvasHeight = () => 400

    return (
      <div
        className={styles.lightStrips}
        style={{
          maxHeight: `${getCanvasHeight()}px`,
          minHeight: `${getCanvasHeight()}px`,
        }}>
        <canvas
          className={styles.lightStrips__canvas}
          ref={this.canvasElement} />
      </div>
    )
  }

  private next = () => {
    this.updateCanvas()
    this.animationFrame = window.requestAnimationFrame(this.next)
  }

  private updateCanvas = () => {
    if (!this.canvasElement) {
      return
    }

    const {
      lightStrips,
      startTimeMs,
    } = this.state
    const PIXEL_DEFAULT_RADIUS = 20

    const foo = lightStrips[0]
    const bar = Math.floor(foo.lengthInches * foo.pixelDensityPerInch)
    const pg = new PixelGenerator()
    const elapsedMs = Date.now() - startTimeMs
    const newPixels = []
    for (let i = 0; i < bar; i++) {
      newPixels.push(pg.next(i, bar, elapsedMs))
    }
    foo.pixels = newPixels

    const getRgba = (color: string, brightness: number) => {
      const { r, g, b } = hexToColor(color)
      return `rgba(${r},${g},${b},${brightness})`
    }

    const c = this.canvasElement.current
    const canvas = c.getContext('2d')
    const canvasWrapper = c.parentElement
    const canvasWidth = canvasWrapper.clientWidth
    const canvasHeight = 400
    c.width = canvasWidth
    c.height = canvasHeight
    canvas.clearRect(0, 0, canvasWidth, canvasHeight)

    for (let i = 0; i < 1 /*lightStrips.length*/; i++) {
      const lightStrip = lightStrips[i]
      for (let j = 0; j < lightStrip.pixels.length; j++) {
        // console.log(lightStrip.pixels[j])
        const { color, brightness, on } = lightStrip.pixels[j]
        const margin = 3
        const x = (j * (PIXEL_DEFAULT_RADIUS * 2) * 1.2) + (margin * (j + 1))
        const y = (i * (PIXEL_DEFAULT_RADIUS * 2) * 1.8) + (margin * (i + 1))
        if (on) {
          this.drawPixel(canvas, x, y, PIXEL_DEFAULT_RADIUS, getRgba(color, brightness))
        } else {
          this.drawPixelOff(canvas, x, y, PIXEL_DEFAULT_RADIUS)
        }
      }
    }
  }

  private drawPixel = (
    canvas: CanvasRenderingContext2D,
    x: number,
    y: number,
    radius: number,
    fillStyle: string,
  ): void => {
    canvas.beginPath()
    canvas.arc(x + radius, y + radius, radius, 0, 2 * Math.PI)
    canvas.fillStyle = fillStyle
    canvas.fill()
  }

  private drawPixelOff = (
    canvas: CanvasRenderingContext2D,
    x: number,
    y: number,
    radius: number,
  ): void => {
    canvas.strokeStyle = 'black'
    canvas.strokeRect(x, y, radius * 2, radius * 2)
  }
}

class PixelGenerator {
  private msPerCycle: number = 40

  next = (i: number, totalPixels: number, elapsedMs: number) => {
    const cycle = Math.floor(elapsedMs / this.msPerCycle)
    // return this.flashing(cycle, i)
    // return this.moving(cycle, i)
    // return this.randomBrightness(cycle, i)
    return this.pong(cycle, i, totalPixels)
  }

  private flashing = (cycle: number, i: number, totalPixels: number) => {
    if (cycle % 2 === 0) {
      return {
        color: '#ff0000',
        brightness: 1,
        on: i % 2 === 0,
      }
    } else {
      return {
        color: '#ff0000',
        brightness: 1,
        on: i % 2 === 1,
      }
    }
  }

  private moving = (cycle: number, i: number, totalPixels: number) => {
    const foo = cycle % totalPixels
    if (i === foo) {
      return {
        color: '#00ff00',
        brightness: 1,
        on: true,
      }
    } else {
      return {
        color: '#00ff00',
        brightness: 1,
        on: false,
      }
    }
  }

  private pong = (cycle: number, i: number, totalPixels: number) => {
    const condition = (offset: number) => {
      // -2 because neither end is needed when going backwards
      const totalFrames = (2 * totalPixels - 2)
      const frameNumber = (cycle + totalFrames - offset) % totalFrames
      const isMovingBackwards = frameNumber >= totalPixels
      return (!isMovingBackwards && i === frameNumber) ||
        (isMovingBackwards && i === (2 * totalPixels - frameNumber - 2))
    }
    if (condition(0)) {
      return {
        color: '#ff0000',
        brightness: 1,
        on: true,
      }
    } else if (condition(3)) {
      return {
        color: '#00ff00',
        brightness: 1,
        on: true,
      }
    } else if (condition(6)) {
      return {
        color: '#0000ff',
        brightness: 1,
        on: true,
      }
    } else {
      return {
        color: '#000000',
        brightness: 1,
        on: false,
      }
    }
  }

  private randomBrightness = (cycle: number, i: number, totalPixels: number) => {
    return {
      color: '#ff0000',
      brightness: Math.random(),
      on: true,
    }
  }
}
