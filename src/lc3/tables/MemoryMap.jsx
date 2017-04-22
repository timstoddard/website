import React from 'react'

import CustomTable from './CustomTable'

const headers = ['Range', 'Range Length', 'Contents']
const data = [
  {
    start: 'x0000',
    end: 'x00FF',
    name: 'Trap Vector Table',
  },
  {
    start: 'x0100',
    end: 'x01FF',
    name: 'Interrupt Vector Tables',
  },
  {
    start: 'x0200',
    end: 'x2FFF',
    name: 'Operating System and Supervisor Stack',
  },
  {
    start: 'x3000',
    end: 'xFDFF',
    name: 'Available for user programs',
  },
  {
    start: 'xFE00',
    end: 'xFFFF',
    name: 'Device Register Addresses',
  },
]

const MemoryMap = () => {
  const rows = data.map(row => {
    const rangeStart = parseInt(`0${row.start}`, 16)
    const rangeEnd = parseInt(`0${row.end}`, 16)
    const rangeLength = rangeEnd - rangeStart
    return (
      <tr key={row.start}>
        <td>{`${row.start} - ${row.end}`}</td>
        <td>{rangeLength}</td>
        <td>{row.name}</td>
      </tr>
    )
  })
  return (
    <CustomTable
      title="Memory Map"
      headers={headers}
      body={rows}
      />
  )
}

export default MemoryMap
