import React from 'react';
import { Link } from 'react-router';

export default React.createClass({
  render() {
    return <Link {...this.props} activeClassName="nav__link--active"/>
  }
});
