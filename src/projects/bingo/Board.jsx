import React from 'react'

import Cell from './Cell'
import ControlPanel from './ControlPanel'

export class CellState {
  static get UNSELECTED() { return 0 }
  static get SELECTED() { return 1 }
  static get SUBMITTED() { return 2 }
}

export default React.createClass({
  propTypes: {
    'className': React.PropTypes.string,
    'onSubmit': React.PropTypes.func,
  },
  getInitialState() {
    return this.init()
  },
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
      board: board,
      moveCount: 0,
      selectedCells: 1, // middle square is a freebie
      buttonText: 'submit',
      userWon: false,
    }
  },
  onClick(index) {
    if (!this.state.userWon) {
      const newBoard = this.state.board.slice()
      let selectedCells = this.state.selectedCells
      if (newBoard[index] === CellState.UNSELECTED) {
        newBoard[index] = CellState.SELECTED
        selectedCells++
      } else {
        newBoard[index] = CellState.UNSELECTED
        selectedCells--
      }
      this.setState({ board: newBoard, selectedCells: selectedCells })
    }
  },
  onSubmit() {
    // load new game if user won
    if (this.state.userWon) {
      this.props.onSubmit()
      this.setState(this.init())
      return
    }

    // update status of all selected cells
    const newBoard = this.state.board.slice()
    for (let i = 0; i < 25; i++) {
      if (newBoard[i] === CellState.SELECTED) {
        newBoard[i] = CellState.SUBMITTED
      }
    }
    this.setState({
      board: newBoard,
      moveCount: this.state.moveCount + 1,
    }, () => {
      // check for bingo on rows and columns
      for (let i = 0; i < 5; i++) {
        let fullColumn = true, fullRow = true
        for (let j = 0; j < 5; j++) {
          if (this.state.board[i * 5 + j] !== CellState.SUBMITTED) {
            fullRow = false
          }
          if (this.state.board[j * 5 + i] !== CellState.SUBMITTED) {
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
        if (this.state.board[j * 5 + j] !== CellState.SUBMITTED) {
          fullDiagonalDown = false
        }
        if (this.state.board[(j + 1) * 4] !== CellState.SUBMITTED) {
          fullDiagonalUp = false
        }
      }
      if (this.potentialWin(fullDiagonalDown || fullDiagonalUp)) {
        return
      }

      // load a new video since the user hasn't won yet
      this.props.onSubmit()
    })
  },
  potentialWin(won) {
    if (won) {
      this.setState({ userWon: true })
      this.setState({ buttonText: 'play again' })
    }
    return won
  },
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
    this.shuffle(items)
    // middle square is a freebie
    items.splice(12, 0, 'FREE (Blame the cammer)')
    return items.slice(0, 25)
  },
  shuffle(array) {
    let m = array.length, t, i
    while (m) {
      i = Math.floor(Math.random() * m--)
      t = array[m]
      array[m] = array[i]
      array[i] = t
    }
    return array
  },
  render() {
    const tableRows = []
    for (let i = 0; i < 5; i++) {
      const tableRow = []
      for (let j = 0; j < 5; j++) {
        const index = i * 5 + j
        tableRow.push(<Cell
          key={index}
          title={this.state.items[index]}
          status={this.state.board[index]}
          onClick={this.onClick.bind(this, index)}
          />)
      }
      tableRows.push(<tr key={'r' + i}>{tableRow}</tr>)
    }
    return (<div className={this.props.className}>
      <table className="centered">
        <tbody>{tableRows}</tbody>
      </table>
      <ControlPanel
        moveCount={this.state.moveCount}
        selectedCells={this.state.selectedCells}
        buttonText={this.state.buttonText}
        onSubmit={this.onSubmit}
        />
    </div>)
  },
})
