import * as React from 'react'
import BasicController from './BasicController'
import { calculateXY, getValueFromPoint } from './hue-color-conversion'
import { getLightColor, hexToColor, HueApi } from './hue-utils'
import styles from './scss/Light.scss'

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

  toggle = async () => {
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

  setColorAndBrightness = (color: string, brightness: number) => {
    this.setState({ color, brightness })
  }

  setColorAndBrightnessThrottled = async (color: string, brightness: number) => {
    const {
      hueApi,
    } = this.props
    const {
      lightId,
    } = this.props

    const light = hueApi.getLight(lightId)
    const xy = calculateXY(hexToColor(color), light.modelid)
    await hueApi.updateLightState(lightId, {
      bri: brightness,
      xy: getValueFromPoint(xy),
    }, Math.floor(LIGHT_THROTTLE_TIME_MS / 100))
  }

  render(): JSX.Element {
    const {
      toggle,
      setColorAndBrightness,
      setColorAndBrightnessThrottled,
    } = this
    const {
      light,
    } = this.props
    const {
      isOn,
      brightness,
      color,
    } = this.state

    return (
      <div
        className={styles.light}
        style={{ background: color }}>
        <BasicController
          name={light.name}
          isOn={isOn}
          brightness={brightness}
          color={color}
          toggle={toggle}
          throttleTimeMs={LIGHT_THROTTLE_TIME_MS}
          setColorAndBrightness={setColorAndBrightness}
          setColorAndBrightnessThrottled={setColorAndBrightnessThrottled}
          isPrimary={false} />
      </div>
    )
  }
}
