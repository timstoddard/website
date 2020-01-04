import * as React from 'react'
import CNN from './CNN'
import InfoBar from './InfoBar'
import Links from './Links'
import RandomQuote from './RandomQuote'

const BACKGROUND_IMAGE_CLASS = 'start__backgroundImagePreload'

const backgroundUrls = [
  'https://www.wsupercars.com/wallpapers/Tesla/2020-Tesla-Roadster-V1-2000.jpg',
  'https://www.wsupercars.com/wallpapers/Tesla/2020-Tesla-Roadster-V2-2000.jpg',
  'https://www.wsupercars.com/wallpapers/Tesla/2020-Tesla-Roadster-V3-2000.jpg',
  'https://www.wsupercars.com/wallpapers/Tesla/2020-Tesla-Roadster-V4-2000.jpg',
  'https://www.wsupercars.com/wallpapers/Tesla/2020-Tesla-Roadster-V5-2000.jpg',
  'https://www.wsupercars.com/wallpapers/Tesla/2020-Tesla-Roadster-V6-2000.jpg',
  'https://www.wsupercars.com/wallpapers/Tesla/2020-Tesla-Roadster-V7-2000.jpg',
  'https://www.wsupercars.com/wallpapers/Tesla/2020-Tesla-Roadster-V8-2000.jpg',
  'https://www.wsupercars.com/wallpapers/Tesla/2020-Tesla-Roadster-V10-2000.jpg',
]

interface State {
  backgroundUrlIndex: number
  showContent: boolean
}

export default class Start extends React.Component<{}, State> {
  changeBackgroundTimer: number
  images: HTMLImageElement[]

  constructor(props: {}) {
    super(props)

    this.state = {
      backgroundUrlIndex: 0,
      showContent: true,
    }
  }

  componentDidMount = (): void => {
    // preload background images
    for (const url of backgroundUrls) {
      const img = new Image()
      img.src = url
      img.classList.add(BACKGROUND_IMAGE_CLASS)
      document.body.appendChild(img)
    }

    // add window key listener
    window.addEventListener('keydown', this.toggleShowContent)

    // start background change timer
    this.changeBackgroundTimer = setInterval(this.changeBackground, 5000) as unknown as number
  }

  componentWillUnmount = (): void => {
    // remove preload background images
    document.querySelectorAll(BACKGROUND_IMAGE_CLASS)
      .forEach((element: HTMLImageElement) => element.parentElement.removeChild(element))

    // remove window key listener
    window.removeEventListener('keydown', this.toggleShowContent)

    // stop background change timer
    clearInterval(this.changeBackgroundTimer)
  }

  changeBackground = (): void => {
    const backgroundUrlIndex = (this.state.backgroundUrlIndex + 1) % backgroundUrls.length
    this.setState({ backgroundUrlIndex })
  }

  toggleShowContent = (e: KeyboardEvent): void => {
    if (e.key === ' ') {
      this.setState({ showContent: !this.state.showContent })
    }
  }

  render(): JSX.Element {
    document.title = 'Start'
    const {
      backgroundUrlIndex,
      showContent,
    } = this.state
    const backgroundUrl = backgroundUrls[backgroundUrlIndex]

    return (
      <div
        className={`start ${showContent ? '' : 'start--contentHidden'}`}
        style={{ backgroundImage: `url('${backgroundUrl}')` }}>
        <Links className='start__links' />
        <CNN className='start__news' />
        <InfoBar className='start__info' />
        <RandomQuote className='start__quote' />
      </div>
    )
  }
}
