import * as PropTypes from 'prop-types'
import * as React from 'react'

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
  static propTypes: any = {
    ms: PropTypes.number,
    updateMs: PropTypes.func,
    hideOptions: PropTypes.func,
  }

  static defaultProps: any = {
    ms: 0,
    updateMs: (): void => {},
    hideOptions: (): void => {},
  }

  range: HTMLInputElement

  constructor(props: Props) {
    super(props)

    this.state = {
      min: 5,
      max: 500,
    }
  }

  componentDidMount(): void {
    this.range.value = `${this.props.ms}`
  }

  onRangeChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const newMs = parseInt(event.target.value, 10)
    this.props.updateMs(newMs)
    event.stopPropagation()
  }

  onCloseClick = (event: React.MouseEvent<HTMLAnchorElement>): void => {
    this.props.hideOptions()
    event.stopPropagation()
  }

  render(): JSX.Element {
    const { onRangeChange, onCloseClick } = this
    const { ms } = this.props
    const { min, max } = this.state
    return (
      <div className='options'>
        <h5 className='options__title'>
          Options
        </h5>
        <div className='options__form'>
          <p className='options__form--min'>{min}</p>
          <input
            type='range'
            onChange={onRangeChange}
            min={min}
            max={max}
            step='5'
            ref={(range: HTMLInputElement): void => { this.range = range }} />
          <p className='options__form--max'>{max}</p>
        </div>
        <div>
          <span className='options__ms'>
            {ms}
          </span>
          &nbsp;milliseconds between strobes
        </div>
        <div className='options__buttonWrapper'>
          <a
            onClick={onCloseClick}
            className='options__button'>
            Close
          </a>
        </div>
      </div>
    )
  }
}
