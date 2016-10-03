import React from 'react';

import './About.scss';

export default React.createClass({
  render() {
    document.title = 'About';
    return <div>
      <p>I am a 2nd year student at Cal Poly, San Luis Obispo studying computer science. I am also a software engineering intern at SoCreate.</p>
    </div>
  }
});
