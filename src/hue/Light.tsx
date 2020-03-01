import * as React from 'react'
import BasicController from './BasicController'
import { calculateXY, getValueFromPoint } from './hue-color-conversion'
import { getLightColor, hexToColor, HueApi } from './hue-utils'

export interface Lights {
  [key: number]: LightData
}

export interface LightData {
  state: {
    on: boolean
    bri: number
    hue: number
    sat: number
    effect: string // TODO make more specific?
    xy: number[]
    ct: number
    alert: string // TODO make more specific?
    colormode: string // TODO make more specific?
    mode: string // TODO make more specific?
    reachable: boolean
  }
  swupdate: {
    state: string // TODO make more specific?
    lastinstall: string
  }
  type: string
  name: string
  modelid: string
  manufacturername: string
  productname: string
  capabilities: {
    certified: boolean
    control: {
      mindimlevel: number
      maxlumen: number
      colorgamuttype: string // TODO make more specific?
      colorgamut: number[][]
      ct: {
        min: number
        max: number
      }
    }
    streaming: {
      renderer: boolean
      proxy: boolean
    }
  }
  config: {
    archetype: string // TODO make more specific?
    function: string // TODO make more specific?
    direction: string // TODO make more specific?
    startup: {
      mode: string // TODO make more specific?
      configured: boolean
    }
  }
  uniqueid: string
  swversion: string
  swconfigid: string
  productid: string
}

interface Props {
  hueApi: HueApi
  lightId: number
  light: LightData
}

interface State {
  isOn: boolean
  brightness: number
  color: string
}

const LIGHT_THROTTLE_TIME_MS = 200

export default class Light extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      isOn: props.light.state.on,
      brightness: props.light.state.bri,
      color: getLightColor(props.light),
    }
  }

  // componentDidMount = (): void => {
  // }

  // componentWillUnmount = (): void => {
  // }

  toggle = async (): Promise<void> => {
    const {
      hueApi,
      lightId,
    } = this.props
    const {
      isOn,
      brightness,
    } = this.state

    this.setState({ isOn: !isOn })
    await hueApi.updateLightState(lightId, {
      on: !isOn,
      bri: brightness,
    })
  }

  setBrightness = (brightness: number): void => {
    this.setState({ brightness })
  }

  setBrightnessThrottled = async (brightness: number): Promise<void> => {
    const {
      hueApi,
      lightId,
    } = this.props
    await hueApi.updateLightState(lightId, {
      bri: brightness,
    }, Math.floor(LIGHT_THROTTLE_TIME_MS / 100))
  }

  setColor = (color: string): void => {
    this.setState({ color })
  }

  setColorThrottled = async (colorHex: string): Promise<void> => {
    const {
      hueApi,
      lightId,
      light,
    } = this.props
    const color = hexToColor(colorHex)
    const xy = calculateXY(color, light.modelid)
    await hueApi.updateLightState(lightId, {
      xy: getValueFromPoint(xy),
    }, Math.floor(LIGHT_THROTTLE_TIME_MS / 100))
  }

  render(): JSX.Element {
    const {
      toggle,
      setBrightness,
      setBrightnessThrottled,
      setColor,
      setColorThrottled,
    } = this
    const {
      hueApi,
      light,
    } = this.props
    const {
      isOn,
      brightness,
      color,
    } = this.state

    return (
      <div
        className='light'
        style={{ background: color }}>
        <BasicController
          hueApi={hueApi}
          name={light.name}
          isOn={isOn}
          brightness={brightness}
          color={color}
          toggle={toggle}
          throttleTimeMs={LIGHT_THROTTLE_TIME_MS}
          setBrightness={setBrightness}
          setBrightnessThrottled={setBrightnessThrottled}
          setColor={setColor}
          setColorThrottled={setColorThrottled} />
      </div>
    )
  }
}
