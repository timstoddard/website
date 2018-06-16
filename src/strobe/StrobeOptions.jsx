import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class StrobeOptions extends Component {
  constructor(props) {
    super(props)

    this.min = 5
    this.max = 500

    this.onRangeChange = this.onRangeChange.bind(this)
    this.onCloseClick = this.onCloseClick.bind(this)
  }

  componentDidMount() {
    this.range.value = this.props.ms
  }

  onRangeChange(event) {
    const newMs = parseInt(event.target.value, 10)
    this.props.updateMillis(newMs)
    event.stopPropagation()
  }

  onCloseClick(event) {
    this.props.hideOptions()
    event.stopPropagation()
  }

  render() {
    const { min, max, onRangeChange, onCloseClick } = this
    const { ms } = this.props
    return (
      <div className="options">
        <h5 className="options__title">
          Options
        </h5>
        <div className="options__form">
          <p className="options__form--min">{min}</p>
          <input
            type="range"
            onChange={onRangeChange}
            min={min}
            max={max}
            step="5"
            ref={(range) => { this.range = range }} />
          <p className="options__form--max">{max}</p>
        </div>
        <div>
          <span className="options__ms">
            {ms}
          </span>
          &nbsp;milliseconds between strobes
        </div>
        <div className="options__buttonWrapper">
          <a
            onClick={onCloseClick}
            className="options__button">
            Close
          </a>
        </div>
      </div>
    )
  }
}

StrobeOptions.propTypes = {
  ms: PropTypes.number,
  updateMillis: PropTypes.func,
  hideOptions: PropTypes.func,
}

StrobeOptions.defaultProps = {
  ms: 0,
  updateMillis: () => {},
  hideOptions: () => {},
}
