import * as React from 'react'
import { UIColor } from '../hue-color-conversion'
import { MsStep } from './beat-types'
import styles from '../scss/Hue.scss'

const LINE_HEIGHT = 60
const SPACING = 4

interface Props {
  song: MsStep[]
  startTimeMs: number
  lightsCount: number
}

interface State {
  isPlaying: boolean
}

export default class BeatVisualizer extends React.Component<Props, State> {
  private animationFrame: number
  private firstRenderedStepIndex: number
  private canvasElement: React.RefObject<HTMLCanvasElement> = React.createRef()

  constructor(props: Props) {
    super(props)

    this.firstRenderedStepIndex = 0

    this.state = {
      isPlaying: false,
    }
  }

  start = (): void => {
    this.animationFrame = window.requestAnimationFrame(this.next)
    this.firstRenderedStepIndex = 0
    this.setState({ isPlaying: true })
  }

  reset = (): void => {
    this.stop()
    this.firstRenderedStepIndex = 0
  }

  stop = (): void => {
    window.cancelAnimationFrame(this.animationFrame)
    this.setState({ isPlaying: false })
  }

  refresh = (): void => {
    this.updateCanvas()
  }

  render(): JSX.Element {
    const { getCanvasHeight } = this

    return (
      <div
        className={styles.BeatVisualizer}
        style={{
          maxHeight: `${getCanvasHeight()}px`,
          minHeight: `${getCanvasHeight()}px`,
        }}>
        <canvas
          className={styles.BeatVisualizer__preview}
          ref={this.canvasElement} />
      </div>
    )
  }

  private next = (): void => {
    this.updateCanvas()
    this.animationFrame = window.requestAnimationFrame(this.next)
  }

  private updateCanvas = (): void => {
    if (!this.canvasElement) {
      return
    }

    const {
      song,
      startTimeMs,
      lightsCount,
    } = this.props
    const {
      isPlaying,
    } = this.state
    const getBackground = (color: UIColor, brightness: number): string => color
      ? `rgba(${color.r},${color.g},${color.b},${brightness / 100})`
      : 'transparent'

    const c = this.canvasElement.current
    const canvas = c.getContext('2d')
    const canvasWrapper = c.parentElement
    const canvasWidth = canvasWrapper.clientWidth
    const canvasMiddle = Math.floor(canvasWidth / 2)
    const canvasHeight = this.getCanvasHeight()
    c.width = canvasWidth
    c.height = canvasHeight
    canvas.clearRect(0, 0, canvasWidth, canvasHeight)

    // draw only rects inside visible area
    const elapsedMs = isPlaying ? Date.now() - startTimeMs : 0
    const calculateX = (step: MsStep): number => Math.floor((step.ms - elapsedMs) / 10) + canvasMiddle
    const minX = Math.max(calculateX(song[0]) - 1, 0)
    const maxX = canvasWidth
    let shouldRender = false
    let shouldRenderWasTrue = false

    // fill in light tracks
    for (let i = this.firstRenderedStepIndex; i < song.length - 1; i++) {
      const step = song[i]
      const nextStep = song[i + 1]
      const x = calculateX(step)
      const width = calculateX(nextStep) - x
      shouldRender = (x > minX && x < maxX) || ((x + width) > minX && (x + width) < maxX)

      if (shouldRender) {
        // draw rect for current note
        for (let j = 0; j < lightsCount; j++) {
          const currLights = step.lights[j]
          const y = (LINE_HEIGHT + SPACING) * j
          canvas.fillStyle = getBackground(currLights.color, currLights.brightness)
          canvas.fillRect(x, y, width, LINE_HEIGHT)
          shouldRenderWasTrue = true
        }
      } else {
        // current note is out of frame
        if (shouldRenderWasTrue) {
          // done drawing visible group, so stop drawing
          break
        } else if ((x + width) < minX) {
          // found an element that is currently out to the left side of the frame.
          // next paint, exclude step that is now out of frame
          this.firstRenderedStepIndex++
        }
      }
    }

    // draw time line
    canvas.beginPath()
    canvas.moveTo(canvasMiddle, 0)
    canvas.lineTo(canvasMiddle, canvasHeight)
    canvas.strokeStyle = 'black'
    canvas.stroke()
  }

  private getCanvasHeight = (): number => {
    const { lightsCount } = this.props
    return (LINE_HEIGHT + SPACING) * lightsCount - SPACING
  }
}
