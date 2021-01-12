import * as React from 'react'
import { Button } from 'react-bootstrap'
import styles from './scss/Bingo.scss'

interface Props {
  buttonText: string
  moveCount: number
  selectedCells: number
  onSubmit: () => void
}

const ControlPanel: React.FunctionComponent<Props> = ({
  buttonText = '',
  moveCount = 0,
  selectedCells = 0,
  onSubmit = (): void => {},
}: Props): JSX.Element => (
  <div className={styles.board__controls}>
    <div className={styles.board__controls__section}>
      <div>Moves: {moveCount}</div>
      <div>Selected cells: {selectedCells}</div>
    </div>
    <div className={styles.board__controls__section}>
      <Button
        onClick={onSubmit}>
        {buttonText}
      </Button>
    </div>
  </div>
)

export default ControlPanel
