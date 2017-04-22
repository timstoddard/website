import React from 'react'

import CustomTable from './CustomTable'
import './DeviceRegisterAssignments.scss'

export default React.createClass({
  getInitialState() {
    return {
      data: [
        {
          address: 'xFE00',
          registerName: 'Keyboard status register',
          alsoKnownAs: 'KBSR',
          registerFunction: 'The ready bit (bit [15]) indicates if the keyboard has received a new character.',
        },
        {
          address: 'xFE02',
          registerName: 'Keyboard data register',
          alsoKnownAs: 'KBDR',
          registerFunction: 'Bits [7:0] contain the last character typed on the keyboard.',
        },
        {
          address: 'xFE04',
          registerName: 'Display status register',
          alsoKnownAs: 'DSR',
          registerFunction: 'The ready bit (bit [15]) indicates if the display device is ready to receive another character to print on the screen.',
        },
        {
          address: 'xFE06',
          registerName: 'Display data register',
          alsoKnownAs: 'DDR',
          registerFunction: 'A character written in the low byte of this register will be displayed on the screen.',
        },
        {
          address: 'xFFFE',
          registerName: 'Machine control register',
          alsoKnownAs: 'MCR',
          registerFunction: 'Bit [15] is the clock enable bit. When cleared, instruction processing stops.',
        },
      ],
    }
  },
  render() {
    const headers = ['Address', 'Register Name', 'Register Function']
    const rows = this.state.data.map((row, index) =>
      <tr key={index}>
        <td>{row.address}</td>
        <td>{`${row.registerName} (${row.alsoKnownAs})`}</td>
        <td>{row.registerFunction}</td>
      </tr>)
    return <CustomTable title="Device Register Assignments" headers={headers} body={rows} />
  },
})
