import classNames from 'classnames'
import * as React from 'react'
import { Button, ButtonGroup, Form, InputGroup } from 'react-bootstrap'
import { LightState, MsStep } from './beats/beat-types'
import BeatVisualizer from './beats/BeatVisualizer'
import { Song } from './beats/song'
import beezInTheTrap from './beats/songs/beez-in-the-trap'
import bitingDown from './beats/songs/biting-down'
import easySwitchScreens from './beats/songs/easy-switch-screens'
import homemadeDynamite from './beats/songs/homemade-dynamite'
import mercy from './beats/songs/mercy'
import { allLightsOff } from './beats/songs/utils/utils'
import yellowFlickerBeat from './beats/songs/yellow-flicker-beat'
import { calculateXY, getValueFromPoint, UIColor } from './hue-color-conversion'
import { HueApi, mergeSort } from './hue-utils'
import { LightData } from './Light'
import LightTracksSettings from './LightTracksSettings'
import styles from './scss/Hue.scss'

const DEFAULT_HUE_LATENCY_MS = 100
const DEFAULT_SONG_ID = 4 // yfb

const ALL_SONGS: Song[] = [
  mercy,
  easySwitchScreens,
  bitingDown,
  beezInTheTrap,
  yellowFlickerBeat,
  homemadeDynamite,
]

interface Props {
  hueApi: HueApi
  isDarkMode: boolean
}

interface State {
  songId: number
  lights: LightState[]
  startTimeMs: number
  elapsedMs: number
  shouldUpdateHueLights: boolean
  lightIdToLightTrackMap: { [key: number]: number }
  hueLatencyMs: number
  sortedSong: MsStep[]
  songSearchTerm: string
  overallBrightness: number
}

export default class Beats extends React.Component<Props, State> {
  private beatTimers: number[]
  private BeatVisualizerRef: React.RefObject<BeatVisualizer> = React.createRef()

  constructor(props: Props) {
    super(props)

    const sortedSong = this.sortSong(ALL_SONGS[DEFAULT_SONG_ID].getSteps())
    const lightTracksCount = this.getLightTracksCount(sortedSong)

    const { hueApi } = this.props
    const lightIdToLightTrackMap: { [key: number]: number } = {}
    const lightIds = hueApi.getLightIds()
    for (let i = 0; i < lightIds.length; i++) {
      lightIdToLightTrackMap[lightIds[i]] = Math.floor(i * lightTracksCount / lightIds.length)
    }

    this.state = {
      songId: DEFAULT_SONG_ID,
      lights: allLightsOff(),
      startTimeMs: 0,
      elapsedMs: 0,
      shouldUpdateHueLights: false,
      lightIdToLightTrackMap,
      hueLatencyMs: DEFAULT_HUE_LATENCY_MS,
      sortedSong,
      songSearchTerm: '',
      overallBrightness: 100,
    }
  }

  componentDidMount = (): void => {
    this.beatTimers = []
    this.BeatVisualizerRef.current.refresh()
    window.addEventListener('resize', this.onWindowResize)
  }

  componentWillUnmount = (): void => {
    window.removeEventListener('resize', this.onWindowResize)
  }

  playRoutine = (): void => {
    const {
      sortedSong,
      elapsedMs,
    } = this.state

    for (let i = 0; i < sortedSong.length; i++) {
      this.beatTimers.push(...this.createBeatTimer(sortedSong[i], i === sortedSong.length - 1))
    }
    this.BeatVisualizerRef.current.start()
    this.setState({ startTimeMs: Date.now() - elapsedMs })
  }

