import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class CellState {
  static get UNSELECTED() { return 0 }
  static get SELECTED() { return 1 }
  static get SUBMITTED() { return 2 }
}

export default class Cell extends Component {
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
    const { onClick, title } = this.props
    return (
      <td
        className={`board__cell ${this.getModifierClassName()}`}
        onClick={onClick}>
        {title}
      </td>
    )
  }
}

Cell.propTypes = {
  onClick: PropTypes.func,
  status: PropTypes.number,
  title: PropTypes.string,
}

Cell.defaultProps = {
  onClick: () => {},
  status: 0,
  title: '',
}
