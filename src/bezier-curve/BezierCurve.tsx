import * as React from 'react'
import { EmptyObject, noop } from '../types'
import CurveImpl from './CurveImpl'
import Letters, { Point } from './letters'
import styles from './scss/BezierCurve.scss'

interface State {
  curves: CurveImpl[]
}

const ALPHABET = 'abcdefghijklmnopqrstuvwxyz'
const NUMBERS = '0123456789'
const SYMBOLS1 = `!"#$%&'()*+,-./`
const SYMBOLS2 = ':;<=>?@'
const SYMBOLS3 = '[\\]^_`'
const SYMBOLS4 = '{|}~'
const formatIntoLines = (chars: string[], lineLength: number) => {
  let fullString = chars.join('')
  const result = []
  while (fullString.length > 0) {
    const nextLine = fullString.substr(0, lineLength)
    result.push(nextLine)
    fullString = fullString.substr(lineLength)
  }
  return result
}

export default class BezierCurve extends React.Component<EmptyObject, State> {
  private moveInterval: number
  private canvasElement: React.RefObject<HTMLCanvasElement> = React.createRef()

  constructor(props: EmptyObject) {
    super(props)

    // TODO make these settings, add settings UI
    const CURVE_SEGMENTS = 100
    const SIDE_LENGTH = 100
    const LINE_LENGTH = 12
    const TEXT_LINES = formatIntoLines([
      ALPHABET,
      NUMBERS,
      SYMBOLS1,
      SYMBOLS2,
      SYMBOLS3,
      SYMBOLS4,
    ], LINE_LENGTH)
    
    const letters = new Letters(SIDE_LENGTH)
    // const randomCurveSegments = () => Math.floor(100 + Math.random() * 100)
    const curves = TEXT_LINES
      .map((str: string, i: number) => letters.convertString(str, i))
      .reduce((prev: Point[][], curr: Point[][]) => {
        prev.push(...curr)
        return prev
      }, [])
      .map((points: Point[]) => new CurveImpl(points, CURVE_SEGMENTS))

    this.state = {
      curves,
    }
  }

  componentDidMount(): void {
    // track the window size
    const trackWindowSize = (): void => {
      const {
        clientWidth: viewportWidth,
        clientHeight: viewportHeight,
      } = document.documentElement
      // TODO set canvas size based on text content
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
