import React from 'react';
import { Link } from 'react-router';

import NavLink from '../NavLink';
import './LC3.scss';

export default React.createClass({
  render() {
    document.title = 'LC3 Info';
    return <div>
      <nav>
        <div className="nav-wrapper light-blue">
          <ul id="nav-mobile">
            <li><Link to="/lc3">LC3 Home</Link></li>
            <li><NavLink to="/lc3/ref">LC3 Reference</NavLink></li>
            <li><NavLink to="/lc3/sim">LC3 Simulator Info</NavLink></li>
          </ul>
        </div>
      </nav>
      {this.props.children}
    </div>
  }
});
