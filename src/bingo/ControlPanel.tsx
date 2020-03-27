import * as React from 'react'
import Button from 'react-bootstrap/Button'

interface Props {
  buttonText: string
  moveCount: number
  selectedCells: number
  onSubmit: () => any
}

const ControlPanel: React.StatelessComponent<Props> = ({
  buttonText = '',
  moveCount = 0,
  selectedCells = 0,
  onSubmit = (): void => {},
}: Props): JSX.Element => (
  <div className='board__controls'>
    <div className='board__controls__section'>
      <div>Moves: {moveCount}</div>
      <div>Selected cells: {selectedCells}</div>
    </div>
    <div className='board__controls__section'>
      <Button
        onClick={onSubmit}>
        {buttonText}
      </Button>
    </div>
  </div>
)

export default ControlPanel
