import classNames from 'classnames'
import * as React from 'react'
import { Form } from 'react-bootstrap'
import Beats from './Beats'
import Groups from './Groups'
import { HueApi } from './hue-utils'
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

interface State {
  detailType: DetailType
  isDarkMode: boolean
}

// TODO add redux (?)
export default class Hue extends React.Component<{}, State> {
  hueApi: HueApi

  constructor(props: {}) {
    super(props)

    this.hueApi = new HueApi()

    this.state = {
      detailType: null,
      isDarkMode: true,
    }
  }

  // componentDidMount = (): Promise<void> => {
  // }

  // componentWillUnmount = (): void => {
  // }

  setDetailType = (detailType: DetailType) => async () => { // tslint:disable-line:typedef
    try {
      await this.hueApi.init() // TODO add switch statement to only reload necessary data?
    } catch (e) {
      // TODO alert of some sort?
      // this is for the case where I'm developing away from the hue network
    }
    this.setState({ detailType })
  }

  handleDarkModeCheckboxChange = (e: React.ChangeEvent) => {
    this.setState({ isDarkMode: (e.target as HTMLInputElement).checked })
  }

  render(): JSX.Element {
    document.title = 'Hue Lights Controller'
    const {
      hueApi,
      setDetailType,
      handleDarkModeCheckboxChange,
    } = this
    const {
      detailType,
      isDarkMode,
    } = this.state
    console.log('dt', detailType)

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
        { [styles['hue--darkMode']]: isDarkMode })}>
        <header className={styles.hue__header}>
          <h5 className={styles.hue__title}>
            Hue Controller (
              <Form>
                <Form.Check
                  custom
                  type='checkbox'
                  className={styles.hue__darkModeCheckbox}
                  id='hue-dark-mode-checkbox'>
                  <Form.Check.Input
                    type='checkbox'
                    onChange={handleDarkModeCheckboxChange}
                    checked={isDarkMode}
                    id='hue-dark-mode-checkbox' />
                  <Form.Check.Label>dark mode</Form.Check.Label>
                </Form.Check>
              </Form>
            )
          </h5>
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
        <div className={styles.hue__controller}>
          {getDetailComponent()}
        </div>
      </div>
    )
  }
}
