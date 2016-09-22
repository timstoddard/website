import React from 'react';
import { Link } from 'react-router';

import NavLink from '../NavLink';

export default React.createClass({
  getInitialState() {
    return null;
  },
  render() {
    document.title = 'Projects';
    return <div>
      <nav>
        <div className="nav-wrapper light-blue">
          <ul id="nav-mobile">
            <li><Link to="/projects" className="projects__title">projects</Link></li>
            <li><NavLink to="/projects/bingo">Bingo</NavLink></li>
            <li><NavLink to="/projects/heap">Heap</NavLink></li>
            <li><NavLink to="/projects/imports">Imports</NavLink></li>
            <li><NavLink to="/projects/strobe">Strobe</NavLink></li>
            <li><NavLink to="/projects/time">Time</NavLink></li>
            <li><NavLink to="/projects/weather">Weather</NavLink></li>
            <li><NavLink to="/projects/zen">Zen</NavLink></li>
          </ul>
        </div>
      </nav>
      {this.props.children}
    </div>
  }
});
