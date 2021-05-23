import * as React from 'react'
import { Form } from 'react-bootstrap'
// TODO possibly make shared utils for this + hue client
// import { hexToColor } from '../hue/hue-utils'
import { InputAudioStream, OnBeatDetectedParams } from './InputAudioStream'
import { EmptyObject } from '../types'
import styles from './scss/LightStrips.scss'

const PERCUSSION_FADE_CYCLES = 4

interface LightPixel {
  color: string // hex (?)
  brightness: number
  on: boolean // TODO needed? or just use bri=0?
}

// TODO need way to treat single light strip as several
interface LightStripVirtualMap {
  totalPixels: number
  subStrips: {
    startPixel: number
    endPixel: number
    // orientation? { N, S, E, W, U, D }
  }[]
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
  soundWaveRenderHeight: number
  stftThreshold: number
  percussiveThreshold: number
}

export default class LightStrips extends React.Component<EmptyObject, State> {
  private animationFrame: number
  private canvasElement: React.RefObject<HTMLCanvasElement> = React.createRef()
  private inputAudioStream: InputAudioStream
  private percussionAnimationRemainingCycles: number
  private spectrogramOverallMin: number
  private spectrogramOverallMax: number
  private spectrogramDataWindow: Float32Array[] = []

  // TODO remove eventually (maybe have an option to hide/show)
  private avgPercussionCountMsNumerator = 0
  private avgPercussionCountMsDenominator = 0

