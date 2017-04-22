import React, { PropTypes } from 'react'
import { Link } from 'react-router'

import NavLink from '../NavLink'

const LC3 = ({ children }) => {
  document.title = 'LC3 Info'
  return (<div>
    <nav>
      <div className="nav-wrapper light-blue">
        <ul id="nav-mobile">
          <li><Link to="/lc3">LC3 Home</Link></li>
          <li><NavLink to="/lc3/ref">ISA Reference</NavLink></li>
          <li><NavLink to="/lc3/sim">Simulator Info</NavLink></li>
          <li><NavLink to="/lc3/tables">Helpful Tables</NavLink></li>
        </ul>
      </div>
    </nav>
    {children}
  </div>)
}

LC3.propTypes = {
  children: PropTypes.node.isRequired,
}

export default LC3
