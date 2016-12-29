import React from 'react';

export default React.createClass({
  getInitialState() {
    return {
      x: 0,
      y: 0,
      boxShadow: '',
      radius: 10,
      radiusIncr: true,
      theta: 0,
      thetaChangeSpeed: Math.PI / 360 * 2.5
    };
  },
  move(nextColor) {
    // update radius
    if (this.state.radiusIncr) {
      var newRadius = this.state.radius + this.props.radiusChangeSpeed;
      var newRadiusIncr = this.state.radiusIncr;
      if (newRadius >= this.props.maxRadius) {
        newRadius = this.props.maxRadius - this.props.radiusChangeSpeed;
        newRadiusIncr = false;
      }
    } else {
      newRadius = this.state.radius - this.props.radiusChangeSpeed;
      if (newRadius <= this.props.minRadius) {
        newRadius = this.props.minRadius + this.props.radiusChangeSpeed;
        newRadiusIncr = true;
      }
    }
    // increment theta value
    let newTheta = (this.state.theta + this.state.thetaChangeSpeed * this.props.direction) % (Math.PI * 2);
    // calculate x and y values
    let sin = Math.sin(newTheta + this.props.offset);
    let cos = Math.cos(newTheta + this.props.offset);
    let newX = this.props.centerX + Math.floor(newRadius * cos);
    let newY = this.props.centerY + Math.floor(newRadius * sin);
    // update new tile
    let radiusProportion = this.state.radius / this.props.maxRadius;
    let newBoxShadow = `0px 0px ${50 + radiusProportion * 50}px ${15 + radiusProportion * 40}px ${nextColor}`;
    this.setState({
      radius: newRadius,
      radiusIncr: newRadiusIncr,
      x: newX,
      y: newY,
      boxShadow: newBoxShadow,
      theta: newTheta
    });
  },
  render() {
    return <div>
      <div
        style={{
          'left': this.state.x,
          'top': this.state.y,
          'boxShadow': this.state.boxShadow,
          'transition': 'none'
        }}
        className="zen__block" />
      <div
        style={{
          'right': this.state.x,
          'bottom': this.state.y,
          'boxShadow': this.state.boxShadow,
          'transition': 'none'
        }}
        className="zen__block" />
    </div>;
  }
});
