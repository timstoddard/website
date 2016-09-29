import React from 'react';

export default React.createClass({
  render() {
    document.title = 'Page Not Found';
    return <div>
      <h1>The page you're looking for does not exist.</h1>
      <img src="https://http.cat/404" />
    </div>;
  }
});
