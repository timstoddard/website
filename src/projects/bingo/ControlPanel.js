import React from 'react';

export default React.createClass({
  propTypes: {
    'buttonText': React.PropTypes.string,
    'moveCount': React.PropTypes.number,
    'selectedCells': React.PropTypes.number,
    'onSubmit': React.PropTypes.func
  },
  render() {
    return <div className="board__controls row">
      <div className="col s6">
        <div>{`Moves: ${this.props.moveCount}`}</div>
        <div>{`Selected cells: ${this.props.selectedCells}`}</div>
      </div>
      <div className="col s6">
        <a
          className="waves-effect waves-light btn light-blue accent-2"
          onClick={this.props.onSubmit}>
          {this.props.buttonText}
        </a>
      </div>
    </div>;
  }
});
