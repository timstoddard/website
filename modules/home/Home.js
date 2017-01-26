import React from 'react';
import { Link } from 'react-router';

let SplitLetters = React.createClass({
  propTypes: {
    text: React.PropTypes.string
  },
  render() {
    let letters = this.props.text.split('').map((letter, index) =>
      <span key={index} className="home__link--letter">{letter}</span>)
    return <div>{letters}</div>;
  }
});

export default React.createClass({
  render() {
    document.title = 'Tim Stoddard';
    return <div className="home">
      <div className="home__verticalAlignWrapper">
        <h1 className="home__header--name">tim</h1>
        <h1 className="home__header--name">stod</h1>
        <h1 className="home__header--name">dard</h1>
      </div>
      <div className="home__verticalAlignWrapper">
        <ul className="home__links center-align">
          <li className="home__link">
            <Link className="home__link--text" to="/about">about</Link>
          </li>
          <li className="home__link">
            <Link className="home__link--text" to="/projects">projects</Link>
          </li>
          <li className="home__link">
            <Link className="home__link--text" to="https://drive.google.com/file/d/0B9dz0Ddcl3ESRm9GN2V0bW1HMFk/view?usp=sharing" target="_blank">resume</Link>
          </li>
        </ul>
      </div>
    </div>;
  }
});
