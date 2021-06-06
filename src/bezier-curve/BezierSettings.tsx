import classNames from 'classnames'
import * as React from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { CanvasDimensions } from './BezierCurve'
import CurveImpl from './CurveImpl'
import Letters, { Point } from './letters'
import styles from './scss/BezierSettings.scss'

interface Props {
  isSettingsOpen: boolean
  updateCurves: (curves: CurveImpl[]) => void
  updateMoveIntervalMs: (ms: number) => void
  updateCanvasDimensions: (canvasDimensions: CanvasDimensions) => void
  closeSettings: () => void
}

interface State {
  moveIntervalMs: number
  curveSegments: number
  sideLength: number
  lineLength: number
  horizontalLetterSpacing: number
  verticalLetterSpacing: number
  text: string
}

const ALPHABET = 'abcdefghijklmnopqrstuvwxyz'
const NUMBERS = '0123456789'
const SYMBOLS1 = `!"#$%&'()*+,-./`
const SYMBOLS2 = ':;<=>?@'
const SYMBOLS3 = '[\\]^_`'
const SYMBOLS4 = '{|}~'

const DEFAULT_MOVE_INTERVAL_MS = 25
const DEFAULT_CURVE_SEGMENTS = 100
const DEFAULT_SIDE_LENGTH = 100
const DEFAULT_LINE_LENGTH = 12
const DEFAULT_HORIZONTAL_PADDING_BETWEEN_LETTERS = 10
const DEFAULT_VERTICAL_PADDING_BETWEEN_LETTERS = 20
const DEFAULT_TEXT = [
  ALPHABET,
  NUMBERS,
  SYMBOLS1,
  SYMBOLS2,
  SYMBOLS3,
  SYMBOLS4,
].join('')

export default class BezierSettings extends React.Component<Props, State> {
  private letters: Letters

  constructor(props: Props) {
    super(props)
    
    this.state = {
      moveIntervalMs: DEFAULT_MOVE_INTERVAL_MS,
      curveSegments: DEFAULT_CURVE_SEGMENTS,
      sideLength: DEFAULT_SIDE_LENGTH,
      lineLength: DEFAULT_LINE_LENGTH,
      horizontalLetterSpacing: DEFAULT_HORIZONTAL_PADDING_BETWEEN_LETTERS,
      verticalLetterSpacing: DEFAULT_VERTICAL_PADDING_BETWEEN_LETTERS,
      text: DEFAULT_TEXT,
    }

    this.init()
  }

  private init = (): void => {
    const {
      updateCurves,
      updateCanvasDimensions,
      updateMoveIntervalMs,
    } = this.props
    const {
      sideLength,
      moveIntervalMs,
    } = this.state
    this.letters = new Letters(sideLength)
    const curves = this.getCurvesFromText()
    updateCurves(curves)
    updateCanvasDimensions(this.getCanvasDimensions())
    updateMoveIntervalMs(moveIntervalMs)
  }

  private getCurvesFromText = () => {
    const {
      curveSegments,
      sideLength,
      horizontalLetterSpacing,
      verticalLetterSpacing,
    } = this.state
    this.letters.updateSideLength(sideLength)

    return this.formatTextIntoLines()
      .map((str: string, i: number) => this.letters.convertString(
        str, i, horizontalLetterSpacing, verticalLetterSpacing))
      .reduce((prev: Point[][], curr: Point[][]) => {
        prev.push(...curr)
        return prev
      }, [])
      .map((points: Point[]) => new CurveImpl(points, curveSegments))
  }

  private getCanvasDimensions = () => {
    const {
      sideLength,
      lineLength,
      horizontalLetterSpacing,
      verticalLetterSpacing,
    } = this.state
    const linesCount = this.formatTextIntoLines().length
    const width = lineLength * (sideLength + horizontalLetterSpacing) + horizontalLetterSpacing
    const height = linesCount * (sideLength + verticalLetterSpacing) + verticalLetterSpacing
    return {
      width,
      height,
    }
  }

  private formatTextIntoLines = () => {
    const {
      lineLength,
      text,
    } = this.state
    const lines = text.split('\n')
    const result = []
    for (const line of lines) {
      for (let i = 0; i < line.length; i += lineLength) {
        const nextLine = line.substr(i, lineLength)
        result.push(nextLine)
      }
    }

    return result
  }

