import React, { Component, PropTypes } from 'react'

export default class Mover extends Component {
  constructor(props) {
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

  move(nextColor) {
    const { radiusChangeSpeed, maxRadius, minRadius, direction, offset, centerX, centerY } = this.props
    const { radius, radiusIncr, theta, thetaChangeSpeed } = this.state

    // update radius
    if (radiusIncr) {
      var newRadius = radius + radiusChangeSpeed
      var newRadiusIncr = radiusIncr
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

  render() {
    document.title = 'Zen Mode'
    const { x, y, boxShadow } = this.state

    return (
      <div>
        <div
          style={{
            'left': x,
            'top': y,
            boxShadow,
          }}
          className="zen__block"
          />
        <div
          style={{
            'right': x,
            'bottom': y,
            boxShadow,
          }}
          className="zen__block"
          />
      </div>
    )
  }
}
