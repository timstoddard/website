import * as React from 'react'
import CNN from './CNN'
import InfoBar from './InfoBar'
import Links from './Links'
import RandomQuote from './RandomQuote'
import Weather from './Weather'
import { getRandomBackgroundUrls } from './background-urls'

const styles = require('./scss/Start.scss') // tslint:disable-line no-var-requires

const BACKGROUND_IMAGE_CLASS = styles.start__backgroundImagePreload

interface State {
  backgroundUrls: string[]
  backgroundUrlIndex: number
  showContent: boolean
}

export default class Start extends React.Component<{}, State> {
  changeBackgroundTimer: number
  images: HTMLImageElement[]

  constructor(props: {}) {
    super(props)

    this.state = {
      backgroundUrls: getRandomBackgroundUrls(),
      backgroundUrlIndex: 0,
      showContent: true,
    }
  }

  componentDidMount = (): void => {
    // preload background images
    const { backgroundUrls } = this.state
    for (const url of backgroundUrls) {
      // TODO preload images with service worker
      const img = new Image()
      img.src = url
      img.classList.add(BACKGROUND_IMAGE_CLASS)
      document.body.appendChild(img)
    }

    // add window key listener
    window.addEventListener('keydown', this.onKeyDown)

    // start background change timer
    this.changeBackgroundTimer = setInterval(this.changeBackground, 5000) as unknown as number
  }

  componentWillUnmount = (): void => {
    // remove preload background images
    document.querySelectorAll(BACKGROUND_IMAGE_CLASS)
      .forEach((element: HTMLImageElement) => element.parentElement.removeChild(element))

    // remove window key listener
    window.removeEventListener('keydown', this.onKeyDown)

    // stop background change timer
    clearInterval(this.changeBackgroundTimer)
  }

  changeBackground = (): void => {
    const {
      backgroundUrls,
      backgroundUrlIndex,
    } = this.state
    const newBackgroundUrlIndex = (backgroundUrlIndex + 1) % backgroundUrls.length
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
      toggleShowContent,
    } = this
    const {
      backgroundUrls,
      backgroundUrlIndex,
      showContent,
    } = this.state
    const backgroundUrl = backgroundUrls[backgroundUrlIndex]
    const startClasses = `${styles.start} ${showContent ? '' : styles['start--contentHidden']}`

    return (
      <div
        onDoubleClick={toggleShowContent}
        className={startClasses}
        style={{ backgroundImage: `url('${backgroundUrl}')` }}>
        <Links className={styles.start__links} />
        <CNN className={styles.start__news} />
        <InfoBar className={styles.start__info} />
        <Weather className={styles.start__weather} />
        <RandomQuote className={styles.start__quote} />
      </div>
    )
  }
}
