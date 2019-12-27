import React from 'react'
import PropTypes from 'prop-types'

import NavLink from '../NavLink'

const LC3Tables = ({ children }) => (
  <div className="container">
    <ul className="center-align">
      <li className="LC3Tables__navLink">
        <NavLink to="/lc3/tables/assembler-directives">Assembler Directives</NavLink>
      </li>
      <li className="LC3Tables__navLink">
        <NavLink to="/lc3/tables/trap-service-routines">Trap Service Routines</NavLink>
      </li>
      <li className="LC3Tables__navLink">
        <NavLink to="/lc3/tables/device-register-assignments">Device Register Assignments</NavLink>
      </li>
      <li className="LC3Tables__navLink">
        <NavLink to="/lc3/tables/memory-map">Memory Map</NavLink>
      </li>
    </ul>
    {children}
  </div>
)

LC3Tables.propTypes = {
  children: PropTypes.node,
}

LC3Tables.defaultProps = {
  children: null,
}

export default LC3Tables
