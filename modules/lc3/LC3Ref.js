import React from 'react';

import { instructions } from './Data';
import InstructionEncoding from './InstructionEncoding';
import './LC3Ref.scss';

let DetailHeader = React.createClass({
  render() {
    return <div className="detailHeader row">
      <div className="detailHeader__text detailHeader__text--opcode col s3">
        {this.props.assemblerFormat.name || 'none'}
      </div>
      <div className="detailHeader__text detailHeader__text--args col s4">
        {this.props.assemblerFormat.args || 'none'}
      </div>
      <div className="detailHeader__text detailHeader__text--function col s5">
        {this.props.function}
      </div>
    </div>;
  }
});

let DetailDescription = React.createClass({
  render() {
    return <div className="detailDescription">
      {this.props.description}
    </div>;
  }
});

let DetailOperation = React.createClass({
  render() {
    let operations = this.props.operation.map((line, index) =>
      line.tooltip
        ? <div key={index} className="detailOperation--tooltip"><em>{line.text}</em></div>
        : <div key={index} className={`detailOperation__text detailOperation__text--${line.indentationLevel}`}>{line.text}</div>)
    return <div className="detailOperation">
      {operations}
    </div>;
  }
});

let DetailExample = React.createClass({
  render() {
    return <div className="detailExample">
      <div>{this.props.example.text}</div>
      <div>{this.props.example.description}</div>
    </div>;
  }
});

let InstructionRow = React.createClass({
  getInitialState() {
    return { expanded: false };
  },
  onClick() {
    this.setState({ expanded: !this.state.expanded });
  },
  render() {
    let examples = this.props.format.examples.map((example, index) =>
      <DetailExample key={index} example={example} />);
    return <div>
      <div
        onClick={this.onClick}
        className="instruction row">
        <div className="col s2">
          <div className="instruction__wrapper">
            <div className="instruction__name">{this.props.instruction.name}</div>
            <div className={`instruction__modifiesCC instruction__modifiesCC--${this.props.modifiesCC}`} />
          </div>
        </div>
        <InstructionEncoding
          className="col s10"
          encoding={this.props.format.encoding} />
      </div>
      <div className={`instruction__detail instruction__detail--${this.state.expanded ? 'expanded' : 'hidden'}`}>
        <DetailHeader
          assemblerFormat={this.props.format.assemblerFormat}
          function={this.props.instruction.function} />
        <DetailDescription description={this.props.instruction.description} />
        <DetailOperation operation={this.props.instruction.operation} />
        {examples}
      </div>
    </div>;
  }
});

export default React.createClass({
  getInitialState() {
    return { instructions: instructions };
  },
  render() {
    let instructions = this.state.instructions.map((instruction, index) => {
      return instruction.formats.map((format, index) => {
        return <InstructionRow
          instruction={instruction}
          format={format}
          modifiesCC={instruction.modifiesConditionCodes} />;
      });
    });
    return <div className="container">
      <h1 className="refList__title">LC3 Reference Guide</h1>
      <h3 className="refList__title">by Tim Stoddard</h3>
      <h5 className="refList__title">
        Adapted from <a href="https://drive.google.com/file/d/0B9dz0Ddcl3ESRUdQX1lQczBwblk/view" target="_blank">this pdf</a>.
      </h5>
      <div className="refList__content">
        {instructions}
      </div>
    </div>
  }
});
