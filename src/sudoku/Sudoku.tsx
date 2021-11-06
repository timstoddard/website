import classNames from 'classnames'
import * as React from 'react'
import { EmptyObject } from '../types'
import styles from './scss/Sudoku.scss'

const TEST_INPUT_BOARD = `
  xx486xx3x
  xx1xxxx9x
  8xxxx9x6x
  5xx2x6xx1
  x27xx1xxx
  xxxx43xx6
  x5xxxxxxx
  xx9xxx4xx
  xxx4xxx15
`

const TEST_INPUT_BOARD_2 = `
  53xx7xxxx
  6xx195xxx
  x98xxxx6x
  8xxx6xxx3
  4xx8x3xx1
  7xxx2xxx6
  x6xxxx28x
  xxx419xx5
  xxxx8xx79
`

const isValidNumber = (n: number) => {
  for (const validNumber of ALL_VALID_NUMBERS()) {
    if (n === validNumber) {
      return true
    }
  }
  return false
}

const ALL_VALID_NUMBERS = () => [1, 2, 3, 4, 5, 6, 7, 8, 9]

interface SudokuTileNote {
  n: number
  isManualInput: boolean
  canBeDeleted: boolean
}

type SudokuTileNotes = Set<SudokuTileNote>

enum SudokuTileStatusName {
  SINGLE_NOTE = 'SINGLE_NOTE',
  COMBO_DOUBLE = 'COMBO_DOUBLE',
  COMBO_TRIPLE = 'COMBO_TRIPLE',
  COMBO_QUADRUPLE = 'COMBO_QUADRUPLE',
  INVALID_MOVE = 'INVALID_MOVE',
}

enum SudokuTileStatusType {
  ROW = 'ROW',
  COLUMN = 'COLUMN',
  MINI_GRID = 'MINI_GRID',
}

interface SudokuTileStatus {
  name: SudokuTileStatusName
  type: SudokuTileStatusType
}

interface SudokuTileBasicProps {
  n: number
  locked: boolean
  notes: SudokuTileNotes
  rowIndex: number
  columnIndex: number
  status: SudokuTileStatus
}

interface SudokuTileProps extends SudokuTileBasicProps {
  selectedRowIndex: number
  selectedColumnIndex: number
  onClick: () => void
}

// TODO is this type needed? a whole interface for just 1 property...
interface SudokuBoard {
  rows: SudokuTileBasicProps[][]
}

const notesHasN = (notes: SudokuTileNotes, n: number) => {
  for (const note of notes) {
    if (note.n === n) {
      return true
    }
  }
  return false
}

const notesGetN = (notes: SudokuTileNotes, n: number) => {
  for (const note of notes) {
    if (note.n === n) {
      return note
    }
  }
}

const notesDeleteN = (notes: SudokuTileNotes, n: number) => {
  for (const note of notes) {
    if (note.n === n) {
      notes.delete(note)
      return
    }
  }
}

