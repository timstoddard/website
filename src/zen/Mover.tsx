import * as PropTypes from 'prop-types'
import * as React from 'react'

interface Props {
  radiusChangeSpeed: number
  maxRadius: number
  minRadius: number
  direction: number
  offset: number
  centerX: number
  centerY: number
}

interface State {
  x: number
  y: number
  boxShadow: string
  radius: number
  radiusIncr: boolean
  theta: number
  thetaChangeSpeed: number
}

export default class Mover extends React.Component<Props, State> {
  static propTypes: any = {
    radiusChangeSpeed: PropTypes.number.isRequired,
    maxRadius: PropTypes.number.isRequired,
    minRadius: PropTypes.number.isRequired,
    direction: PropTypes.number.isRequired,
    offset: PropTypes.number.isRequired,
    centerX: PropTypes.number.isRequired,
    centerY: PropTypes.number.isRequired,
  }

  constructor(props: Props) {
    super(props)

    this.state = {
      x: 0,
      y: 0,
      boxShadow: '',
      radius: 10,
      radiusIncr: true,
      theta: 0,
      thetaChangeSpeed: Math.PI / 360 * 2,
    }
  }

  move = (nextColor: string): void => {
    const { radiusChangeSpeed, maxRadius, minRadius, direction, offset, centerX, centerY } = this.props
    const { radius, radiusIncr, theta, thetaChangeSpeed } = this.state

    // update radius
    let newRadius: number
    let newRadiusIncr: boolean
    if (radiusIncr) {
      newRadius = radius + radiusChangeSpeed
      newRadiusIncr = radiusIncr
      if (newRadius >= maxRadius) {
        newRadius = maxRadius - radiusChangeSpeed
        newRadiusIncr = false
      }
    } else {
      newRadius = radius - radiusChangeSpeed
      if (newRadius <= minRadius) {
        newRadius = minRadius + radiusChangeSpeed
        newRadiusIncr = true
      }
    }
    // increment theta value
    const newTheta = (theta + thetaChangeSpeed * direction) % (Math.PI * 2)
    // calculate x and y values
    const sin = Math.sin(newTheta + offset)
    const cos = Math.cos(newTheta + offset)
    const newX = centerX + Math.floor(newRadius * cos)
    const newY = centerY + Math.floor(newRadius * sin)
    // update new tile
    const radiusProportion = radius / maxRadius
    const newBoxShadow = `0px 0px ${50 + radiusProportion * 50}px ${15 + radiusProportion * 40}px ${nextColor}`
    this.setState({
      radius: newRadius,
      radiusIncr: newRadiusIncr,
      x: newX,
      y: newY,
      boxShadow: newBoxShadow,
      theta: newTheta,
    })
  }

  render(): JSX.Element {
    document.title = 'Zen Mode'
    const { x, y, boxShadow } = this.state

    return (
      <div>
        <div
          style={{
            left: x,
            top: y,
            boxShadow,
          }}
          className='zen__block' />
        <div
          style={{
            right: x,
            bottom: y,
            boxShadow,
          }}
          className='zen__block' />
      </div>
    )
  }
}
