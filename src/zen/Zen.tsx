import * as React from 'react'

import ColorChanger from './ColorChanger'
import Mover from './Mover'

interface State {
  screenCenterX: number
  screenCenterY: number
  minRadius: number
  maxRadius: number
}

export default class Zen extends React.Component<{}, State> {
  colorChanger1: ColorChanger
  colorChanger2: ColorChanger
  mover1: Mover
  mover2: Mover
  moveInterval: number

  constructor(props: {}) {
    super(props)

    this.colorChanger1 = new ColorChanger()
    this.colorChanger2 = new ColorChanger()
    this.colorChanger2.setRGB(0, 255, 255, false, 'g')
    this.moveInterval = setInterval(this.updateBlock, 5) as unknown as number

    this.state = {
      screenCenterX: 0,
      screenCenterY: 0,
      minRadius: 0,
      maxRadius: 0,
    }
  }

  componentWillMount(): void {
    this.onWindowResize()
    window.addEventListener('resize', this.onWindowResize)
  }

  componentWillUnmount(): void {
    clearInterval(this.moveInterval)
    window.removeEventListener('resize', this.onWindowResize)
  }

  onWindowResize = (): void => {
    const { innerWidth, innerHeight } = window
    const { minRadius } = this.state
    this.setState({
      screenCenterX: innerWidth / 2,
      screenCenterY: innerHeight / 2,
      minRadius,
      maxRadius: (Math.min(innerWidth, innerHeight) * 2 / 5),
    })
  }

  updateBlock = (): void => {
    const nextColor1 = this.colorChanger1.nextColor()
    const nextColor2 = this.colorChanger2.nextColor()
    this.mover1.move(nextColor1)
    this.mover2.move(nextColor2)
  }

  render(): JSX.Element {
    document.title = 'Zen Mode'
    const { screenCenterX, screenCenterY, maxRadius } = this.state

    return (
      <div className='zen'>
        <Mover
          ref={(mover: Mover): void => { this.mover1 = mover }}
          direction={1}
          offset={0}
          centerX={screenCenterX}
          centerY={screenCenterY}
          minRadius={60}
          maxRadius={maxRadius}
          radiusChangeSpeed={0.2} />
        <Mover
          ref={(mover: Mover): void => { this.mover2 = mover }}
          direction={-1}
          offset={Math.PI / 2}
          centerX={screenCenterX}
          centerY={screenCenterY}
          minRadius={60}
          maxRadius={maxRadius}
          radiusChangeSpeed={0.4} />
      </div>
    )
  }
}
