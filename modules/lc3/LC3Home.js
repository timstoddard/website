import React from 'react';

import NavLink from '../NavLink';
import './LC3Home.scss';

export default React.createClass({
  render() {
    return <div>
      <div>LC3 Home</div>
      <div className="LC3Home__link"><NavLink to="/lc3/ref">LC3 Reference</NavLink></div>
      <div className="LC3Home__link"><NavLink to="/lc3/sim">LC3 Simulator Info</NavLink></div>
    </div>;
  }
});
