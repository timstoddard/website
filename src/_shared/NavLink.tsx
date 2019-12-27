import * as React from 'react'
import { NavLink as ReactNavLink, NavLinkProps } from 'react-router-dom'

// TODO use native navlink instead of this class

const NavLink: React.StatelessComponent<NavLinkProps> = (props: NavLinkProps): JSX.Element => (
  <ReactNavLink
    {...props}
    activeClassName='nav__link--active' />
)

export default NavLink
