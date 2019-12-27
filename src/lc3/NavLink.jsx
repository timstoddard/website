import * as React from 'react'
import { NavLink as ReactNavLink } from 'react-router-dom'

const NavLink = (props) => (
  <ReactNavLink
    {...props}
    activeClassName='nav__link--active' />
)

export default NavLink
