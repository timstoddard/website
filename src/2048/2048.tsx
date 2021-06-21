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

const BoardTile = ({
  rowIndex,
  columnIndex,
  value,
}: BoardTileProps): JSX.Element => {
  type ColorIndex = 1 | 2 | 3 | 4 | 5 | 6
  const colors: { [key in ColorIndex]: string } = {
    1: 'ff0000',
    2: 'ff8000',
    3: 'ffff00',
    4: '00ff00',
    5: '0000ff',
    6: '0000ff',
  }
  const color = colors[Math.log2(value) as ColorIndex]

  const boardTileDynamicStyle: React.CSSProperties = {
    backgroundColor: value !== null ? `#${color}` : undefined,
    gridArea: `${rowIndex + 1} / ${columnIndex + 1} / ${rowIndex + 2} / ${columnIndex + 2}`,
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
  mergeTiles: (tile1: Tile, tile2: Tile) => number
  lostGame: boolean
}

const DEFAULT_BOARD_WIDTH = 4

export default class Game2048 extends React.Component<EmptyObject, State> {
  private addTileTimeout: number

  constructor(props: EmptyObject) {
    super(props)

    this.state = this.init()
  }

  componentDidMount = (): void => {
    window.addEventListener('keydown', this.handleKeyDown)
  }

  componentWillUnmount = (): void => {
    window.removeEventListener('keydown', this.handleKeyDown)
    clearTimeout(this.addTileTimeout)
  }

  init = () => ({
    tiles: this.generateInitBoard(DEFAULT_BOARD_WIDTH),
    score: 0,
    boardWidth: DEFAULT_BOARD_WIDTH,
    canMove: true,
    mergeTiles: this.defaultMergeTiles,
    lostGame: false,
  })

  private generateInitBoard = (boardWidth: number): Tile[] => {
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

  private addTile = (): Tile[] => {
    const { tiles } = this.state
    const freeSpaces = this.getFreeSpaces(tiles)
    if (freeSpaces.length === 0) {
      return tiles
    }
    const randomIndex = freeSpaces[Math.floor(Math.random() * freeSpaces.length)]
    return [
      ...tiles.slice(0, randomIndex),
      new Tile(this.getTileInitValue()),
      ...tiles.slice(randomIndex + 1),
    ]
  }

  handleKeyDown = (e: KeyboardEvent): void => {
    const {
      tiles,
      score,
      canMove,
    } = this.state
    const keyToDirectionMap: { [key: string]: Direction } = {
      // arrow keys
      'ArrowUp': Direction.UP,
      'ArrowDown': Direction.DOWN,
      'ArrowLeft': Direction.LEFT,
      'ArrowRight': Direction.RIGHT,
      // WASD
      'w': Direction.UP,
      's': Direction.DOWN,
      'a': Direction.LEFT,
      'd': Direction.RIGHT,
    }
    const direction = keyToDirectionMap[e.key]

    if (!canMove || !direction) {
      return
    }

    const {
      newTiles,
      scoreDelta,
    } = this.move(direction)
    TESTPrintRow('before', tiles)
    TESTPrintRow('after', newTiles)

    if (this.tileArrayChanged(tiles, newTiles)) {
      const newBoard = newTiles
      this.setState({
        tiles: newBoard,
        canMove: false,
        score: score + scoreDelta,
      }, () => {
        clearTimeout(this.addTileTimeout)
        this.addTileTimeout = setTimeout(() => {
          this.setState({
            tiles: this.addTile(),
            canMove: true,
          })
        }, 250) as unknown as number
      })
    } else if (this.noMovesAvailable()) {
      this.setState({ lostGame: true })
    }
  }

  private move = (direction: Direction) => {
    const { tiles } = this.state
    const {
      basis,
      rows,
      columns,
    } = this.getDirectionalConfig(direction)
    const newTiles: Tile[] = []
    let scoreDelta = 0

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
        scoreDelta += columnScore
        let newColumnIndex = 0
        for (let row = rows.start; loopCondition(row, rows.start, rows.end); row += rowsOffset) {
          newTiles[this.getBoardIndex(row, column)] = newColumn[newColumnIndex++]
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
        scoreDelta += rowScore
        let newRowIndex = 0
        for (let column = columns.start; loopCondition(column, columns.start, columns.end); column += columnsOffset) {
          newTiles[this.getBoardIndex(row, column)] = newRow[newRowIndex++]
        }
      }
    }

    return {
      newTiles,
      scoreDelta,
    }
  }

  render(): JSX.Element {
    document.title = '2048+'

    const {
      tiles,
      score,
      boardWidth,
      lostGame,
    } = this.state

    return (
      <div className={styles.game2048}>
        <h1>2048</h1>
        <h4>Score: {score}</h4>
        {lostGame && (
          <h2>You Lose!</h2>
        )}
        <Board
          tiles={tiles}
          boardWidth={boardWidth} />
      </div>
    )
  }

  /** UTILS */

  private getDirectionalConfig = (direction: Direction) => {
    const { boardWidth } = this.state
    const createDirectionalConfig = (start: number, end: number) =>
      ({ start, end })
    const config: { [key in Direction]: DirectionalConfig } = {
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
  
  /**
   * precondition: array has exact length = boardWidth
   *
   * postcondition: returned array has exact length = boardWidth
   */
  private collapse = (rowOrColumn: Tile[]) => {
    const {
      boardWidth,
      mergeTiles,
    } = this.state
    const result: Tile[] = []
    let score = 0
    let prevTileWasCombo = false
    let prevTile: Tile = null

    for (let i = 0; i < rowOrColumn.length; i++) {
      const currTile = rowOrColumn[i]
      if (currTile.value !== null) {
        if (!prevTileWasCombo && prevTile && currTile.value === prevTile.value) {
          prevTile.value = mergeTiles(prevTile, currTile)
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

  private noMovesAvailable = () => {
    const { tiles } = this.state
    const directions: Direction[] = [
      Direction.UP,
      Direction.DOWN,
      Direction.LEFT,
      Direction.RIGHT,
    ]
    for (const direction of directions) {
      const { newTiles } = this.move(direction)
      if (this.tileArrayChanged(tiles, newTiles)) {
        return false
      }
    }
    return true
  }

  private tileArrayChanged = (tiles1: Tile[], tiles2: Tile[]) => {
    if (!tiles1
      || !tiles2
      || !tiles1.length
      || !tiles2.length
      || tiles1.length != tiles2.length) {
      return true
    }
    for (let i = 0; i < tiles1.length; i++) {
      if (tiles1[i].value !== tiles2[i].value) {
        // console.log('oops', i, tiles1[i], tiles2[i])
        return true
      }
    }
    // console.log('wow false')
    return false
  }

  private getBoardIndex = (row: number, column: number) => {
    const { boardWidth } = this.state
    return row * boardWidth + column
  }

  private defaultMergeTiles = (tile1: Tile, tile2: Tile) =>
    tile1.value + tile2.value

  private getTileInitValue = (chanceOfFirst = 0.8, value1 = 2, value2 = 4): number =>
    Math.random() < chanceOfFirst ? value1 : value2

  private getFreeSpaces = (tiles: Tile[]) =>
    tiles
      .map(({ value }: Tile, i: number) => value === null ? i : undefined)
      .filter((n: number) => n !== undefined)
}
