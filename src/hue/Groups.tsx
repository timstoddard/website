import classNames from 'classnames'
import * as React from 'react'
import BasicController from './BasicController'
import { calculateXY, getValueFromPoint } from './hue-color-conversion'
import { getLightColor, hexToColor, HueApi } from './hue-utils'
import Light, { LightData } from './Light'
import styles from './scss/Hue.scss'

interface Props {
  hueApi: HueApi
}

interface State {
  isOn: boolean
  brightness: number
  color: string
  selectedGroupId: number
}

const GROUP_THROTTLE_TIME_MS = 200

export default class Groups extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      isOn: false,
      brightness: 0,
      color: '',
      selectedGroupId: -1,
    }
  }

  // componentDidMount = async (): Promise<void> => {
  // }

  selectGroup = (groupId: number): (() => void) => (): void => {
    const { hueApi } = this.props
    const state = hueApi.getGroup(groupId).action
    this.setState({
      isOn: state.on,
      color: getLightColor({ state } as LightData),
      brightness: state.bri,
      selectedGroupId: groupId,
    })
  }

  toggle = async (): Promise<void> => {
    const {
      hueApi,
    } = this.props
    const {
      selectedGroupId,
    } = this.state
    const {
      isOn,
      brightness,
    } = this.state

    this.setState({ isOn: !isOn })
    await hueApi.updateGroupState(selectedGroupId, {
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
    } = this.props
    const {
      selectedGroupId,
    } = this.state
    await hueApi.updateGroupState(selectedGroupId, {
      bri: brightness,
    }, Math.floor(GROUP_THROTTLE_TIME_MS / 100))
  }

  setColor = (color: string): void => {
    this.setState({ color })
  }

  setColorThrottled = async (colorHex: string): Promise<void> => {
    const {
      hueApi,
    } = this.props
    const {
      selectedGroupId,
    } = this.state
    const selectedGroup = hueApi.getGroup(selectedGroupId)
    // TODO need to check all lights in group?
    const firstLightId = parseInt(selectedGroup.lights[0], 10)
    const firstLight = hueApi.getLight(firstLightId)
    const color = hexToColor(colorHex)
    const xy = calculateXY(color, firstLight.modelid)
    await hueApi.updateGroupState(selectedGroupId, {
      xy: getValueFromPoint(xy),
    }, Math.floor(GROUP_THROTTLE_TIME_MS / 100))
  }

  render(): JSX.Element {
    const {
      selectGroup,
      toggle,
      setBrightness,
      setBrightnessThrottled,
      setColor,
      setColorThrottled,
    } = this
    const {
      hueApi,
    } = this.props
    const {
      isOn,
      brightness,
      color,
      selectedGroupId,
    } = this.state

    const groupIds = hueApi.getGroupIds()
    const groups = hueApi.getGroups()
    const selectedGroup = hueApi.getGroup(selectedGroupId)
    const selectedGroupLightIds = hueApi.getLightIdsInGroup(selectedGroupId)
    const lights = hueApi.getLights()

    return (
      <>
        <ul className={styles.hueGroups__list}>
          {groupIds.map((groupId: number) => (
            <li
              key={groupId}
              onClick={selectGroup(groupId)}
              className={classNames(
                styles.hueGroups__listItem,
                { [styles['hueGroups__listItem--selected']]: selectedGroupId === groupId })}>
              <div>
                {groups[groupId].name}
              </div>
            </li>
          ))}
          <li
            key={0}
            onClick={selectGroup(0)}
            className={styles.hueGroups__listItem}>
            <div>
              All Lights
            </div>
            </li>
        </ul>
        {selectedGroup && (
          <div className={styles.hueGroups__detail}>
            <div
              className={styles.hueGroups__detail__controller}
              style={{ background: color }}>
              <BasicController
                hueApi={hueApi}
                name={selectedGroup.name}
                isOn={isOn}
                brightness={brightness}
                color={color}
                throttleTimeMs={GROUP_THROTTLE_TIME_MS}
                toggle={toggle}
                setBrightness={setBrightness}
                setBrightnessThrottled={setBrightnessThrottled}
                setColor={setColor}
                setColorThrottled={setColorThrottled} />
            </div>
            {selectedGroupLightIds.map((lightId: number) => (
              <Light
                key={lightId}
                hueApi={hueApi}
                lightId={lightId}
                light={lights[lightId]} />
            ))}
          </div>
        )}
      </>
    )
  }
}
