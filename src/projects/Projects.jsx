import React, { PropTypes } from 'react'
import { Link } from 'react-router'

import NavLink from '../NavLink'

const Projects = ({ children }) =>
  <div className="projects">
    <nav className="projects__nav blue">
      <ul>
        <li><Link to="/projects" className="projects__title">projects</Link></li>
        <li><NavLink to="/projects/bingo">Bingo</NavLink></li>
        <li><NavLink to="/projects/heap">Heap</NavLink></li>
        <li><NavLink to="/projects/imports">Imports</NavLink></li>
        <li><NavLink to="/projects/strobe">Strobe</NavLink></li>
        <li><NavLink to="/projects/time">Time</NavLink></li>
        <li><NavLink to="/projects/zen">Zen</NavLink></li>
      </ul>
    </nav>
    <div className="projects__children">
      {children}
    </div>
  </div>

Projects.propTypes = {
  children: PropTypes.node,
}

export default Projects
