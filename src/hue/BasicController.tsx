import * as React from 'react'
import { Button, Form } from 'react-bootstrap'
import { ChromePicker, ColorResult } from 'react-color'
import { throttle } from 'underscore'
import { UIColor } from './hue-color-conversion'
import { colorToHex, hexToColor } from './hue-utils'
import styles from './scss/BasicController.scss'

interface Props {
  name: string
  isOn: boolean
  brightness: number
  color: string
  throttleTimeMs: number
  toggle: () => void
  setColorAndBrightness: (color: string, brightness: number) => void
  setColorAndBrightnessThrottled: (color: string, brightness: number) => void
  isPrimary: boolean
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

  onColorChange = (colorResult: ColorResult) => {
    // console.log(colorResult)
    const color = colorToHex(new UIColor(colorResult.rgb.r, colorResult.rgb.g, colorResult.rgb.b))
    const brightness = Math.floor(colorResult.rgb.a * 254)
    this.props.setColorAndBrightness(color, brightness)
    this.setColorAndBrightnessThrottled(color, brightness)
  }

  setColorAndBrightnessThrottled = throttle((color: string, brightness: number) => {
    this.props.setColorAndBrightnessThrottled(color, brightness)
  }, this.props.throttleTimeMs)
  // tslint:enable:member-ordering typedef

  render(): JSX.Element {
    const {
      toggle,
      onColorChange,
    } = this
    const {
      name,
      isOn,
      brightness,
      color,
      isPrimary,
    } = this.props
    const {
    } = this.state

    const getColorForChromePicker = () => {
      const rgb = hexToColor(color)
      return {
        r: rgb.r,
        g: rgb.g,
        b: rgb.b,
        a: parseFloat((brightness / 254).toFixed(2)),
      }
    }

    return (
      <Form className={styles.basicController}>
        <div className={styles.basicController__titleRow}>
          {isPrimary && (<h1>{name}</h1>)}
          {!isPrimary && (<h3>{name}</h3>)}
          <div>
            <Button
              onClick={toggle}
              variant='primary'>
              {isOn ? 'Turn off' : 'Turn on'}
            </Button>
          </div>
        </div>
        <ChromePicker
          color={getColorForChromePicker()}
          onChange={onColorChange}
          className={styles.basicController__colorPicker} />
      </Form>
    )
  }
}
