import * as React from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

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
      <div className='options'>
        <h5 className='options__title'>
          Options
        </h5>
        <Form className='options__form'>
          <div className='options__form__sliderWrapper'>
            <div>
              <span className='options__ms'>
                {ms}
              </span>
              &nbsp;milliseconds between strobes
            </div>
            <div className='options__form__slider'>
              <Form.Group controlId='strobe-ms'>
                <span className='options__form--min'>{min}</span>
                <Form.Control
                  // TODO why can't use custom element here?
                  // custom
                  type='range'
                  value={this.props.ms.toString()}
                  onChange={onRangeChange}
                  min={min}
                  max={max}
                  step='5' />
                <span className='options__form--max'>{max}</span>
              </Form.Group>
            </div>
          </div>
          <Button
            onClick={onCloseClick}
            className='options__button'>
            Close
          </Button>
        </Form>
      </div>
    )
  }
}