const SudokuTile = ({
  n,
  notes,
  status,
  rowIndex,
  columnIndex,
  selectedRowIndex,
  selectedColumnIndex,
  onClick,
}: SudokuTileProps): JSX.Element => {
  const formattedNotes = (notes: SudokuTileNotes) => {
    const noteElements: JSX.Element[] = []
    ALL_VALID_NUMBERS().forEach(n => {
      if (notesHasN(notes, n)) {
        noteElements.push(
          <div
            key={n}
            className={classNames(
            styles.sudoku__board__tile__notes__tile,
            (styles as any)[`sudoku__board__tile__notes__tile--${n}`])}>
            {n}
          </div>)
      }
    })
    return (
      <div className={styles.sudoku__board__tile__notes}>
        {noteElements}
      </div>
    )
  }
  const NORMAL_BORDER = '1px solid gray'
  const BOLD_BORDER = '2px solid black'
  const SELECTED_BORDER = '2px solid red'
  const SELECTED_BACKGROUND = 'rgba(0,255,255,0.5)'
  const SELECTED_TEXT_COLOR = 'black'
  const SELECTED_NEIGHBORS_STYLE = 'rgba(150,150,150,0.5)'
  const SELECTED_NEIGHBORS_SECONDARY_STYLE = 'rgba(200,200,200,0.5)'
  const NONSELECTED_TEXT_COLOR = 'gray'
  const SINGLE_NOTE_BACKGROUND = 'rgba(0,255,0,0.8)'
  const COMBO_DOUBLE_BACKGROUND = 'pink'
  const COMBO_TRIPLE_BACKGROUND = 'orange'
  const COMBO_QUADRUPLE_BACKGROUND = 'yellow'
  const tileStyle: React.CSSProperties = {
    borderTop: rowIndex === 0 ? BOLD_BORDER : undefined,
    borderLeft: columnIndex === 0 ? BOLD_BORDER : undefined,
    borderBottom: rowIndex % 3 === 2 ? BOLD_BORDER : NORMAL_BORDER,
    borderRight: columnIndex % 3 === 2 ? BOLD_BORDER : NORMAL_BORDER,
  }

  if (selectedRowIndex !== NO_SELECTION && selectedColumnIndex !== NO_SELECTION) {
    // TODO should this logic just add classes instead?

    // deselect all tiles
    tileStyle.color = NONSELECTED_TEXT_COLOR
  
    // highlight 3x3 grid containing selected tile
    const rowMiniGridIndex = Math.floor(rowIndex / 3)
    const columnMiniGridIndex = Math.floor(columnIndex / 3)
    const selectedRowMiniGridIndex = Math.floor(selectedRowIndex / 3)
    const selectedColumnMiniGridIndex = Math.floor(selectedColumnIndex / 3)
    if (rowMiniGridIndex === selectedRowMiniGridIndex &&
      columnMiniGridIndex === selectedColumnMiniGridIndex) {
      tileStyle.backgroundColor = SELECTED_NEIGHBORS_SECONDARY_STYLE
      tileStyle.color = SELECTED_TEXT_COLOR
    }
  
    // highlight row containing selected tile
    if (rowIndex === selectedRowIndex) {
      tileStyle.backgroundColor = SELECTED_NEIGHBORS_STYLE
      tileStyle.borderBottom = SELECTED_BORDER
      tileStyle.color = SELECTED_TEXT_COLOR
      if (selectedRowIndex === 0) {
        tileStyle.borderTop = SELECTED_BORDER
      }
    } else if (rowIndex === selectedRowIndex - 1) {
      tileStyle.borderBottom = SELECTED_BORDER
    }
  
    // highlight column containing selected tile
    if (columnIndex === selectedColumnIndex) {
      tileStyle.backgroundColor = SELECTED_NEIGHBORS_STYLE
      tileStyle.borderRight = SELECTED_BORDER
      tileStyle.color = SELECTED_TEXT_COLOR
      if (selectedColumnIndex === 0) {
        tileStyle.borderLeft = SELECTED_BORDER
      }
    } else if (columnIndex === selectedColumnIndex - 1) {
      tileStyle.borderRight = SELECTED_BORDER
    }
  }

  // highlight special status tiles
  if (status.name === SudokuTileStatusName.SINGLE_NOTE) {
    tileStyle.backgroundColor = SINGLE_NOTE_BACKGROUND
  } else if (status.name === SudokuTileStatusName.COMBO_DOUBLE) {
    tileStyle.backgroundColor = COMBO_DOUBLE_BACKGROUND
  } else if (status.name === SudokuTileStatusName.COMBO_TRIPLE) {
    tileStyle.backgroundColor = COMBO_TRIPLE_BACKGROUND
  } else if (status.name === SudokuTileStatusName.COMBO_QUADRUPLE) {
    tileStyle.backgroundColor = COMBO_QUADRUPLE_BACKGROUND
  }

  // highlight selected tile
  const isSelectedTile = rowIndex === selectedRowIndex && columnIndex === selectedColumnIndex
  if (isSelectedTile) {
    tileStyle.backgroundColor = SELECTED_BACKGROUND
    tileStyle.borderBottom = SELECTED_BORDER
    tileStyle.borderRight = SELECTED_BORDER
    tileStyle.color = SELECTED_TEXT_COLOR
  }

  // set numbers equal to the selected number in bold
  // TODO

  return (
    <div
      onClick={onClick}
      className={styles.sudoku__board__tile}
      style={tileStyle}>
      {isValidNumber(n) ? n : formattedNotes(notes)}
    </div>
  )
}

const NO_SELECTION = -1

