import React from 'react';

var StrobeOptions = React.createClass({
  onChange(event) {
    this.props.ms = event.target.value;
  },
  render() {
    return <div>
      <p>Adjust strobe speed</p>
      5
      <input
        type="range"
        onChange={this.onChange}
        value={this.props.ms}
        min="5"
        max="500"
        step="5" />
      500
      <div>Milliseconds between strobes: {this.props.ms}</div>
    </div>;
  }
});

export default React.createClass({
  getInitialState() {
    return { ms: 45 };
  },
  render() {
    document.title = 'Strobe';
    return <div className={this.getCurrentStyle}>
      <StrobeOptions ms={this.state.ms} />
    </div>
  }
});
