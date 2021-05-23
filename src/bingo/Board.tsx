import * as React from 'react'
import Cell, { CellState } from './Cell'
import ControlPanel from './ControlPanel'

interface Props {
  className: string
  onSubmit: () => void
}

interface State {
  items: string[]
  board: number[]
  moveCount: number
  selectedCells: number
  buttonText: 'Submit' | 'Play Again'
  userWon: boolean
}

export default class Board extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = this.init()
  }

  onClick = (index: number): void => {
    const {
      userWon,
      board,
    } = this.state

    if (!userWon) {
      const newBoard = board.slice()
      let { selectedCells } = this.state
      if (newBoard[index] !== CellState.SUBMITTED) {
        if (newBoard[index] === CellState.UNSELECTED) {
          newBoard[index] = CellState.SELECTED
          selectedCells++
        } else {
          newBoard[index] = CellState.UNSELECTED
          selectedCells--
        }
        this.setState({ board: newBoard, selectedCells })
      }
    }
  }

  onSubmit = (): void => {
    const { onSubmit } = this.props
    const {
      userWon,
      board,
      moveCount,
    } = this.state

    // load new game if user won
    if (userWon) {
      onSubmit()
      this.setState(this.init())
      return
    }

    // update status of all selected cells
    const newBoard = board.slice()
    for (let i = 0; i < 25; i++) {
      if (newBoard[i] === CellState.SELECTED) {
        newBoard[i] = CellState.SUBMITTED
      }
    }
    this.setState({
      board: newBoard,
      moveCount: moveCount + 1,
    }, () => {
      const { board: updatedBoard } = this.state

      // check for bingo on rows and columns
      for (let i = 0; i < 5; i++) {
        let fullColumn = true
        let fullRow = true
        for (let j = 0; j < 5; j++) {
          if (updatedBoard[i * 5 + j] !== CellState.SUBMITTED) {
            fullRow = false
          }
          if (updatedBoard[j * 5 + i] !== CellState.SUBMITTED) {
            fullColumn = false
          }
        }
        if (this.didUserWin(fullColumn || fullRow)) {
          return
        }
      }

      // check for bingo on diagonals
      let fullDiagonalDown = true
      let fullDiagonalUp = true
      for (let j = 0; j < 5; j++) {
        if (updatedBoard[j * 5 + j] !== CellState.SUBMITTED) {
          fullDiagonalDown = false
        }
        if (updatedBoard[(j + 1) * 4] !== CellState.SUBMITTED) {
          fullDiagonalUp = false
        }
      }
      if (this.didUserWin(fullDiagonalDown || fullDiagonalUp)) {
        return
      }

      // load a new video since the user hasn't won yet
      onSubmit()
    })
  }

  getItems = (): string[] => {
    const items = [
      'Russia',
      'BMW',
      'Prius',
      'Lada',
      'Semi/Bus',
      'Brake check',
      'Bicyclist',
      'Motorcyclist',
      'Runs red light',
      'Distracted driving',
      'Shoulder driving',
      'Inclement weather',
      'Snowbird',
      'Loose wheel/hubcap',
      'Explosion/Fire',
      'No headlights at night',
      'Vehicle flipping over',
      'Instant karma',
      'Speeding',
      'Slow driving',
      'Air horn/Train horn',
      'Late exit',
      'Overtaking',
      'Merging',
      'Road rage',
      'Pedestrian on vehicle assault',
      'Left turner',
      'U-turner',
    ]
    shuffle(items)

    // middle square is a freebie
    items.splice(12, 0, 'FREE (Blame the cammer)')
    return items.slice(0, 25)
  }

  init = (): State => {
    const board = []
    for (let i = 0; i < 25; i++) {
      if (i !== 12) {
        board.push(CellState.UNSELECTED)
      } else {
        // middle square is a freebie
        board.push(CellState.SUBMITTED)
      }
    }
    return {
      items: this.getItems(),
      board,
      moveCount: 0,
      selectedCells: 1, // middle square is a freebie
      buttonText: 'Submit',
      userWon: false,
    }
  }

  didUserWin = (status: boolean): boolean => {
    if (status) {
      this.setState({
        userWon: true,
        buttonText: 'Play Again',
      })
    }
    return status
  }

  render(): JSX.Element {
    const { onSubmit } = this
    const { className } = this.props
    const {
      board,
      items,
      moveCount,
      selectedCells,
      buttonText,
    } = this.state
    const tableRows = []

    for (let i = 0; i < 5; i++) {
      const tableRow = []
      for (let j = 0; j < 5; j++) {
        const index = i * 5 + j
        tableRow.push(
          <Cell
            key={index}
            title={items[index]}
            status={board[index]}
            onClick={(): void => this.onClick(index)} />)
      }
      tableRows.push(<tr key={`r${i}`}>{tableRow}</tr>)
    }

    return (
      <div className={className}>
        <table>
          <tbody>{tableRows}</tbody>
        </table>
        <ControlPanel
          moveCount={moveCount}
          selectedCells={selectedCells}
          buttonText={buttonText}
          onSubmit={onSubmit} />
      </div>
    )
  }
}

/**
 * Shuffles an array in place.
 * @param array the array to be shuffled
 */
const shuffle = (array: unknown[]): unknown[] => {
  let m = array.length
  let i: number
  let temp
  while (m) {
    i = Math.floor(Math.random() * m--)
    temp = array[m]
    array[m] = array[i]
    array[i] = temp
  }
  return array
}
