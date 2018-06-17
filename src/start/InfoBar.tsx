import * as PropTypes from 'prop-types'
import * as React from 'react'

import * as Utils from './Utils'

const colors = ['blue', 'red', 'yellow', 'green']
const DEGREE = String.fromCharCode(176)

const LoadingAnimation: React.StatelessComponent<{}> = (): JSX.Element => (
  <div className='loading__icon preloader-wrapper small active'>
    {colors.map((color: string) => (
      <div
        key={color}
        className={`spinner-layer spinner-${color}`}>
        <div className='circle-clipper left'>
          <div className='circle' />
        </div>
        <div className='gap-patch'>
          <div className='circle' />
        </div>
        <div className='circle-clipper right'>
          <div className='circle' />
        </div>
      </div>
    ))}
  </div>
)

interface WeatherForecastHeaderProps {
  className: string
  currentObservation: any
  reloading: boolean
  setReloading: (_: boolean) => void
}

const WeatherForecastHeader: React.StatelessComponent<WeatherForecastHeaderProps> = ({
  className,
  currentObservation,
  reloading,
  setReloading,
}: WeatherForecastHeaderProps): JSX.Element => (
  <div className={className}>
    {currentObservation ? (
      <div className='weatherForecastHeader'>
        <img
          src={Utils.secureImg(currentObservation.icon)}
          alt={currentObservation.icon}
          className='weatherForecastHeader__icon--weather' />
        <div className='weatherForecastHeader__city'>
          {`${currentObservation.display_location.city}: ${currentObservation.temp_f}${DEGREE}F`}
          {Math.abs(currentObservation.temp_f - currentObservation.feelslike_f) > 2 && (
            <span className='weatherForecastHeader__feelsLike'>
              {` (Feels like ${currentObservation.feelslike_f}${DEGREE}F)`}
            </span>
          )}
        </div>
        {reloading
          ? <LoadingAnimation />
          : (
            <img
              src='../../media/icons/reload.svg'
              alt='Reload'
              role='button'
              onClick={(): void => Utils.reloadWeatherData(setReloading)}
              className='weatherForecastHeader__icon--reload' />
          )}
      </div>
    ) : (
      <div className='weatherForecastHeader'>
        <div className='weatherForecastHeader__loading'>
          Loading weather...
        </div>
        <LoadingAnimation />
      </div>
    )}
  </div>
)

WeatherForecastHeader.propTypes = {
  className: PropTypes.string.isRequired,
  currentObservation: PropTypes.shape({
    icon: PropTypes.string,
    display_location: PropTypes.shape({
      city: PropTypes.string,
    }),
    temp_f: PropTypes.number,
    feelslike_f: PropTypes.string,
  }),
  reloading: PropTypes.bool.isRequired,
  setReloading: PropTypes.func.isRequired,
}

WeatherForecastHeader.defaultProps = {
  currentObservation: {},
}

interface Props {
  currentObservation: {
    icon: string,
    display_location: {
      city: string,
    },
    temp_f: number,
    feelslike_f: string,
  }
  reloading: boolean
  setReloading: (reloading: boolean) => void
}

interface State {
  now: Date
  name: string
}

export default class InfoBar extends React.Component<Props, State> {
  static propTypes: any = {
    currentObservation: PropTypes.shape({
      icon: PropTypes.string,
      display_location: PropTypes.shape({
        city: PropTypes.string,
      }),
      temp_f: PropTypes.number,
      feelslike_f: PropTypes.string,
    }),
    reloading: PropTypes.bool,
    setReloading: PropTypes.func,
  }

  static defaultProps: any = {
    currentObservation: {
      icon: '',
      display_location: {
        city: '',
      },
      temp_f: 0,
      feelslike_f: '',
    },
    reloading: false,
    setReloading: (): void => {},
  }

  nowTimer: number

  constructor(props: Props) {
    super(props)

    this.state = {
      now: new Date(),
      name: localStorage.getItem('name') || '',
    }
  }

  componentDidMount(): void {
    this.checkForSavedName()
    this.updateTime()
  }

  componentWillUnmount(): void {
    window.clearTimeout(this.nowTimer)
  }

  checkForSavedName = (): void => {
    const url = window.location.href
    const index = url.indexOf('?')
    if (index === -1) {
      return
    }

    let name = url.substring(index + 1).trim()
    if (name.length === 0) {
      return
    }

    try {
      name = decodeURIComponent(name)
      this.setState({ name })
      localStorage.setItem('name', name)
    } catch (e) { }
  }

  updateTime = (): void => {
    const now = new Date()
    this.setState({ now })
    const millis = now.getMilliseconds()
    this.nowTimer = window.setTimeout(this.updateTime, 1000 - millis)
  }

  render(): JSX.Element {
    const { currentObservation, reloading, setReloading } = this.props
    const { now, name } = this.state
    return (
      <div className='infoBar cyan accent-3 black-text z-depth-1'>
        <div className='infoBar__item'>
          {Utils.createWelcomeMessage(now, name)}
        </div>
        <div className='infoBar__item'>
          {Utils.createDateString(now)}
        </div>
        <div className='infoBar__item'>
          {Utils.formatTime(now)}
        </div>
        <WeatherForecastHeader
          currentObservation={currentObservation}
          reloading={reloading}
          setReloading={setReloading}
          className='infoBar__item' />
      </div>
    )
  }
}
