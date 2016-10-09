import React from 'react';
import { Link } from 'react-router';

import './ProjectsHome.scss';

export default React.createClass({
  getInitialState() {
    return {
      data: [
        { name: 'Car Crash Bingo', href: '/projects/bingo', works: true },
        { name: 'Heap Visualization', href: '/projects/heap', works: false },
        { name: 'Angular 2 Import Fixer', href: '/projects/imports', works: true },
        { name: 'Turn your screen into a strobe light!', href: '/projects/strobe', works: false },
        { name: 'Javascript Clock', href: '/projects/time', works: false },
        { name: 'Zen Mode - Peaceful Animation', href: '/zen', works: false }
      ]
    }
  },
  render() {
    document.title = 'Projects';
    let links = this.state.data.map((link, index) => {
      let modifier = link.works ? 'works' : 'broken';
      return <li key={index}>
        <Link to={link.href}>
          <h5 className={`projectsHome__link projectsHome__link--${modifier}`}>
            {link.name}
          </h5>
        </Link>
      </li>;
    });
    return <div className="projectsHome__background">
      <div className="container">
        <h3 className="projectsHome__title">Check out some of the cool things I've made!*</h3>
        <h5>*I'm still in the process of porting some of these projects from vanilla javascript into React. See the list below for which ones currently work.</h5>
        <ul>
          {links}
        </ul>
        <hr className="projectsHome__divider" />
        <Link to=""><h5 className="projectsHome__link--home center-align">Home</h5></Link>
      </div>
    </div>;
  }
});
