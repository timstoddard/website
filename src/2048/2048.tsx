import classNames from 'classnames'
import * as React from 'react'
import { EmptyObject } from '../types'
import styles from './scss/2048.scss'

// TODO finish this game

class Tile {
  value: number

  constructor(value: number = null) {
    this.value = value
  }

  hasValue = () => this.value !== null
}

interface BoardProps {
  tiles: Tile[]
  boardWidth: number
}

const TESTPrintRow = (text: string, row: Tile[]) => {
  console.log(text, row.map(tile => tile.value || '_').join(','))
}

const Board = ({ tiles, boardWidth }: BoardProps): JSX.Element => {
  const rows = []
  for (let i = 0; i < boardWidth; i++) {
    const slice = tiles.slice(i * boardWidth, (i + 1) * boardWidth)
    TESTPrintRow('ROW: ', slice)
    rows.push(
      <BoardRow
        key={i}
        rowIndex={i}
        tiles={slice} />,
    )
  }
  console.log('---')

  const gridTemplate = new Array(boardWidth).fill('auto').join(' ')
  return (
    <div
      className={styles.board}
      style={{
        gridTemplateColumns: gridTemplate,
        gridTemplateRows: gridTemplate,
      }}>
      {rows}
    </div>
  )
}

interface BoardRowProps {
  rowIndex: number
  tiles: Tile[]
}

const BoardRow = ({ rowIndex, tiles }: BoardRowProps): JSX.Element => (<>
  {tiles.map(({ value }: Tile, i: number) => (
    <BoardTile
      key={i}
      value={value}
      rowIndex={rowIndex}
      columnIndex={i} />
  ))}
</>)

interface BoardTileProps {
  rowIndex: number
  columnIndex: number
  value: number
}

const BoardTile = ({ rowIndex, columnIndex, value }: BoardTileProps): JSX.Element => {
  const boardTileDynamicStyle: React.CSSProperties = {
    gridArea: `${rowIndex + 1} / ${columnIndex + 1} / ${rowIndex + 2} / ${columnIndex + 2}`
  }

  return (
    <div
      className={classNames(
        styles.boardTile,
        { [styles['boardTile--hasValue']]: value !== null })}
      style={boardTileDynamicStyle}>
      {value}
    </div>
  )
}

enum Basis {
  ROW = 'ROW',
  COLUMN = 'COLUMN',
}

enum Direction {
  UP = 'UP',
  DOWN = 'DOWN',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
}

interface SingleDirectionalConfig {
  start: number
  end: number
}
interface DirectionalConfig {
  basis: Basis
  rows: SingleDirectionalConfig
  columns: SingleDirectionalConfig
}

interface State {
  tiles: Tile[]
  score: number
  boardWidth: number
  canMove: boolean // cannot move if waiting to add a tile after making a move
}

const DEFAULT_BOARD_WIDTH = 4

export default class Game2048 extends React.Component<EmptyObject, State> {
  batteryAnimationInterval: number

  constructor(props: EmptyObject) {
    super(props)

    this.state = {
      tiles: this.generateInitBoard(DEFAULT_BOARD_WIDTH),
      score: 0,
      boardWidth: DEFAULT_BOARD_WIDTH,
      canMove: true,
    }
  }

  componentDidMount = (): void => {
    window.addEventListener('keydown', this.handleKeyDown)
  }

  componentWillUnmount = (): void => {
    window.removeEventListener('keydown', this.handleKeyDown)
  }

  generateInitBoard = (boardWidth: number): Tile[] => {
    const board: Tile[] = []
    const tileCount = boardWidth * boardWidth

    // generate 2 distinct random indices
    const randomIndex1 = Math.floor(Math.random() * tileCount)
    let randomIndex2 = Math.floor(Math.random() * tileCount)
    while (randomIndex1 === randomIndex2) {
      randomIndex2 = Math.floor(Math.random() * tileCount)
    }

    // generate an empty board
    for (let i = 0; i < boardWidth * boardWidth; i++) {
      board.push(new Tile())
    }

    // add the first 2 tiles
    board[randomIndex1].value = this.getTileInitValue()
    board[randomIndex2].value = this.getTileInitValue()
    return board
  }

