import React from 'react';

import CustomTable from './CustomTable';
import './MemoryMap.scss';

export default React.createClass({
  getInitialState() {
    return {
      data: [
        {
          start: 'x0000',
          end: 'x00FF',
          name: 'Trap Vector Table'
        },
        {
          start: 'x0100',
          end: 'x01FF',
          name: 'Interrupt Vector Tables'
        },
        {
          start: 'x0200',
          end: 'x2FFF',
          name: 'Operating System and Supervisor Stack'
        },
        {
          start: 'x3000',
          end: 'xFDFF',
          name: 'Available for user programs'
        },
        {
          start: 'xFE00',
          end: 'xFFFF',
          name: 'Device Register Addresses'
        },
      ]
    };
  },
  render() {
    let headers = ['Range', 'Range Length', 'Contents'];
    let rows = this.state.data.map((row, index) => {
      let rangeStart = parseInt(`0${row.start}`, 16);
      let rangeEnd = parseInt(`0${row.end}`, 16);
      let rangeLength = rangeEnd - rangeStart;
      return <tr key={index}>
        <td>{`${row.start} - ${row.end}`}</td>
        <td>{rangeLength}</td>
        <td>{row.name}</td>
      </tr>;
    });
    return <CustomTable title="Memory Map" headers={headers} body={rows} />;
  }
});
