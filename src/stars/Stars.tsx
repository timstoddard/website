import classNames from 'classnames'
import * as React from 'react'
import { noop } from '../types'
import styles from './scss/Stars.scss'

// time-based config
const MOVE_INTERVAL_MS = 10
const ADD_STAR_INTERVAL_MS = 100
// stars config
const INITIAL_STARS_COUNT = 10
const ADD_STARS_COUNT = 10
const MIN_STAR_INIT_LENGTH = 2 // keep it short at first (<10)
const MAX_STAR_INIT_LENGTH = 5 // keep it short at first (<10)
const STAR_LENGTH_SCALAR = 1.25
const MIN_STAR_ACCELERATION = 1.005
const MAX_STAR_ACCELERATION = 1.025
const STAR_COLOR_RGB = '255,255,255' // TODO better white
// background
const BACKGROUND_COLOR_RGB = '0,0,0' // TODO better black

interface Props {
  foo: number
}

interface State {
  foo: number
}

interface Star {
  // position
  x1: number
  y1: number
  x2: number
  y2: number
  // velocity
  dx: number
  dy: number
  // acceleration
  acceleration: number
  // appearance
  color: Color
  opacity: number
}

// TODO add rainbow colors
enum Color {
  RED,
  BLUE,
}

export default class Stars extends React.Component<Props, State> {
  stars: Star[]
  moveInterval: number
  addStarInterval: number
  twoPiRadians: number = 2 * Math.PI
  private canvasElement: React.RefObject<HTMLCanvasElement> = React.createRef()

  constructor(props: Props) {
    super(props)

    this.state = {
      foo: 0,
    }
  }

  componentDidMount(): void {
    // generate the stars
    this.stars = []
    for (let i = 0; i < INITIAL_STARS_COUNT; i++) {
      this.stars.push(this.createNewStar(Color.RED))
    }

    // start the interval to move the stars
    this.moveInterval = setInterval(this.updateStars, MOVE_INTERVAL_MS) as unknown as number
    this.addStarInterval = setInterval(this.addStar, ADD_STAR_INTERVAL_MS) as unknown as number

    // track the window size
    const trackWindowSize = (): void => {
      const {
        viewportWidth,
        viewportHeight,
      } = this.getViewportDimensions()
      this.canvasElement.current.width = viewportWidth
      this.canvasElement.current.height = viewportHeight
    }
    trackWindowSize()
    window.onresize = trackWindowSize
  }

  componentWillUnmount(): void {
    clearInterval(this.moveInterval)
    window.onresize = noop()
  }

  addStar = (): void => {
    for (let i = 0; i < ADD_STARS_COUNT; i++) {
      this.stars.push(this.createNewStar(Color.BLUE))
    }
  }

  updateStars = (): void => {
    const {
      viewportWidth,
      viewportHeight,
    } = this.getViewportDimensions()
    this.stars = this.stars.map(({
      x1,
      y1,
      x2,
      y2,
      dx,
      dy,
      acceleration,
      opacity,
      color,
    }: Star) => {
      const newX1 = x1 + dx
      const newY1 = y1 + dy
      const newX2 = x2 + dx * STAR_LENGTH_SCALAR
      const newY2 = y2 + dy * STAR_LENGTH_SCALAR
      const newDx = dx * acceleration
      const newDy = dy * acceleration

      const outOfBounds = newX1 < 0
        || newX1 > viewportWidth
        || newY1 < 0
        || newY1 > viewportHeight
      return outOfBounds
        ? null
        : {
          x1: newX1,
          y1: newY1,
          x2: newX2,
          y2: newY2,
          dx: newDx,
          dy: newDy,
          acceleration,
          opacity,
          color,
        }
    })
    // filter null stars (out of bounds)
    .filter(start => !!start)

    const canvas = this.canvasElement.current.getContext('2d')
    this.drawBackground(canvas)
    this.stars.forEach(({ x1, y1, x2, y2, opacity, color }: Star) => {
      this.drawStar(canvas, x1, y1, x2, y2, opacity, color)
    })
    this.drawCenterOverlay(canvas, 4, 1, Color.RED)
    this.drawCenterOverlay(canvas, 8, 0.7, Color.RED)
  }

  createNewStar = (color: Color): Star => {
    const {
      viewportWidth,
      viewportHeight,
    } = this.getViewportDimensions()
    const randomPositive = (a: number, b: number): number => a + (Math.random() * (b - a))
    const opacity = randomPositive(0.6, 1)
    
    // start from center
    const centerX = viewportWidth / 2
    const centerY = viewportHeight / 2

    // generate velocity based on random angle
    const angle = randomPositive(0, this.twoPiRadians)
    const dx = Math.cos(angle)
    const dy = Math.sin(angle)

    // generate 2nd pair of coords
    const initLength = randomPositive(MIN_STAR_INIT_LENGTH, MAX_STAR_INIT_LENGTH)
    const x1 = centerX + dx * initLength
    const y1 = centerY + dy * initLength
    const x2 = x1 + dx * initLength
    const y2 = y1 + dy * initLength

    // set up acceleration scalar
    const acceleration = randomPositive(MIN_STAR_ACCELERATION, MAX_STAR_ACCELERATION)

    return {
      x1,
      y1,
      x2,
      y2,
      dx,
      dy,
      acceleration,
      opacity,
      color,
    }
  }

  getViewportDimensions = () => {
    const {
      clientWidth: viewportWidth,
      clientHeight: viewportHeight,
    } = document.documentElement
    return {
      viewportWidth,
      viewportHeight,
    }
  }

  drawStar = (
    canvas: CanvasRenderingContext2D,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    opacity: number,
    color: Color,
  ): void => {
    canvas.beginPath()
    canvas.moveTo(x1, y1)
    canvas.lineTo(x2, y2)
    canvas.strokeStyle = `rgba(${STAR_COLOR_RGB},${opacity})`
    canvas.stroke()
  }

  drawBackground = (canvas: CanvasRenderingContext2D): void => {
    const {
      viewportWidth,
      viewportHeight,
    } = this.getViewportDimensions()

    canvas.fillStyle = `rgb(${BACKGROUND_COLOR_RGB})`
    canvas.fillRect(0, 0, viewportWidth, viewportHeight)
  }

  drawCenterOverlay = (
    canvas: CanvasRenderingContext2D,
    radius: number,
    opacity: number,
    color: Color,
  ): void => {
    const {
      viewportWidth,
      viewportHeight,
    } = this.getViewportDimensions()
    canvas.beginPath()
    const x = viewportWidth / 2
    const y = viewportHeight / 2
    canvas.arc(x, y, radius, 0, this.twoPiRadians)
    canvas.fillStyle = `rgba(${BACKGROUND_COLOR_RGB},${opacity})`
    canvas.fill()
  }

  render(): JSX.Element {
    return (
      <canvas
        ref={this.canvasElement}
        className={classNames(styles.stars)} />
    )
  }
}
