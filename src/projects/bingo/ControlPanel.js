import React, { PropTypes } from 'react'

const ControlPanel = ({ buttonText, moveCount, selectedCells, onSubmit }) =>
  <div className="board__controls row">
    <div className="col s6">
      <div>{`Moves: ${moveCount}`}</div>
      <div>{`Selected cells: ${selectedCells}`}</div>
    </div>
    <div className="col s6">
      <a
        className="waves-effect waves-light btn light-blue accent-2"
        onClick={onSubmit}>
        {buttonText}
      </a>
    </div>
  </div>

ControlPanel.propTypes = {
  buttonText: PropTypes.string,
  moveCount: PropTypes.number,
  selectedCells: PropTypes.number,
  onSubmit: PropTypes.func,
}

export default ControlPanel
