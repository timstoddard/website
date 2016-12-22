import React from 'react';

import StrobeOptions from './StrobeOptions';

import './Strobe.scss';

export const defaultMs = 45;

export default React.createClass({
  getInitialState() {
    return {
      ms: defaultMs,
      showOptions: false
    };
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
      className={'strobe ' + this.getCurrentStyle}>
      {this.state.showOptions && <StrobeOptions
        ms={this.state.ms}
        updateMs={this.updateMs}
        hideOptions={this.hideOptions} />}
    </div>;
  }
});