  createBeatTimer = (data: MsStep, isLast: boolean): number[] => {
    const { hueApi } = this.props
    const {
      shouldUpdateHueLights,
      lightIdToLightTrackMap,
      hueLatencyMs,
      elapsedMs,
    } = this.state
    const lights = hueApi.getLights()
    const timeouts: number[] = []

    const createTimeoutIfDurationIsPositive = (durationMs: number, successFn: () => void) => {
      if (durationMs >= 0) {
        return setTimeout(successFn, durationMs) as unknown as number
      }
      return null
    }

    const clientTimeout = createTimeoutIfDurationIsPositive(
      data.ms - elapsedMs,
      () => {
        this.setState({ lights: data.lights })
        // console.log('lights', data.lights)

        // stop player if last step of the song
        if (isLast) {
          this.stopRoutine()
        }
      })
    if (clientTimeout !== null) {
      timeouts.push(clientTimeout)
    }

    if (shouldUpdateHueLights) {
      const lightsTimeout = createTimeoutIfDurationIsPositive(
        data.ms - elapsedMs - hueLatencyMs,
        () => {
          // update physical lights with current state
          for (const lightId in lightIdToLightTrackMap) {
            const trackId = lightIdToLightTrackMap[lightId]
            const settings = data.lights[trackId]
            const settingsList = []
              if (settings.color) {
                settingsList.push(this.colorSetting(settings.color, lights[lightId]))
              }
              if (settings.brightness) {
                settingsList.push(this.brightnessSetting(settings.brightness))
              }
              if (settings.on === true || settings.on === false) {
                settingsList.push({ on: settings.on })
              }
              const options = Object.assign({}, ...settingsList)
              // console.log(data.ms, options)
              hueApi.updateLightState(lightId, options, data.transitionMs / 100 || 0)
          }
        })
      if (lightsTimeout !== null) {
        timeouts.push(lightsTimeout)
      }
    }

    return timeouts
  }

  stopRoutine = (): void => {
    const { startTimeMs } = this.state
    this.BeatVisualizerRef.current.stop()
    // this is how we know if it was playing
    if (this.beatTimers && this.beatTimers.length) {
      for (const timer of this.beatTimers) {
        clearTimeout(timer)
      }
      this.beatTimers = []
      this.setState({ elapsedMs: Date.now() - startTimeMs })
    }
  }

  resetRoutine = (afterFn: () => void): void => {
    this.stopRoutine()
    this.BeatVisualizerRef.current.reset()
    this.setState({
      elapsedMs: 0,
      startTimeMs: 0,
    }, afterFn)
  }

  restartRoutine = (): void => {
    this.resetRoutine(() => this.playRoutine())
  }

  toggleShouldUpdateHueLights = (): void => {
    const { shouldUpdateHueLights } = this.state
    this.setState({ shouldUpdateHueLights: !shouldUpdateHueLights })
  }

  selectSong = (id: number): (() => void) => (): void => {
    this.resetRoutine(() => {
      const sortedSong = this.sortSong(ALL_SONGS[id].getSteps())
      // console.log('new song', sortedSong)
      this.setState({
        songId: id,
        sortedSong,
      }, () => {
        this.BeatVisualizerRef.current.reset()
        this.BeatVisualizerRef.current.refresh()
      })
    })
  }

  updateLightIdToLightTrackMap = (newLightIdToLightTrackMap: { [key: number]: number }): void => {
    this.setState({ lightIdToLightTrackMap: newLightIdToLightTrackMap })
  }

  updateHueLatency = (e: React.ChangeEvent): void => {
    const hueLatencyMs = this.parseIntFromInput(e.target as HTMLInputElement)
    this.setState({ hueLatencyMs })
  }

  updateSongSearchTerm = (e: React.ChangeEvent): void => {
    this.setState({ songSearchTerm: (e.target as HTMLInputElement).value })
  }

  updateOverallBrightness = (e: React.ChangeEvent): void => {
    const overallBrightness = this.parseIntFromInput(e.target as HTMLInputElement)
    this.setState({ overallBrightness })
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
      updateOverallBrightness,
      getLightTracksCount,
      getFilteredSongs,
      highlightMatchedSongName,
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
      overallBrightness,
    } = this.state

