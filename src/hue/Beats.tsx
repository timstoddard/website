import classNames from 'classnames'
import * as React from 'react'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import FormControl from 'react-bootstrap/FormControl'
import InputGroup from 'react-bootstrap/InputGroup'
import ListGroup from 'react-bootstrap/ListGroup'
import Modal from 'react-bootstrap/Modal'
import { LightState, MsStep } from './beats/beat-types'
import BeatCanvas from './beats/BeatCanvas'
import beezInTheTrap from './beats/songs/beez-in-the-trap'
import bitingDown from './beats/songs/biting-down'
import easySwitchScreens from './beats/songs/easy-switch-screens'
import mercy from './beats/songs/mercy'
import { calculateXY, getValueFromPoint, UIColor } from './hue-color-conversion'
import { HueApi, mergeSort } from './hue-utils'
import { LightData } from './Light'
import styles from './scss/Hue.scss'

interface BeatLightProps {
  id: number
  on: boolean
  color: UIColor
  brightness: number
}

const formatBgColor = (c: UIColor): string => c
  ? `rgb(${c.r},${c.g},${c.b})`
  : 'black'
const formatBrightness = (brightness: number): number => brightness
  ? brightness / 100
  : 100
const BeatLight = ({ id, on, color, brightness }: BeatLightProps): JSX.Element => (
  <div
    className={classNames(
      styles.beatLight,
      { [styles['beatLight--off']]: !on })}
    style={{
      background: formatBgColor(color),
      opacity: formatBrightness(brightness),
    }}>
    Light track {id}
  </div>
)

interface LightTracksSettingsProps {
  hueApi: HueApi
  song: MsStep[]
  updateLightIdToLightTrackMap: (map: { [key: number]: number }) => void
  lightIdToLightTrackMap: { [key: number]: number }
}

class LightTracksSettings extends React.Component<LightTracksSettingsProps, {}> {
  constructor(props: LightTracksSettingsProps) {
    super(props)
  }

  handleChange = (lightId: number, trackId: number) => {
    const {
      updateLightIdToLightTrackMap,
      lightIdToLightTrackMap,
    } = this.props
    const newTempLightIdToLightTrackMap = Object.assign({},
      lightIdToLightTrackMap, { [lightId]: trackId })
    updateLightIdToLightTrackMap(Object.assign({}, newTempLightIdToLightTrackMap))
  }

