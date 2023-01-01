import classNames from 'classnames'
import * as React from 'react'
import { noop } from '../types'
import styles from './scss/Stars.scss'
import { Color, Star, StarService, TWO_PI_RADIANS } from './StarService'

// time-based config
const MOVE_INTERVAL_MS = 15
const ADD_STAR_INTERVAL_MS = 100
// star appearance
const STAR_COLOR_RGB = '255,255,255' // TODO better white
const BACKGROUND_COLOR_RGB = '0,0,0' // TODO better black

export default class Stars extends React.Component {
  private starService: StarService
  private moveInterval: number
  private addStarInterval: number
  private canvasElement: React.RefObject<HTMLCanvasElement> = React.createRef()

  constructor(props: unknown) {
    super(props)

    this.starService = new StarService(this.getViewportDimensions())
  }

  componentDidMount(): void {
    // start the interval to move the stars
    this.moveInterval = setInterval(this.updateStars, MOVE_INTERVAL_MS) as unknown as number
    this.addStarInterval = setInterval(this.addStars, ADD_STAR_INTERVAL_MS) as unknown as number

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
    clearInterval(this.addStarInterval)
    window.onresize = noop()
  }

  updateStars = () => {
    this.starService.updateStars(this.getViewportDimensions())
    this.updateCanvas()
  }

  addStars = () => {
    this.starService.addStars(this.getViewportDimensions())
  }

  updateCanvas = () => {
    const canvas = this.canvasElement.current.getContext('2d')
    this.drawBackground(canvas)
    this.starService.getStars()
      .forEach(({ x1, y1, x2, y2, opacity, color }: Star) => {
        this.drawStar(canvas, x1, y1, x2, y2, opacity, color)
      })
    this.drawCenterOverlay(canvas, 4, 1, Color.RED)
    this.drawCenterOverlay(canvas, 8, 0.7, Color.RED)
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
    canvas.arc(x, y, radius, 0, TWO_PI_RADIANS)
    canvas.fillStyle = `rgba(${BACKGROUND_COLOR_RGB},${opacity})`
    canvas.fill()
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

  render(): JSX.Element {
    return (
      <canvas
        ref={this.canvasElement}
        className={classNames(styles.stars)} />
    )
  }
}
