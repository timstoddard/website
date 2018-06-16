import React, { Component } from 'react'

const REFRESH_DELAY = 200

export default class Trippy extends Component {
  constructor(props) {
    super(props)

    this.handleMouseMove = this.handleMouseMove.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.getColor = this.getColor.bind(this)

    this.state = {
      x: 0,
      y: 0,
      n: 40,
      radius: 100,
      extended: false,
      colors: [
        'red',
        'orange',
        'yellow',
        'rgb(30,255,30)',
        'rgb(20,20,255)',
        'purple',
      ],
    }
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.moveColor()
    }, REFRESH_DELAY)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  getColor(i) {
    const { colors } = this.state
    return colors[i % colors.length]
  }

  moveColor() {
    const colors = this.state.colors.slice()
    colors.unshift(colors.pop())
    this.setState({ colors })
  }

  increaseN() {
    this.setState({ n: this.state.n + 1 })
  }

  decreaseN() {
    const { n } = this.state
    this.setState({ n: Math.max(n - 1, 1) })
  }

  increaseRadius() {
    this.setState({ radius: this.state.radius + 1 })
  }

  decreaseRadius() {
    const { radius } = this.state
    this.setState({ radius: Math.max(radius - 1, 1) })
  }

  toggleExtended() {
    this.setState({ extended: !this.state.extended })
  }

  handleMouseMove(e) {
    this.setState({ x: e.clientX, y: e.clientY })
  }

  handleKeyDown(e) {
    switch (e.key) {
      case 'ArrowLeft':
        this.increaseN()
        break
      case 'ArrowRight':
        this.decreaseN()
        break
      case 'ArrowUp':
        this.increaseRadius()
        break
      case 'ArrowDown':
        this.decreaseRadius()
        break
      case ' ':
        this.toggleExtended()
        break
    }
  }

  render() {
    document.title = 'Trippy'

    const {
      handleMouseMove,
      handleKeyDown,
      getColor,
    } = this
    const {
      x,
      y,
      n,
      radius,
      extended,
    } = this.state
    const centerX = document.documentElement.clientWidth / 2
    const centerY = document.documentElement.clientHeight / 2
    const baseDeltaX = (x - centerX) / n
    const baseDeltaY = (y - centerY) / n
    const pairGroups = []
    pairGroups.push([{ x: centerX, y: centerY, radius }])

    const limit = extended ? n * 1.5 : n
    for (let i = 1; i <= limit; i++) {
      const deltaX = i * baseDeltaX
      const deltaY = i * baseDeltaY
      pairGroups.push([
        {
          x: centerX + deltaX,
          y: centerY + deltaY,
          radius,
        },
        {
          x: centerX + deltaY,
          y: centerY + deltaX,
          radius,
        },
        {
          x: centerX - deltaX,
          y: centerY - deltaY,
          radius,
        },
        {
          x: centerX - deltaY,
          y: centerY - deltaX,
          radius,
        },
        {
          x: centerX + deltaX,
          y: centerY - deltaY,
          radius,
        },
        {
          x: centerX + deltaY,
          y: centerY - deltaX,
          radius,
        },
        {
          x: centerX - deltaX,
          y: centerY + deltaY,
          radius,
        },
        {
          x: centerX - deltaY,
          y: centerY + deltaX,
          radius,
        },
      ])
    }

    return (
      <div
        className="trippy"
        onMouseMove={handleMouseMove}
        onKeyDown={handleKeyDown}
        tabIndex="0">
        {pairGroups.map((pairGroup, i) => {
          const background = getColor(i)
          return pairGroup.map(({ x, y, radius }) => (
            <div
              key={`${x}-${y}-${radius}`}
              className="trippy__disk"
              style={{
                background,
                width: radius * 2,
                height: radius * 2,
                top: y - radius,
                left: x - radius,
                borderRadius: radius,
                transition: `background ${REFRESH_DELAY / 1000}s ease`,
              }} />
          ))
        })}
      </div>
    )
  }
}
