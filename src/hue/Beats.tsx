import classNames from 'classnames'
import * as React from 'react'
import { Button, ButtonGroup, Form, FormControl, InputGroup } from 'react-bootstrap'
import { LightState, MsStep } from './beats/beat-types'
import BeatCanvas from './beats/BeatCanvas'
import beezInTheTrap from './beats/songs/beez-in-the-trap'
import bitingDown from './beats/songs/biting-down'
import easySwitchScreens from './beats/songs/easy-switch-screens'
import mercy from './beats/songs/mercy'
import { allLightsOff } from './beats/songs/utils/utils'
import { calculateXY, getValueFromPoint, UIColor } from './hue-color-conversion'
import { HueApi, mergeSort } from './hue-utils'
import { LightData } from './Light'
import LightTracksSettings from './LightTracksSettings'
import styles from './scss/Hue.scss'

const DEFAULT_HUE_LATENCY_MS = 100 // TODO make this a setting

// TODO make these private methods (?)

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
  isDarkMode: boolean
}

interface State {
  songId: number
  lights: LightState[]
  startTimeMs: number
  currentMs: number
  shouldUpdateHueLights: boolean
  lightIdToLightTrackMap: { [key: number]: number }
  hueLatencyMs: number
  sortedSong: MsStep[]
  songSearchTerm: string
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
      lights: allLightsOff(),
      startTimeMs: 0,
      currentMs: 0,
      shouldUpdateHueLights: false,
      lightIdToLightTrackMap: {
        4: 0,
        6: 1,
      },
      hueLatencyMs: DEFAULT_HUE_LATENCY_MS,
      sortedSong: this.sortSong(this.songs[DEFAULT_SONG_ID]),
      songSearchTerm: '',
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

  updateHueLatency = (e: React.ChangeEvent): void => {
    const rawValue = (e.target as HTMLInputElement).value
    const hueLatencyMs = parseInt(rawValue.replace(/[^\d]/g, ''), 10)
    this.setState({ hueLatencyMs })
  }

  updateSongSearchTerm = (e: React.ChangeEvent): void => {
    this.setState({ songSearchTerm: (e.target as HTMLInputElement).value })
  }

  render(): JSX.Element {
    const {
      playRoutine,
      stopRoutine,
      restartRoutine,
      toggleShouldUpdateHueLights,
      selectSong,
      updateLightIdToLightTrackMap,
      updateHueLatency,
      updateSongSearchTerm,
    } = this
    const {
      hueApi,
      isDarkMode,
    } = this.props
    const {
      songId,
      lights,
      startTimeMs,
      shouldUpdateHueLights,
      lightIdToLightTrackMap,
      hueLatencyMs,
      sortedSong,
      songSearchTerm,
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

    // filter song list by search term
    const re = new RegExp(`(${songSearchTerm.split('').join('[^\\w]*?')})`, 'i')
    const filteredSongItems = songItems.filter((song: SongData) => re.test(song.name))

    const highlightMatchedSongName = (name: string) => {
      const match = name.match(re)[1]
      const renderedName = name.replace(match, `<span style="background: yellow; color: black;">${match}</span>`)
      return { __html: renderedName }
    }

    return (
      <>
        <ul className={styles.hueGroups__list}>
          <InputGroup>
            <FormControl
              value={songSearchTerm}
              onChange={updateSongSearchTerm}
              aria-label='Song search term'
              placeholder='filter songs...'
              className={classNames(
                styles.hueGroups__listItem,
                styles.beats__songSearchInput)} />
            </InputGroup>
          {filteredSongItems.map(({ id, name }: SongData) => (
            <li
              key={id}
              onClick={selectSong(id)}
              className={classNames(
                styles.hueGroups__listItem,
                { [styles['hueGroups__listItem--selected']]: songId === id })}>
              <span dangerouslySetInnerHTML={highlightMatchedSongName(name)} />
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

          <div className={styles.beats__mainControls}>
            <ButtonGroup
              aria-label='Playback controls'
              className={styles.beats__buttons}>
              <Button
                onClick={playRoutine}
                variant={isDarkMode ? 'dark' : 'secondary'}>
                Play
              </Button>
              <Button
                onClick={stopRoutine}
                variant={isDarkMode ? 'dark' : 'secondary'}>
                Stop
              </Button>
              <Button
                onClick={restartRoutine}
                variant={isDarkMode ? 'dark' : 'secondary'}>
                Restart
              </Button>
            </ButtonGroup>

            <Form>
              <Form.Check
                custom
                type='checkbox'
                className={styles.beats__checkbox}
                id='beats-enable-hue-checkbox'>
                <Form.Check.Input
                  type='checkbox'
                  onChange={toggleShouldUpdateHueLights}
                  checked={shouldUpdateHueLights}
                  id='beats-enable-hue-checkbox' />
                <Form.Check.Label>Enable hue lights</Form.Check.Label>
              </Form.Check>
            </Form>
          </div>

          <LightTracksSettings
            hueApi={hueApi}
            song={sortedSong}
            updateLightIdToLightTrackMap={updateLightIdToLightTrackMap}
            lightIdToLightTrackMap={lightIdToLightTrackMap}
            lights={lights}
            toggleShouldUpdateHueLights={toggleShouldUpdateHueLights}
            shouldUpdateHueLights={shouldUpdateHueLights}
            hueLatencyMs={hueLatencyMs}
            updateHueLatency={updateHueLatency}
            isDarkMode={isDarkMode} />
        </div>
      </>
    )
  }

  // guarantees that a song is in order (precondition of running beat canvas)
  private sortSong = (song: MsStep[]): MsStep[] => {
    return mergeSort((note1: MsStep, note2: MsStep) => note1.ms - note2.ms, song)
  }
}
