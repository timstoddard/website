import React from 'react'

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

export default CustomTable
