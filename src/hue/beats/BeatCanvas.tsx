import * as React from 'react'
import Form from 'react-bootstrap/Form'
import { UIColor } from '../hue-color-conversion'
import { MsStep } from './beat-types'

const convertMs = (ms: number): number => ms / 10

interface Props {
  song: MsStep[]
  startTimeMs: number
  numOfLights: number
  isClippedMode: boolean
}

export default class BeatCanvas extends React.Component<Props, {}> {
  private canvas: HTMLCanvasElement
  private animationFrame: number

  constructor(props: Props) {
    super(props)
  }

  start = (): void => {
    this.animationFrame = window.requestAnimationFrame(this.foo)
  }

  reset = (): void => {
    this.stop()
    this.resetScroll()
  }

  stop = (): void => {
    window.cancelAnimationFrame(this.animationFrame)
  }

  refresh = (): void => {
    this.updateCanvas()
    this.resetScroll()
  }

  render(): JSX.Element {
    return (
      <div className='beatCanvas'>
        {/* <Form>
          <Form.Group controlId='beatCanvas__perfMode'>
            <Form.Check
              type='checkbox'
              label='Clipped mode (better performance)' />
          </Form.Group>
        </Form> */}
        <div className='beatCanvas__wrapper'>
          <canvas
            className='beatCanvas__preview'
            ref={(canvas: HTMLCanvasElement): void => { this.canvas = canvas }} />
        </div>
      </div>
    )
  }

  private getMaxSongLineWidth = (): number => {
    const { song } = this.props
    const lastStep = song[song.length - 1]
    return lastStep.ms
  }

  private foo = (): void => {
    this.updateCanvas()
    this.animationFrame = window.requestAnimationFrame(this.foo)
  }

  private resetScroll = (): void => {
    this.canvas.parentElement.scrollLeft = 0
  }

  private updateCanvas = (): void => {
    if (!this.canvas) {
      return
    }

    const {
      song,
      startTimeMs,
      numOfLights,
      isClippedMode,
    } = this.props
    const getBackground = (c: UIColor, brightness: number): string => c
      ? `rgba(${c.r},${c.g},${c.b},${brightness / 100})`
      : 'transparent'

    const canvas = this.canvas.getContext('2d')
    const canvasWidth = convertMs(this.getMaxSongLineWidth() + 1000)
    const canvasHeight = numOfLights * 50 + (numOfLights - 1) * 5
    const canvasWrapper = this.canvas.parentElement
    const wrapperWidth = canvasWrapper.clientWidth
    this.canvas.width = canvasWidth
    this.canvas.height = canvasHeight
    canvas.clearRect(0, 0, canvasWidth, canvasHeight)

    // draw only rects inside visible area
    const elapsedMs = Date.now() - startTimeMs
    const minX = convertMs(elapsedMs) - wrapperWidth
    const maxX = convertMs(elapsedMs) + wrapperWidth

    // fill in light tracks
    for (let i = 0; i < song.length - 1; i++) {
      const step = song[i]
      const nextStep = song[i + 1]
      const deltaMs = nextStep.ms - step.ms
      for (let j = 0; j < numOfLights; j++) {
        const x = convertMs(step.ms)
        const y = (50 /* line height */ + 5 /* spacing */) * j
        const width = convertMs(deltaMs)
        const height = 50

        const isVisible = x < maxX && x + width > minX
        const shouldRender = (isClippedMode && isVisible) || (!isClippedMode)
        if (shouldRender) {
          const currLights = step.lights[j]
          canvas.fillStyle = getBackground(currLights.color, currLights.brightness)
          canvas.fillRect(x, y, width, height)

          // TODO ensure sorted by ms and break loop after visible group is drawn
        }
      }
    }

    // draw time line
    const lineX = convertMs(elapsedMs)
    canvas.beginPath()
    canvas.moveTo(lineX, 0)
    canvas.lineTo(lineX, 105)
    canvas.strokeStyle = 'black'
    canvas.stroke()

    // scroll canvas if needed
    // if (lineX * 2 > wrapperWidth) { // TODO needs better logic
    // }
    canvasWrapper.scrollLeft = lineX - wrapperWidth / 2

    // const bar = convertMs(elapsedMs) < wrapperWidth / 2
    // if (bar) {
    //   this.resetScroll()
    // }
  }
}
