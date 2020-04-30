import * as React from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { LightState, MsStep } from './beats/beat-types'
import BeatCanvas from './beats/BeatCanvas'
import beezInTheTrap from './beats/songs/beez-in-the-trap'
import bitingDown from './beats/songs/biting-down'
import easySwitchScreens from './beats/songs/easy-switch-screens'
import mercy from './beats/songs/mercy'
import { calculateXY, getValueFromPoint, UIColor } from './hue-color-conversion'
import { HueApi, stringToInt } from './hue-utils'
import { LightData } from './Light'

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
    className={`beatLight ${on ? '' : 'beatLight--off'}`}
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
  updateLightTrackMap: (map: number[][]) => void
  lightTrackToLightIdMap: number[][]
}

interface LightTracksSettingsState {
  tempLightTrackToLightIdMap: number[][]
}

class LightTracksSettings extends React.Component<LightTracksSettingsProps, LightTracksSettingsState> {
  constructor(props: LightTracksSettingsProps) {
    super(props)

    this.state = {
      tempLightTrackToLightIdMap: props.lightTrackToLightIdMap,
    }
  }

  // tslint:disable-next-line:max-line-length
  handleChange = (index: number): ((event: React.ChangeEvent<HTMLInputElement>) => void) => (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { tempLightTrackToLightIdMap } = this.state
    const newMap = []
    for (let i = 0; i < tempLightTrackToLightIdMap.length; i++) {
      const lightIds = i === index
        ? event.target.value.replace(/\s+/g, '')
            .split(',')
            .map(stringToInt)
            .filter((n: number) => !isNaN(n))
        : [...tempLightTrackToLightIdMap[i]]
      newMap.push(lightIds)
    }
    this.setState({ tempLightTrackToLightIdMap: newMap })
  }

  updateMap = (): void => {
    const { updateLightTrackMap } = this.props
    const { tempLightTrackToLightIdMap } = this.state
    const newMap = []
    for (const lightIds of tempLightTrackToLightIdMap) {
      newMap.push([...lightIds])
    }
    updateLightTrackMap(newMap)
  }

  render(): JSX.Element {
    const {
      handleChange,
      updateMap,
    } = this
    const {
      hueApi,
      lightTrackToLightIdMap,
    } = this.props
    const {
      tempLightTrackToLightIdMap,
    } = this.state
    const allLightIds = Object.keys(hueApi.getLights()).map(stringToInt)
    const lightTrackInputs = []
    for (let i = 0; i < lightTrackToLightIdMap.length; i++) {
      lightTrackInputs.push((
        <li key={i}>
          <div>Light Track {i + 1}</div>
          <input
            type='text'
            onChange={handleChange(i)} />
        </li>
      ))
    }

    return (
      <div>
        {/* TODO make this checkbox list of all light names for each light track */}
        <hr />
        <div>
          {allLightIds.join(', ')}
        </div>
        <ul>
          {lightTrackInputs}
        </ul>
        <div>
          {tempLightTrackToLightIdMap.map((lightIds: number[], i: number) => (
            <div key={i}>
              [ {lightIds.join(', ')} ]
            </div>
          ))}
          <Button
            variant='primary'
            onClick={updateMap}>
            Save
          </Button>
        </div>
      </div>
    )
  }
}

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

interface Props {
  hueApi: HueApi
}

interface State {
  songId: number
  lights: LightState[]
  startTimeMs: number
  currentMs: number
  shouldUpdateHueLights: boolean
  lightTrackToLightIdMap: number[][]
  areLightsFullScreen: boolean
}

export default class Beats extends React.Component<Props, State> {
  private beatTimers: number[]
  private songs: { [key: number]: MsStep[] } = {
    1: mercy,
    2: easySwitchScreens,
    3: bitingDown,
    4: beezInTheTrap,
  }
  private beatCanvas: BeatCanvas

  constructor(props: Props) {
    super(props)

    this.state = {
      songId: 4,
      lights: [],
      startTimeMs: 0,
      currentMs: 0,
      shouldUpdateHueLights: false,
      lightTrackToLightIdMap: [
        [4],
        [6],
      ],
      areLightsFullScreen: false,
    }
  }

  componentDidMount = (): void => {
    this.beatTimers = []
    this.beatCanvas.refresh()
  }

  playRoutine = (): void => {
    const { songId } = this.state

    this.resetRoutine()
    const song = this.songs[songId]
    for (let i = 0; i < song.length; i++) {
      this.beatTimers.push(this.createBeatTimer(song[i], i === song.length - 1))
    }
    this.beatCanvas.start()
    this.setState({ startTimeMs: Date.now() })
  }

