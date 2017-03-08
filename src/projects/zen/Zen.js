import React from 'react';

import ColorChanger from './ColorChanger';
import Mover from './Mover';

import './Zen.scss';

export default React.createClass({
  colorChanger1: null,
  colorChanger2: null,
  moveInterval: null,
  getInitialState() {
    return {
      screenCenterX: 0,
      screenCenterY: 0,
      minRadius: 0,
      maxRadius: 0
    }
  },
  componentDidMount() {
    this.colorChanger1 = new ColorChanger();
    this.colorChanger2 = new ColorChanger();
    this.colorChanger2.setRGB(0, 255, 255, false, 'g');
    this.moveInterval = setInterval(this.updateBlock, 5);
    this.onWindowResize();
    window.addEventListener('resize', this.onWindowResize);
  },
  componentWillUnmount() {
    clearInterval(this.moveInterval);
    window.removeEventListener('resize', this.onWindowResize);
  },
  onWindowResize() {
    this.setState({
      screenCenterX: window.innerWidth / 2,
      screenCenterY: window.innerHeight / 2,
      minRadius: this.state.minRadius,
      maxRadius: (Math.min(window.innerWidth, window.innerHeight) * 2 / 5)
    });
  },
  updateBlock() {
    let nextColor1 = this.colorChanger1.nextColor();
    let nextColor2 = this.colorChanger2.nextColor();
    this.mover1.move(nextColor1);
    this.mover2.move(nextColor2);
  },
  render() {
    document.title = 'Zen Mode';
    return <div className="zen">
      <Mover
        ref={mover => this.mover1 = mover}
        direction={1}
        offset={0}
        centerX={this.state.screenCenterX}
        centerY={this.state.screenCenterY}
        minRadius={60}
        maxRadius={this.state.maxRadius}
        radiusChangeSpeed={0.2} />
      <Mover
        ref={mover => this.mover2 = mover}
        direction={-1}
        offset={Math.PI / 2}
        centerX={this.state.screenCenterX}
        centerY={this.state.screenCenterY}
        minRadius={60}
        maxRadius={this.state.maxRadius}
        radiusChangeSpeed={0.4} />
    </div>;
  }
});