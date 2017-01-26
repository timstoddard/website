import React from 'react';
import { Link } from 'react-router';

import './ProjectsHome.scss';

export default React.createClass({
  getInitialState() {
    return {
      data: [
        { name: 'Car Crash Bingo', href: '/projects/bingo' },
        { name: 'Max-Heap Visualizer', href: '/projects/heap' },
        { name: 'Angular 2 (ES6) Import Fixer', href: '/projects/imports' },
        { name: 'Strobe Light!', href: '/projects/strobe' },
        { name: 'Javascript Clock', href: '/projects/time' },
        { name: 'Zen Mode (Peaceful, Infinite Animation)', href: '/projects/zen' }
      ]
    }
  },
  render() {
    document.title = 'Projects';
    let links = this.state.data.map((link, index) => {
      return <li key={index}>
        <Link to={link.href}>
          <h5 className="projectsHome__link projectsHome__link--project">
            {link.name}
          </h5>
        </Link>
      </li>;
    });
    return <div className="container">
      <h5 className="projectsHome__title">Check out some of the cool things I've made!</h5>
      <p>Most of these projects were originally written in vanilla Javascript + jQuery, so I rewrote them in React to work with this site. Click on any project's name to view it!</p>
      <ul>
        {links}
      </ul>
      <hr className="projectsHome__divider" />
      <h5 className="center-align">
        <Link to="" className="projectsHome__link">Home</Link>
      </h5>
    </div>;
  }
});
