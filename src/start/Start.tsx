import * as React from 'react'
import CNN from './CNN'
import InfoBar from './InfoBar'
import Links from './Links'
import RandomQuote from './RandomQuote'
import Weather from './Weather'
import { BackgroundUrlType, getRandomType, backgroundUrls } from './background-urls'
import styles from './scss/Start.scss'

const BACKGROUND_IMAGE_CLASS = styles.start__backgroundImagePreload

interface State {
  backgroundType: BackgroundUrlType
  backgroundUrlIndex: number
  showContent: boolean
}

export default class Start extends React.Component<{}, State> {
  changeBackgroundTimer: number
  images: HTMLImageElement[]

  constructor(props: {}) {
    super(props)

    this.state = {
      backgroundType: getRandomType(),
      backgroundUrlIndex: 0,
      showContent: true,
    }
  }

  componentDidMount = (): void => {
    this.start()

    // add window key listener
    window.addEventListener('keydown', this.onKeyDown)
  }

  componentWillUnmount = (): void => {
    this.stop()

    // remove window key listener
    window.removeEventListener('keydown', this.onKeyDown)
  }

  start = () => {
    // preload background images
    const { backgroundType } = this.state
    for (const url of backgroundUrls[backgroundType]) {
      // TODO preload images with service worker
      const img = new Image()
      img.src = url
      img.classList.add(BACKGROUND_IMAGE_CLASS)
      document.body.appendChild(img)
    }

    // start background change timer
    this.changeBackgroundTimer = setInterval(this.changeBackground, 5000) as unknown as number
  }

  stop = () => {
    // remove preload background images
    document.querySelectorAll(`.${BACKGROUND_IMAGE_CLASS}`)
      .forEach((element: HTMLImageElement) => element.parentElement.removeChild(element))

    // stop background change timer
    clearInterval(this.changeBackgroundTimer)
  }

  updateBackgroundUrls = (carType: BackgroundUrlType) => {
    this.stop()
    this.setState({
      backgroundType: carType,
      backgroundUrlIndex: 0,
    }, () => {
      this.start()
    })
  }

  changeBackground = (): void => {
    const {
      backgroundType,
      backgroundUrlIndex,
    } = this.state
    const urls = backgroundUrls[backgroundType]
    const newBackgroundUrlIndex = (backgroundUrlIndex + 1) % urls.length
    this.setState({ backgroundUrlIndex: newBackgroundUrlIndex })
  }

  onKeyDown = (e: KeyboardEvent): void => {
    if (e.key === ' ') {
      this.toggleShowContent()
    }
  }

  toggleShowContent = (): void => {
    this.setState({ showContent: !this.state.showContent })
  }

  render(): JSX.Element {
    document.title = 'Start'
    const {
      updateBackgroundUrls,
      toggleShowContent,
    } = this
    const {
      backgroundType,
      backgroundUrlIndex,
      showContent,
    } = this.state
    const backgroundUrl = backgroundUrls[backgroundType][backgroundUrlIndex]
    const startClasses = `${styles.start} ${showContent ? '' : styles['start--contentHidden']}`

    return (
      <div
        onDoubleClick={toggleShowContent}
        className={startClasses}
        style={{ backgroundImage: `url('${backgroundUrl}')` }}>
        <Links
          backgroundUrlType={backgroundType}
          updateBackgroundUrls={updateBackgroundUrls}
          className={styles.start__links} />
        <CNN className={styles.start__news} />
        <InfoBar className={styles.start__info} />
        <Weather className={styles.start__weather} />
        <RandomQuote className={styles.start__quote} />
      </div>
    )
  }
}
