import * as React from 'react'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import FormControl from 'react-bootstrap/FormControl'
import InputGroup from 'react-bootstrap/InputGroup'
import ListGroup from 'react-bootstrap/ListGroup'
// import Modal from 'react-bootstrap/Modal'
import BeatLight from './BeatLight'
import { LightState, MsStep } from './beats/beat-types'
import { HueApi } from './hue-utils'
import styles from './scss/Hue.scss'

interface LightTracksSettingsProps {
  hueApi: HueApi
  song: MsStep[]
  updateLightIdToLightTrackMap: (map: { [key: number]: number }) => void
  lightIdToLightTrackMap: { [key: number]: number }
  lights: LightState[]
  toggleShouldUpdateHueLights: () => void
  shouldUpdateHueLights: boolean
  hueLatencyMs: number
  updateHueLatency: (e: React.ChangeEvent) => void
}

interface LightTracksSettingsState {
  areLightsFullScreen: boolean
}

export default class LightTracksSettings extends React.Component<LightTracksSettingsProps, LightTracksSettingsState> {
  constructor(props: LightTracksSettingsProps) {
    super(props)

    this.state = {
      areLightsFullScreen: false,
    }
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

  toggleLightsFullScreen = (): void => {
    const { areLightsFullScreen } = this.state
    this.setState({ areLightsFullScreen: !areLightsFullScreen })
  }

  closeFullScreenLights = (): void => {
    this.setState({ areLightsFullScreen: false })
  }

  swapSelectedLightIds = (trackId1: number, trackId2: number) => {
    const {
      updateLightIdToLightTrackMap,
      lightIdToLightTrackMap,
    } = this.props
    const newTrack1: { [key: number]: number } = {}
    const newTrack2: { [key: number]: number } = {}
    for (const lightId in lightIdToLightTrackMap) {
      if (lightIdToLightTrackMap[lightId] === trackId1) {
        newTrack1[lightId] = trackId2
      } else if (lightIdToLightTrackMap[lightId] === trackId2) {
        newTrack2[lightId] = trackId1
      }
    }
    updateLightIdToLightTrackMap(Object.assign({}, newTrack1, newTrack2))
  }

  render(): JSX.Element {
    const {
      handleChange,
      swapSelectedLightIds,
      // closeFullScreenLights,
      // toggleLightsFullScreen,
    } = this
    const {
      hueApi,
      lightIdToLightTrackMap,
      lights,
      // toggleShouldUpdateHueLights,
      // shouldUpdateHueLights,
      hueLatencyMs,
      updateHueLatency,
    } = this.props
    // const {
    //   areLightsFullScreen,
    // } = this.state
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
        <div className={styles.lightTracksSettings__leftColumn}>
          <div className={styles.lightTracksSettings__tracks}>
            {lights.map((light: LightState, trackId: number) => (
              <div
                key={trackId}
                className={styles.lightTracksSettings__trackSettings}>
                <BeatLight
                  on={light.on}
                  color={light.color}
                  brightness={light.brightness} />
                <div
                  key={trackId}
                  className={styles.lightTracksSettings__lightIdSelectors}>
                  <div className={styles.lightTracksSettings__lightIdSelectors__titleRow}>
                    <div>Light Track {trackId + 1}</div>
                    <DropdownButton
                      title='Swap'
                      variant='link'>
                      {getLightTracks().map((trackId2: number) =>
                        (trackId2 !== trackId) && (
                          <Dropdown.Item
                            key={`${trackId}${trackId2}`}
                            onClick={() => swapSelectedLightIds(trackId, trackId2)}>
                          Swap rows {trackId + 1} and {trackId2 + 1}
                        </Dropdown.Item>
                        ))}
                    </DropdownButton>
                  </div>
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
                    {/* {[5,2,17,1].map((lightId: number) => (
                      <Button
                        key={lightId}
                        variant={lightIdToLightTrackMap[lightId] === trackId ? 'primary' : 'secondary'}
                        className={styles.lightTracksSettings__lightIdButton}>
                        {lightId}
                      </Button>
                    ))} */}
                  </ButtonGroup>
                </div>
              </div>
            ))}

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

          <ListGroup className={styles.lightTracksSettings__lightsInfo}>
            {hueApi.getLightIds().map((lightId: number) => (
              <ListGroup.Item key={lightId}>
                {lightId}: {allLights[lightId].name}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>

        {/* <Button
          onClick={toggleLightsFullScreen}
          variant='secondary'
          className={styles.beats__buttons__button}>
          Toggle fullscreen mode
        </Button> */}

        {/* beat lights fullscreen mode
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
        </Modal> */}
      </div>
    )
  }
}
