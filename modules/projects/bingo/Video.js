import React from 'react';

export default React.createClass({
  propTypes: {
    'className': React.PropTypes.string
  },
  getInitialState() {
    return {
      videos: [],
      currentVideoTitle: '',
      currentVideoHtml: '',
      previousVideoIndex: -1
    };
  },
  componentDidMount() {
    $.ajax({
      url: 'https://www.reddit.com/r/Roadcam.json',
      type: 'GET',
      dataType: 'json',
      cache: false,
      success: function(response) {
        this.setState({ videos: response.data.children });
        this.loadNewVideo();
      }.bind(this),
      error: function(xhr, status, errorThrown) {
        alert('Sorry, there was a problem loading the data!\nTry refreshing the page.');
        /* eslint-disable no-console */
        console.log(`Error: ${errorThrown}`);
        console.log(`Status: ${status}`);
        console.dir(xhr);
        /* eslint-enable no-console */
      }.bind(this)
    });
    $(function() {
      $(window).on('resize keyup', this.onResize);
    }.bind(this));
    this.videoDiv.addEventListener('dblclick', this.onResize);
  },
  componentWillUnmount() {
    $(function() {
      $(window).off('resize keyup', this.onResize);
    }.bind(this));
    this.videoDiv.removeEventListener('dblclick', this.onResize);
  },
  onResize() {
    let iframe = $(('iframe[src*="www.youtube.com"]'));
    setTimeout(() => iframe.height(iframe.width() / this.state.currentVideoAspectRatio));
  },
  loadNewVideo() {
    let newIndex = this.state.previousVideoIndex;
    while (newIndex === this.state.previousVideoIndex || !this.state.videos[newIndex].data.media_embed.content) {
      newIndex = Math.floor(this.state.videos.length * Math.random());
    }
    let video = this.state.videos[newIndex].data;
    let videoRawHtml = video.media_embed.content;
    let videoWidth = parseInt(videoRawHtml.match(/width="(\d+)"/)[1], 10);
    let videoHeight = parseInt(videoRawHtml.match(/height="(\d+)"/)[1], 10);
    let videoAspectRatio = videoWidth / videoHeight;
    let videoHtml = videoRawHtml
      .replace(/&lt;/g, '<') // fix opening tags
      .replace(/&gt;/g, '>') // fix closing tags
      .replace(/width="\d+"/, 'class="bingo__video"') // remove fixed width
      .replace(/height="\d+"/, ''); // remove fixed height
    this.setState({
      currentVideoTitle: video.title,
      currentVideoHtml: videoHtml,
      currentVideoAspectRatio: videoAspectRatio
    });
    this.setState({ previousVideoIndex: newIndex });
    $(function() {
      $(window).resize(); // trigger a resize event to make the embedded video fit
    });
  },
  videoHtml() {
    return { __html: this.state.currentVideoHtml };
  },
  render() {
    return <div className={this.props.className}>
      <h5>{this.state.currentVideoTitle}</h5>
      <div
        ref={(div) => this.videoDiv = div}
        dangerouslySetInnerHTML={this.videoHtml() } />
    </div>;
  }
});