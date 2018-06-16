import React, { Component } from 'react'
import PropTypes from 'prop-types'

import instructions from './Data'
import InstructionEncoding from './InstructionEncoding'

const DetailHeader = ({ assemblerFormat, fn }) => (
  <div className="detailHeader row">
    <div className="detailHeader__text detailHeader__text--opcode col s3">
      {assemblerFormat.name || 'none'}
    </div>
    <div className="detailHeader__text detailHeader__text--operands col s4">
      {assemblerFormat.operands || 'none'}
    </div>
    <div className="detailHeader__text detailHeader__text--function col s5">
      {fn}
    </div>
  </div>
)

DetailHeader.propTypes = {
  assemblerFormat: PropTypes.shape({
    name: PropTypes.string,
    operands: PropTypes.string,
  }).isRequired,
  fn: PropTypes.string.isRequired,
}

const DetailDescription = ({ description }) => (
  <div className="detailDescription">
    {description}
  </div>
)

DetailDescription.propTypes = {
  description: PropTypes.string.isRequired,
}

const DetailOperation = ({ operation }) => (
  <div className="detailOperation">
    {operation.map(({ tooltip, text, indentationLevel }) =>
      tooltip ? (
        <div
          key={text}
          className="detailOperation__tooltip">
          <em>{text}</em>
        </div>
      ) : (
        <div
          key={text}
          className={`detail__text--code detailOperation__text--${indentationLevel}`}>
          {text}
        </div>
      )
    )}
  </div>
)

DetailOperation.propTypes = {
  operation: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.shape({
        text: PropTypes.string,
        indentationLevel: PropTypes.number,
      }),
      PropTypes.shape({
        text: PropTypes.string,
        tooltip: PropTypes.bool,
      }),
    ])
  ).isRequired,
}

const DetailExample = ({ example }) => (
  <div className="detailExample">
    <div className="detail__text--code">
      {example.text}
    </div>
    <div>{example.description}</div>
  </div>
)

DetailExample.propTypes = {
  example: PropTypes.shape({
    text: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
}

class InstructionRow extends Component {
  constructor(props) {
    super(props)

    this.onClick = this.onClick.bind(this)

    this.state = { expanded: false }
  }

  onClick() {
    this.setState({ expanded: !this.state.expanded })
  }

  render() {
    const { instruction, modifiesCC, format } = this.props
    const { expanded } = this.state
    return (
      <div>
        <div
          onClick={this.onClick}
          className="instruction row">
          <div className="col s3">
            <div className="instruction__wrapper">
              <div className="instruction__name">
                {instruction.name}
              </div>
              <div className={`instruction__modifiesCC--${modifiesCC}`} />
            </div>
          </div>
          <InstructionEncoding
            className="col s9"
            encoding={format.encoding} />
        </div>
        <div className={`instruction__detail ${expanded ? '' : 'instruction__detail--hidden'}`}>
          <DetailHeader
            assemblerFormat={format.assemblerFormat}
            fn={instruction.function} />
          <DetailDescription description={instruction.description} />
          <DetailOperation operation={instruction.operation} />
          {format.examples.map((example) => (
            <DetailExample
              key={example.text}
              example={example} />
          ))}
        </div>
      </div>
    )
  }
}

InstructionRow.propTypes = {
  instruction: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    function: PropTypes.string,
    operation: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.shape({
          text: PropTypes.string,
          indentationLevel: PropTypes.number,
        }),
        PropTypes.shape({
          text: PropTypes.string,
          tooltip: PropTypes.bool,
        }),
      ])
    ),
  }).isRequired,
  modifiesCC: PropTypes.bool.isRequired,
  format: PropTypes.shape({
    encoding: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
          value: PropTypes.string,
          bits: PropTypes.number,
        }),
      ])
    ),
    assemblerFormat: PropTypes.shape({
      name: PropTypes.string,
      operands: PropTypes.string,
    }),
    examples: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string,
        description: PropTypes.string,
      })
    ),
  }).isRequired,
}

const LC3Ref = () => (
  <div className="container">
    <h1 className="refList__title">LC3 Reference Guide</h1>
    <h5 className="refList__title">
      (Adapted from&nbsp;
      <a
        href="https://drive.google.com/file/d/0B9dz0Ddcl3ESRUdQX1lQczBwblk/view"
        target="_blank"
        rel="noopener noreferrer">
        this pdf
      </a>
      )
    </h5>
    <div className="refList__content">
      {instructions.map(instruction =>
        instruction.formats.map(format => (
          <InstructionRow
            key={format.name}
            instruction={instruction}
            format={format}
            modifiesCC={instruction.modifiesConditionCodes} />
        ))
      )}
      <p className="refList__note--title">Notes</p>
      <ul>
        <li className="refList__note--text">Click on an instruction to see more information about it.</li>
        <li className="refList__note--text">The dot next to an instruction&quot;s name refers to whether or not the instruction modifies condition codes. <span className="instruction__modifiesCC--true" /> means it modifies condition codes, and <span className="instruction__modifiesCC--false" /> means it does not.</li>
      </ul>
    </div>
  </div>
)

export default LC3Ref
