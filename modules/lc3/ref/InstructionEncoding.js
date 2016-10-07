import React from 'react';

import './InstructionEncoding.scss';

let BitEncoding = React.createClass({
  render() {
    let bitNumbers = [];
    let classes = '';
    if (this.props.isFirstBit) {
      classes += ' encoding__bit--first';
    }
    if (this.props.isLastBitInSection) {
      classes += ' encoding__bit--lastInSection';
    }
    for (let i = this.props.max; i >= this.props.min; i--) {
      bitNumbers.push(<div key={i} className="encoding__bitNumber">
        {i}
      </div>);
    }
    return <div className="encoding__wrapper">
      <div className="encoding__bitNumberWrapper">
        {bitNumbers}
      </div>
      <div className={`encoding__bit--${this.props.width} ${classes}`}>
        {this.props.value || '*'}
      </div>
    </div>;
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
          isFirstBit={max === 15}
          isLastBitInSection={true}
          min={min}
          max={max} />
      } else {
        return code.split('').map((bit, index, arr) =>
          <BitEncoding
            key={index}
            value={bit}
            width={1}
            isFirstBit={bitNumber === 15}
            isLastBitInSection={index === arr.length - 1}
            min={bitNumber}
            max={bitNumber--} />);
      }
    });
    return <div className={`encoding__text center-align ${this.props.className}`}>
      {instructions}
    </div>;
  }
});
