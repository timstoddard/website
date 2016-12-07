import React from 'react';

import './Countdown.scss';

export default React.createClass({
  getInitialState() {
    return {
      time: 0,
      timeStr: '',
      largestWidth: 0,
      marginLeft: 0,
      windowWidth: 0
    }
  },
  componentDidMount() {
    this.startCountdown();
    setInterval(() => this.printCountdown());
    this.resetSizes();
    window.addEventListener('resize', this.resetSizes);
  },
  componentWillUnmount() {
    window.removeEventListener('resize', this.resetSizes);
  },
  startCountdown() {
    this.setState({ time: Date.now() + Math.round((1 + Math.random() * 3) * 60 * 60 * 1000) });
  },
  printCountdown() {
    let diff = this.state.time - Date.now();
    if (diff <= 0) {
      this.startCountdown();
    }
    let hours = Math.floor(diff / (60 * 60 * 1000));
    diff -= hours * 60 * 60 * 1000;
    let minutes = Math.floor(diff / (60 * 1000));
    diff -= minutes * 60 * 1000;
    let seconds = Math.floor(diff / 1000);
    diff -= seconds * 1000;
    let timeStr = hours + ':' + this.pad(minutes, 2) + ':' + this.pad(seconds, 2) + '.' + this.pad(diff, 3);
    this.countdownContainer.innerText = timeStr;
    let currWidth = this.countdownContainer.clientWidth;
    if (currWidth > this.state.largestWidth) {
      this.setState({
        largestWidth: currWidth,
        marginLeft: (this.state.windowWidth - currWidth) / 2
      });
    }
  },
  pad(n, len) {
    return ('00' + n).slice(-len);
  },
  resetSizes() {
    this.setState({
      largestWidth: 0,
      marginLeft: 0,
      windowWidth: window.innerWidth
    });
  },
  render() {
    document.title = 'Countdown';
    return <div className="countdown__container">
      <div
        ref={container => { this.countdownContainer = container; }}
        style={{ marginLeft: this.state.marginLeft + 'px' }}
        className="countdown__text">
        {this.state.timeStr}
      </div>
    </div>;
  }
});
