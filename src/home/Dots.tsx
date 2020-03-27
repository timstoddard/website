import * as React from 'react'

const styles = require('./scss/Dots.scss') // tslint:disable-line no-var-requires

interface Props {
  delay: number
}

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
  color: Color
}

enum Color {
  RED,
  BLUE,
}

export default class Dots extends React.Component<Props, State> {
  dots: Dot[]
  canvas: HTMLCanvasElement
  moveInterval: number
  visibleTimer: number
  averageRGBCache: { [key: string]: string } = {}
  twoPiRadians: number = 2 * Math.PI

  constructor(props: Props) {
    super(props)

    this.state = {
      visible: false,
      drawLineThresholdSquared: 0,
    }
  }

  componentDidMount(): void {
    // generate the dots
    this.dots = []
    for (let i = 0; i < 40; i++) {
      this.dots.push(this.generateNewDot(i === 0 ? Color.RED : Color.BLUE))
    }

    // start the interval to move the dots
    this.moveInterval = setInterval(this.moveDots, 5)  as unknown as number

    // timer to make dots visible
    this.visibleTimer = setTimeout(() => {
      this.setState({ visible: true })
    }, this.props.delay) as unknown as number

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
    clearInterval(this.moveInterval)
    clearTimeout(this.visibleTimer)
    window.onresize = (): void => {}
  }

  moveDots = (): void => {
    const {
      clientWidth: viewportWidth,
      clientHeight: viewportHeight,
    } = document.documentElement
    this.dots = this.dots.map(({ x, y, dx, dy, radius, opacity, color }: Dot) => {
      const newX = x + dx
      const newY = y + dy
      const outOfBounds = newX < 0 || newX > viewportWidth ||
        newY < 0 || newY > viewportHeight
      return outOfBounds
        ? this.generateNewDot(color)
        : { x: newX, y: newY, dx, dy, radius, opacity, color }
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
    this.dots.forEach(({ x, y, radius, opacity, color }: Dot) => {
      this.drawDot(canvas, x, y, radius, opacity, color)
    })
  }

  generateNewDot = (color: Color): Dot => {
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
    return { x, y, dx, dy, radius, opacity, color }
  }

  getRGB = (color: Color): string => {
    switch (color) {
      case Color.RED:
        return '255,0,0'
      case Color.BLUE:
        return '66,133,244'
    }
  }

  averageRGB = (color1: Color, color2: Color): string => {
    const rgb1 = this.getRGB(color1)
    const rgb2 = this.getRGB(color2)

    // check the cache
    if (this.averageRGBCache[`${rgb1}-${rgb2}`]) {
      return this.averageRGBCache[`${rgb1}-${rgb2}`]
    } else if (this.averageRGBCache[`${rgb2}-${rgb1}`]) {
      return this.averageRGBCache[`${rgb2}-${rgb1}`]
    }

    // not found in cache, generate new entry and store it
    const [_1, r1, g1, b1] = rgb1.match(/(\d+),(\d+),(\d+)/)
    const [_2, r2, g2, b2] = rgb2.match(/(\d+),(\d+),(\d+)/)
    const r = Math.floor((parseInt(r1, 10) + parseInt(r2, 10)) / 2)
    const g = Math.floor((parseInt(g1, 10) + parseInt(g2, 10)) / 2)
    const b = Math.floor((parseInt(b1, 10) + parseInt(b2, 10)) / 2)
    const newRGB = `${r},${g},${b}`
    this.averageRGBCache[`${rgb1}-${rgb2}`] = newRGB
    return newRGB
  }

  drawDot = (
    canvas: CanvasRenderingContext2D,
    x: number,
    y: number,
    radius: number,
    opacity: number,
    color: Color,
  ): void => {
    canvas.beginPath()
    canvas.arc(x, y, radius, 0, this.twoPiRadians)
    canvas.fillStyle = `rgba(${this.getRGB(color)},${opacity})`
    canvas.fill()
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
    canvas.strokeStyle = `rgba(${this.averageRGB(dot1.color, dot2.color)},${opacity})`
    canvas.stroke()
  }

  render(): JSX.Element {
    const { visible } = this.state

    return (
      <canvas
        className={`${styles.dots} ${visible ? styles['dots--visible'] : ''}`}
        ref={(canvas: HTMLCanvasElement): void => { this.canvas = canvas }} />
    )
  }
}
