import React, { Component, PropTypes } from 'react'

export default class Dots extends Component {
  constructor(props) {
    super(props)

    this.moveDots = this.moveDots.bind(this)

    this.state = {
      visible: false,
      dots: this.initDots(),
      pairs: [],
      viewportWidth: 0,
      viewportHeight: 0,
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ visible: true })
    }, this.props.delay)
    this.moveInterval = setInterval(this.moveDots, 16)
    window.onresize = this.saveViewportDimensions.bind(this)
    this.saveViewportDimensions()
  }

  initDots() {
    const dots = []
    for (let i = 0; i < 50; i++) {
      dots.push(this.generateNewDot())
    }
    return dots
  }

  moveDots() {
    const { viewportWidth, viewportHeight } = this.state
    const dots = this.state.dots.map(({ x, y, dx, dy, radius, opacity }) => {
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
    const pairs = []
    for (let i = 0; i < dots.length; i++) {
      for (let j = i + 1; j < dots.length; j++) {
        const dot1 = dots[i]
        const dot2 = dots[j]
        const dist = Math.sqrt(Math.pow(dot1.x - dot2.x, 2) + Math.pow(dot1.y - dot2.y, 2))
        const threshold = Math.min(viewportWidth, viewportHeight) / 6
        if (dist < threshold) {
          pairs.push({
            x1: dot1.x,
            y1: dot1.y,
            x2: dot2.x,
            y2: dot2.y,
            opacity: Math.min(threshold / dist - 1, 1),
          })
        }
      }
    }
    const canvas = this.canvas.getContext('2d')
    canvas.clearRect(0, 0, viewportWidth, viewportHeight)
    pairs.forEach(({ x1, y1, x2, y2, opacity }) => {
      this.drawLine(canvas, x1, y1, x2, y2, opacity)
    })
    dots.forEach(({ x, y, radius, opacity }) => {
      this.drawDot(canvas, x, y, radius, opacity)
    })
    this.setState({ dots, pairs })
  }

  generateNewDot() {
    const {
      clientWidth: viewportWidth,
      clientHeight: viewportHeight,
    } = document.documentElement
    const randomPositive = (a, b) => a + (Math.random() * (b - a))
    const random = (a, b) => Math.random() > 0.5
      ? randomPositive(a, b)
      : -randomPositive(a, b)
    const radius = randomPositive(3, 6)
    const opacity = randomPositive(0.5, 1)
    let x, y, dx, dy
    if (Math.random() > 0.5) {
      if (Math.random() > 0.5) {
        // top
        x = randomPositive(0, viewportWidth)
        y = 0
        dx = random(0.5, 1.5)
        dy = randomPositive(0.5, 1.5)
      } else {
        // right
        x = viewportWidth
        y = randomPositive(0, viewportHeight)
        dx = -randomPositive(0.5, 1.5)
        dy = random(0.5, 1.5)
      }
    } else {
      if (Math.random() > 0.5) {
        // bottom
        x = randomPositive(0, viewportWidth)
        y = viewportHeight
        dx = random(0.5, 1.5)
        dy = -randomPositive(0.5, 1.5)
      } else {
        // left
        x = 0
        y = randomPositive(0, viewportHeight)
        dx = randomPositive(0.5, 1.5)
        dy = random(0.5, 1.5)
      }
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

  saveViewportDimensions() {
    const {
      clientWidth: viewportWidth,
      clientHeight: viewportHeight,
    } = document.documentElement
    this.canvas.width = viewportWidth
    this.canvas.height = viewportHeight
    this.setState({ viewportWidth, viewportHeight })
  }

  render() {
    const { visible } = this.state

    return (
      <canvas
        className={`dots ${visible ? 'dots--visible': ''}`}
        ref={(canvas) => { this.canvas = canvas }}
        />
    )
  }
}

Dots.propTypes = {
  delay: PropTypes.number,
}

Dots.defaultProps = {
  delay: 0,
}
