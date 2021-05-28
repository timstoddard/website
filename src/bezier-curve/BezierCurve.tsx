import * as React from 'react'
import { EmptyObject, noop } from '../types'
import CurveImpl from './CurveImpl'
import Letters from './letters'
import styles from './scss/BezierCurve.scss'

interface State {
  progress: number
  maxProgress: number
  curves: CurveImpl[]
}

export interface Point {
  x: number
  y: number
}

export default class BezierCurve extends React.Component<EmptyObject, State> {
  private moveInterval: number
  private canvasElement: React.RefObject<HTMLCanvasElement> = React.createRef()

  constructor(props: EmptyObject) {
    super(props)
    
    const maxProgress = 100
    // TODO better layout/spacing system
    const sideLength = 100
    const spacing = (tens: number, hundreds: number) => 10 * tens + 100 * hundreds
    const xPos = (charIndex: number) => spacing(charIndex + 1, charIndex)
    const yPos = (lineIndex: number) => spacing(lineIndex * 2 + 1, lineIndex)
    const letters = new Letters(sideLength)

    this.state = {
      progress: 0,
      maxProgress,
      curves: [
        /* // TIM STODDARD
        new CurveImpl(letters.T(xPos(0), yPos(0)), maxProgress),
        new CurveImpl(letters.I(xPos(1), yPos(0)), maxProgress),
        new CurveImpl(letters.M(xPos(2), yPos(0)), maxProgress),
        new CurveImpl(letters.S(xPos(0), yPos(1)), maxProgress),
        new CurveImpl(letters.T(xPos(1), yPos(1)), maxProgress),
        new CurveImpl(letters.O(xPos(2), yPos(1)), maxProgress),
        new CurveImpl(letters.D(xPos(3), yPos(1)), maxProgress),
        new CurveImpl(letters.D(xPos(4), yPos(1)), maxProgress),
        new CurveImpl(letters.A(xPos(5), yPos(1)), maxProgress),
        new CurveImpl(letters.R(xPos(6), yPos(1)), maxProgress),
        new CurveImpl(letters.D(xPos(7), yPos(1)), maxProgress), */

        /* // TY FOSTER
        new CurveImpl(letters.T(xPos(0), yPos(3)), maxProgress),
        new CurveImpl(letters.Y(xPos(1), yPos(3)), maxProgress),
        new CurveImpl(letters.F(xPos(0), yPos(4)), maxProgress),
        new CurveImpl(letters.O(xPos(1), yPos(4)), maxProgress),
        new CurveImpl(letters.S(xPos(2), yPos(4)), maxProgress),
        new CurveImpl(letters.T(xPos(3), yPos(4)), maxProgress),
        new CurveImpl(letters.E(xPos(4), yPos(4)), maxProgress),
        new CurveImpl(letters.R(xPos(5), yPos(4)), maxProgress), */

        // ABCs
        new CurveImpl(letters.A(xPos(0), yPos(0)), maxProgress),
        new CurveImpl(letters.B(xPos(1), yPos(0)), maxProgress),
        new CurveImpl(letters.C(xPos(2), yPos(0)), maxProgress),
        new CurveImpl(letters.D(xPos(3), yPos(0)), maxProgress),
        new CurveImpl(letters.E(xPos(4), yPos(0)), maxProgress),
        new CurveImpl(letters.F(xPos(0), yPos(1)), maxProgress),
        new CurveImpl(letters.G(xPos(1), yPos(1)), maxProgress),
        new CurveImpl(letters.H(xPos(2), yPos(1)), maxProgress),
        new CurveImpl(letters.I(xPos(3), yPos(1)), maxProgress),
        new CurveImpl(letters.J(xPos(4), yPos(1)), maxProgress),
        new CurveImpl(letters.K(xPos(0), yPos(2)), maxProgress),
        new CurveImpl(letters.L(xPos(1), yPos(2)), maxProgress),
        new CurveImpl(letters.M(xPos(2), yPos(2)), maxProgress),
        new CurveImpl(letters.N(xPos(3), yPos(2)), maxProgress),
        new CurveImpl(letters.O(xPos(4), yPos(2)), maxProgress),
        new CurveImpl(letters.P(xPos(0), yPos(3)), maxProgress),
        new CurveImpl(letters.Q(xPos(1), yPos(3)), maxProgress),
        new CurveImpl(letters.R(xPos(2), yPos(3)), maxProgress),
        new CurveImpl(letters.S(xPos(3), yPos(3)), maxProgress),
        new CurveImpl(letters.T(xPos(4), yPos(3)), maxProgress),
        new CurveImpl(letters.U(xPos(0), yPos(4)), maxProgress),
        new CurveImpl(letters.V(xPos(1), yPos(4)), maxProgress),
        new CurveImpl(letters.W(xPos(2), yPos(4)), maxProgress),
        new CurveImpl(letters.X(xPos(3), yPos(4)), maxProgress),
        new CurveImpl(letters.Y(xPos(4), yPos(4)), maxProgress),
        new CurveImpl(letters.Z(xPos(0), yPos(5)), maxProgress),
      ],
    }
  }

  componentDidMount(): void {
    // track the window size
    const trackWindowSize = (): void => {
      const {
        clientWidth: viewportWidth,
        clientHeight: viewportHeight,
      } = document.documentElement
      this.canvasElement.current.width = viewportWidth
      this.canvasElement.current.height = viewportHeight
    }
    trackWindowSize()
    window.onresize = trackWindowSize

    this.moveInterval = setInterval(this.updateCurve, 25) as unknown as number
  }

  componentWillUnmount(): void {
    clearInterval(this.moveInterval)
    window.onresize = noop()
  }

  private updateCurve = () => {
    const { curves } = this.state
    const {
      clientWidth: viewportWidth,
      clientHeight: viewportHeight,
    } = document.documentElement

    const canvas = this.canvasElement.current.getContext('2d')
    canvas.clearRect(0, 0, viewportWidth, viewportHeight)
    for (const curve of curves) {
      curve.drawNext(canvas)
    }
  }

  render(): JSX.Element {
    return (
      <canvas
        ref={this.canvasElement}
        className={styles.bezierCurve} />
    )
  }
}
