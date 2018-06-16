import React from 'react'
import PropTypes from 'prop-types'

const CustomTable = ({ title, headers, body }) => (
  <div>
    <h3 className="center-align">
      {title}
    </h3>
    <table className="LC3CustomTable bordered centered">
      <thead>
        <tr>
          {headers.map(header => (
            <th key={header}>
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{body}</tbody>
    </table>
  </div>
)

CustomTable.propTypes = {
  title: PropTypes.string,
  headers: PropTypes.arrayOf(PropTypes.string),
  body: PropTypes.arrayOf(PropTypes.node),
}

CustomTable.defaultProps = {
  title: '',
  headers: [],
  body: [],
}

export default CustomTable
