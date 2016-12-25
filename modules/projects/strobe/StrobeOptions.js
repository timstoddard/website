import React from 'react';

import './StrobeOptions.scss';

const min = 5;
const max = 500;

export default React.createClass({
  propTypes: {
    'ms': React.PropTypes.number
  },
  componentDidMount() {
    this.range.value = this.props.ms;
  },
  onRangeChange(event) {
    let newMs = parseInt(event.target.value, 10);
    this.props.updateMs(newMs);
    event.stopPropagation();
  },
  onCloseClick(event) {
    this.props.hideOptions();
    event.stopPropagation();
  },
  render() {
    return <div className="options">
      <h5 className="options__title">
        Options
      </h5>
      <div className="options__form">
        <p className="options__form--min">{min}</p>
        <input
          type="range"
          onChange={this.onRangeChange}
          min={min}
          max={max}
          step="5"
          ref={(range) => { this.range = range; }} />
        <p className="options__form--max">{max}</p>
      </div>
      <div>
        <span className="options__ms">
          {this.props.ms}
        </span>
        &nbsp;milliseconds between strobes
      </div>
      <div className="options__buttonWrapper">
        <a
          onClick={this.onCloseClick}
          className="options__button">
          Close
        </a>
      </div>
    </div>;
  }
});