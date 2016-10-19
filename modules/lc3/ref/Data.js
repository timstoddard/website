export const instructions = [
  {
    name: 'ADD',
    function: 'Addition',
    modifiesConditionCodes: true,
    formats: [
      {
        assemblerFormat: { name: 'ADD', operands: 'DR, SR1, SR2' },
        encoding: [
          '0001',
          { value: 'DR', bits: 3 },
          { value: 'SR1', bits: 3 },
          '0',
          '00',
          { value: 'SR2', bits: 3 }
        ],
        examples: [{
          text: 'ADD R3, R1, R2',
          description: 'Adds the value in R1 and the value in R2, then stores the result in R3.'
        }]
      },
      {
        assemblerFormat: { name: 'ADD', operands: 'DR, SR1, imm5' },
        encoding: [
          '0001',
          { value: 'DR', bits: 3 },
          { value: 'SR1', bits: 3 },
          '1',
          { value: 'imm5', bits: 5 }
        ],
        examples: [{
          text: 'ADD R2, R1, #5',
          description: 'Adds the value in R1 and the number 5, then stores the result in R2.'
        }]
      }
    ],
    operation: [
      { text: 'if (bit[5] == 0)', indentationLevel: 0 },
      { text: 'DR = SR1 + SR2;', indentationLevel: 1 },
      { text: 'else', indentationLevel: 0 },
      { text: 'DR = SR1 + SEXT(imm5);', indentationLevel: 1 },
      { text: 'setcc();', indentationLevel: 0 }
    ],
    description: 'If bit [5] is 0, the second source operand is obtained from SR2. If bit [5] is 1, the second source operand is obtained by sign-extending the imm5 field to 16 bits. In both cases, the second source operand is added to the contents of SR1 and the result stored in DR. The condition codes are set, based on whether the result is negative, zero, or positive.'
  },
  {
    name: 'AND',
    function: 'Bitwise Logical AND',
    modifiesConditionCodes: true,
    formats: [
      {
        assemblerFormat: { name: 'AND', operands: 'DR, SR1, SR2' },
        encoding: [
          '0101',
          { value: 'DR', bits: 3 },
          { value: 'SR1', bits: 3 },
          '0',
          '00',
          { value: 'SR2', bits: 3 }
        ],
        examples: [{
          text: 'AND R3, R1, R2',
          description: 'ANDs the value in R1 and the value in R2, then stores the result in R3.'
        }]
      },
      {
        assemblerFormat: { name: 'AND', operands: 'DR, SR1, imm5' },
        encoding: [
          '0101',
          { value: 'DR', bits: 3 },
          { value: 'SR1', bits: 3 },
          '1',
          { value: 'imm5', bits: 5 }
        ],
        examples: [{
          text: 'AND R2, R1, #5',
          description: 'ANDs the value in R1 and the number 5, then stores the result in R2.'
        }]
      }
    ],
    operation: [
      { text: 'if (bit[5] == 0)', indentationLevel: 0 },
      { text: 'DR = SR1 AND SR2;', indentationLevel: 1 },
      { text: 'else', indentationLevel: 0 },
      { text: 'DR = SR1 AND SEXT(imm5);', indentationLevel: 1 },
      { text: 'setcc();', indentationLevel: 0 }
    ],
    description: 'If bit [5] is 0, the second source operand is obtained from SR2. If bit [5] is 1, the second source operand is obtained by sign-extending the imm5 field to 16 bits. In either case, the second source operand and the contents of SR1 are bitwise ANDed, and the result stored in DR. The condition codes are set, based on whether the binary value produced, taken as a 2’s complement integer, is negative, zero, or positive.'
  },
  {
    name: 'BR',
    function: 'Conditional Branch',
    modifiesConditionCodes: false,
    formats: [{
      assemblerFormat: { name: 'BRn?z?p?', operands: 'PCOffset9' },
      encoding: [
        '0000',
        { value: 'n', bits: 1 },
        { value: 'z', bits: 1 },
        { value: 'p', bits: 1 },
        { value: 'PCOffset9', bits: 9 },
      ],
      examples: [
        {
          text: 'BRzp #-7',
          description: 'Set the PC to 7 instructions before the incremented PC if the last result was zero or positive.'
        },
        {
          text: 'BR #5',
          description: 'Unconditionally move to the instruction 5 lines after the incremented PC. The assembly language opcode BR is interpreted the same as BRnzp; that is, always branch to the target address.'
        }
      ]
    }],
    operation: [
      { text: 'if ((n AND N) OR (z AND Z) OR (p AND P))', indentationLevel: 0 },
      { text: 'PC = PC* + SEXT(PCOffset9);', indentationLevel: 1 },
      { text: '*This is the incremented PC', tooltip: true }
    ],
    description: 'The condition codes specified by the state of bits [11:9] are tested. If bit [11] is set, N is tested; if bit [11] is clear, N is not tested. If bit [10] is set, Z is tested, etc. If any of the condition codes tested is set, the program branches to the location specified by adding the sign-extended PCOffset9 field to the incremented PC.'
  },
  {
    name: 'JMP',
    function: 'Jump',
    modifiesConditionCodes: false,
    formats: [{
      assemblerFormat: { name: 'JMP', operands: 'BaseR' },
      encoding: [
        '1100',
        '000',
        { value: 'BaseR', bits: 3 },
        '000000'
      ],
      examples: [{
        text: 'JMP R2',
        description: 'The PC is loaded with the contents of R2.'
      }]
    }],
    operation: [
      { text: 'PC = BaseR;', indentationLevel: 0 }
    ],
    description: 'The program unconditionally jumps to the location specified by the contents of the base register. Bits [8:6] identify the base register.'
  },
  {
    name: 'JSR',
    function: 'Jump to Subroutine',
    modifiesConditionCodes: false,
    formats: [
      {
        assemblerFormat: { name: 'JSR', operands: 'PCOffset11' },
        encoding: [
          '0100',
          '1',
          { value: 'PCOffset11', bits: 11 }
        ],
        examples: [{
          text: 'JSR #4',
          description: 'Put the address of the instruction following JSR into R7, then add 4 to the incremented PC.'
        }]
      }
    ],
    operation: [
      { text: 'R7 = PC*;', indentationLevel: 0 },
      { text: 'PC = PC* + SEXT(PCOffset11);', indentationLevel: 1 },
      { text: '*This is the incremented PC', tooltip: true }
    ],
    description: 'First, the incremented PC is saved in R7. This is the linkage back to the calling routine. Then the PC is loaded with the address of the first instruction of the subroutine, causing an unconditional jump to that address. The address of the subroutine is computed by sign-extending bits [10:0] and adding this value to the incremented PC.'
  },
  {
    name: 'JSRR',
    function: 'Jump to Subroutine',
    modifiesConditionCodes: false,
    formats: [
      {
        assemblerFormat: { name: 'JSRR', operands: 'BaseR' },
        encoding: [
          '0100',
          '0',
          '00',
          { value: 'BaseR', bits: 3 },
          '000000'
        ],
        examples: [{
          text: 'JSRR R3',
          description: 'Put the address following JSRR into R7, then jump to the address contained in R3.'
        }]
      }
    ],
    operation: [
      { text: 'R7 = PC*;', indentationLevel: 0 },
      { text: 'PC = BaseR;', indentationLevel: 1 },
      { text: '*This is the incremented PC', tooltip: true }
    ],
    description: 'First, the incremented PC is saved in R7. This is the linkage back to the calling routine. Then the PC is loaded with the address of the first instruction of the subroutine, causing an unconditional jump to that address. The address of the subroutine is obtained from the base register.'
  },
  {
    name: 'LD',
    function: 'Load',
    modifiesConditionCodes: true,
    formats: [{
      assemblerFormat: { name: 'LD', operands: 'DR, PCOffset9' },
      encoding: [
        '0010',
        { value: 'DR', bits: 3 },
        { value: 'PCOffset9', bits: 9 }
      ],
      examples: [{
        text: 'LD R2, #100',
        description: 'R2 is loaded with mem[PC + 100].'
      }]
    }],
    operation: [
      { text: 'DR = mem[PC* + SEXT(PCOffset9)];', indentationLevel: 0 },
      { text: 'setcc();', indentationLevel: 0 },
      { text: '*This is the incremented PC', tooltip: true }
    ],
    description: 'An address is computed by sign-extending bits [8:0] to 16 bits and adding this value to the incremented PC. The contents of memory at this address are loaded into DR. The condition codes are set, based on whether the value loaded is negative, zero, or positive.'
  },
  {
    name: 'LDI',
    function: 'Load Indirect',
    modifiesConditionCodes: true,
    formats: [{
      assemblerFormat: { name: 'LDI', operands: 'DR, PCOffset9' },
      encoding: [
        '1010',
        { value: 'DR', bits: 3 },
        { value: 'PCOffset9', bits: 9 }
      ],
      examples: [{
        text: 'LDI R2, #7',
        description: 'R2 is loaded with mem[mem[PC + 7]].'
      }]
    }],
    operation: [
      { text: 'DR = mem[mem[PC* + SEXT(PCOffset9)]];', indentationLevel: 0 },
      { text: 'setcc();', indentationLevel: 0 },
      { text: '*This is the incremented PC', tooltip: true }
    ],
    description: 'An address is computed by sign-extending bits [8:0] to 16 bits and adding this value to the incremented PC. What is stored in memory at this address is the address of the data to be loaded into DR. The condition codes are set, based on whether the value loaded is negative, zero, or positive.'
  },
  {
    name: 'LDR',
    function: 'Load Base+Offset',
    modifiesConditionCodes: true,
    formats: [{
      assemblerFormat: { name: 'LDR', operands: 'DR, BaseR, offset6' },
      encoding: [
        '0110',
        { value: 'DR', bits: 3 },
        { value: 'BaseR', bits: 3 },
        { value: 'offset6', bits: 6 }
      ],
      examples: [{
        text: 'LDR R2, R1, #-4',
        description: 'R2 is loaded with mem[BaseR - 4].'
      }]
    }],
    operation: [
      { text: 'DR = mem[BaseR + SEXT(offset6)];', indentationLevel: 0 },
      { text: 'setcc();', indentationLevel: 0 }
    ],
    description: 'An address is computed by sign-extending bits [5:0] to 16 bits and adding this value to the contents of the register specified by bits [8:6]. The contents of memory at this address are loaded into DR. The condition codes are set, based on whether the value loaded is negative, zero, or positive.'
  },
  {
    name: 'LEA',
    function: 'Load Effective Address',
    modifiesConditionCodes: true,
    formats: [{
      assemblerFormat: { name: 'LEA', operands: 'DR, PCOffset9' },
      encoding: [
        '1110',
        { value: 'DR', bits: 3 },
        { value: 'PCOffset9', bits: 9 }
      ],
      examples: [{
        text: 'LEA R3, #6',
        description: 'Loads the result of PC + 6 into R3.'
      }]
    }],
    operation: [
      { text: 'DR = PC* + SEXT(PCOffset9);', indentationLevel: 0 },
      { text: 'setcc();', indentationLevel: 0 },
      { text: '*This is the incremented PC', tooltip: true }
    ],
    description: 'An address is computed by sign-extending bits [8:0] to 16 bits and adding this value to the incremented PC. This address is loaded into DR (not the contents of that memory address). The condition codes are set, based on whether the value loaded is negative, zero, or positive.'
  },
  {
    name: 'NOT',
    function: 'Bitwise Complement',
    modifiesConditionCodes: true,
    formats: [{
      assemblerFormat: { name: 'NOT', operands: 'DR, SR' },
      encoding: [
        '1001',
        { value: 'DR', bits: 3 },
        { value: 'SR', bits: 3 },
        '1',
        '11111'
      ],
      examples: [{
        text: 'NOT R2, R1',
        description: 'R2 is loaded with the bitwise complement of R1.'
      }]
    }],
    operation: [
      { text: 'DR = NOT(SR);', indentationLevel: 0 },
      { text: 'setcc();', indentationLevel: 0 }
    ],
    description: 'The bitwise complement of the contents of SR is stored in DR. The condition codes are set, based on whether the binary value produced, taken as a 2’s complement integer, is negative, zero, or positive.'
  },
  {
    name: 'RET',
    function: 'Return From Subroutine',
    modifiesConditionCodes: false,
    formats: [{
      assemblerFormat: { name: 'RET', operands: '' },
      encoding: [
        '1100',
        '000',
        '111',
        '000000'
      ],
      examples: [{
        text: 'RET',
        description: 'The PC is loaded with the contents of R7.'
      }]
    }],
    operation: [
      { text: 'PC = R7;', indentationLevel: 0 }
    ],
    description: 'The program unconditionally jumps to the location specified by the contents of the base register. Bits [8:6] identify the base register. The RET instruction is a special case of the JMP instruction. The PC is loaded with the contents of R7, which contains the linkage back to the instruction following the subroutine call instruction.'
  },
  {
    name: 'RTI',
    function: 'Return From Interrupt',
    modifiesConditionCodes: false,
    formats: [{
      assemblerFormat: { name: 'RTI', operands: '' },
      encoding: [
        '1000',
        '000000000000'
      ],
      examples: [{
        text: 'RTI',
        description: 'PC and PSR contain the top 2 values popped off the stack.'
      }]
    }],
    operation: [
      { text: 'if (PSR[15] == 0)', indentationLevel: 0 },
      { text: 'PC = mem[R6]; // R6 is the SSP', indentationLevel: 1 },
      { text: 'R6 = R6+1;', indentationLevel: 1 },
      { text: 'TEMP = mem[R6];', indentationLevel: 1 },
      { text: 'R6 = R6+1;', indentationLevel: 1 },
      { text: 'PSR = TEMP; // the privilege mode and condition codes of the interrupted process are restored', indentationLevel: 1 },
      { text: 'else', indentationLevel: 0 },
      { text: 'Initiate a privilege mode exception;', indentationLevel: 1 }
    ],
    description: 'If the processor is running in Supervisor mode, the top two elements on the Supervisor Stack are popped and loaded into PC, PSR. If the processor is running in User mode, a privilege mode violation exception occurs. See Section A.4 for more information.'
  },
  {
    name: 'ST',
    function: 'Store',
    modifiesConditionCodes: false,
    formats: [{
      assemblerFormat: { name: 'ST', operands: 'SR, PCOffset9' },
      encoding: [
        '0011',
        { value: 'SR', bits: 3 },
        { value: 'PCOffset9', bits: 9 }
      ],
      examples: [{
        text: 'ST R5, #3',
        description: 'mem[PC + 3] is loaded with the contents of R5.'
      }]
    }],
    operation: [
      { text: 'mem[PC* + SEXT(PCOffset9)] = SR;', indentationLevel: 0 },
      { text: '*This is the incremented PC', tooltip: true },
    ],
    description: 'The contents of the register specified by SR are stored in the memory location whose address is computed by sign-extending bits [8:0] to 16 bits and adding this value to the incremented PC.'
  },
  {
    name: 'STI',
    function: 'Store Indirect',
    modifiesConditionCodes: false,
    formats: [{
      assemblerFormat: { name: 'STI', operands: 'SR, PCOffset9' },
      encoding: [
        '1011',
        { value: 'SR', bits: 3 },
        { value: 'PCOffset9', bits: 9 }
      ],
      examples: [{
        text: 'STI R4, #-5',
        description: 'The contents of R4 are loaded into mem[mem[PC - 5]].'
      }]
    }],
    operation: [
      { text: 'mem[mem[PC* + SEXT(PCOffset9)]] = SR;', indentationLevel: 0 },
      { text: '*This is the incremented PC', tooltip: true }
    ],
    description: 'The contents of the register specified by SR are stored in the memory location whose address is obtained as follows: Bits [8:0] are sign-extended to 16 bits and added to the incremented PC. What is in memory at this address is the address of the location to which the data in SR is stored.'
  },
  {
    name: 'STR',
    function: 'Store Base+Offset',
    modifiesConditionCodes: false,
    formats: [{
      assemblerFormat: { name: 'STR', operands: 'SR, BaseR, offset6' },
      encoding: [
        '0111',
        { value: 'SR', bits: 3 },
        { value: 'BaseR', bits: 3 },
        { value: 'offset6', bits: 6 },
      ],
      examples: [{
        text: 'STR R4, R5, #9',
        description: 'The contents of R4 are loaded into mem[R5 + 5].'
      }]
    }],
    operation: [
      { text: 'mem[BaseR + SEXT(offset6)] = SR;', indentationLevel: 0 }
    ],
    description: 'The contents of the register specified by SR are stored in the memory location whose address is computed by sign-extending bits [5:0] to 16 bits and adding this value to the contents of the register specified by bits [8:6].'
  },
  {
    name: 'TRAP',
    function: 'System Call',
    modifiesConditionCodes: false,
    formats: [{
      assemblerFormat: { name: 'TRAP', operands: 'trapvector8' },
      encoding: [
        '1111',
        '0000',
        { value: 'trapvector8', bits: 8 }
      ],
      examples: [{
        text: 'TRAP x23',
        description: 'Directs the operating system to execute the IN system call. The starting address of this system call is contained in memory location x0023.'
      }]
    }],
    operation: [
      { text: 'R7 = PC*;', indentationLevel: 0 },
      { text: 'PC = mem[ZEXT(trapvect8)];', indentationLevel: 0 },
      { text: '*This is the incremented PC', tooltip: true }
    ],
    description: 'First, R7 is loaded with the incremented PC; this enables a return to the instruction physically following the TRAP instruction in the original program after the service routine has completed execution. Then, the PC is loaded with the starting address of the system call specified by trapvector8. The starting address is contained in the memory location whose address is obtained by zero-extending trapvector8 to 16 bits. Memory locations x0000 through x00FF are all available to contain starting addresses for system calls specified by their corresponding trap vectors. This region of memory is called the Trap Vector Table.'
  },
  {
    name: 'reserved',
    function: 'Unused Opcode',
    modifiesConditionCodes: false,
    formats: [{
      assemblerFormat: { name: '', operands: '' },
      encoding: [
        '1101',
        { value: '', bits: 12 }
      ],
      examples: [{
        text: 'n/a',
        description: ''
      }]
    }],
    operation: [
      { text: 'Initiate an illegal opcode exception.', indentationLevel: 0 }
    ],
    description: 'If an illegal opcode is encountered, an illegal opcode exception occurs. The opcode 1101 has been reserved for future use. It is currently not defined. If the instruction currently executing has bits [15:12] = 1101, an illegal opcode exception occurs. See Section A.4 for more information.'
  }
];
