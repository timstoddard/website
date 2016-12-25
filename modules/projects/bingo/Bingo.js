import React from 'react';

import Board from './Board';
import Video from './Video';

import './Bingo.scss';

export default React.createClass({
  loadNewVideo() {
    this.videoPlayer.loadNewVideo();
  },
  render() {
    document.title = 'Bingo';
    return <div className="center-align row">
      <h3>Car Crash Bingo</h3>
      <Video
        className="video col s12 m12 l6"
        ref={(comp) => this.videoPlayer = comp} />
      <Board
        className="board col s12 m12 l6"
        onSubmit={this.loadNewVideo} />
    </div>;
  }
});
