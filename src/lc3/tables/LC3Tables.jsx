import React from 'react'

import NavLink from '../../NavLink'
import './LC3Tables.scss'

export default React.createClass({
  render() {
    return (<div className="container">
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
      {this.props.children}
    </div>)
  },
})
