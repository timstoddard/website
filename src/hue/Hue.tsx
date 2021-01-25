import classNames from 'classnames'
import * as React from 'react'
import Beats from './Beats'
import Groups from './Groups'
import { HueApi } from './hue-utils'
import HueLayoutSettings from './HueLayoutSettings'
import Routines from './Routines'
import Scenes from './Scenes'
import styles from './scss/Hue.scss'

// https://developers.meethue.com/develop/get-started-2
// id INz7iO8Vfld-V0w0th0pGxzU3KzfcWTIOg5kNeE0
// ip address 192.168.100.107

enum DetailType {
  GROUPS,
  SCENES,
  ROUTINES,
  BEATS,
}

interface HueDetailLink {
  type: DetailType
  text: string
}

export enum DarkModeColorScheme {
  RED, GREEN, BLUE, ORANGE
}

enum HueLayoutState {
  LIST_ONLY, DETAIL_ONLY, LIST_AND_DETAIL
}

interface State {
  detailType: DetailType
  isSettingsModalOpen: boolean
  isDarkMode: boolean
  darkModeColorScheme: DarkModeColorScheme
  hueLayoutState: HueLayoutState
}

// TODO add redux (?)
export default class Hue extends React.Component<{}, State> {
  hueApi: HueApi

  constructor(props: {}) {
    super(props)

    this.hueApi = new HueApi()

    this.state = {
      detailType: null,
      isSettingsModalOpen: false,
      isDarkMode: true,
      darkModeColorScheme: DarkModeColorScheme.GREEN,
      hueLayoutState: HueLayoutState.LIST_AND_DETAIL,
    }
  }

  async componentDidMount(): Promise<void> {
    await this.setDetailType(DetailType.BEATS)()
  }

  setDetailType = (detailType: DetailType) => async () => {
    // reload lights/etc every time we switch detail type
    await this.hueApi.init()
    this.setState({ detailType })
  }

  handleDarkModeCheckboxChange = (e: React.ChangeEvent) => {
    this.setState({ isDarkMode: (e.target as HTMLInputElement).checked })
  }

  openModal = () => {
    this.setState({ isSettingsModalOpen: true })
  }

  closeModal = () => {
    this.setState({ isSettingsModalOpen: false })
  }

  selectDarkModeColorScheme = (darkModeColorScheme: DarkModeColorScheme) => () => {
    this.setState({ darkModeColorScheme })
  }

  getDarkModeColorName = () => {
    const { darkModeColorScheme } = this.state
    switch(darkModeColorScheme) {
      case DarkModeColorScheme.RED:
        return 'red'
      case DarkModeColorScheme.GREEN:
        return 'green'
      case DarkModeColorScheme.BLUE:
        return 'blue'
      case DarkModeColorScheme.ORANGE:
        return 'orange'
      default:
        return ''
    }
  }

  render(): JSX.Element {
    document.title = 'Hue Lights Controller'
    const {
      hueApi,
      setDetailType,
      handleDarkModeCheckboxChange,
      openModal,
      closeModal,
      selectDarkModeColorScheme,
      getDarkModeColorName,
    } = this
    const {
      detailType,
      isSettingsModalOpen,
      isDarkMode,
      darkModeColorScheme,
      hueLayoutState, // TODO use this
    } = this.state
    // console.log('dt', detailType)

    const links: HueDetailLink[] = [
      {
        type: DetailType.GROUPS,
        text: 'Groups',
      },
      {
        type: DetailType.SCENES,
        text: 'Scenes',
      },
      {
        type: DetailType.ROUTINES,
        text: 'Routines',
      },
      {
        type: DetailType.BEATS,
        text: 'Beats',
      },
    ]

    const getDetailComponent = () => {
      switch (detailType) {
        case DetailType.GROUPS:
          return <Groups hueApi={hueApi} />
        case DetailType.SCENES:
          return <Scenes hueApi={hueApi} />
        case DetailType.ROUTINES:
          return <Routines hueApi={hueApi} />
        case DetailType.BEATS:
          return (
            <Beats
              hueApi={hueApi}
              isDarkMode={isDarkMode} />
          )
        default:
          return null
      }
    }

    return (
      <div className={classNames(
        styles.hue,
        (styles as any)[`hue--darkMode--${getDarkModeColorName()}`],
        { [styles['hue--darkMode']]: isDarkMode })}>
        <header className={styles.hue__header}>

          {/* header */}
          <h5 className={styles.hue__title}>
            Hue Controller (
            <div
              onClick={openModal}
              className={styles.hue__title__settingsButton}>
              settings
            </div>
            )
          </h5>

          {/* top row of buttons */}
          <div className={styles.hue__links}>
            {links.map(({ type, text }: HueDetailLink) => (
              <a
                key={type}
                onClick={setDetailType(type)}
                className={classNames(
                  styles.hue__links__link,
                  { [styles['hue__links__link--selected']]: type === detailType })}>
                {text}
              </a>
            ))}
          </div>
        </header>

        {/* where the action happens */}
        <div className={styles.hue__controller}>
          {getDetailComponent()}
        </div>

        {/* dark mode settings */}
        {isSettingsModalOpen && (
          <HueLayoutSettings
            closeModal={closeModal}
            toggleDarkMode={handleDarkModeCheckboxChange}
            selectDarkModeColorScheme={selectDarkModeColorScheme}
            isDarkMode={isDarkMode}
            darkModeColorScheme={darkModeColorScheme} />
        )}
      </div>
    )
  }
}