    return (
      <>
        <Form.Control
          value={songSearchTerm}
          onChange={updateSongSearchTerm}
          aria-label='Song search term'
          placeholder='filter songs...'
          className={styles.hueGroups__filter} />

        <ul className={styles.hueGroups__list}>
          {getFilteredSongs().map(({ title, artist }: Song, i: number) => (
            <li
              key={title + artist}
              onClick={selectSong(i)}
              className={classNames(
                styles.hueGroups__listItem,
                { [styles['hueGroups__listItem--selected']]: songId === i })}>
              <div
                dangerouslySetInnerHTML={highlightMatchedSongName(title)}
                className={styles.hueGroups__listItem__title} />
              <div
                dangerouslySetInnerHTML={highlightMatchedSongName(artist)}
                className={styles.hueGroups__listItem__subtitle} />
            </li>
          ))}
        </ul>

        <div className={classNames(
          styles.hueGroups__detail,
          styles.beats__wrapper)}>
          <BeatVisualizer
            song={sortedSong}
            startTimeMs={startTimeMs}
            lightsCount={getLightTracksCount(sortedSong)}
            ref={this.BeatVisualizerRef} />

          <Form className={styles.beats__mainControls}>
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

            <InputGroup aria-disabled={!shouldUpdateHueLights}>
              <InputGroup.Prepend>
                <InputGroup.Text>Hue latency:</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                value={hueLatencyMs}
                onChange={updateHueLatency}
                aria-label='Hue bulbs latency'
                disabled={!shouldUpdateHueLights}
                className={styles.beats__hueLatencyInput} />
              <InputGroup.Append>
                <InputGroup.Text>ms</InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>

            <Form.Group
              controlId='overallBrightnessSlider'
              aria-disabled={!shouldUpdateHueLights}>
              <Form.Label>Hue max brightness: {overallBrightness}%</Form.Label>
              <Form.Control
                type='range'
                onChange={updateOverallBrightness}
                value={overallBrightness}
                disabled={!shouldUpdateHueLights} />
            </Form.Group>
          </Form>

          <LightTracksSettings
            hueApi={hueApi}
            song={sortedSong}
            updateLightIdToLightTrackMap={updateLightIdToLightTrackMap}
            lightIdToLightTrackMap={lightIdToLightTrackMap}
            lights={lights}
            toggleShouldUpdateHueLights={toggleShouldUpdateHueLights}
            shouldUpdateHueLights={shouldUpdateHueLights}
            isDarkMode={isDarkMode}
            lightTracksCount={getLightTracksCount(sortedSong)} />
        </div>
      </>
    )
  }

  private getFilteredSongs = () => {
    const { songSearchTerm } = this.state
    if (songSearchTerm) {
      const re = this.getSongSearchTermRegex()
      return ALL_SONGS.filter((song: Song) => re.test(song.title) || re.test(song.artist))
    }
    return ALL_SONGS
  }

  private highlightMatchedSongName = (name: string) => {
    let renderedName = name
    const match = name.match(this.getSongSearchTermRegex())
    if (match) {
      renderedName = name.replace(match[1], `<span class="${styles['beats--highlight']}">${match[1]}</span>`)
    }
    return { __html: renderedName }
  }

  private getSongSearchTermRegex = () => {
    const { songSearchTerm } = this.state
    const regexBase = songSearchTerm
      .replace(/[^\w\s]/gi, '')
      .split('').join('[^\\w]*?')
    return new RegExp(`(${regexBase})`, 'i')
  }

  // guarantees that a song is in order (precondition of running beat canvas)
  private sortSong = (song: MsStep[]): MsStep[] => {
    return mergeSort(song, (note1: MsStep, note2: MsStep) => note1.ms - note2.ms)
  }

  /**
   * Set light color.
   *
   * @param c color to set light to
   * @param light data for light to set
   */
  private colorSetting = (c: UIColor, light: LightData): any => {
    const modelId = light ? light.modelid : null // TODO make this more robust?
    const xy = calculateXY(c, modelId)
    return { xy: getValueFromPoint(xy) }
  }

  /**
   * Set light brightness.
   *
   * @param percent must be in range 1 to 100 (inclusive)
   */
  private brightnessSetting = (percent: number): any => {
    const { overallBrightness } = this.state
    const hueBrightness = (percent / 100) * 254
    const scalar = overallBrightness / 100
    const bri = Math.round(hueBrightness * scalar)
    return { bri }
  }

  private getLightTracksCount = (sortedSong: MsStep[]) => {
    return sortedSong[0] ? sortedSong[0].lights.length : 0
  }

  private onWindowResize = () => {
    this.BeatVisualizerRef.current.refresh()
  }

  private parseIntFromInput = (input: HTMLInputElement) => {
    const value = parseInt(input.value.replace(/[^\d]/g, ''), 10)
    return value || 0
  }
}
