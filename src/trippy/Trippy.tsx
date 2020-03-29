import * as React from 'react'

const styles = require('./scss/Trippy.scss') // tslint:disable-line no-var-requires

const REFRESH_DELAY = 200

interface State {
  x: number
  y: number
  n: number
  radius: number
  extended: boolean
  colors: string[]
}

interface PairGroup {
  x: number
  y: number
  radius: number
}

export default class Trippy extends React.Component<{}, State> {
  interval: number

  constructor(props: {}) {
    super(props)

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

  componentDidMount(): void {
    this.interval = setInterval(() => {
      this.moveColor()
    }, REFRESH_DELAY) as unknown as number
  }

  componentWillUnmount(): void {
    clearInterval(this.interval)
  }

  getColor = (i: number): string => {
    const { colors } = this.state
    return colors[i % colors.length]
  }

  moveColor = (): void => {
    const colors = this.state.colors.slice()
    colors.unshift(colors.pop())
    this.setState({ colors })
  }

  increaseN = (): void => {
    this.setState({ n: this.state.n + 1 })
  }

  decreaseN = (): void => {
    const { n } = this.state
    this.setState({ n: Math.max(n - 1, 1) })
  }

  increaseRadius = (): void => {
    this.setState({ radius: this.state.radius + 1 })
  }

  decreaseRadius = (): void => {
    const { radius } = this.state
    this.setState({ radius: Math.max(radius - 1, 1) })
  }

  toggleExtended = (): void => {
    this.setState({ extended: !this.state.extended })
  }

  handleMouseMove = (e: React.MouseEvent<HTMLDivElement>): void => {
    this.setState({ x: e.clientX, y: e.clientY })
  }

  handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>): void => {
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

  render(): JSX.Element {
    document.title = 'Trippy'

    const {
      handleMouseMove,
      handleKeyDown,
      getColor,
    } = this
    const {
      x: currentX,
      y: currentY,
      radius: currentRadius,
      n,
      extended,
    } = this.state
    const centerX = document.documentElement.clientWidth / 2
    const centerY = document.documentElement.clientHeight / 2
    const baseDeltaX = (currentX - centerX) / n
    const baseDeltaY = (currentY - centerY) / n
    const pairGroups: PairGroup[][] = []
    pairGroups.push([{ x: centerX, y: centerY, radius: currentRadius }])

    const limit = extended ? n * 1.5 : n
    for (let i = 1; i <= limit; i++) {
      const deltaX = i * baseDeltaX
      const deltaY = i * baseDeltaY
      pairGroups.push([
        {
          x: centerX + deltaX,
          y: centerY + deltaY,
          radius: currentRadius,
        },
        {
          x: centerX + deltaY,
          y: centerY + deltaX,
          radius: currentRadius,
        },
        {
          x: centerX - deltaX,
          y: centerY - deltaY,
          radius: currentRadius,
        },
        {
          x: centerX - deltaY,
          y: centerY - deltaX,
          radius: currentRadius,
        },
        {
          x: centerX + deltaX,
          y: centerY - deltaY,
          radius: currentRadius,
        },
        {
          x: centerX + deltaY,
          y: centerY - deltaX,
          radius: currentRadius,
        },
        {
          x: centerX - deltaX,
          y: centerY + deltaY,
          radius: currentRadius,
        },
        {
          x: centerX - deltaY,
          y: centerY + deltaX,
          radius: currentRadius,
        },
      ])
    }

    return (
      <div
        className={styles.trippy}
        onMouseMove={handleMouseMove}
        onKeyDown={handleKeyDown}
        tabIndex={0}>
        {pairGroups.map((pairGroup: PairGroup[], i: number) =>
          pairGroup.map(({ x, y, radius }: PairGroup, i2: number) => (
            <div
              key={`${x}-${y}-${radius}-${i2}`}
              className={styles.trippy__disk}
              style={{
                background: getColor(i),
                borderRadius: radius,
                height: radius * 2,
                left: x - radius,
                transition: `background ${REFRESH_DELAY / 1000}s ease`,
                top: y - radius,
                width: radius * 2,
              }} />
          )))}
      </div>
    )
  }
}
