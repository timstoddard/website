import React from 'react';

import './Bingo.scss';

class BingoCellState {
  static get UNSELECTED() { return 0; }
  static get SELECTED() { return 1; }
  static get SUBMITTED() { return 2; }
}

let BingoVideo = React.createClass({
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
      $(window).on('resize', this.onResize);
    }.bind(this));
  },
  componentWillUnmount() {
    $(function() {
      $(window).off('resize', this.onResize);
    }.bind(this));
  },
  onResize() {
    let iframe = $(('iframe[src*="www.youtube.com"]'));
    iframe.height(iframe.width() / this.state.currentVideoAspectRatio);
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
      <h4>{this.state.currentVideoTitle}</h4>
      <div dangerouslySetInnerHTML={this.videoHtml() } />
    </div>;
  }
});

let BingoCell = React.createClass({
  propTypes: {
    'onClick': React.PropTypes.func,
    'status': React.PropTypes.oneOf([
      BingoCellState.UNSELECTED,
      BingoCellState.SELECTED,
      BingoCellState.SUBMITTED
    ]),
    'title': React.PropTypes.string,
  },
  onClick() {
    this.props.onClick();
  },
  getModifierClassName() {
    switch (this.props.status) {
      case BingoCellState.SUBMITTED:
        return ' green accent-3';
      case BingoCellState.SELECTED:
        return ' yellow lighten-1';
      default:
        return '';
    }
  },
  render() {
    return <td
      className={'board__cell' + this.getModifierClassName() }
      onClick={this.onClick}>
      {this.props.title}
    </td>;
  }
});

let BingoBoard = React.createClass({
  propTypes: {
    'className': React.PropTypes.string,
    'onSubmit': React.PropTypes.func
  },
  getInitialState() {
    return this.init();
  },
  init() {
    let board = [];
    for (let i = 0; i < 25; i++) {
      if (i !== 12) {
        board.push(BingoCellState.UNSELECTED);
      } else {
        // middle square is a freebie
        board.push(BingoCellState.SUBMITTED);
      }
    }
    return {
      items: this.getItems(),
      board: board,
      moveCount: 0,
      selectedCells: 0,
      buttonText: 'submit',
      userWon: false
    };
  },
  onClick(index) {
    if (!this.state.userWon) {
      let newBoard = this.state.board.slice();
      let selectedCells = this.state.selectedCells;
      if (newBoard[index] === BingoCellState.UNSELECTED) {
        newBoard[index] = BingoCellState.SELECTED;
        selectedCells++;
      } else {
        newBoard[index] = BingoCellState.UNSELECTED;
        selectedCells--;
      }
      this.setState({ board: newBoard, selectedCells: selectedCells });
    }
  },
  onSubmit() {
    // load new game if user won
    if (this.state.userWon) {
      this.props.onSubmit();
      this.setState(this.init());
      return;
    }

    // update status of all selected cells
    let newBoard = this.state.board.slice();
    for (let i = 0; i < 25; i++) {
      if (newBoard[i] === BingoCellState.SELECTED) {
        newBoard[i] = BingoCellState.SUBMITTED;
      }
    }
    this.setState({
      board: newBoard,
      moveCount: this.state.moveCount + 1
    }, () => {
      // check for bingo on rows and columns
      for (let i = 0; i < 5; i++) {
        let fullColumn = true, fullRow = true;
        for (let j = 0; j < 5; j++) {
          if (this.state.board[i * 5 + j] !== BingoCellState.SUBMITTED) {
            fullRow = false;
          }
          if (this.state.board[j * 5 + i] !== BingoCellState.SUBMITTED) {
            fullColumn = false;
          }
        }
        if (this.potentialWin(fullColumn || fullRow)) {
          return;
        }
      }

      // check for bingo on diagonals
      let fullDiagonalDown = true, fullDiagonalUp = true;
      for (let j = 0; j < 5; j++) {
        if (this.state.board[j * 5 + j] !== BingoCellState.SUBMITTED) {
          fullDiagonalDown = false;
        }
        if (this.state.board[(j + 1) * 4] !== BingoCellState.SUBMITTED) {
          fullDiagonalUp = false;
        }
      }
      if (this.potentialWin(fullDiagonalDown || fullDiagonalUp)) {
        return;
      }

      // load a new video since the user hasn't won yet
      this.props.onSubmit();
    });
  },
  potentialWin(won) {
    if (won) {
      this.setState({ userWon: true });
      this.setState({ buttonText: 'play again' });
    }
    return won;
  },
  getItems() {
    let items = [
      'Russia',
      'BMW',
      'Prius',
      'Lada',
      'Semi/Bus',
      'Brake check',
      'Bicyclist',
      'Motorcyclist',
      'Runs red light',
      'Distracted driving',
      'Shoulder driving',
      'Inclement weather',
      'Snowbird',
      'Loose wheel/hubcap',
      'Explosion/Fire',
      'No headlights at night',
      'Vehicle flipping over',
      'Instant karma',
      'Speeding',
      'Slow driving',
      'Air horn/Train horn',
      'Late exit',
      'Overtaking',
      'Merging',
      'Road rage',
      'Pedestrian on vehicle assault',
      'Left turner',
      'U-turner'
    ];
    this.shuffle(items);
    // middle square is a freebie
    items.splice(12, 0, 'FREE (Blame the cammer)');
    while (items.length > 25) {
      items.pop();
    }
    return items;
  },
  shuffle(array) {
    let m = array.length, t, i;
    while (m) {
      i = Math.floor(Math.random() * m--);
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
    return array;
  },
  render() {
    let tableRows = [];
    for (let i = 0; i < 5; i++) {
      let tableRow = [];
      for (let j = 0; j < 5; j++) {
        let index = i * 5 + j;
        tableRow.push(<BingoCell
          key={index}
          title={this.state.items[index]}
          status={this.state.board[index]}
          onClick={this.onClick.bind(this, index) } />);
      }
      tableRows.push(<tr key={'r' + i}>{tableRow}</tr>);
    }
    return <div className={this.props.className}>
      <table className="centered">
        <tbody>{tableRows}</tbody>
      </table>
      <BingoControlPanel
        moveCount={this.state.moveCount}
        selectedCells={this.state.selectedCells}
        buttonText={this.state.buttonText}
        onSubmit={this.onSubmit} />
    </div>;
  }
});

let BingoControlPanel = React.createClass({
  propTypes: {
    'buttonText': React.PropTypes.string,
    'moveCount': React.PropTypes.number,
    'selectedCells': React.PropTypes.number,
    'onSubmit': React.PropTypes.func
  },
  render() {
    return <div className="board__controls row">
      <div className="col s6">
        <div>{`Moves: ${this.props.moveCount}`}</div>
        <div>{`Selected cells: ${this.props.selectedCells}`}</div>
      </div>
      <div className="col s6">
        <a
          className="waves-effect waves-light btn light-blue accent-2"
          onClick={this.props.onSubmit}>
          {this.props.buttonText}
        </a>
      </div>
    </div>;
  }
});

export default React.createClass({
  loadNewVideo() {
    this.videoPlayer.loadNewVideo();
  },
  render() {
    document.title = 'Bingo';
    return <div className="center-align row">
      <h3>Car Crash Bingo</h3>
      <BingoVideo
        className="video col s12 m12 l6"
        ref={(comp) => this.videoPlayer = comp} />
      <BingoBoard
        className="board col s12 m12 l6"
        onSubmit={this.loadNewVideo} />
    </div>;
  }
});
