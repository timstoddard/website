import React from 'react';

export default React.createClass({
  render() {
    document.title = 'Page Not Found';
    return <div>The page you're looking for does not exist.</div>;
  }
});
