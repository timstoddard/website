import React from 'react';

import './InstructionEncoding.scss';

let BitEncoding = React.createClass({
  render() {
    return <div className={`bit--${this.props.width}`}>
      {this.props.value}
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
    let instructions = this.props.encoding.map((code, index) => {
        return typeof code.value === 'string'
          ? <BitEncoding key={index} value={code.value} width={code.bits} />
          : code.split('').map((bit, index) => <BitEncoding key={index} value={bit} width={1} />);
    });
    let instructionsWithDividers = [<BitDivider key={'div-0'} />];
    for (let i = 0; i < instructions.length; i++) {
      instructionsWithDividers.push(instructions[i]);
      instructionsWithDividers.push(<BitDivider key={`div-${i+1}`} />);
    }
    return <div className={`center-align ${this.props.className}`}>
      {instructionsWithDividers}
    </div>;
  }
});
