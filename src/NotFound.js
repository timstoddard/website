import React from 'react';
import { Link } from 'react-router';

import './NotFound.scss';

let NotFound = React.createClass({
  render() {
    document.title = 'Page Not Found';
    let infoText=`Click here to go to ${this.props.goto}.`;
    return <div className="notFound">
      <h1>The page you're looking for does not exist.</h1>
      <h1>
        <Link className="notFound__link" to={this.props.to} key="home">{infoText}</Link>
      </h1>
      <img src="https://http.cat/404" />
    </div>;
  }
});

export const NotFoundWithProps = (to, goto) => {
  return () => <NotFound to={to} goto={goto} />;
};
