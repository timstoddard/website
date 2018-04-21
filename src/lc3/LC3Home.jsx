import React from 'react'

import NavLink from '../NavLink'

const LC3Home = () =>
  (<div className="container center-align">
    <h3>Hello, LC3 User!</h3>
    <p>Welcome to the interactive information site for the LC3.</p>
    <p>Click one of the links below to get started.</p>
    <div className="LC3Home__link"><NavLink to="/lc3/ref">ISA Reference</NavLink></div>
    <div className="LC3Home__link"><NavLink to="/lc3/sim">Simulator Info</NavLink></div>
    <div className="LC3Home__link"><NavLink to="/lc3/tables">Helpful Tables</NavLink></div>
   </div>)

export default LC3Home
