import axios, { AxiosResponse } from 'axios'
import * as React from 'react'

interface Props {
  className: string
}

interface State {
  videos: any[]
  currentVideoTitle: string
  currentVideoHtml: string
  previousVideoIndex: number
  currentVideoAspectRatio: number
}

export default class Video extends React.Component<Props, State> {
  videoWrapper: React.Ref<HTMLDivElement>

  constructor(props: Props) {
    super(props)

    this.videoWrapper = React.createRef()

    this.state = {
      videos: [],
      currentVideoTitle: '',
      currentVideoHtml: '',
      previousVideoIndex: -1,
      currentVideoAspectRatio: 1,
    }
  }

  componentDidMount(): void {
    axios.get('https://www.reddit.com/r/Roadcam.json')
      .then((response: AxiosResponse) => {
        this.setState({ videos: response.data.data.children })
        this.loadNewVideo()
      })
      .catch((error: Error) => {
        console.error(error) // tslint:disable-line:no-console
      })
    window.addEventListener('resize', this.onResize)
    window.addEventListener('keyup', this.onResize);
    (this.videoWrapper as any).current.addEventListener('dblclick', this.onResize)
  }

  componentWillUnmount(): void {
    window.removeEventListener('resize', this.onResize)
    window.removeEventListener('keyup', this.onResize);
    (this.videoWrapper as any).current.removeEventListener('dblclick', this.onResize)
  }

  onResize = (): void => {
    const { currentVideoAspectRatio } = this.state
    const iframe: HTMLIFrameElement = document.querySelector('iframe[src*="www.youtube.com"]')
    if (iframe) { // some videos aren't from youtube
      const iframeHeight = iframe.getBoundingClientRect().width / currentVideoAspectRatio
      setTimeout(() => iframe.style.height = `${iframeHeight}px`)
    }
  }

  loadNewVideo = (): void => {
    const {
      videos,
      previousVideoIndex,
    } = this.state
    let newIndex = previousVideoIndex

    while (newIndex === previousVideoIndex || !videos[newIndex].data.media_embed.content) {
      newIndex = Math.floor(videos.length * Math.random())
    }
    const video = videos[newIndex].data
    const videoRawHtml = video.media_embed.content
    const videoWidth = parseInt(videoRawHtml.match(/width="(\d+)"/)[1], 10)
    const videoHeight = parseInt(videoRawHtml.match(/height="(\d+)"/)[1], 10)
    const videoAspectRatio = videoWidth / videoHeight
    const videoHtml = videoRawHtml
      .replace(/&lt;/g, '<') // fix opening tags
      .replace(/&gt;/g, '>') // fix closing tags
      .replace(/width="\d+"/, `style="width:100%;height:auto"`) // remove fixed width
      .replace(/height="\d+"/, '') // remove fixed height
    this.setState({
      currentVideoTitle: video.title,
      currentVideoHtml: videoHtml,
      currentVideoAspectRatio: videoAspectRatio,
    })
    this.setState({ previousVideoIndex: newIndex })
    this.onResize() // trigger a resize to make the embedded video fit
  }

  render(): JSX.Element {
    const { className } = this.props
    const {
      currentVideoTitle,
      currentVideoHtml,
    } = this.state

    return (
      <div className={className}>
        <h5>{currentVideoTitle}</h5>
        <div
          ref={this.videoWrapper}
          dangerouslySetInnerHTML={{ __html: currentVideoHtml }} />
      </div>
    )
  }
}
