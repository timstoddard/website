import React from 'react'
import PropTypes from 'prop-types'

const BitEncoding = ({ isFirstBit, isLastBitInSection, min, max, width, value }) => {
  const bitNumbers = []
  const classes = []
  if (isFirstBit) {
    classes.push('encoding__bit--first')
  }
  if (isLastBitInSection) {
    classes.push('encoding__bit--lastInSection')
  }
  for (let i = max; i >= min; i--) {
    bitNumbers.push(
      <div
        key={i}
        className="encoding__bitNumber">
        {i}
      </div>)
  }
  return (
    <div className="encoding__wrapper">
      <div className="encoding__bitNumberWrapper">
        {bitNumbers}
      </div>
      <div className={`encoding__bit encoding__bit--${width} ${classes.join(' ')}`}>
        {value || '*'}
      </div>
    </div>
  )
}

BitEncoding.propTypes = {
  isFirstBit: PropTypes.bool.isRequired,
  isLastBitInSection: PropTypes.bool.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  value: PropTypes.string.isRequired,
}

const InstructionEncoding = ({ encoding, className }) => {
  let bitNumber = 15
  return (
    <div className={`encoding__text center-align ${className}`}>
      {encoding.map((code) => {
        if (typeof code.value === 'string') {
          const { bits, value } = code
          const max = bitNumber
          const min = max - bits + 1
          bitNumber -= bits
          return (
            <BitEncoding
              key={value}
              value={value}
              width={bits}
              isFirstBit={max === 15}
              isLastBitInSection={true}
              min={min}
              max={max} />
          )
        } else {
          return code.split('').map((bit, index, arr) => (
            <BitEncoding
              key={`bit${index + 1}`}
              value={bit}
              width={1}
              isFirstBit={bitNumber === 15}
              isLastBitInSection={index === arr.length - 1}
              min={bitNumber}
              max={bitNumber--} />
          ))
        }
      })}
    </div>
  )
}

InstructionEncoding.propTypes = {
  encoding: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        value: PropTypes.string,
        bits: PropTypes.number,
      }),
    ])
  ),
  className: PropTypes.string,
}

InstructionEncoding.defaultProps = {
  encoding: [],
  className: '',
}

export default InstructionEncoding