  private onMoveIntervalMsChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { updateMoveIntervalMs } = this.props
    const moveIntervalMs = parseInt(e.target.value, 10)
    if (!isNaN(moveIntervalMs)) {
      this.setState({ moveIntervalMs }, () => {
        updateMoveIntervalMs(moveIntervalMs)
      })
    }
  }

  private onCurveSegmentsChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { updateCurves } = this.props
    // TODO update ms at same time so total curve drawing time is same
    const curveSegments = parseInt(e.target.value, 10)
    if (!isNaN(curveSegments)) {
      this.setState({ curveSegments }, () => {
        const curves = this.getCurvesFromText()
        updateCurves(curves)
      })
    }
  }

  private onSideLengthChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const {
      updateCurves,
      updateCanvasDimensions,
    } = this.props
    const sideLength = parseInt(e.target.value, 10)
    if (!isNaN(sideLength)) {
      this.setState({ sideLength }, () => {
        const curves = this.getCurvesFromText()
        updateCurves(curves)
        updateCanvasDimensions(this.getCanvasDimensions())
      })
    }
  }

  private onLineLengthChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const {
      updateCurves,
      updateCanvasDimensions,
    } = this.props
    const lineLength = parseInt(e.target.value, 10)
    if (!isNaN(lineLength)) {
      this.setState({ lineLength }, () => {
        const curves = this.getCurvesFromText()
        updateCurves(curves)
        updateCanvasDimensions(this.getCanvasDimensions())
      })
    }
  }

  private onHorizontalLetterSpacingChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const {
      updateCurves,
      updateCanvasDimensions,
    } = this.props
    const horizontalLetterSpacing = parseInt(e.target.value, 10)
    if (!isNaN(horizontalLetterSpacing)) {
      this.setState({ horizontalLetterSpacing }, () => {
        const curves = this.getCurvesFromText()
        updateCurves(curves)
        updateCanvasDimensions(this.getCanvasDimensions())
      })
    }
  }

  private onVerticalLetterSpacingChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const {
      updateCurves,
      updateCanvasDimensions,
    } = this.props
    const verticalLetterSpacing = parseInt(e.target.value, 10)
    if (!isNaN(verticalLetterSpacing)) {
      this.setState({ verticalLetterSpacing }, () => {
        const curves = this.getCurvesFromText()
        updateCurves(curves)
        updateCanvasDimensions(this.getCanvasDimensions())
      })
    }
  }

  private onTextChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const {
      updateCurves,
      updateCanvasDimensions,
    } = this.props
    const text = e.target.value
    this.setState({ text }, () => {
      const curves = this.getCurvesFromText()
      updateCurves(curves)
      updateCanvasDimensions(this.getCanvasDimensions())
    })
  }

  render(): JSX.Element {
    const {
      onMoveIntervalMsChange,
      onCurveSegmentsChange,
      onSideLengthChange,
      onLineLengthChange,
      onHorizontalLetterSpacingChange,
      onVerticalLetterSpacingChange,
      onTextChange,
    } = this
    const {
      isSettingsOpen,
      closeSettings,
    } = this.props
    const {
      moveIntervalMs,
      curveSegments,
      sideLength,
      lineLength,
      horizontalLetterSpacing,
      verticalLetterSpacing,
      text,
    } = this.state

    return (
      <Modal
        show={isSettingsOpen}
        onHide={closeSettings}>
        <Modal.Header className={styles.settings__header}>
          <Modal.Title>Settings</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form className={styles.settings}>
            {/* moveIntervalMs */}
            <Form.Group className={classNames(
              styles.settings__control,
              styles['settings__control--slider'])}>
              <Form.Label>Curve drawing speed</Form.Label>
              <Form.Control
                type='range'
                min={2}
                max={100}
                onChange={onMoveIntervalMsChange}
                value={moveIntervalMs} />
            </Form.Group>
            {/* curveSegments */}
            <Form.Group className={classNames(
              styles.settings__control,
              styles['settings__control--slider'])}>
              <Form.Label>Curve detail</Form.Label>
              <Form.Control
                type='range'
                min={10}
                max={200}
                step={5}
                onChange={onCurveSegmentsChange}
                value={curveSegments} />
            </Form.Group>
            {/* sideLength */}
            <Form.Group className={classNames(
              styles.settings__control,
              styles['settings__control--number'])}>
              <Form.Label>Letter size</Form.Label>
              <Form.Control
                type='number'
                onChange={onSideLengthChange}
                value={sideLength} />
            </Form.Group>
            {/* lineLength */}
            <Form.Group className={classNames(
              styles.settings__control,
              styles['settings__control--number'])}>
              <Form.Label>Line wrap length</Form.Label>
              <Form.Control
                type='number'
                onChange={onLineLengthChange}
                value={lineLength} />
            </Form.Group>
            {/* horizontalLetterSpacing */}
            <Form.Group className={classNames(
              styles.settings__control,
              styles['settings__control--number'])}>
              <Form.Label>Horizontal letter padding</Form.Label>
              <Form.Control
                type='number'
                onChange={onHorizontalLetterSpacingChange}
                value={horizontalLetterSpacing} />
            </Form.Group>
            {/* verticalLetterSpacing */}
            <Form.Group className={classNames(
              styles.settings__control,
              styles['settings__control--number'])}>
              <Form.Label>Vertical letter padding</Form.Label>
              <Form.Control
                type='number'
                onChange={onVerticalLetterSpacingChange}
                value={verticalLetterSpacing} />
            </Form.Group>
            {/* text */}
            <Form.Group className={classNames(
              styles.settings__control,
              styles['settings__control--textarea'])}>
              <Form.Label>Text</Form.Label>
                <Form.Control
                  as='textarea'
                  onChange={onTextChange}
                  value={text}
                  placeholder='Leave a comment here'
                  style={{ height: '100px' }} />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant='primary'
            title='Settings'
            onClick={closeSettings}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}
