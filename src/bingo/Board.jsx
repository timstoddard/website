import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Cell, { CellState } from './Cell'
import ControlPanel from './ControlPanel'

const shuffle = (array) => {
  let m = array.length, t, i
  while (m) {
    i = Math.floor(Math.random() * m--)
    t = array[m]
    array[m] = array[i]
    array[i] = t
  }
  return array
}

export default class Board extends Component {
  constructor(props) {
    super(props)

    this.onClick = this.onClick.bind(this)
    this.onSubmit = this.onSubmit.bind(this)

    this.state = this.init()
  }

  onClick(index) {
    const { userWon, board } = this.state
    if (!userWon) {
      const newBoard = board.slice()
      let { selectedCells } = this.state
      // TODO don't allow unselecting submitted cells
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

  onSubmit() {
    const { onSubmit } = this.props
    const { userWon, board, moveCount } = this.state

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
      const { board } = this.state

      // check for bingo on rows and columns
      for (let i = 0; i < 5; i++) {
        let fullColumn = true, fullRow = true
        for (let j = 0; j < 5; j++) {
          if (board[i * 5 + j] !== CellState.SUBMITTED) {
            fullRow = false
          }
          if (board[j * 5 + i] !== CellState.SUBMITTED) {
            fullColumn = false
          }
        }
        if (this.potentialWin(fullColumn || fullRow)) {
          return
        }
      }

      // check for bingo on diagonals
      let fullDiagonalDown = true, fullDiagonalUp = true
      for (let j = 0; j < 5; j++) {
        if (board[j * 5 + j] !== CellState.SUBMITTED) {
          fullDiagonalDown = false
        }
        if (board[(j + 1) * 4] !== CellState.SUBMITTED) {
          fullDiagonalUp = false
        }
      }
      if (this.potentialWin(fullDiagonalDown || fullDiagonalUp)) {
        return
      }

      // load a new video since the user hasn't won yet
      onSubmit()
    })
  }

  getItems() {
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

  init() {
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
      buttonText: 'submit',
      userWon: false,
    }
  }

  potentialWin(won) {
    if (won) {
      this.setState({
        userWon: true,
        buttonText: 'play again',
      })
    }
    return won
  }

  render() {
    const { onSubmit } = this
    const { className } = this.props
    const { board, items, moveCount, selectedCells, buttonText } = this.state
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
            onClick={() => this.onClick(index)}
            />
        )
      }
      tableRows.push(<tr key={`r${i}`}>{tableRow}</tr>)
    }

    return (
      <div className={className}>
        <table className="centered">
          <tbody>{tableRows}</tbody>
        </table>
        <ControlPanel
          moveCount={moveCount}
          selectedCells={selectedCells}
          buttonText={buttonText}
          onSubmit={onSubmit}
          />
      </div>
    )
  }
}

Board.propTypes = {
  className: PropTypes.string,
  onSubmit: PropTypes.func,
}