interface State {
  board: SudokuBoard
  isEditing: boolean
  selectedRowIndex: number
  selectedColumnIndex: number
}

export default class Sudoku extends React.Component<EmptyObject, State> {
  constructor(props: EmptyObject) {
    super(props)

    this.state = {
      board: this.generateBoard(),
      isEditing: false,
      selectedRowIndex: NO_SELECTION,
      selectedColumnIndex: NO_SELECTION,
    }
  }

  componentDidMount = (): void => {
    window.addEventListener('keydown', this.handleKeyDown)
  }

  componentWillUnmount = (): void => {
    window.removeEventListener('keydown', this.handleKeyDown)
  }

  selectTile = (rowIndex: number, columnIndex: number) => () => {
    const {
      selectedRowIndex,
      selectedColumnIndex,
    } = this.state
    if (rowIndex === selectedRowIndex && columnIndex === selectedColumnIndex) {
      // deselect if already selected
      this.setState({
        selectedRowIndex: NO_SELECTION,
        selectedColumnIndex: NO_SELECTION,
      })
    } else {
      // select the specified tile
      this.setState({
        selectedRowIndex: rowIndex,
        selectedColumnIndex: columnIndex,
      })
    }
  }

  handleKeyDown = (e: KeyboardEvent): void => {
    switch(e.key) {
      case 'e':
        this.toggleEditMode()
        break
      case 'l':
        this.getBoardInput()
        break
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        const { isEditing } = this.state
        const n = parseInt(e.key, 10)
        if (isEditing) {
          this.toggleNote(n, true)
        } else {
          this.setSelectedTile(n)
        }
        break
      case 'Backspace':
      case 'Delete':
        this.unsetSelectedTile()
        break
    }
  }

  generateNotes = (rows: SudokuTileBasicProps[][]) => {
    const getInitialNotes = (existingNotes: SudokuTileNotes = new Set()) => {
      const validNumbers = ALL_VALID_NUMBERS()
      const result: SudokuTileNotes = new Set()
      for (const n of validNumbers) {
        const existingNote = notesGetN(existingNotes, n)
        result.add({
          n,
          isManualInput: existingNote ? existingNote.isManualInput : false,
          canBeDeleted: false,
        })
      }
      return result
    }
    const newRows = rows.map((row, rowIndex) =>
      row.map((tile, columnIndex) => {
        if (isValidNumber(tile.n)) {
          return Object.assign({}, tile, { status: {
            name: null,
            type: null,
          } })
        }

        const notes = getInitialNotes(tile.notes)
        let status: SudokuTileStatus = {
          name: null,
          type: null,
        }
        
        // check mini grid
        const rowMiniGridIndex = Math.floor(rowIndex / 3)
        const columnMiniGridIndex = Math.floor(columnIndex / 3)
        for (let i = rowMiniGridIndex * 3; i < (rowMiniGridIndex + 1) * 3; i++) {
          for (let j = columnMiniGridIndex * 3; j < (columnMiniGridIndex + 1) * 3; j++) {
            const tile = rows[i][j]
            if (isValidNumber(tile.n)) {
              notesDeleteN(notes, tile.n)
            }
          }
        }

        // check same row
        for (let i = 0; i < ALL_VALID_NUMBERS().length; i++) {
          const tile = rows[rowIndex][i]
          if (isValidNumber(tile.n)) {
            notesDeleteN(notes, tile.n)
          }
        }

        // check same column
        for (let i = 0; i < ALL_VALID_NUMBERS().length; i++) {
          const tile = rows[i][columnIndex]
          if (isValidNumber(tile.n)) {
            notesDeleteN(notes, tile.n)
          }
        }

        /* BASIC LOGIC DONE ABOVE, EXTRA CLEAN UPS BELOW */

        // check for single note in a square
        const hasSingleNote = notes.size === 1
        if (hasSingleNote) {
          status = {
            name: SudokuTileStatusName.SINGLE_NOTE,
            type: null,
          }
        }

        return Object.assign({}, tile, { notes, status })
      }))

    // check for any invalid moves
    this.markInvalidTiles(newRows)
    
    // update tiles that are in a combo to have different background colors
    const updateComboTileStatus = (
      multiTileCombo: SudokuTileBasicProps[],
      statusName: SudokuTileStatusName,
      statusType: SudokuTileStatusType,
    ) => {
      for (const tileInCombo of multiTileCombo) {
        const tile = newRows[tileInCombo.rowIndex][tileInCombo.columnIndex]
        if (tile.status.name !== SudokuTileStatusName.INVALID_MOVE)
        tile.status = {
          name: statusName,
          type: statusType,
        }
      }
    }
    const updateComboTiles = (resultOfType: SudokuTileBasicProps[][], statusType: SudokuTileStatusType) => {
      for (const multiTileCombo of resultOfType) {
        console.log('combo', multiTileCombo)
        if (multiTileCombo.length === 2) {
          updateComboTileStatus(multiTileCombo, SudokuTileStatusName.COMBO_DOUBLE, statusType)
        } else if (multiTileCombo.length === 3) {
          updateComboTileStatus(multiTileCombo, SudokuTileStatusName.COMBO_TRIPLE, statusType)
        } else if (multiTileCombo.length === 4) {
          updateComboTileStatus(multiTileCombo, SudokuTileStatusName.COMBO_QUADRUPLE, statusType)
        }
      }
    }
    const {
      rowResult,
      columnResult,
      miniGridResult,
    } = this.findAllMultiTileCombos(newRows)
    updateComboTiles(rowResult, SudokuTileStatusType.ROW)
    updateComboTiles(columnResult, SudokuTileStatusType.COLUMN)
    updateComboTiles(miniGridResult, SudokuTileStatusType.MINI_GRID)

    // update all tile notes based on notes combos
    this.updateNotesBasedOnCombos(newRows)

    // TODO check for any notes that are the last remaining for that n in their
    // row/column/mini-grid

    return newRows
  }

