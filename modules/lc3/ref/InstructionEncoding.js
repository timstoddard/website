import React from 'react';

import './InstructionEncoding.scss';

let BitEncoding = React.createClass({
  render() {
    let bitNumbers = [];
    for (let i = this.props.max; i >= this.props.min; i--) {
      bitNumbers.push(<div key={i} className="encoding__bit">
        {i}
      </div>);
    }
    return <div className="encoding__bit--wrapper">
      <div className="encoding__bits">
        {bitNumbers}
      </div>
      <div className={`bit--${this.props.width}`}>
        {this.props.value || '*'}
      </div>
    </div>;
  }
});

let BitDivider = React.createClass({
  render() {
    return <div className="bit__divider" />;
  }
});

export default React.createClass({
  render() {
    let bitNumber = 15;
    let instructions = this.props.encoding.map((code, index) => {
      if (typeof code.value === 'string') {
        let max = bitNumber;
        let min = max - code.bits + 1;
        bitNumber -= code.bits;
        return <BitEncoding
          key={index}
          value={code.value}
          width={code.bits}
          min={min}
          max={max} />
      } else {
        return code.split('').map((bit, index) =>
          <BitEncoding
            key={index}
            value={bit}
            width={1}
            min={bitNumber}
            max={bitNumber--} />);
      }
    });
    let instructionsWithDividers = [<BitDivider key={'div-0'} />];
    for (let i = 0; i < instructions.length; i++) {
      instructionsWithDividers.push(instructions[i]);
      instructionsWithDividers.push(<BitDivider key={`div-${i + 1}`} />);
    }
    return <div className={`encoding__text center-align ${this.props.className}`}>
      {instructionsWithDividers}
    </div>;
  }
});
