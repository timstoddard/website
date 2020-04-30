import * as React from 'react'
import Form from 'react-bootstrap/Form'
import { UIColor } from '../hue-color-conversion'
import { MsStep } from './beat-types'

const LINE_HEIGHT = 80
const SPACING = 8

const convertMs = (ms: number): number => ms / 10

interface Props {
  song: MsStep[]
  startTimeMs: number
  lightsCount: number
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
      lightsCount,
      isClippedMode,
    } = this.props
    const getBackground = (c: UIColor, brightness: number): string => c
      ? `rgba(${c.r},${c.g},${c.b},${brightness / 100})`
      : 'transparent'

    const canvas = this.canvas.getContext('2d')
    const canvasWidth = convertMs(this.getMaxSongLineWidth() + 1000)
    const canvasHeight = (LINE_HEIGHT + SPACING) * lightsCount - SPACING
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
      for (let j = 0; j < lightsCount; j++) {
        const x = convertMs(step.ms)
        const y = (LINE_HEIGHT + SPACING) * j
        const width = convertMs(deltaMs)

        const shouldRender = isClippedMode
          ? x < maxX && x + width > minX
          : true

        if (shouldRender) {
          const currLights = step.lights[j]
          canvas.fillStyle = getBackground(currLights.color, currLights.brightness)
          canvas.fillRect(x, y, width, LINE_HEIGHT)

          // TODO ensure sorted by ms increasing and:
          // TODO  - use binary search to find first index faster
          // TODO  - break loop after visible group is drawn
        }
      }
    }

    // draw time line
    const lineX = convertMs(elapsedMs)
    canvas.beginPath()
    canvas.moveTo(lineX, 0)
    canvas.lineTo(lineX, canvasHeight)
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
