import classNames from 'classnames'
import * as React from 'react'
import BasicController from './BasicController'
import { calculateXY, getValueFromPoint } from './hue-color-conversion'
import { getGroupColor, getLightColor, hexToColor, HueApi } from './hue-utils'
import Light, { LightData } from './Light'
import styles from './scss/Hue.scss'

interface Props {
  hueApi: HueApi
}

interface State {
  isOn: boolean
  brightness: number
  color: string // in hex format
  selectedGroupId: number
}

const GROUP_THROTTLE_TIME_MS = 200
// TODO better const for "all lights"? (0? -1?)
const ALL_LIGHTS_GROUP_ID = Number.POSITIVE_INFINITY

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

  selectGroup = (groupId: number) => () => {
    let extraOptions = {}
    if (groupId !== ALL_LIGHTS_GROUP_ID) {
      const { hueApi } = this.props
      const state = hueApi.getGroup(groupId).action
      extraOptions = {
        isOn: state.on,
        color: getLightColor({ state } as LightData),
        brightness: state.bri,
      }
    }
    this.setState({
      selectedGroupId: groupId,
      ...extraOptions,
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
    await this.syncHueGroup()
  }

  setColorAndBrightness = (color: string, brightness: number): void => {
    this.setState({ color, brightness })
  }

  setColorAndBrightnessThrottled = async (color: string, brightness: number) => {
    const {
      hueApi,
    } = this.props
    const {
      selectedGroupId,
    } = this.state
    const selectedGroup = hueApi.getGroup(selectedGroupId)
    for (const lightIdString of selectedGroup.lights) {
      const lightId = parseInt(lightIdString, 10)
      const light = hueApi.getLight(lightId)
      const xy = calculateXY(hexToColor(color), light.modelid)
      // TODO use update group state somehow? (lag issue & modelid issues, tho)
      await hueApi.updateLightState(lightId, {
        bri: brightness,
        xy: getValueFromPoint(xy),
      }, Math.floor(GROUP_THROTTLE_TIME_MS / 100))
    }
    await this.syncHueGroup()
  }

  render(): JSX.Element[] {
    const {
      selectGroup,
      toggle,
      setColorAndBrightness,
      setColorAndBrightnessThrottled,
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

    const getLightKey = (lightId: number) => {
      const { name } = lights[lightId]
      const { bri, xy } = lights[lightId].state
      return `${name}-${bri}-${xy[0]}-${xy[1]}`
    }

    return [
      <ul
        key='groups1' // required bc Element[]
        className={styles.hueGroups__list}>
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
          key={ALL_LIGHTS_GROUP_ID}
          onClick={selectGroup(ALL_LIGHTS_GROUP_ID)}
          className={classNames(
            styles.hueGroups__listItem,
            { [styles['hueGroups__listItem--selected']]: selectedGroupId === ALL_LIGHTS_GROUP_ID })}>
          <div>
            All Lights
          </div>
          </li>
      </ul>,

      <div
        key='groups2' // required bc Element[]
        className={styles.hueGroups__detail}>
        {/* selected group */}
        {(selectedGroup && selectedGroupId !== ALL_LIGHTS_GROUP_ID) && [
          <div
            key='groups3' // required bc Element[]
            className={styles.hueGroups__detail__controller}
            style={{ background: color }}>
            <BasicController
              name={`Group: ${selectedGroup.name}`}
              isOn={isOn}
              brightness={brightness}
              color={color}
              throttleTimeMs={GROUP_THROTTLE_TIME_MS}
              toggle={toggle}
              setColorAndBrightness={setColorAndBrightness}
              setColorAndBrightnessThrottled={setColorAndBrightnessThrottled}
              isPrimary={true} />
          </div>,
          ...selectedGroupLightIds.map((lightId: number) => (
            <Light
              key={getLightKey(lightId)}
              hueApi={hueApi}
              lightId={lightId}
              light={lights[lightId]} />
          ))
        ]}

        {/* all lights */}
        {(selectedGroupId === ALL_LIGHTS_GROUP_ID) && (
          // TODO add "all lights" controller, like other groups
          hueApi.getLightIds().map((lightId: number) => (
            <Light
              key={getLightKey(lightId)}
              hueApi={hueApi}
              lightId={lightId}
              light={lights[lightId]} />
          )))}
      </div>
    ]
  }

  private syncHueGroup = async () => {
    const {
      hueApi,
    } = this.props
    const {
      selectedGroupId,
    } = this.state
    if (await hueApi.fetchGroups() && await hueApi.fetchLights()) {
      const selectedGroup = hueApi.getGroup(selectedGroupId)
      this.setState({
        isOn: selectedGroup.action.on,
        brightness: selectedGroup.action.bri,
        color: getGroupColor(selectedGroup),
      })
    }
  }
}
