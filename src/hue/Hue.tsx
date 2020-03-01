import * as React from 'react'
import Beats from './Beats'
import Groups from './Groups'
import { HueApi } from './hue-utils'
import Routines from './Routines'
import Scenes from './Scenes'

enum DetailType {
  GROUPS,
  SCENES,
  ROUTINES,
  BEATS,
}

interface State {
  detailType: DetailType
}

interface HueControllerLinkProps {
  text: string
  detailType: DetailType
  selectedDetailType: DetailType
  setDetailType: (type: DetailType) => (() => void)
}

const HueControllerLink: React.StatelessComponent<HueControllerLinkProps> = ({
  text,
  detailType,
  selectedDetailType,
  setDetailType,
}: HueControllerLinkProps): JSX.Element => (
  <a
    onClick={setDetailType(detailType)}
    className={`hue__links__link ${detailType === selectedDetailType ? 'hue__links__link--selected' : ''}`}>
    {text}
  </a>
)

// TODO add redux (?)
export default class Hue extends React.Component<{}, State> {
  hueApi: HueApi

  constructor(props: {}) {
    super(props)

    this.hueApi = new HueApi()

    this.state = {
      detailType: null,
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

  render(): JSX.Element {
    document.title = 'Hue Lights Controller'
    const {
      hueApi,
      setDetailType,
    } = this
    const {
      detailType,
    } = this.state
    console.log('dt', detailType)

    const links = [
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

    return (
      <div className='hue'>
        <header className='hue__header'>
          <h5 className='hue__title'>
            Hue Controller
          </h5>
          <div className='hue__links'>
            {links.map(({ type, text }) => (
              <HueControllerLink
                key={type}
                text={text}
                detailType={type}
                selectedDetailType={detailType}
                setDetailType={setDetailType}
              />
            ))}
          </div>
        </header>
        <div className='hue__controller'>
          {detailType === DetailType.GROUPS && (
            <Groups hueApi={hueApi} />
          )}
          {detailType === DetailType.SCENES && (
            <Scenes hueApi={hueApi} />
          )}
          {detailType === DetailType.ROUTINES && (
            <Routines hueApi={hueApi} />
          )}
          {detailType === DetailType.BEATS && (
            <Beats hueApi={hueApi} />
          )}
        </div>
      </div>
    )
  }
}
