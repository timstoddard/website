import React from 'react';

import ColorChanger from './ColorChanger';
import StrobeOptions from './StrobeOptions';

import './Strobe.scss';

export const defaultMs = 45;

export default React.createClass({
  colorChanger: null,
  moveInterval: null,
  getInitialState() {
    return {
      background: 'black',
      ms: defaultMs,
      paused: false,
      showOptions: false
    };
  },
  componentDidMount() {
    this.colorChanger = new ColorChanger();
    this.moveInterval = setInterval(this.updateStrobe, this.state.ms);
  },
  updateStrobe() {
    this.setState({ background: this.colorChanger.nextColor() });
  },
  updateMs(newMs) {
    this.setState({ ms: newMs });
  },
  showOptions() {
    this.setState({ showOptions: true });
  },
  hideOptions() {
    this.setState({ showOptions: false });
  },
  render() {
    document.title = 'Strobe';
    return <div
      onClick={this.showOptions}
      className="strobe"
      style={{ background: this.state.background }}>
      {this.state.showOptions && <StrobeOptions
        ms={this.state.ms}
        updateMs={this.updateMs}
        hideOptions={this.hideOptions} />}
    </div>;
  }
});
