import * as React from 'react'
import { EmptyObject } from '../types'
import BezierSettings from './BezierSettings'
import CurveImpl from './CurveImpl'
import styles from './scss/BezierCurve.scss'

export interface CanvasDimensions {
  width: number
  height: number
}

interface State {
  curves: CurveImpl[]
  isSettingsOpen: boolean
  canvasDimensions: CanvasDimensions
}

export default class BezierCurve extends React.Component<EmptyObject, State> {
  private moveInterval: number
  private canvasElement: React.RefObject<HTMLCanvasElement> = React.createRef()

  constructor(props: EmptyObject) {
    super(props)

    this.state = {
      curves: [],
      isSettingsOpen: false,
      canvasDimensions: {
        width: 0,
        height: 0,
      },
    }
  }

  componentDidMount = (): void => {
    alert('Click anywhere to change the settings!')
  }

  componentWillUnmount = (): void => {
    clearInterval(this.moveInterval)
  }

  private updateMoveIntervalMs = (ms: number) => {
    clearInterval(this.moveInterval)
    this.moveInterval = setInterval(this.updateCurve, 1000 / ms) as unknown as number
  }

  private updateCurve = () => {
    const {
      curves,
      canvasDimensions,
    } = this.state
    const {
      clientWidth: viewportWidth,
      clientHeight: viewportHeight,
    } = document.documentElement

    const canvas = this.canvasElement.current.getContext('2d')
    const width = Math.max(canvasDimensions.width, viewportWidth)
    const height = Math.max(canvasDimensions.height, viewportHeight)
    this.canvasElement.current.width = width
    this.canvasElement.current.height = height
    canvas.clearRect(0, 0, width, height)
    for (const curve of curves) {
      curve.drawNext(canvas)
    }
  }

  private updateCanvasDimensions = (canvasDimensions: CanvasDimensions) => {
    this.setState({ canvasDimensions })
  }

  private openSettings = () => {
    this.setState({ isSettingsOpen: true })
  }

  private closeSettings = () => {
    this.setState({ isSettingsOpen: false })
  }

  private updateCurves = (curves: CurveImpl[]) => {
    this.setState({ curves })
  }

  render(): JSX.Element {
    document.title = 'Bezier'

    const {
      updateMoveIntervalMs,
      updateCurves,
      updateCanvasDimensions,
      openSettings,
      closeSettings,
    } = this
    const { isSettingsOpen } = this.state

    return (
      <div className={styles.bezierCurve}>
        <canvas
          ref={this.canvasElement}
          onClick={openSettings}
          className={styles.bezierCurve__canvas} />

        <BezierSettings
          isSettingsOpen={isSettingsOpen}
          updateCurves={updateCurves}
          updateMoveIntervalMs={updateMoveIntervalMs}
          updateCanvasDimensions={updateCanvasDimensions}
          closeSettings={closeSettings} />
      </div>
    )
  }
}
