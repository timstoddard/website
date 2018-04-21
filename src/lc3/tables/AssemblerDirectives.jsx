import React from 'react'

import CustomTable from './CustomTable'

const headers = ['Opcode', 'Operand', 'Meaning']
const data = [
  {
    opcode: '.ORIG',
    operand: 'address',
    meaning: 'starting address of program',
  },
  {
    opcode: '.END',
    operand: 'n/a',
    meaning: 'end of program',
  },
  {
    opcode: '.BLKW',
    operand: 'n',
    meaning: 'allocate n words of storage',
  },
  {
    opcode: '.FILL',
    operand: 'n',
    meaning: 'allocate one word, initialize with value n',
  },
  {
    opcode: '.STRINGZ',
    operand: 'n-character string',
    meaning: 'allocate n + 1 instructions, initialize with characters and null terminator',
  },
]

const AssemblerDirectives = () => {
  const rows = data.map(({ opcode, operand, meaning }) =>
    (<tr key={opcode}>
      <td>{opcode}</td>
      <td>{operand}</td>
      <td>{meaning}</td>
     </tr>))
  return (
    <CustomTable
      title="Assembler Directives"
      headers={headers}
      body={rows}
      />
  )
}

export default AssemblerDirectives
