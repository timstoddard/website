import React from 'react';
import { Link } from 'react-router';

import './Home.scss';

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
        <h1 className="home__header--name">
          <Link to="">tim</Link>
        </h1>
        <h1 className="home__header--name">
          <Link to="">stod</Link>
        </h1>
        <h1 className="home__header--name">
          <Link to="">dard</Link>
        </h1>
      </div>
      <div className="home__verticalAlignWrapper">
        <ul className="home__links center-align">
          <li className="home__link">
            <Link className="home__link--text flow-text" to="/about">
              <SplitLetters text="about" />
            </Link>
          </li>
          <li className="home__link">
            <Link className="home__link--text flow-text" to="/projects">
              <SplitLetters text="projects" />
            </Link>
          </li>
          <li className="home__link">
            <Link className="home__link--text flow-text" to="/resume">
              <SplitLetters text="resume" />
            </Link>
          </li>
        </ul>
      </div>
    </div>;
  }
});
