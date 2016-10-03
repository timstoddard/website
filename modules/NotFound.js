import React from 'react';
import { Link } from 'react-router';

import './NotFound.scss';

export default React.createClass({
  render() {
    document.title = 'Page Not Found';
    return <div className="notFound">
      <h1>The page you're looking for does not exist.</h1>
      <h1>
        <Link className="notFound__link" to="" key="home">Click here to go to the homepage.</Link>
      </h1>
      <img src="https://http.cat/404" />
    </div>;
  }
});
