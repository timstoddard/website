import * as PropTypes from 'prop-types'
import * as React from 'react'

interface Props {
  buttonText: string
  moveCount: number
  selectedCells: number
  onSubmit: () => any
}

const ControlPanel: React.StatelessComponent<Props> = ({
  buttonText,
  moveCount,
  selectedCells,
  onSubmit,
}: Props): JSX.Element => (
  <div className='board__controls row'>
    <div className='col s6'>
      <div>Moves: {moveCount}</div>
      <div>Selected cells: {selectedCells}</div>
    </div>
    <div className='col s6'>
      <a
        className='waves-effect waves-light btn light-blue accent-2'
        onClick={onSubmit}>
        {buttonText}
      </a>
    </div>
  </div>
)

ControlPanel.propTypes = {
  buttonText: PropTypes.string,
  moveCount: PropTypes.number,
  selectedCells: PropTypes.number,
  onSubmit: PropTypes.func,
}

ControlPanel.defaultProps = {
  buttonText: '',
  moveCount: 0,
  selectedCells: 0,
  onSubmit: (): void => {},
}

export default ControlPanel