  createBeatTimer = (data: MsStep, isLast: boolean): number => {
    const { hueApi } = this.props
    const {
      shouldUpdateHueLights,
      lightTrackToLightIdMap,
    } = this.state
    const lights = hueApi.getLights()
    return setTimeout(() => {
      console.log('lights', data.lights)

      // update lights with current state
      for (let i = 0; i < data.lights.length; i++) {
        const settings = data.lights[i]
        const lightIds = lightTrackToLightIdMap[i]
        for (const lightId of lightIds) {
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
          console.log(data.ms, options)
          if (shouldUpdateHueLights) {
            hueApi.updateLightState(lightId, options, data.transitionMs / 100 || 0)
          }
        }
      }
      this.setState({ lights: data.lights })

      // stop player if last timer
      if (isLast) {
        this.stopRoutine()
      }
    }, data.ms) as unknown as number
  }

  stopRoutine = (): void => {
    this.beatCanvas.stop()
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
    this.beatCanvas.reset()
    this.setState({ currentMs: 0 })
  }

  toggleShouldUpdateHueLights = (): void => {
    const { shouldUpdateHueLights } = this.state
    this.setState({ shouldUpdateHueLights: !shouldUpdateHueLights })
  }

  selectSong = (id: number): (() => void) => (): void => {
    this.resetRoutine()
    this.setState({ songId: id }, () => {
      this.beatCanvas.reset()
      this.beatCanvas.refresh()
    })
  }

  updateLightTrackMap = (lightTrackMap: number[][]): void => {
    this.setState({ lightTrackToLightIdMap: lightTrackMap })
  }

  toggleLightsFullScreen = (): void => {
    const { areLightsFullScreen } = this.state
    this.setState({ areLightsFullScreen: !areLightsFullScreen })
  }

  closeFullScreenLights = (): void => {
    this.setState({ areLightsFullScreen: false })
  }

  render(): JSX.Element {
    const {
      playRoutine,
      stopRoutine,
      restartRoutine,
      toggleShouldUpdateHueLights,
      selectSong,
      updateLightTrackMap,
      toggleLightsFullScreen,
      closeFullScreenLights,
    } = this
    const {
      hueApi,
    } = this.props
    const {
      songId,
      lights,
      startTimeMs,
      shouldUpdateHueLights,
      lightTrackToLightIdMap,
      areLightsFullScreen,
    } = this.state
    const songItems = [
      {
        id: 1, // TODO better id system
        name: 'Mercy',
        artist: 'Kanye West',
      },
      {
        id: 2,
        name: 'Easy (Switch Screens)',
        artisti: 'Lorde',
      },
      {
        id: 3,
        name: 'Biting Down',
        artisti: 'Lorde',
      },
      {
        id: 4,
        name: 'Beez In The Trap',
        artisti: 'Nicki Minaj',
      },
    ]

    return (
      <div className='hueGroups'>
        <ul className='hueGroups__list'>
          {songItems.map((songItem /* TODO type */) => (
            <li
              key={songItem.id}
              onClick={selectSong(songItem.id)}
              className={`hueGroups__listItem ${songId === songItem.id ? 'hueGroups__listItem--selected' : ''}`}>
              <div>
                {songItem.name}
              </div>
            </li>
          ))}
        </ul>

        <div className='hueGroups__detail'>
          <BeatCanvas
            song={this.songs[songId]}
            startTimeMs={startTimeMs}
            lightsCount={lightTrackToLightIdMap.length}
            isClippedMode={false}
            ref={(beatCanvas: BeatCanvas): void => { this.beatCanvas = beatCanvas }} />

          <div className='beats__buttons'>
            <Button
              onClick={playRoutine}
              variant='secondary'
              className='beats__buttons__button'>
              Play
            </Button>
            <Button
              onClick={stopRoutine}
              variant='secondary'
              className='beats__buttons__button'>
              Stop
            </Button>
            <Button
              onClick={restartRoutine}
              variant='secondary'
              className='beats__buttons__button'>
              Restart
            </Button>
            <Button
              onClick={toggleLightsFullScreen}
              variant='secondary'
              className='beats__buttons__button'>
              Toggle fullscreen mode
            </Button>
          </div>

          <label className={`beats__checkbox ${shouldUpdateHueLights ? 'beats__checkbox--checked' : ''}`}>
            <input
              type='checkbox'
              value={shouldUpdateHueLights ? 'checked' : ''}
              onClick={toggleShouldUpdateHueLights}
              style={{ position: 'initial', opacity: 1 }} />
            <div>
              {shouldUpdateHueLights ? 'Disable' : 'Enable'} hue lights
            </div>
          </label>

          <div className='beats__lights'>

            {/* beat lights fullscreen mode */}
            <Modal
              show={areLightsFullScreen}
              onHide={closeFullScreenLights}
              dialogClassName='beats__lights--fullScreen'>
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
            song={this.songs[songId]}
            updateLightTrackMap={updateLightTrackMap}
            lightTrackToLightIdMap={lightTrackToLightIdMap} />
        </div>
      </div>
    )
  }
}
