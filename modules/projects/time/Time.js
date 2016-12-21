import React from 'react';

import './Time.scss';

export default React.createClass({
  getInitialState() {
    return { timeStr: '' };
  },
  componentDidMount() {
    this.showTime();
  },
  showTime() {
    let now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let timeStr = '' + ((hours > 12) ? hours - 12 : (hours > 0 ? hours : 12));
    timeStr += ((minutes < 10) ? ':0' : ':') + minutes;
    timeStr += ((seconds < 10) ? ':0' : ':') + seconds;
    timeStr += (hours >= 12) ? ' PM' : ' AM';
    this.setState({ timeStr: timeStr });
    let millis = now.getMilliseconds();
    let updateTime = setTimeout(() => this.showTime(), 1000 - millis < 10 ? 1000 : 1000 - millis);
  },
  render() {
    document.title = 'Time';
    return <div className="time">{this.state.timeStr}</div>;
  }
});
