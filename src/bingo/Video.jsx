import React, { Component } from 'react'
import PropTypes from 'prop-types'

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
      success: function({ data }) {
        this.setState({ videos: data.children })
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
    const { currentVideoAspectRatio } = this.state
    const iframe = $(('iframe[src*="www.youtube.com"]'))
    setTimeout(() => iframe.height(iframe.width() / currentVideoAspectRatio))
  }

  loadNewVideo() {
    const { videos, previousVideoIndex } = this.state
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

  render() {
    const { className } = this.props
    const { currentVideoTitle, currentVideoHtml } = this.state
    return (
      <div className={className}>
        <h5>{currentVideoTitle}</h5>
        <div
          ref={(div) => this.videoDiv = div}
          dangerouslySetInnerHTML={{ __html: currentVideoHtml }} />
      </div>
    )
  }
}

Video.propTypes = {
  className: PropTypes.string,
}

Video.defaultProps = {
  className: '',
}