  private addTile = (tiles: Tile[]): Tile[] => {
    const freeSpaces = tiles
      .map(({ value }: Tile, i: number) => value === null ? i : undefined)
      .filter((n: number) => n !== undefined)
    const randomIndex = freeSpaces[Math.floor(Math.random() * freeSpaces.length)]
    return [
      ...tiles.slice(0, randomIndex),
      new Tile(this.getTileInitValue()),
      ...tiles.slice(randomIndex + 1),
    ]
  }

  private getTileInitValue = (): number => Math.random() < 0.8 ? 2 : 4

  handleKeyDown = (e: KeyboardEvent): void => {
    const {
      score,
      canMove,
    } = this.state

    if (!canMove) {
      return
    }

    let moveResult
    switch (e.key) {
      case 'ArrowUp':
      case 'w': // WASD
        moveResult = this.move(Direction.UP)
        break
      case 'ArrowDown':
      case 's': // WASD
        moveResult = this.move(Direction.DOWN)
        break
      case 'ArrowLeft':
      case 'a': // WASD
        moveResult = this.move(Direction.LEFT)
        break
      case 'ArrowRight':
      case 'd': // WASD
        moveResult = this.move(Direction.RIGHT)
        break
    }

    if (moveResult) {
      const newBoard = moveResult.tiles
      this.setState({
        tiles: newBoard,
        canMove: false,
        score: score + moveResult.score,
      }, () => {
        setTimeout(() => {
          this.setState({
            tiles: this.addTile(newBoard),
            canMove: true,
          })
        }, 250);
      })
    }
  }

  move = (direction: Direction) => {
    const { tiles } = this.state
    const {
      basis,
      rows,
      columns,
    } = this.getDirectionalConfig(direction)
    const result: Tile[] = []
    let score = 0

    const getOffset = ({ start, end }: SingleDirectionalConfig) => start < end ? 1 : -1
    const rowsOffset = getOffset(rows)
    const columnsOffset = getOffset(columns)

    const loopCondition = (value: number, start: number, end: number) =>
      start < end
        ? value <= end
        : value >= end

    if (basis === Basis.COLUMN) {
      for (let column = columns.start; loopCondition(column, columns.start, columns.end); column += columnsOffset) {
        const currColumn = []
        for (let row = rows.start; loopCondition(row, rows.start, rows.end); row += rowsOffset) {
          currColumn.push(tiles[this.getBoardIndex(row, column)])
        }
        const {
          tiles: newColumn,
          score: columnScore,
        } = this.collapse(currColumn)
        score += columnScore
        let newColumnIndex = 0
        for (let row = rows.start; loopCondition(row, rows.start, rows.end); row += rowsOffset) {
          result[this.getBoardIndex(row, column)] = newColumn[newColumnIndex++]
        }
      }
    } else { // basis === Basis.ROW
      for (let row = rows.start; loopCondition(row, rows.start, rows.end); row += rowsOffset) {
        const currRow = []
        for (let column = columns.start; loopCondition(column, columns.start, columns.end); column += columnsOffset) {
          currRow.push(tiles[this.getBoardIndex(row, column)])
        }
        const {
          tiles: newRow,
          score: rowScore,
        } = this.collapse(currRow)
        score += rowScore
        let newRowIndex = 0
        for (let column = columns.start; loopCondition(column, columns.start, columns.end); column += columnsOffset) {
          result[this.getBoardIndex(row, column)] = newRow[newRowIndex++]
        }
      }
    }

    return {
      tiles: result,
      score,
    }
  }

  private getDirectionalConfig = (direction: Direction) => {
    const { boardWidth } = this.state
    const createDirectionalConfig = (start: number, end: number) =>
      ({ start, end })
    const config: { [key: string]: DirectionalConfig } = {
      [Direction.UP]: {
        basis: Basis.COLUMN,
        rows: createDirectionalConfig(0, boardWidth - 1),
        columns: createDirectionalConfig(0, boardWidth - 1),
      },
      [Direction.DOWN]: {
        basis: Basis.COLUMN,
        rows: createDirectionalConfig(boardWidth - 1, 0),
        columns: createDirectionalConfig(0, boardWidth - 1),
      },
      [Direction.LEFT]: {
        basis: Basis.ROW,
        rows: createDirectionalConfig(0, boardWidth - 1),
        columns: createDirectionalConfig(0, boardWidth - 1),
      },
      [Direction.RIGHT]: {
        basis: Basis.ROW,
        rows: createDirectionalConfig(0, boardWidth - 1),
        columns: createDirectionalConfig(boardWidth - 1, 0),
      },
    }
    return config[direction]
  }

