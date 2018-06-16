import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Dots extends Component {
  constructor(props) {
    super(props)

    this.state = {
      visible: false,
      drawLineThresholdSquared: 0,
    }
  }

  componentDidMount() {
    // generate the dots
    this.dots = []
    for (let i = 0; i < 50; i++) {
      this.dots.push(this.generateNewDot())
    }

    // start the interval to move the dots
    this.moveInterval = setInterval(this.moveDots.bind(this), 5)

    // timer to make dots visible
    this.visibleTimer = setTimeout(() => {
      this.setState({ visible: true })
    }, this.props.delay)

    // track the window size
    const trackWindowSize = () => {
      const {
        clientWidth: viewportWidth,
        clientHeight: viewportHeight,
      } = document.documentElement
      this.canvas.width = viewportWidth
      this.canvas.height = viewportHeight
      const threshold = Math.min(viewportWidth, viewportHeight) / 6
      this.setState({ drawLineThresholdSquared: threshold * threshold })
    }
    trackWindowSize()
    window.onresize = trackWindowSize
  }

  componentWillUnmount() {
    clearInterval(this.moveInterval)
    clearTimeout(this.visibleTimer)
    window.onresize = () => {}
  }

  moveDots() {
    const {
      clientWidth: viewportWidth,
      clientHeight: viewportHeight,
    } = document.documentElement
    this.dots = this.dots.map(({ x, y, dx, dy, radius, opacity }) => {
      const newX = x + dx
      const newY = y + dy
      const outOfBounds = newX < 0 ||
        newX > viewportWidth ||
        newY < 0 ||
        newY > viewportHeight
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
          this.drawLine(canvas, dot1.x, dot1.y, dot2.x, dot2.y, opacity)
        }
      }
    }
    this.dots.forEach(({ x, y, radius, opacity }) => {
      this.drawDot(canvas, x, y, radius, opacity)
    })
  }

  generateNewDot() {
    const {
      clientWidth: viewportWidth,
      clientHeight: viewportHeight,
    } = document.documentElement
    const randomPositive = (a, b) => a + (Math.random() * (b - a))
    const randomNumber = (a, b) => Math.random() > 0.5
      ? randomPositive(a, b)
      : -randomPositive(a, b)
    const radius = randomPositive(3, 6)
    const opacity = randomPositive(0.5, 1)
    let x, y, dx, dy
    const random = Math.random()
    const a = 0.5 / 3
    const b = 0.5
    if (random < 0.25) {
      // top
      x = randomPositive(0, viewportWidth)
      y = 0
      dx = randomNumber(a, b)
      dy = randomPositive(a, b)
    } else if (random < 0.5) {
      // right
      x = viewportWidth
      y = randomPositive(0, viewportHeight)
      dx = -randomPositive(a, b)
      dy = randomNumber(a, b)
    } else if (random < 0.75) {
      // bottom
      x = randomPositive(0, viewportWidth)
      y = viewportHeight
      dx = randomNumber(a, b)
      dy = -randomPositive(a, b)
    } else {
      // left
      x = 0
      y = randomPositive(0, viewportHeight)
      dx = randomPositive(a, b)
      dy = randomNumber(a, b)
    }
    return { x, y, dx, dy, radius, opacity }
  }

  drawDot(canvas, x, y, radius, opacity) {
    canvas.beginPath()
    canvas.arc(x, y, radius, 0, 2 * Math.PI, false)
    canvas.fillStyle = `rgba(66,133,244,${opacity})`
    canvas.fill()
  }

  drawLine(canvas, x1, y1, x2, y2, opacity) {
    canvas.beginPath()
    canvas.moveTo(x1, y1)
    canvas.lineTo(x2, y2)
    canvas.strokeStyle = `rgba(66,133,244,${opacity})`
    canvas.stroke()
  }

  render() {
    const { visible } = this.state

    return (
      <canvas
        className={`dots ${visible ? 'dots--visible': ''}`}
        ref={(canvas) => { this.canvas = canvas }} />
    )
  }
}

Dots.propTypes = {
  delay: PropTypes.number,
}

Dots.defaultProps = {
  delay: 0,
}
