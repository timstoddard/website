import React from 'react';
import { Link } from 'react-router';

import './Home.scss';

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
            <Link className="home__link--text flow-text" to="/about">About Me</Link>
          </li>
          <li className="home__link">
            <Link className="home__link--text flow-text" to="/projects">Projects</Link>
          </li>
          <li className="home__link">
            <Link className="home__link--text flow-text" to="/resume">Resume</Link>
          </li>
        </ul>
      </div>
    </div>;
  }
});
