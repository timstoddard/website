import * as React from 'react'
import { Button, Form } from 'react-bootstrap'
import styles from './scss/StrobeOptions.scss'

interface Props {
  ms: number
  updateMs: (ms: number) => void
  hideOptions: () => void
}

interface State {
  min: number
  max: number
}

export default class StrobeOptions extends React.Component<Props, State> {
  range: HTMLInputElement

  constructor(props: Props) {
    super(props)

    this.state = {
      min: 5,
      max: 500,
    }
  }

  onRangeChange = (event: React.FormEvent): void => {
    const rawValue = (event.target as HTMLInputElement).value
    const newMs = parseInt(rawValue, 10)
    this.props.updateMs(newMs)
    event.stopPropagation()
  }

  onCloseClick = (event: React.FormEvent): void => {
    this.props.hideOptions()
    event.stopPropagation()
  }

  render(): JSX.Element {
    const {
      onRangeChange,
      onCloseClick,
    } = this
    const {
      ms,
    } = this.props
    const {
      min,
      max,
    } = this.state

    return (
      <div className={styles.options}>
        <h5 className={styles.options__title}>
          Options
        </h5>
        <Form className={styles.options__form}>
          <div className={styles.options__form__sliderWrapper}>
            <div>
              <span className={styles.options__ms}>
                {ms}
              </span>
              &nbsp;milliseconds between strobes
            </div>
            <div className={styles.options__form__slider}>
              <Form.Group controlId='strobe-ms'>
                <span className={styles['options__form--min']}>{min}</span>
                <Form.Control
                  // TODO why can't use custom element here?
                  // custom
                  type='range'
                  value={this.props.ms.toString()}
                  onChange={onRangeChange}
                  min={min}
                  max={max}
                  step='5' />
                <span className={styles['options__form--max']}>{max}</span>
              </Form.Group>
            </div>
          </div>
          <Button
            onClick={onCloseClick}
            className={styles.options__button}>
            Close
          </Button>
        </Form>
      </div>
    )
  }
}
