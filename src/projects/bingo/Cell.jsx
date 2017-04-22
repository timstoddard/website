import React, { Component, PropTypes } from 'react'

import { CellState } from './Board'

class Cell extends Component {
  constructor(props) {
    super(props)
  }

  getModifierClassName() {
    switch (this.props.status) {
      case CellState.SUBMITTED:
        return 'green accent-3'
      case CellState.SELECTED:
        return 'yellow lighten-1'
      default:
        return ''
    }
  }

  render() {
    return (
      <td
        className={`board__cell ${this.getModifierClassName()}`}
        onClick={this.props.onClick}>
        {this.props.title}
      </td>
    )
  }
}

Cell.propTypes = {
  onClick: PropTypes.func,
  status: PropTypes.number,
  title: PropTypes.string,
}

export default Cell
