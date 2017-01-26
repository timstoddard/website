import React from 'react';

export default React.createClass({
  render() {
    document.title = 'Resume';
    return <div className="resume__wrapper light-blue lighten-2">
      <iframe
        src="https://docs.google.com/document/d/1OHDLVDrQRgwoitqV8NFHhp8YYwjKVDqJMC7DFEuMFJk/pub?embedded=true"
        className="resume__content z-depth-2" />
    </div>;
  }
});
