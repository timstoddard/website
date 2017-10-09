import React, { Component } from 'react'

import ColorChanger from './ColorChanger'
import Mover from './Mover'

export default class Zen extends Component {
  constructor() {
    super()

    this.colorChanger1 = new ColorChanger()
    this.colorChanger2 = new ColorChanger()
    this.colorChanger2.setRGB(0, 255, 255, false, 'g')

    this.updateBlock = this.updateBlock.bind(this)
    this.moveInterval = setInterval(this.updateBlock, 5)

    this.state = {
      screenCenterX: 0,
      screenCenterY: 0,
      minRadius: 0,
      maxRadius: 0,
    }
  }

  componentWillMount() {
    this.onWindowResize()
    window.addEventListener('resize', this.onWindowResize)
  }

  componentWillUnmount() {
    clearInterval(this.moveInterval)
    window.removeEventListener('resize', this.onWindowResize)
  }

  onWindowResize() {
    const { innerWidth, innerHeight } = window
    const { minRadius } = this.state
    this.setState({
      screenCenterX: innerWidth / 2,
      screenCenterY: innerHeight / 2,
      minRadius,
      maxRadius: (Math.min(innerWidth, innerHeight) * 2 / 5),
    })
  }

  updateBlock() {
    const nextColor1 = this.colorChanger1.nextColor()
    const nextColor2 = this.colorChanger2.nextColor()
    this.mover1.move(nextColor1)
    this.mover2.move(nextColor2)
  }

  render() {
    document.title = 'Zen Mode'
    const { screenCenterX, screenCenterY, maxRadius } = this.state
    return (
      <div className="zen">
        <Mover
          ref={mover => this.mover1 = mover}
          direction={1}
          offset={0}
          centerX={screenCenterX}
          centerY={screenCenterY}
          minRadius={60}
          maxRadius={maxRadius}
          radiusChangeSpeed={0.2}
          />
        <Mover
          ref={mover => this.mover2 = mover}
          direction={-1}
          offset={Math.PI / 2}
          centerX={screenCenterX}
          centerY={screenCenterY}
          minRadius={60}
          maxRadius={maxRadius}
          radiusChangeSpeed={0.4}
          />
      </div>
    )
  }
}
