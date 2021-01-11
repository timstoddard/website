import * as React from 'react'
import { throttle } from 'underscore'
import { HueApi } from './hue-utils'
import styles from './scss/BasicController.scss'

interface Props {
  hueApi: HueApi
  name: string
  isOn: boolean
  brightness: number
  color: string
  throttleTimeMs: number
  toggle: () => void
  setBrightness: (brightness: number) => void
  setBrightnessThrottled: (brightness: number) => void
  setColor: (color: string) => void
  setColorThrottled: (color: string) => void
}

export default class BasicController extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props)
  }

  componentDidMount = (): void => {
    const { throttleTimeMs } = this.props
    if (throttleTimeMs < 100) {
      // tslint:disable-next-line:no-console
      console.warn(`Throttle time should be at least 100ms, found ${throttleTimeMs}ms.`)
    }
  }

  // tslint:disable:member-ordering typedef
  toggle = throttle(() => {
    this.props.toggle()
  }, this.props.throttleTimeMs)

  setBrightness = (e: React.ChangeEvent<HTMLInputElement>) => {
    const brightness = parseInt(e.target.value, 10)
    this.props.setBrightness(brightness)
    this.setBrightnessThrottled(brightness)
  }

  setBrightnessThrottled = throttle((brightness: number) => {
    this.props.setBrightnessThrottled(brightness)
  }, this.props.throttleTimeMs)

  setColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value
    this.props.setColor(color)
    this.setColorThrottled(color)
  }

  setColorThrottled = throttle((color: string) => {
    this.props.setColorThrottled(color)
  }, this.props.throttleTimeMs)
  // tslint:enable:member-ordering typedef

  render(): JSX.Element {
    const {
      toggle,
      setBrightness,
      setColor,
    } = this
    const {
      name,
      isOn,
      brightness,
      color,
    } = this.props
    const {
    } = this.state

    return (
      <div className='{styles.basicController}'>
        <h5 className={styles.basicController__name}>
          {name}
        </h5>
        <div className={styles.basicController__controls}>
          <button
            onClick={toggle}
            className={styles.basicController__toggle}>
            {isOn ? 'Turn off' : 'Turn on'}
          </button>
          {/* TODO use color picker component */}
          {/* https://casesandberg.github.io/react-color */}
          <input
            type='color'
            value={color}
            onChange={setColor}
            className='{styles.basicController__colorPicker}' />
          <input
            type='range'
            value={brightness}
            onChange={setBrightness}
            min={1}
            max={254}
            className='{styles.basicController__brightness}' />
        </div>
      </div>
    )
  }
}
