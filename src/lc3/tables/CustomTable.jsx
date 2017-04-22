import React from 'react'

import './CustomTable.scss'

export default React.createClass({
  render() {
    return (<div>
      <h3 className="center-align">
        {this.props.title}
      </h3>
      <table className="LC3CustomTable bordered centered">
        <thead>
          <tr>
            {this.props.headers.map((header, index) =>
              <th key={index}>{header}</th>)}
          </tr>
        </thead>
        <tbody>{this.props.body}</tbody>
      </table>
    </div>)
  },
})