  /*moveUp = (): Tile[] => {
    const {
      tiles,
      boardWidth,
    } = this.state
    const result: Tile[] = []
    let score = 0

    for (let column = 0; column < boardWidth; column++) {
      const currColumn = []
      for (let row = 0; row < boardWidth; row++) {
        currColumn.push(tiles[this.getBoardIndex(row, column)])
      }
      const {
        tiles: newColumn,
        score,
      } = this.collapse(currColumn)
      for (let row = 0; row < boardWidth; row++) {
        result[this.getBoardIndex(row, column)] = newColumn[row]
      }
    }

    return result
  }

  moveDown = (): Tile[] => {
    const {
      tiles,
      boardWidth,
    } = this.state
    const result: Tile[] = []
    let score = 0

    for (let column = 0; column < boardWidth; column++) {
      const currColumn = []
      for (let row = boardWidth - 1; row >= 0; row--) {
        currColumn.push(tiles[this.getBoardIndex(row, column)])
      }
      const {
        tiles: newColumn,
        score,
      } = this.collapse(currColumn)
      for (let row = boardWidth - 1; row >= 0; row--) {
        result[this.getBoardIndex(row, column)] = newColumn[boardWidth - 1 - row]
      }
    }

    return result
  }

  moveLeft = (): Tile[] => {
    const {
      tiles,
      boardWidth,
    } = this.state
    const result: Tile[] = []
    let score = 0

    for (let row = 0; row < boardWidth; row++) {
      const currRow = []
      for (let column = 0; column < boardWidth; column++) {
        currRow.push(tiles[this.getBoardIndex(row, column)])
      }
      const {
        tiles: newRow,
        score,
      } = this.collapse(currRow)
      for (let column = 0; column < boardWidth; column++) {
        result[this.getBoardIndex(row, column)] = newRow[column]
      }
    }

    return result
  }

  moveRight = (): Tile[] => {
    const {
      tiles,
      boardWidth,
    } = this.state
    const result: Tile[] = []
    let score = 0

    for (let row = 0; row < boardWidth; row++) {
      const currRow = []
      for (let column = boardWidth - 1; column >= 0; column--) {
        currRow.push(tiles[this.getBoardIndex(row, column)])
      }
      const {
        tiles: newRow,
        score,
      } = this.collapse(currRow)
      for (let column = boardWidth - 1; column >= 0; column--) {
        result[this.getBoardIndex(row, column)] = newRow[boardWidth - 1 - column]
      }
    }

    return result
  }*/

  private getBoardIndex = (row: number, column: number) => {
    const { boardWidth } = this.state
    return row * boardWidth + column
  }
  
  // precondition: array has exact length = boardWidth
  // postcondition: returned array has exact length = boardWidth
  private collapse = (rowOrColumn: Tile[]) => {
    const { boardWidth } = this.state
    const result: Tile[] = []
    let score = 0
    let prevTileWasCombo = false
    let prevTile: Tile = null

    for (let i = 0; i < rowOrColumn.length; i++) {
      const currTile = rowOrColumn[i]
      if (currTile.value !== null) {
        if (!prevTileWasCombo && prevTile && currTile.value === prevTile.value) {
          prevTile.value *= 2
          score += prevTile.value
          prevTileWasCombo = true
        } else { // if (prevTileWasCombo || !prevTile || currTile.value !== prevTile.value)
          const newTile = new Tile(currTile.value)
          result.push(newTile)
          prevTile = newTile
          prevTileWasCombo = false
        }
      }
    }

    // pad the Tile array so its length = boardWidth
    for (let i = result.length; i < boardWidth; i++) {
      result.push(new Tile())
    }

    return {
      tiles: result,
      score,
    }
  }

  render(): JSX.Element {
    document.title = '2048+'

    const {
      tiles,
      score,
      boardWidth,
    } = this.state

    return (
      <div className={styles.game2048}>
        <h1>2048</h1>
        <h4>Score: {score}</h4>
        <Board
          tiles={tiles}
          boardWidth={boardWidth} />
      </div>
    )
  }
}
