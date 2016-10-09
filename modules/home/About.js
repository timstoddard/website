import React from 'react';
import { Link } from 'react-router';

import './About.scss';

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
      return <div key={index} className="">
        <a href={icon.href} target="_blank">
          <img
            className="about__icon"
            src={`../../media/logos/${icon.name.toLowerCase()}.png`}
            alt={icon.name} />
        </a>
      </div>;
    });
    return <div className="about__icons">
      {iconLinks}
    </div>;
  }
});

export default React.createClass({
  render() {
    document.title = 'About';
    return <div className="about">
      <div className="container">
        <h3 className="about__title center-align">Hi, I'm Tim!</h3>
        <h5 className="about__text">
          I am a second year student at <a className="about__link" href="http://calpoly.edu" target="_blank">Cal Poly, San Luis Obispo</a> studying Computer Science.
        </h5>
        <h5 className="about__text">
          I currently work as a software engineering intern at <a className="about__link" href="https://socreate.it" target="_blank">SoCreate</a>, where I use Angular 2 to build front-end components for the application they are working on. Over the past few months, I wrote and maintained Jasmine unit tests to cover the entire application — about 600 tests in total.
        </h5>
        <h5 className="about__text">
          Feel free to have a look around the site and/or <a className="about__link" href="mailto:tstoddar@calpoly.edu?subject=Saw%20your%20site,%20would%20like%20to%20get%20in%20touch%20with%20you">contact me</a> if you are interested in working together!
        </h5>
        <IconLinks />
        <Link className="" to=""><h5 className="about__link center-align">Home</h5></Link>
      </div>
    </div>;
  }
});
