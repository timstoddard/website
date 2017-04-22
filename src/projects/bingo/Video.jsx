import React, { Component, PropTypes } from 'react'

export default class Video extends Component {
  constructor(props) {
    super(props)

    this.onResize = this.onResize.bind(this)

    this.state = {
      videos: [],
      currentVideoTitle: '',
      currentVideoHtml: '',
      previousVideoIndex: -1,
    }
  }

  componentDidMount() {
    $.ajax({
      url: 'https://www.reddit.com/r/Roadcam.json',
      type: 'GET',
      dataType: 'json',
      cache: false,
      success: function(response) {
        this.setState({ videos: response.data.children })
        this.loadNewVideo()
      }.bind(this),
      error: function(xhr, status, errorThrown) {
        alert('Sorry, there was a problem loading the data!\nTry refreshing the page.')
        /* eslint-disable no-console */
        console.log(`Error: ${errorThrown}`)
        console.log(`Status: ${status}`)
        console.dir(xhr)
        /* eslint-enable no-console */
      }.bind(this),
    })
    $(function() {
      $(window).on('resize keyup', this.onResize)
    }.bind(this))
    this.videoDiv.addEventListener('dblclick', this.onResize)
  }

  componentWillUnmount() {
    $(function() {
      $(window).off('resize keyup', this.onResize)
    }.bind(this))
    this.videoDiv.removeEventListener('dblclick', this.onResize)
  }

  onResize() {
    const iframe = $(('iframe[src*="www.youtube.com"]'))
    setTimeout(() => iframe.height(iframe.width() / this.state.currentVideoAspectRatio))
  }

  loadNewVideo() {
    let newIndex = this.state.previousVideoIndex
    while (newIndex === this.state.previousVideoIndex || !this.state.videos[newIndex].data.media_embed.content) {
      newIndex = Math.floor(this.state.videos.length * Math.random())
    }
    const video = this.state.videos[newIndex].data
    const videoRawHtml = video.media_embed.content
    const videoWidth = parseInt(videoRawHtml.match(/width="(\d+)"/)[1], 10)
    const videoHeight = parseInt(videoRawHtml.match(/height="(\d+)"/)[1], 10)
    const videoAspectRatio = videoWidth / videoHeight
    const videoHtml = videoRawHtml
      .replace(/&lt;/g, '<') // fix opening tags
      .replace(/&gt;/g, '>') // fix closing tags
      .replace(/width="\d+"/, 'class="video"') // remove fixed width
      .replace(/height="\d+"/, '') // remove fixed height
    this.setState({
      currentVideoTitle: video.title,
      currentVideoHtml: videoHtml,
      currentVideoAspectRatio: videoAspectRatio,
    })
    this.setState({ previousVideoIndex: newIndex })
    $(function() {
      $(window).resize() // trigger a resize event to make the embedded video fit
    })
  }

  videoHtml() {
    return { __html: this.state.currentVideoHtml }
  }

  render() {
    return (
      <div className={this.props.className}>
        <h5>{this.state.currentVideoTitle}</h5>
        <div
          ref={(div) => this.videoDiv = div}
          dangerouslySetInnerHTML={this.videoHtml()}
          />
      </div>
    )
  }
}

Video.propTypes = {
  className: PropTypes.string,
}
