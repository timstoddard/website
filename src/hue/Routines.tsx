import classNames from 'classnames'
import * as React from 'react'
import { HueApi, stringToInt } from './hue-utils'
import { RainbowRoutine, Routine, RoutineType, StrobeRoutine } from './routine-impls'
import styles from './scss/Hue.scss'

enum ItemType {
  LIGHT,
  GROUP,
}

interface Props {
  hueApi: HueApi
}

interface State {
  currentRoutine: Routine
  selectedItemId: number
  selectedItemType: ItemType
}

export default class Routines extends React.Component<Props, State> {
  routineTimer: number

  constructor(props: Props) {
    super(props)

    this.state = {
      currentRoutine: null,
      selectedItemId: -1,
      selectedItemType: null,
    }
  }

  setRoutine = (type: RoutineType): (() => void) => (): void => {
    const { hueApi } = this.props
    let routine = null
    switch (type) {
      case RoutineType.STROBE:
        routine = new StrobeRoutine(hueApi, this.getSelectedLightIds())
        break
      case RoutineType.RAINBOW:
        routine = new RainbowRoutine(hueApi, this.getSelectedLightIds())
        break
    }

    this.pauseRoutine()

    if (routine) {
      routine.init()
    }

    this.setState({ currentRoutine: routine })
  }

  playRoutine = (): void => {
    const { currentRoutine } = this.state

    // step the routine
    currentRoutine.next()

    // set next timeout
    this.routineTimer = setTimeout(() => {
      this.playRoutine()
    }, currentRoutine.getNextTimeout()) as unknown as number
  }

  pauseRoutine = (): void => {
    clearTimeout(this.routineTimer)
  }

  restartRoutine = (): void => {
    const { currentRoutine } = this.state
    currentRoutine.init()
    this.playRoutine()
  }

  selectLight = (lightId: number): (() => void) => (): void => {
    this.setItem(lightId, ItemType.LIGHT)
  }

  selectGroup = (groupId: number): (() => void) => (): void => {
    this.setItem(groupId, ItemType.GROUP)
  }

  setItem = (itemId: number, itemType: ItemType): void => {
    const { currentRoutine } = this.state
    if (currentRoutine) {
      currentRoutine.setLightIds(this.getSelectedLightIds())
    }

    this.setState({
      selectedItemId: itemId,
      selectedItemType: itemType,
    })
  }

  getSelectedLightIds = (): number[] => {
    const {
      hueApi,
    } = this.props
    const {
      selectedItemId,
      selectedItemType,
    } = this.state
    const lightIds = []
    if (selectedItemType === ItemType.GROUP) {
      if (selectedItemId === 0) {
        // all lights
        lightIds.push(...hueApi.getLightIds())
      } else {
        const group = hueApi.getGroup(selectedItemId)
        const ids = group.lights.map(stringToInt)
        lightIds.push(...ids)
      }
    } else if (selectedItemType === ItemType.LIGHT) {
      lightIds.push(selectedItemId)
    }
    return lightIds
  }

  render(): JSX.Element {
    const {
      setRoutine,
      playRoutine,
      pauseRoutine,
      restartRoutine,
      selectLight,
      selectGroup,
    } = this
    const {
      hueApi,
    } = this.props
    const {
      currentRoutine,
      selectedItemId,
      selectedItemType,
    } = this.state

    const lights = hueApi.getLights()
    const lightIds = hueApi.getLightIds()
    const groups = hueApi.getGroups()
    const groupIds = hueApi.getGroupIds()

    return (
      <div className={styles.hueGroups}>
        <ul className={styles.hueGroups__list}>
          {groupIds.map((groupId: number) => (
            <li
              key={groupId}
              onClick={selectGroup(groupId)}
              className={classNames(
                styles.hueGroups__listItem,
                { [styles['hueGroups__listItem--selected']]: (selectedItemType === ItemType.GROUP && selectedItemId === groupId) })}>
              <div>
                {groups[groupId].name}
              </div>
            </li>
          ))}
          {lightIds.map((lightId: number) => (
            <li
              key={lightId}
              onClick={selectLight(lightId)}
              className={classNames(
                styles.hueGroups__listItem,
                { [styles['hueGroups__listItem--selected']]: (selectedItemType === ItemType.LIGHT && selectedItemId === lightId) })}>
              <div>
                {lights[lightId].name}
              </div>
            </li>
          ))}
          <li
            key={0}
            onClick={selectGroup(0)}
            className={classNames(
              styles.hueGroups__listItem,
              { [styles['hueGroups__listItem--selected']]: (selectedItemType === ItemType.LIGHT && selectedItemId === 0) })}>
            <div>
              All Lights
            </div>
          </li>
        </ul>
        {selectedItemId !== -1 && (
          <div className={styles.hueGroups__detail}>
            <div>
              <button onClick={setRoutine(RoutineType.STROBE)}>
                Strobe
              </button>
              <button onClick={setRoutine(RoutineType.RAINBOW)}>
                {/* Gayyy */}
                Rainbow
              </button>
            </div>
            {currentRoutine && (
              <div>
                <button onClick={playRoutine}>
                  Play
                </button>
                <button onClick={pauseRoutine}>
                  Pause
                </button>
                <button onClick={restartRoutine}>
                  Restart
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    )
  }
}
