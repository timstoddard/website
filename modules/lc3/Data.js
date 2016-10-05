export const data = [
  {
    name: 'ADD',
    function: 'Addition',
    formats: [
      {
        assemblerFormat: {
          name: 'ADD',
          args: 'DR, SR1, SR2'
        },
        encoding: [
          '0001',
          { value: 'DR', bits: 3 },
          { value: 'SR1', bits: 3 },
          '0',
          '00',
          { value: 'SR2', bits: 3 }
        ]
      },
      {
        assemblerFormat: {
          name: 'ADD',
          args: 'DR, SR1, imm5'
        },
        encoding: [
          '0001',
          { value: 'DR', bits: 3 },
          { value: 'SR1', bits: 3 },
          '1',
          { value: 'imm5', bits: 5 }
        ]
      }
    ],
    operation: [
      { text: 'if (bit[5] == 0)', indentationLevel: 0 },
      { text: 'DR = SR1 + SR2;', indentationLevel: 1 },
      { text: 'else', indentationLevel: 0 },
      { text: 'DR = SR1 + SEXT(imm5);', indentationLevel: 1 },
      { text: 'setcc();', indentationLevel: 0 }
    ],
    description: 'If bit [5] is 0, the second source operand is obtained from SR2. If bit [5] is 1, the second source operand is obtained by sign-extending the imm5 field to 16 bits. In both cases, the second source operand is added to the contents of SR1 and the result stored in DR. The condition codes are set, based on whether the result is negative, zero, or positive.',
    examples: [
      { text: 'ADD R3, R1, R2', description: 'Adds the value in R1 and the value in R2, then stores the result in R3.' },
      { text: 'ADD R2, R1, #5', description: 'Adds the value in R1 and the number 5, then stores the result in R2.' }
    ]
  },
  {
    name: 'AND',
    function: 'Bitwise Logical AND',
    formats: [
      {
        assemblerFormat: {
          name: 'AND',
          args: 'DR, SR1, SR2'
        },
        encoding: [
          '0101',
          { value: 'DR', bits: 3 },
          { value: 'SR1', bits: 3 },
          '0',
          '00',
          { value: 'SR2', bits: 3 }
        ]
      },
      {
        assemblerFormat: {
          name: 'AND',
          args: 'DR, SR1, imm5'
        },
        encoding: [
          '0101',
          { value: 'DR', bits: 3 },
          { value: 'SR1', bits: 3 },
          '1',
          { value: 'imm5', bits: 5 }
        ]
      }
    ],
    operation: [
      { text: 'if (bit[5] == 0)', indentationLevel: 0 },
      { text: 'DR = SR1 AND SR2;', indentationLevel: 1 },
      { text: 'else', indentationLevel: 0 },
      { text: 'DR = SR1 AND SEXT(imm5);', indentationLevel: 1 },
      { text: 'setcc();', indentationLevel: 0 }
    ],
    description: 'If bit [5] is 0, the second source operand is obtained from SR2. If bit [5] is 1, the second source operand is obtained by sign-extending the imm5 field to 16 bits. In either case, the second source operand and the contents of SR1 are bitwise ANDed, and the result stored in DR. The condition codes are set, based on whether the binary value produced, taken as a 2’s complement integer, is negative, zero, or positive.',
    examples: [
      { text: 'AND R3, R1, R2', description: 'ANDs the value in R1 and the value in R2, then stores the result in R3.' },
      { text: 'AND R2, R1, #5', description: 'ANDs the value in R1 and the number 5, then stores the result in R2.' }
    ]
  },
  {
    name: 'BR',
    function: 'Conditional Branch',
    formats: [
      {
        assemblerFormat: {
          name: 'BRn?z?p?',
          args: 'PCOffset9'
        },
        encoding: [
          '0000',
          { value: 'n', bits: 1 },
          { value: 'z', bits: 1 },
          { value: 'p', bits: 1 },
          { value: 'PCOffset9', bits: 9 },
        ]
      }
    ],
    operation: [
      { text: 'if ((n AND N) OR (z AND Z) OR (p AND P))', indentationLevel: 0 },
      { text: 'PC = PC* + SEXT(PCOffset9);', indentationLevel: 1 },
      { text: '*This is the incremented PC', tooltip: true }
    ],
    description: 'The condition codes specified by the state of bits [11:9] are tested. If bit [11] is set, N is tested; if bit [11] is clear, N is not tested. If bit [10] is set, Z is tested, etc. If any of the condition codes tested is set, the program branches to the location specified by adding the sign-extended PCOffset9 field to the incremented PC.',
    examples: [
      { text: 'BRzp #-7', description: 'Set the PC to 7 instructions before the incremented PC if the last result was zero or positive.' },
      { text: 'BR #5', description: 'Unconditionally move to the next instruction. The assembly language opcode BR is interpreted the same as BRnzp; that is, always branch to the target address.' }
    ]
  },
  {
    name: 'JMP',
    function: 'Jump',
    formats: [
      {
        assemblerFormat: {
          name: 'JMP',
          args: 'BaseR'
        },
        encoding: [
          '1100',
          '000',
          { value: 'BaseR', bits: 3 },
          '000000'
        ]
      }
    ],
    operation: [
      { text: 'PC = BaseR;', indentationLevel: 0 }
    ],
    description: 'The program unconditionally jumps to the location specified by the contents of the base register. Bits [8:6] identify the base register.',
    examples: [
      { text: 'JMP R2', description: 'The PC is loaded with the contents of R2.' }
    ]
  },
  {
    name: 'JSR',
    function: 'Jump to Subroutine',
    formats: [
      {
        assemblerFormat: {
          name: 'JSR',
          args: 'PCOffset11'
        },
        encoding: [
          '0100',
          '1',
          { value: 'PCOffset11', bits: 11 }
        ]
      },
      {
        assemblerFormat: {
          name: 'JSRR',
          args: 'BaseR'
        },
        encoding: [
          '0100',
          '0',
          '00',
          { value: 'BaseR', bits: 3 },
          '000000'
        ]
      }
    ],
    operation: [
      { text: 'R7 = PC*;', indentationLevel: 0 },
      { text: 'if (bit[11] == 0)', indentationLevel: 0 },
      { text: 'PC = BaseR;', indentationLevel: 1 },
      { text: 'else', indentationLevel: 0 },
      { text: 'PC = PC* + SEXT(PCOffset11);', indentationLevel: 1 },
      { text: '*This is the incremented PC', tooltip: true }
    ],
    description: 'First, the incremented PC is saved in R7. This is the linkage back to the calling routine. Then the PC is loaded with the address of the first instruction of the subroutine, causing an unconditional jump to that address. The address of the subroutine is obtained from the base register (if bit [11] is 0), or the address is computed by sign-extending bits [10:0] and adding this value to the incremented PC (if bit [11] is 1).',
    examples: [
      { text: 'JSR #4', description: 'Put the address of the instruction following JSR into R7, then add 4 to the incremented PC.' },
      { text: 'JSRR R3', description: 'Put the address following JSRR into R7, then jump to the address contained in R3.' }
    ]
  },
  {
    name: '',
    function: '',
    formats: [
      {
        assemblerFormat: {
          name: '',
          args: ''
        },
        encoding: [
          '',
          { value: '', bits: 0 }
        ]
      }
    ],
    operation: [
      { text: '', indentationLevel: 0 }
    ],
    description: '',
    examples: [
      { text: '', description: '' }
    ]
  },
  {
    name: '',
    function: '',
    formats: [
      {
        assemblerFormat: {
          name: '',
          args: ''
        },
        encoding: [
          '',
          { value: '', bits: 0 }
        ]
      }
    ],
    operation: [
      { text: '', indentationLevel: 0 }
    ],
    description: '',
    examples: [
      { text: '', description: '' }
    ]
  },
  {
    name: '',
    function: '',
    formats: [
      {
        assemblerFormat: {
          name: '',
          args: ''
        },
        encoding: [
          '',
          { value: '', bits: 0 }
        ]
      }
    ],
    operation: [
      { text: '', indentationLevel: 0 }
    ],
    description: '',
    examples: [
      { text: '', description: '' }
    ]
  },
  {
    name: '',
    function: '',
    formats: [
      {
        assemblerFormat: {
          name: '',
          args: ''
        },
        encoding: [
          '',
          { value: '', bits: 0 }
        ]
      }
    ],
    operation: [
      { text: '', indentationLevel: 0 }
    ],
    description: '',
    examples: [
      { text: '', description: '' }
    ]
  },
  {
    name: '',
    function: '',
    formats: [
      {
        assemblerFormat: {
          name: '',
          args: ''
        },
        encoding: [
          '',
          { value: '', bits: 0 }
        ]
      }
    ],
    operation: [
      { text: '', indentationLevel: 0 }
    ],
    description: '',
    examples: [
      { text: '', description: '' }
    ]
  },
  {
    name: 'RET',
    function: 'Return From Subroutine',
    formats: [
      {
        assemblerFormat: {
          name: 'RET',
          args: ''
        },
        encoding: [
          '1100',
          '000',
          '111',
          '000000'
        ]
      }
    ],
    operation: [
      { text: 'PC = BaseR;', indentationLevel: 0 }
    ],
    description: 'The program unconditionally jumps to the location specified by the contents of the base register. Bits [8:6] identify the base register. The RET instruction is a special case of the JMP instruction. The PC is loaded with the contents of R7, which contains the linkage back to the instruction following the subroutine call instruction.',
    examples: [
      { text: 'RET', description: 'The PC is loaded with the contents of R7.' }
    ]
  },
  {
    name: '',
    function: '',
    formats: [
      {
        assemblerFormat: {
          name: '',
          args: ''
        },
        encoding: [
          '',
          { value: '', bits: 0 }
        ]
      }
    ],
    operation: [
      { text: '', indentationLevel: 0 }
    ],
    description: '',
    examples: [
      { text: '', description: '' }
    ]
  },
];
