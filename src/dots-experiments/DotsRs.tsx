import * as PropTypes from 'prop-types'
import * as React from 'react'

interface State {
  visible: boolean
  drawLineThresholdSquared: number
}

interface Dot {
  x: number
  y: number
  dx: number
  dy: number
  radius: number
  opacity: number
}

export default class DotsBlack extends React.Component<{}, State> {
  dots: Dot[]
  canvas: HTMLCanvasElement
  moveInterval: number
  visibleTimer: number
  averageRGBCache: { [key: string]: string } = {}
  twoPiRadians: number = 2 * Math.PI
  ref: any; // TODO better type

  constructor(props: {}) {
    super(props)

    this.state = {
      visible: false,
      drawLineThresholdSquared: 0,
    }
  }

  componentDidMount(): void {
    // generate the dots
    this.dots = []
    for (let i = 0; i < 80; i++) {
      this.dots.push(this.generateNewDot())
    }

    // start the interval to move the dots
    this.moveInterval = setInterval(this.moveDots, 5) as unknown as number

    // timer to make dots visible
    this.visibleTimer = setTimeout(() => {
      this.setState({ visible: true })
    }, 200) as unknown as number

    // track the window size
    const trackWindowSize = (): void => {
      const {
        clientWidth: viewportWidth,
        clientHeight: viewportHeight,
      } = document.documentElement
      this.canvas.width = viewportWidth
      this.canvas.height = viewportHeight
      const threshold = Math.min(viewportWidth, viewportHeight) / 5
      this.setState({ drawLineThresholdSquared: threshold * threshold })
    }
    trackWindowSize()
    window.onresize = trackWindowSize
  }

  componentWillUnmount(): void {
    window.clearInterval(this.moveInterval)
    window.clearTimeout(this.visibleTimer)
    window.onresize = (): void => {}
  }

  moveDots = (): void => {
    const {
      clientWidth: viewportWidth,
      clientHeight: viewportHeight,
    } = document.documentElement
    this.dots = this.dots.map(({ x, y, dx, dy, radius, opacity }: Dot) => {
      const newX = x + dx
      const newY = y + dy
      const outOfBounds = newX < 0 || newX > viewportWidth ||
        newY < 0 || newY > viewportHeight
      return outOfBounds
        ? this.generateNewDot()
        : { x: newX, y: newY, dx, dy, radius, opacity }
    })
    const canvas = this.canvas.getContext('2d')
    canvas.clearRect(0, 0, viewportWidth, viewportHeight)
    const { drawLineThresholdSquared } = this.state
    for (let i = 0; i < this.dots.length; i++) {
      for (let j = i + 1; j < this.dots.length; j++) {
        const dot1 = this.dots[i]
        const dot2 = this.dots[j]
        const a = dot1.x - dot2.x
        const b = dot1.y - dot2.y
        const distSquared = a * a + b * b
        if (distSquared < drawLineThresholdSquared) {
          const opacity = Math.min(drawLineThresholdSquared / distSquared - 1, 1)
          this.drawLine(canvas, dot1, dot2, opacity)
        }
      }
    }
    this.dots.forEach(({ x, y, radius, opacity }: Dot) => {
      this.drawDot(canvas, x, y, radius, opacity)
    })
  }

  generateNewDot = (): Dot => {
    const {
      clientWidth: viewportWidth,
      clientHeight: viewportHeight,
    } = document.documentElement
    const randomPositive = (a: number, b: number): number => a + (Math.random() * (b - a))
    const randomNumber = (a: number, b: number): number => Math.random() > 0.5
      ? randomPositive(a, b)
      : -randomPositive(a, b)
    const radius = randomPositive(3, 6)
    const opacity = randomPositive(0.5, 1)
    let x: number
    let y: number
    let dx: number
    let dy: number
    const random = Math.random()
    const lowerBound = 0.5 / 3
    const upperBound = 0.5
    if (random < 0.25) {
      // top
      x = randomPositive(0, viewportWidth)
      y = 0
      dx = randomNumber(lowerBound, upperBound)
      dy = randomPositive(lowerBound, upperBound)
    } else if (random < 0.5) {
      // right
      x = viewportWidth
      y = randomPositive(0, viewportHeight)
      dx = -randomPositive(lowerBound, upperBound)
      dy = randomNumber(lowerBound, upperBound)
    } else if (random < 0.75) {
      // bottom
      x = randomPositive(0, viewportWidth)
      y = viewportHeight
      dx = randomNumber(lowerBound, upperBound)
      dy = -randomPositive(lowerBound, upperBound)
    } else {
      // left
      x = 0
      y = randomPositive(0, viewportHeight)
      dx = randomPositive(lowerBound, upperBound)
      dy = randomNumber(lowerBound, upperBound)
    }
    return { x, y, dx, dy, radius, opacity }
  }

  drawDot = (
    canvas: CanvasRenderingContext2D,
    x: number,
    y: number,
    radius: number,
    opacity: number,
  ): void => {
    const width = 100;
    const height = width * 0.85;
    canvas.drawImage(
      this.ref,
      x - width / 2, y - height / 2, width, height);
  }

  drawLine = (
    canvas: CanvasRenderingContext2D,
    dot1: Dot,
    dot2: Dot,
    opacity: number,
  ): void => {
    canvas.beginPath()
    canvas.moveTo(dot1.x, dot1.y)
    canvas.lineTo(dot2.x, dot2.y)
    canvas.strokeStyle = `rgba(0,0,0,${opacity})`
    canvas.stroke()
  }

  render(): JSX.Element {
    const { visible } = this.state

    return (
      <canvas
        className={`dots ${visible ? 'dots--visible' : ''}`}
        ref={(canvas: HTMLCanvasElement): void => { this.canvas = canvas }}>
        <img
          src='http://www.rssportscars.com/photos/cars/2016-ford-focus-rs/focus-rs-usa-08-nyc-skyline.jpg'
          ref={(ref: any): void => { this.ref = ref }} />
      </canvas>
    )
  }
}