  render(): JSX.Element {
    const {
      handleChange,
    } = this
    const {
      hueApi,
      lightIdToLightTrackMap,
    } = this.props
    const allLights = hueApi.getLights()

    const getLightTracks = () => { // TODO pass by props? or?
      const LIGHT_TRACK_COUNT = 2
      const list = []
      for (let trackId = 0; trackId < LIGHT_TRACK_COUNT; trackId++) {
        list.push(trackId)
      }
      return list
    }

    return (
      <div className={styles.lightTracksSettings}>
        <ul>
          {getLightTracks().map((trackId: number) => (
            <li key={trackId}>
            <div>Light Track {trackId + 1}</div>
            <ButtonGroup aria-label={`Light IDs for Light Track ${trackId + 1}`}>
              {hueApi.getLightIds().map((lightId: number) => (
                <Button
                  key={lightId}
                  variant={lightIdToLightTrackMap[lightId] === trackId ? 'primary' : 'secondary'}
                  onClick={() => handleChange(lightId, trackId)}
                  className={styles.lightTracksSettings__lightIdButton}>
                  {lightId}
                </Button>
              ))}
            </ButtonGroup>
          </li>
          ))}
        </ul>
        <div>
          <ListGroup>
            {hueApi.getLightIds().map((lightId: number) => (
              <ListGroup.Item>
                {lightId}: {allLights[lightId].name}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      </div>
    )
  }
}

const DEFAULT_HUE_LATENCY_MS = 100 // TODO make this a setting

/**
 * Set light color.
 *
 * @param c color to set light to
 * @param light data for light to set
 */
const colorSetting = (c: UIColor, light: LightData): any => {
  const modelId = light ? light.modelid : null // TODO make this more robust?
  const xy = calculateXY(c, modelId)
  return { xy: getValueFromPoint(xy) }
}

/**
 * Set light brightness.
 *
 * @param percent must be in range 1 to 100 (inclusive)
 */
const brightnessSetting = (percent: number): any => {
  const bri = Math.round(percent / 100 * 254)
  return { bri }
}

interface SongData {
  id: number
  name: string
  artist: string
}

interface Props {
  hueApi: HueApi
}

interface State {
  songId: number
  lights: LightState[]
  startTimeMs: number
  currentMs: number
  shouldUpdateHueLights: boolean
  lightIdToLightTrackMap: { [key: number]: number }
  areLightsFullScreen: boolean
  hueLatencyMs: number
  sortedSong: MsStep[]
}

export default class Beats extends React.Component<Props, State> {
  private beatTimers: number[]
  private songs: { [key: number]: MsStep[] } = {
    1: mercy,
    2: easySwitchScreens,
    3: bitingDown,
    4: beezInTheTrap,
  }
  private beatCanvasRef: React.RefObject<BeatCanvas> = React.createRef()

  constructor(props: Props) {
    super(props)

    const DEFAULT_SONG_ID = 4 // beez

    this.state = {
      songId: DEFAULT_SONG_ID,
      lights: [],
      startTimeMs: 0,
      currentMs: 0,
      shouldUpdateHueLights: false,
      lightIdToLightTrackMap: {
        4: 0,
        6: 1,
      },
      areLightsFullScreen: false,
      hueLatencyMs: DEFAULT_HUE_LATENCY_MS,
      sortedSong: this.sortSong(this.songs[DEFAULT_SONG_ID]),
    }
  }

  componentDidMount = (): void => {
    this.beatTimers = []
    this.beatCanvasRef.current.refresh()
  }

  playRoutine = (): void => {
    const { sortedSong } = this.state

    this.resetRoutine()
    for (let i = 0; i < sortedSong.length; i++) {
      this.beatTimers.push(...this.createBeatTimer(sortedSong[i], i === sortedSong.length - 1))
    }
    this.beatCanvasRef.current.start()
    this.setState({ startTimeMs: Date.now() })
  }

  createBeatTimer = (data: MsStep, isLast: boolean): number[] => {
    const { hueApi } = this.props
    const {
      shouldUpdateHueLights,
      lightIdToLightTrackMap,
      hueLatencyMs,
    } = this.state
    const lights = hueApi.getLights()
    const timeouts: number[] = []

    const t1 = setTimeout(() => {
      // console.log('lights', data.lights)

      this.setState({ lights: data.lights })

      // stop player if last step of the song
      if (isLast) {
        this.stopRoutine()
      }
    }, data.ms) as unknown as number
    timeouts.push(t1)

    if (shouldUpdateHueLights) {
      const t2 = setTimeout(() => {
        // update physical lights with current state
        for (const lightId in lightIdToLightTrackMap) {
          const trackId = lightIdToLightTrackMap[lightId]
          const settings = data.lights[trackId]
          const settingsList = []
            if (settings.color) {
              settingsList.push(colorSetting(settings.color, lights[lightId]))
            }
            if (settings.brightness) {
              settingsList.push(brightnessSetting(settings.brightness))
            }
            if (settings.on === true || settings.on === false) {
              settingsList.push({ on: settings.on })
            }
            const options = Object.assign({}, ...settingsList)
            // console.log(data.ms, options)
            hueApi.updateLightState(lightId, options, data.transitionMs / 100 || 0)
        }
      }, data.ms - hueLatencyMs) as unknown as number
      timeouts.push(t2)
    }

    return timeouts
  }

  stopRoutine = (): void => {
    this.beatCanvasRef.current.stop()
    for (const timer of this.beatTimers) {
      clearTimeout(timer)
    }
    this.beatTimers = []
  }

  // TODO unneeded?
  restartRoutine = (): void => {
    this.playRoutine()
  }

  resetRoutine = (): void => {
    this.stopRoutine()
    this.beatCanvasRef.current.reset()
    this.setState({ currentMs: 0 })
  }

  toggleShouldUpdateHueLights = (): void => {
    const { shouldUpdateHueLights } = this.state
    this.setState({ shouldUpdateHueLights: !shouldUpdateHueLights })
  }

  selectSong = (id: number): (() => void) => (): void => {
    this.resetRoutine()
    const sortedSong = this.sortSong(this.songs[id])
    // console.log('new song', sortedSong)
    this.setState({
      songId: id,
      sortedSong,
    }, () => {
      this.beatCanvasRef.current.reset()
      this.beatCanvasRef.current.refresh()
    })
  }

  updateLightIdToLightTrackMap = (newLightIdToLightTrackMap: { [key: number]: number }): void => {
    this.setState({ lightIdToLightTrackMap: newLightIdToLightTrackMap })
  }

  toggleLightsFullScreen = (): void => {
    const { areLightsFullScreen } = this.state
    this.setState({ areLightsFullScreen: !areLightsFullScreen })
  }

  closeFullScreenLights = (): void => {
    this.setState({ areLightsFullScreen: false })
  }

  updateHueLatency = (e: React.ChangeEvent): void => {
    const rawValue = (e.target as HTMLInputElement).value
    const hueLatencyMs = parseInt(rawValue.replace(/[^\d]/g, ''), 10)
    this.setState({ hueLatencyMs })
  }

  render(): JSX.Element {
    const {
      playRoutine,
      stopRoutine,
      restartRoutine,
      toggleShouldUpdateHueLights,
      selectSong,
      updateLightIdToLightTrackMap,
      toggleLightsFullScreen,
      closeFullScreenLights,
      updateHueLatency,
    } = this
    const {
      hueApi,
    } = this.props
    const {
      songId,
      lights,
      startTimeMs,
      shouldUpdateHueLights,
      lightIdToLightTrackMap,
      areLightsFullScreen,
      hueLatencyMs,
      sortedSong,
    } = this.state
    const songItems: SongData[] = [
      {
        id: 1, // TODO better id system
        name: 'Mercy',
        artist: 'Kanye West',
      },
      {
        id: 2,
        name: 'Easy (Switch Screens)',
        artist: 'Lorde',
      },
      {
        id: 3,
        name: 'Biting Down',
        artist: 'Lorde',
      },
      {
        id: 4,
        name: 'Beez In The Trap',
        artist: 'Nicki Minaj',
      },
    ]

    return (
      <div className={styles.hueGroups}>
        <ul className={styles.hueGroups__list}>
          {songItems.map(({ id, name }: SongData) => (
            <li
              key={id}
              onClick={selectSong(id)}
              className={classNames(
                styles.hueGroups__listItem,
                { [styles['hueGroups__listItem--selected']]: songId === id })}>
              <div>
                {name}
              </div>
            </li>
          ))}
        </ul>

        <div className={classNames(
          styles.hueGroups__detail,
          styles.beats__wrapper)}>
          <BeatCanvas
            song={sortedSong}
            startTimeMs={startTimeMs}
            lightsCount={Object.keys(lightIdToLightTrackMap).length}
            ref={this.beatCanvasRef} />

          <div className={styles.beats__buttons}>
            <Button
              onClick={playRoutine}
              variant='secondary'
              className={styles.beats__buttons__button}>
              Play
            </Button>
            <Button
              onClick={stopRoutine}
              variant='secondary'
              className={styles.beats__buttons__button}>
              Stop
            </Button>
            <Button
              onClick={restartRoutine}
              variant='secondary'
              className={styles.beats__buttons__button}>
              Restart
            </Button>
            <Button
              onClick={toggleLightsFullScreen}
              variant='secondary'
              className={styles.beats__buttons__button}>
              Toggle fullscreen mode
            </Button>
          </div>

          <div className={styles.beats__basicHueControls}>
            <label className={classNames(
              styles.beats__checkbox,
              { [styles['beats__checkbox--checked']]: shouldUpdateHueLights })}>
              <input
                type='checkbox'
                value={shouldUpdateHueLights ? 'checked' : ''}
                onClick={toggleShouldUpdateHueLights}
                style={{ position: 'initial', opacity: 1 }} />
              <span>Enable hue lights</span>
            </label>

            <InputGroup className={styles.beats__inputWrapper}>
              <InputGroup.Prepend>
                <InputGroup.Text>Hue latency:</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                value={hueLatencyMs}
                onChange={updateHueLatency}
                aria-label='Hue bulbs latency'
                className={styles.beats__input} />
              <InputGroup.Append>
                <InputGroup.Text>ms</InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
          </div>

          <div className={styles.beats__lights}>
            {/* beat lights fullscreen mode */}
            <Modal
              show={areLightsFullScreen}
              onHide={closeFullScreenLights}
              dialogClassName={styles['beats__lights--fullScreen']}>
              {lights.map((light: LightState, i: number) => (
                <BeatLight
                  key={i}
                  id={i + 1}
                  on={light.on}
                  color={light.color}
                  brightness={light.brightness} />
              ))}
            </Modal>

            {/* beat lights normal mode */}
            {!areLightsFullScreen && (
              lights.map((light: LightState, i: number) => (
                <BeatLight
                  key={i}
                  id={i + 1}
                  on={light.on}
                  color={light.color}
                  brightness={light.brightness} />
              ))
            )}
          </div>

          <LightTracksSettings
            hueApi={hueApi}
            song={sortedSong}
            updateLightIdToLightTrackMap={updateLightIdToLightTrackMap}
            lightIdToLightTrackMap={lightIdToLightTrackMap} />
        </div>
      </div>
    )
  }

  // guarantees that a song is in order (precondition of running beat canvas)
  private sortSong = (song: MsStep[]): MsStep[] => {
    return mergeSort((note1: MsStep, note2: MsStep) => note1.ms - note2.ms, song)
  }
}
