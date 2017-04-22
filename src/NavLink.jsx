import React from 'react'
import { Link } from 'react-router'

import './NavLink.scss'

const NavLink = (props) =>
  <Link
    {...props}
    activeClassName="nav__link--active"
    />

export default NavLink
