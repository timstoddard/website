import React from 'react';

import CustomTable from './CustomTable';
import './DeviceRegisterAssignments.scss';

export default React.createClass({
  getInitialState() {
    return {
      data: [
        {
          opcode: '.ORIG',
          operand: 'address',
          meaning: 'starting address of program'
        },
        {
          opcode: '.END',
          operand: 'n/a',
          meaning: 'end of program'
        },
        {
          opcode: '.BLKW',
          operand: 'n',
          meaning: 'allocate n words of storage'
        },
        {
          opcode: '.FILL',
          operand: 'n',
          meaning: 'allocate one word, initialize with value n'
        },
        {
          opcode: '.STRINGZ',
          operand: 'n-character string',
          meaning: 'allocate n + 1 instructions, initialize with characters and null terminator'
        }
      ]
    }
  },
  render() {
    let headers = ['Opcode', 'Operand', 'Meaning'];
    let rows = this.state.data.map((row, index) =>
      <tr key={index}>
        <td>{row.opcode}</td>
        <td>{row.operand}</td>
        <td>{row.meaning}</td>
      </tr>);
    return <CustomTable title="Assembler Directives" headers={headers} body={rows} />;
  }
});
