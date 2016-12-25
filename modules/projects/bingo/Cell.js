import React from 'react';

import { CellState } from './Board';

export default React.createClass({
  propTypes: {
    'onClick': React.PropTypes.func,
    'status': React.PropTypes.number,
    'title': React.PropTypes.string,
  },
  onClick() {
    this.props.onClick();
  },
  getModifierClassName() {
    switch (this.props.status) {
      case CellState.SUBMITTED:
        return ' green accent-3';
      case CellState.SELECTED:
        return ' yellow lighten-1';
      default:
        return '';
    }
  },
  render() {
    return <td
      className={'board__cell' + this.getModifierClassName()}
      onClick={this.onClick}>
      {this.props.title}
    </td>;
  }
});