  getBoardInput = () => {
    const boardString = prompt(`Please enter the sudoku board, numbers only.\nUse 'x' for empty spaces.`)
    const boardStringFormatted = boardString.replace(/\s+/g, '')
    const boardStringRegex = /[1-9x]{81}/
    if (!boardStringRegex.test(boardStringFormatted)) {
      const shouldTryAgain = confirm('Incorrect board format.\nPlease check your input and try again.')
      if (shouldTryAgain) {
        this.getBoardInput()
      }
    }
    this.setState({ board: this.generateBoard(boardString) })
  }

  generateBoard = (boardString = TEST_INPUT_BOARD): SudokuBoard => {
    let rows = this.generateBoardFromBoardString(boardString).map((row, rowIndex) =>
      row.map((n, columnIndex) => ({
        n,
        locked: isValidNumber(n),
        notes: new Set<SudokuTileNote>(),
        rowIndex,
        columnIndex,
        status: {
          name: null,
          type: null,
        },
      })))
    rows = this.generateNotes(rows)
    return { rows }
  }

  generateBoardFromBoardString = (boardString: string) => {
    const boardStringFormatted = boardString.replace(/\s+/g, '')
    const rows = []
    for (let i = 0; i < ALL_VALID_NUMBERS().length; i++) {
      rows.push(boardStringFormatted.substr(i * ALL_VALID_NUMBERS().length, 9))
    }
    return rows.map(row => row.split('').map(n => parseInt(n, 10) || 0))
  }

  render(): JSX.Element {
    document.title = 'Sudoku++'
    const {
      selectTile,
    } = this
    const {
      board,
      isEditing,
      selectedRowIndex,
      selectedColumnIndex,
    } = this.state
    console.log('board', board)

    const generateTiles = (rows: SudokuTileBasicProps[][]) => {
      const tiles = []
      for (const row of rows) {
        for (const tile of row) {
          tiles.push(
            <SudokuTile
              key={`${tile.n}-${tile.rowIndex}-${tile.columnIndex}`}
              n={tile.n}
              locked={tile.locked}
              notes={tile.notes}
              status={tile.status}
              rowIndex={tile.rowIndex}
              columnIndex={tile.columnIndex}
              selectedRowIndex={selectedRowIndex}
              selectedColumnIndex={selectedColumnIndex}
              onClick={selectTile(tile.rowIndex, tile.columnIndex)} />)
        }
      }
      return tiles
    }

    return (
      <div className={styles.sudoku}>
        <h3 className={styles.sudoku__title}>
          Sudoku++
        </h3>
        <ul className={styles.sudoku__subtitle}>
          <div>Click on a square to select it. Use the number keys to input numbers.</div>
          <div>Press Backspace/Delete to clear a selected tile.</div>
          <div>Press e to turn note edit mode {isEditing ? 'off' : 'on'}.</div>
          <div>Press l to load a new board.</div>
        </ul>
        <div className={styles.sudoku__board}>
          {generateTiles(board.rows)}
        </div>
      </div>
    )
  }

