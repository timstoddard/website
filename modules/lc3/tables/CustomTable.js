import React from 'react';

import './CustomTable.scss';

export default React.createClass({
  render() {
    let headers = this.props.headers.map((header, index) =>
      <th key={index}>{header}</th>);
    return <div>
      <h3 className="center-align">
        {this.props.title}
      </h3>
      <table className="LC3CustomTable bordered centered">
        <thead><tr>{headers}</tr></thead>
        <tbody>{this.props.body}</tbody>
      </table>
    </div>;
  }
});
