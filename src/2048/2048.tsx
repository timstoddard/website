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
}

interface State {
  tiles: Tile[]
  score: number
  boardWidth: number
}

interface BoardProps {
  tiles: Tile[]
  boardWidth: number
}

const Board = ({ tiles, boardWidth }: BoardProps): JSX.Element => {
  const rows = []
  for (let i = 0; i < boardWidth; i++) {
    const slice = tiles.slice(i * boardWidth, (i + 1) * boardWidth)
    rows.push(
      <BoardRow
        key={i}
        tiles={slice} />,
    )
  }
  return (
    <div className={styles.board}>
      {rows}
    </div>
  )
}

interface BoardGameProps {
  tiles: Tile[]
}

const BoardRow = ({ tiles }: BoardGameProps): JSX.Element => (
  <div className={styles.boardRow}>
    {tiles.map(({ value }: Tile, i: number) => (
      <BoardTile
        key={i}
        value={value} />
    ))}
  </div>
)

interface BoardTileProps {
  value: number
}

const BoardTile = ({ value }: BoardTileProps): JSX.Element => {
  if (value === null) {
    return (
      <div className={styles.boardTile}>
        {value}
      </div>
    )
  }

  return (
    <div className={classNames(
      styles.boardTile,
      styles['boardTile--hasValue'])}>
      {value}
    </div>
  )
}

export default class Game2048 extends React.Component<EmptyObject, State> {
  batteryAnimationInterval: number

  constructor(props: EmptyObject) {
    super(props)

    const boardWidth = 4
    this.state = {
      tiles: this.generateInitBoard(boardWidth),
      score: 0,
      boardWidth,
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

  addTile = (): void => {
    const { tiles } = this.state
    console.log(tiles)
    const freeSpaces = tiles
      .map(({ value }: Tile, i: number) => value === null ? i : undefined)
      .filter((n: number) => n !== undefined)
    console.log(freeSpaces)
    const newTile: Tile = { value: this.getTileInitValue() }
    const randomIndex = freeSpaces[Math.floor(Math.random() * freeSpaces.length)]
    const nextTiles = [...tiles.slice(0, randomIndex), newTile, ...tiles.slice(randomIndex + 1)]
    console.log(nextTiles)
  }

  getTileInitValue = (): number => Math.random() < 0.8 ? 2 : 4

  handleKeyDown = (e: KeyboardEvent): void => {
    // console.log(e)
    switch (e.key) {
      case 'ArrowLeft':
        console.log('left')
        break
      case 'ArrowRight':
        console.log('right')
        break
      case 'ArrowUp':
        console.log('up')
        this.moveUp()
        break
      case 'ArrowDown':
        console.log('down')
        break
    }
    this.addTile()
  }

  moveUp = (): void => {
    const {
      tiles,
      boardWidth,
    } = this.state
    const nextTiles = [...tiles]

    for (let i = 0; i < boardWidth; i++) {
      let nextFreeIndex: number
      let nextAllowableIndex = 0

      // find first free index in the lane
      for (let j = 0; j < boardWidth; j++) {
        if (nextTiles[boardWidth * j + i].value === null) {
          nextFreeIndex = j
          break
        }
      }

      // shift all tiles as far as possible
      for (let j = 1; j < boardWidth; j++) {
        const currTile = nextTiles[boardWidth * j + i]

        // if empty space, don't do anything
        if (currTile.value === null) {
          continue
        }

        // if first spot is empty
        if (nextFreeIndex === 0) {
          // move to that index
          this.moveTile(tiles, currTile, i, boardWidth * j + i)

          // increment free index
          nextFreeIndex++
        } else {
          const prevTile = nextTiles[boardWidth * (nextFreeIndex - 1) + i]
          if (prevTile.value === currTile.value) {
            // new tile with sum
            this.moveTile(tiles, new Tile(currTile.value * 2), boardWidth * (nextFreeIndex - 1) + i, boardWidth * j + i)
            // free index stays the same, but allowable index increments because we already added 2 tiles
            nextAllowableIndex++

          } else {
            // move next to prev tile

            // increment free index
            nextFreeIndex++
          }
        }
      }
    }
  }

  render(): JSX.Element {
    document.title = '2048+'

    const {
      handleKeyDown,
    } = this
    const {
      tiles,
      boardWidth,
    } = this.state

    return (
      <div className={styles.game2048}>
        <h1>2048</h1>
        <Board
          tiles={tiles}
          boardWidth={boardWidth} />
      </div>
    )
  }

  private moveTile = (tiles: Tile[], tile: Tile, newIndex: number, prevIndex: number): void => {
    tiles[newIndex] = tile
    tiles[prevIndex] = new Tile()
  }
}