  private markInvalidTiles = (rows: SudokuTileBasicProps[][]) => {
    // TODO
    
    // check rows

    // check columns

    // check mini grids
  }

  private updateNotesBasedOnCombos = (rows: SudokuTileBasicProps[][]) => {
    // TODO
    
    // check rows

    // check columns

    // check mini grids
  }

  private findAllMultiTileCombos = (rows: SudokuTileBasicProps[][]) => {
    const generateCombinations = (
      input: SudokuTileBasicProps[],
      includedTiles: SudokuTileBasicProps[] = [],
      notesCombination: Set<number> = new Set(),
    ): SudokuTileBasicProps[][] => {
      // base case: input is empty
      if (input.length === 0) {
        const foundValidCombination = includedTiles.length === notesCombination.size
          && includedTiles.length > 0
        // if (foundValidCombination) {
        //   console.log(includedTiles.length, notesCombination.size, includedTiles, notesCombination)
        // }
        return foundValidCombination
          ? [includedTiles]
          : []
      }
    
      // recursive case: remove first input, try adding and not adding it to result set
      const inputCopy = [...input]
      const nextTile = inputCopy.shift()
      const newNotes = [...nextTile.notes].map(({ n }) => n)
      const withNextTile = generateCombinations(
        inputCopy,
        [...includedTiles, nextTile],
        new Set([...notesCombination, ...newNotes]))
      const withoutNextTile = generateCombinations(
        inputCopy,
        [...includedTiles],
        new Set([...notesCombination]))
      return [...withNextTile, ...withoutNextTile]
    }

    const removeDuplicateOrSupersetTileCombos = (combos: SudokuTileBasicProps[][]) => {
      if (combos.length === 0) {
        return []
      }

      // precondition: arg 1 must be shorter than or equal length of arg 2
      const comboIsDuplicateOrSuperset = (
        smallerCombo: SudokuTileBasicProps[],
        largerCombo: SudokuTileBasicProps[],
      ) => {
        let overlappingTileCount = 0
        for (const tile of smallerCombo) {
          for (const otherTile of largerCombo) {
            if (tile.rowIndex === otherTile.rowIndex && tile.columnIndex === otherTile.columnIndex) {
              overlappingTileCount++
              break
            }
          }
        }

        console.log('overlapping tiles:',
          overlappingTileCount,
          this.displayTilesRowAndColumn(smallerCombo),
          this.displayTilesRowAndColumn(largerCombo))
        if (overlappingTileCount === 0) {
          // completely unique combo
          return false
        } else if (overlappingTileCount < smallerCombo.length) {
          // only some of the tiles overlap. larger combo is not a superset of smaller
          // TODO add some sort of indicator that this is an overlapping combo. or, don't show the larger one (return true)
          console.log('found overlapping combo...', smallerCombo, largerCombo)
          return false
        } else { // overlappingTileCount === smallerCombo.length
          // larger combo is a superset (or duplicate if same length)
          return true
        }
      }

      const result = []
      combos.sort((a, b) => a.length - b.length)
      result.push(combos[0])

      for (let i = 1; i < combos.length; i++) {
        let shouldAdd = true
        for (const existingResults of result) {
          if (comboIsDuplicateOrSuperset(existingResults, combos[i])) {
            // found duplicate/superset, ignore it
            shouldAdd = false
            break
          }
        }
        if (shouldAdd) {
          result.push(combos[i])
        }
      }

      return result
    }

    const findMultiTileCombo = (tiles: SudokuTileBasicProps[]): SudokuTileBasicProps[][] =>
      generateCombinations(tiles)
        .filter(tileCombo => tileCombo.length >= 2 && tileCombo.length <= 4)

    const rowResult: SudokuTileBasicProps[][] = []
    const columnResult: SudokuTileBasicProps[][] = []
    const miniGridResult: SudokuTileBasicProps[][] = []

    // check rows
    for (let i = 0; i < rows.length; i++) {
      const tilesToCheck = []
      for (let j = 0; j < rows[0].length; j++) {
        const tile = rows[i][j]
        if (!isValidNumber(tile.n) && !tile.status?.name) {
          tilesToCheck.push(tile)
        }
      }
      rowResult.push(...findMultiTileCombo(tilesToCheck))
    }

    // check columns
    for (let i = 0; i < rows.length; i++) {
      const tilesToCheck = []
      for (let j = 0; j < rows[0].length; j++) {
        const tile = rows[j][i]
        if (!isValidNumber(tile.n) && !tile.status?.name) {
          tilesToCheck.push(tile)
        }
      }
      columnResult.push(...findMultiTileCombo(tilesToCheck))
    }

    // check mini grids
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const baseRowIndex = i * 3
        const baseColumnIndex = j * 3
        const tilesToCheck = []
        for (let rowIndex = baseRowIndex; rowIndex < baseRowIndex + 3; rowIndex++) {
          for (let columnIndex = baseColumnIndex; columnIndex < baseColumnIndex + 3; columnIndex++) {
            const tile = rows[rowIndex][columnIndex]
            if (!isValidNumber(tile.n) && !tile.status?.name) {
              tilesToCheck.push(tile)
            }
          }
        }
        miniGridResult.push(...findMultiTileCombo(tilesToCheck))
      }
    }

    console.log('before',
      rowResult.map(this.displayTilesRowAndColumn),
      columnResult.map(this.displayTilesRowAndColumn),
      miniGridResult.map(this.displayTilesRowAndColumn))
    const rowsDeduped = removeDuplicateOrSupersetTileCombos(rowResult)
    const columnsDeduped = removeDuplicateOrSupersetTileCombos(columnResult)
    const miniGridsDeduped = removeDuplicateOrSupersetTileCombos(miniGridResult)
    console.log('after',
      rowsDeduped.map(this.displayTilesRowAndColumn),
      columnsDeduped.map(this.displayTilesRowAndColumn),
      miniGridsDeduped.map(this.displayTilesRowAndColumn))

    return {
      rowResult: rowsDeduped,
      columnResult: columnsDeduped,
      miniGridResult: miniGridsDeduped,
    }
  }

  private setSelectedTile = (n: number) => {
    const {
      board,
      selectedRowIndex,
      selectedColumnIndex,
    } = this.state
    const selectedTile = board.rows[selectedRowIndex][selectedColumnIndex]
    if (!selectedTile.locked) {
      const newRows = this.generateBoardCopy()
      const tile = newRows[selectedRowIndex][selectedColumnIndex]
      tile.n = n
      tile.status = {
        name: null,
        type: null,
      }
      this.setState({ board: { rows: this.generateNotes(newRows) } })
    }
  }

  private unsetSelectedTile = () => {
    const {
      selectedRowIndex,
      selectedColumnIndex,
    } = this.state
    const newRows = this.generateBoardCopy()
    const tile = newRows[selectedRowIndex][selectedColumnIndex]
    // only remove value if number is not part of the initial board
    if (!tile.locked) {
      tile.n = 0
      tile.status = {
        name: null,
        type: null,
      }
      this.setState({ board: { rows: this.generateNotes(newRows) } })
    }
  }

  private toggleEditMode = () => {
    const { isEditing } = this.state
    this.setState({ isEditing: !isEditing })
  }

  private toggleNote = (n: number, isManual = false) => {
    const {
      selectedRowIndex,
      selectedColumnIndex,
    } = this.state
    const newRows = this.generateBoardCopy()
    const { notes } = newRows[selectedRowIndex][selectedColumnIndex]
    if (notesHasN(notes, n)) {
      notesDeleteN(notes, n)
    } else {
      notes.add({
        n,
        isManualInput: isManual,
        canBeDeleted: false,
      })
    }
    this.setState({ board: { rows: newRows } })
  }

  // helper function, might delete later
  private displayTilesRowAndColumn = (tiles: SudokuTileBasicProps[]) => {
    const x = tiles.map(({ rowIndex, columnIndex }) => `(${rowIndex},${columnIndex})`)
    return `*[ ${x.join(' ')} ]*`
  }

  private generateBoardCopy = () => {
    const { board } = this.state
    return board.rows.map(row => row.map(tile => Object.assign({}, tile)))
  }
}
