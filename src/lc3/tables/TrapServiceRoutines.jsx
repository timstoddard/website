import React from 'react'

import CustomTable from './CustomTable'

const headers = ['Trap Vector', 'Assembler Name', 'Description']
const data = [
  {
    trapVector: 'x20',
    assemblerName: 'GETC',
    description: 'Read a single character from the keyboard. The character is not echoed onto the console. Its ASCII code is copied into R0. The high eight bits of R0 are cleared.',
  },
  {
    trapVector: 'x21',
    assemblerName: 'OUT',
    description: 'Write a character in R0[7:0] to the console display.',
  },
  {
    trapVector: 'x22',
    assemblerName: 'PUTS',
    description: 'Write a string of ASCII characters to the console display. The characters are contained in consecutive memory locations, one character per memory location, starting with the address specified in R0. Writing terminates with the occurrence of x0000 in a memory location.',
  },
  {
    trapVector: 'x23',
    assemblerName: 'IN',
    description: 'Print a prompt on the screen and read a single character from the keyboard. The character is echoed onto the console monitor, and its ASCII code is copied into R0. The high eight bits of R0 are cleared.',
  },
  {
    trapVector: 'x24',
    assemblerName: 'PUTSP',
    description: 'Write a string of ASCII characters to the console. The characters are contained in consecutive memory locations, two characters per memory location, starting with the address specified in R0. The ASCII code contained in bits [7:0] of a memory location is written to the console first. Then the ASCII code contained in bits [15:8] of that memory location is written to the console. (A character string consisting of an odd number of characters to be written will have x00 in bits [15:8] of the memory location containing the last character to be written.) Writing terminates with the occurrence of x0000 in a memory location.',
  },
  {
    trapVector: 'x25',
    assemblerName: 'HALT',
    description: 'Halt execution and print a message on the console.',
  },
]

const TrapServiceRoutines = () => {
  const rows = data.map(row =>
    <tr key={row.trapVector}>
      <td>{row.trapVector}</td>
      <td>{row.assemblerName}</td>
      <td>{row.description}</td>
    </tr>)
  return (
    <CustomTable
      title="Trap Service Routines"
      headers={headers}
      body={rows}
      />
  )
}

export default TrapServiceRoutines
