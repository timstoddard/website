import React from 'react'

const BitEncoding = ({ isFirstBit, isLastBitInSection, min, max, width, value }) => {
  const bitNumbers = []
  let classes = ''
  if (isFirstBit) {
    classes += ' encoding__bit--first'
  }
  if (isLastBitInSection) {
    classes += ' encoding__bit--lastInSection'
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
      <div className={`encoding__bit encoding__bit--${width} ${classes}`}>
        {value || '*'}
      </div>
    </div>
  )
}

const InstructionEncoding = ({ encoding, className }) => {
  let bitNumber = 15
  return (
    <div className={`encoding__text center-align ${className}`}>
      {encoding.map((code, index) => {
        if (typeof code.value === 'string') {
          const max = bitNumber
          const min = max - code.bits + 1
          bitNumber -= code.bits
          return (
            <BitEncoding
              key={index}
              value={code.value}
              width={code.bits}
              isFirstBit={max === 15}
              isLastBitInSection={true}
              min={min}
              max={max}
              />
          )
        } else {
          return code.split('').map((bit, index, arr) =>
            <BitEncoding
              key={index}
              value={bit}
              width={1}
              isFirstBit={bitNumber === 15}
              isLastBitInSection={index === arr.length - 1}
              min={bitNumber}
              max={bitNumber--}
              />)
        }
      })}
    </div>
  )
}

export default InstructionEncoding
