import React from 'react';

import NavLink from '../NavLink';

let IconLinks = React.createClass({
  getInitialState() {
    return {
      icons: [
        { name: 'Github', href: 'https://github.com/timstoddard' },
        { name: 'LinkedIn', href: 'https://linkedin.com/in/timstoddard200' },
        { name: 'Portfolium', href: 'https://portfolium.com/timstoddard' },
        { name: 'Facebook', href: 'https://facebook.com/timstoddard200' }
      ]
    };
  },
  render() {
    let iconLinks = this.state.icons.map((icon, index) => {
      return <div key={index} className="col s3">
        <a href={icon.href} target="_blank">
          <img
            className="home__icon"
            src={`../../media/logos/${icon.name.toLowerCase()}.png`}
            alt={icon.name} />
        </a>
      </div>;
    });
    return <div className="home__icons row right">
      {iconLinks}
    </div>;
  }
});

export default React.createClass({
  render() {
    return <div className="home right-align">
      <h1 className="home__header--name">
        <span className="home__header--phrase">tim stoddard</span>
      </h1>
      <h2 className="home__header--info">
        <span className="home__header--phrase">computer science</span> @ <span className="home__header--phrase">cal poly slo</span>
      </h2>
      <h2 className="home__header--info">
        <span className="home__header--phrase">software engineering intern</span> @ socreate
      </h2>
      <ul>
        <li><NavLink className="home__link flow-text" to="/about">About Me</NavLink></li>
        <li><NavLink className="home__link flow-text" to="/projects">Projects</NavLink></li>
        <li><NavLink className="home__link flow-text" to="/resume">Resume</NavLink></li>
      </ul>
      <IconLinks />
    </div>
  }
});