  constructor(props: EmptyObject) {
    super(props)

    this.spectrogramOverallMin = Number.POSITIVE_INFINITY
    this.spectrogramOverallMax = Number.NEGATIVE_INFINITY

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
      soundWaveRenderHeight: 1,
      stftThreshold: 1,
      percussiveThreshold: 1,
    }
  }

  private getPixelsPerInch = () => {
    const { pixelsPerInch } = this.state
    return Math.pow(2, pixelsPerInch)
  }

  componentDidMount = () => {
    this.inputAudioStream = new InputAudioStream()
    this.inputAudioStream.init(({
      isBeatDetected,
      amplitudeValues,
      spectrogramData,
      getPercussionCountTimeMs,
    }: OnBeatDetectedParams) => {
      if (isBeatDetected) {
        this.percussionAnimationRemainingCycles = PERCUSSION_FADE_CYCLES
      }
      this.updateCanvas(amplitudeValues, spectrogramData, getPercussionCountTimeMs)
    })
    // this.next()
  }

  componentWillUnmount = () => {
    if (this.inputAudioStream) {
      this.inputAudioStream.end()
    }
    // window.cancelAnimationFrame(this.animationFrame)
  }

  updateSoundWaveRenderHeight = (e: React.ChangeEvent) => {
    const soundWaveRenderHeight = this.parseIntFromInput(e.target as HTMLInputElement)
    this.setState({ soundWaveRenderHeight })
  }

  updateStftThreshold = (e: React.ChangeEvent) => {
    const stftThreshold = this.parseIntFromInput(e.target as HTMLInputElement)
    this.inputAudioStream.setStftRateOfChangeThreshold(stftThreshold)
    this.setState({ stftThreshold })
  }

  updatePercussiveThreshold = (e: React.ChangeEvent) => {
    const percussiveThreshold = this.parseIntFromInput(e.target as HTMLInputElement)
    this.inputAudioStream.setPercussiveThreshold(percussiveThreshold)
    this.setState({ percussiveThreshold })
  }

  render(): JSX.Element {
    document.title = 'Light Strips'

    const {
      updateSoundWaveRenderHeight,
      updateStftThreshold,
      updatePercussiveThreshold,
    } = this
    const {
      soundWaveRenderHeight,
      stftThreshold,
      percussiveThreshold,
    } = this.state

    return (
      <div
        className={styles.lightStrips}
        style={{
          maxHeight: '100vh',
          minHeight: '100vh',
        }}>
        <Form className={styles.lightStrips__controls}>
          <Form.Group controlId='soundWaveRenderHeight'>
            <Form.Label>Sound wave render height</Form.Label>
            <Form.Control
              type='range'
              onChange={updateSoundWaveRenderHeight}
              value={soundWaveRenderHeight}
              min={1}
              max={10} />
          </Form.Group>
          <Form.Group controlId='stftThreshold'>
            <Form.Label>STFT threshold (increase to filter out less abrupt sounds)</Form.Label>
            <Form.Control
              type='range'
              onChange={updateStftThreshold}
              value={stftThreshold}
              min={1}
              max={2}
              step={0.05} />
          </Form.Group>
          <Form.Group controlId='percussiveThreshold'>
            <Form.Label>Percussive threshold (increase to filter out less powerful sounds)</Form.Label>
            <Form.Control
              type='range'
              onChange={updatePercussiveThreshold}
              value={percussiveThreshold}
              min={10}
              max={100}
              step={5} />
          </Form.Group>
        </Form>
        <button onClick={() => this.inputAudioStream.end()}>
          Stop
        </button>
        <canvas
          className={styles.lightStrips__canvas}
          ref={this.canvasElement} />
      </div>
    )
  }

  private next = () => {
    this.updateCanvas(new Float32Array(0), new Float32Array(0), 0)
    this.animationFrame = window.requestAnimationFrame(this.next)
  }

  private updateCanvas = (
    amplitudeValues: Float32Array,
    spectrogramData: Float32Array,
    getPercussionCountTimeMs: number,
  ) => {
    if (!this.canvasElement) {
      return
    }

    const {
      soundWaveRenderHeight,
    } = this.state

    const c = this.canvasElement.current
    const canvas = c.getContext('2d')
    const canvasWrapper = c.parentElement
    const canvasWidth = canvasWrapper.clientWidth
    const canvasHeight = canvasWrapper.clientHeight
    c.width = canvasWidth
    c.height = canvasHeight
    canvas.clearRect(0, 0, canvasWidth, canvasHeight)

    // flash on beat detected
    if (this.percussionAnimationRemainingCycles > 0) {
      const opacity = this.percussionAnimationRemainingCycles / PERCUSSION_FADE_CYCLES
      canvas.fillStyle = `rgba(0,255,0,${opacity})`
      canvas.fillRect(canvasWidth / 4, 0, canvasWidth / 4, 20)
      this.percussionAnimationRemainingCycles--
    }

    this.avgPercussionCountMsNumerator += getPercussionCountTimeMs
    this.avgPercussionCountMsDenominator++
    const avgMs = this.avgPercussionCountMsNumerator / this.avgPercussionCountMsDenominator
    canvas.fillStyle = '#f00'
    canvas.fillText(
      `ms: ${getPercussionCountTimeMs.toString()}\tavg ms: ${avgMs.toFixed(3)}`,
      0, 20)

    const maxWindowSize = 100
    this.spectrogramDataWindow.push(spectrogramData)
    while (this.spectrogramDataWindow.length > maxWindowSize) {
      this.spectrogramDataWindow.shift()
    }

    // search current values for new lifetime min/max
    spectrogramData.forEach((n: number) => {
      if (n < this.spectrogramOverallMin && n !== Number.NEGATIVE_INFINITY) {
        this.spectrogramOverallMin = n
      }
      if (n > this.spectrogramOverallMax && n !== Number.POSITIVE_INFINITY) {
        this.spectrogramOverallMax = n
      }
    })
    const denominator = this.spectrogramOverallMax - this.spectrogramOverallMin

    // spectrogram visualizer
    for (let i = 0; i < this.spectrogramDataWindow.length; i++) {
      const frame = this.spectrogramDataWindow[i]
      for (let j = 0; j < frame.length; j++) {
        const opacity = (frame[j] - this.spectrogramOverallMin) / denominator
        canvas.fillStyle = `rgba(255,0,0,${opacity})`
        canvas.fillRect(
          (canvasWidth - (22 * 2)) * i / this.spectrogramDataWindow.length + 22,
          (canvasHeight / 3) * (j / frame.length) + 50,
          (canvasWidth - (22 * 2)) / this.spectrogramDataWindow.length,
          canvasHeight / 3 / frame.length)
      }
    }

    // waveform visualizer
    canvas.fillStyle = '#00f'
    const soundWaveRenderHeightScalar = 10 * soundWaveRenderHeight
    const amplitudeBarWidth = canvasWidth / amplitudeValues.length
    let maxAmplitude = Number.NEGATIVE_INFINITY
    for (const i in amplitudeValues) {
      if (amplitudeValues[i] > maxAmplitude) {
        maxAmplitude = amplitudeValues[i]
      }
    }
    for (let i = 0; i < amplitudeValues.length; i++) {
      canvas.fillRect(
        i * amplitudeBarWidth,
        canvasHeight * 4 / 6,
        amplitudeBarWidth,
        // TODO maybe don't normalize the sound wave height?
        (amplitudeValues[i] / maxAmplitude) * soundWaveRenderHeightScalar)
    }

    /* const {
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

    // for (let i = 0; i < lightStrips.length; i++) {
    for (let i = 0; i < 1; i++) {
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
    }*/
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

  // TODO make this a shared util function
  private parseIntFromInput = (input: HTMLInputElement) => {
    const value = parseInt(input.value.replace(/[^\d]/g, ''), 10)
    return value || 0
  }
}

class PixelGenerator {
  private msPerCycle = 40

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
