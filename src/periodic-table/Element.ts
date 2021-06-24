import { Element } from './elements'

enum Subshell {
  S = 's',
  P = 'p',
  D = 'd',
  F = 'f',
}

const getSubshellMax = (subshell: Subshell): number => {
  switch (subshell) {
    case Subshell.S:
      return 2
    case Subshell.P:
      return 6
    case Subshell.D:
      return 10
    case Subshell.F:
      return 14
    default:
      return 0
  }
}

const intToSubshell = (n: number): Subshell => {
  let ret: Subshell
  switch (n) {
    case 0:
      return Subshell.S
    case 1:
      return Subshell.P
    case 2:
      return Subshell.D
    case 3:
      return Subshell.F
    default:
      return intToSubshell(n % 4)
  }
}

interface Orbitals {
  [orbital: string]: number
}

class Shell {
  n: number
  orbitals: Orbitals

  constructor(n: number) {
    this.n = n
    for (let i = 0; i < Math.min(n, 4); i++) {
      this.orbitals[intToSubshell(n)] = 0
    }
  }

  addElectrons = (orbital: Subshell, electrons: number): number => {
    const maxInShell = getSubshellMax(orbital)
    const shellElectrons = Math.min(electrons, maxInShell)
    this.orbitals[orbital] = shellElectrons
    return electrons - shellElectrons
  }

  removeElectrons = (orbital: Subshell, electrons: number): number => {
    const shellElectrons = this.orbitals[orbital]
    const toRemove = Math.min(shellElectrons, electrons)
    this.orbitals[orbital] = shellElectrons - toRemove
    return electrons - toRemove
  }

  hasElectrons = (orbital: Subshell) => {
    return this.orbitals[orbital] > 0
  }

  toString = (orbital: Subshell) => {
    return `${this.n}${orbital}${this.orbitals[orbital]}`
  }
}

const SHELLS = [
  '1s',
  '2s',
  '2p',
  '3s',
  '3p',
  '4s',
  '3d',
  '4p',
  '5s',
  '4d',
  '5p',
  '6s',
  '4f',
  '5d',
  '6p',
  '7s',
  '5f',
  '6d',
  '7p',
]

interface ElectronShells {
  [shell: string]: Shell
}

export const getShells = (e: Element, charge = 0) => {
  const { shells, maxShell } = getInitialShells(e)

  checkDOrbitals(shells, maxShell)

  addCharge(shells, maxShell, charge)

  const shellStrings = []
  for (const shell of SHELLS) {
    if (shells[shell[0]].hasElectrons(shell[1] as Subshell)) {
      shellStrings.push(shells[shell[0]].toString(shell[1] as Subshell))
    } else {
      break
    }
  }

  return shellStrings
}

const getInitialShells = (e: Element) => {
  let shells: ElectronShells
  let electrons = e.number
  let maxShell = ''

  for (const shell of SHELLS) {
    if (electrons > 0) {
      maxShell = shell
      if (!shells[shell[0]]) {
        shells[shell[0]] = new Shell(Number(shell[0]))
      }
      electrons = shells[shell[0]].addElectrons(shell[1] as Subshell, electrons)
    }
  }

  return { shells, maxShell }
}

const checkDOrbitals = (shells: ElectronShells, maxShell: string) => {
  let found = false
  let shell = maxShell[0]
  let nextShell = ''

  while (!found) {
    if (shells[shell].hasElectrons(Subshell.D)) {
      found = true
    } else {
      nextShell = shell
      shell = String(Number(shell) - 1)
    }
  }

  if (shells[shell].orbitals[Subshell.D] % 5 === 4) {
    shells[shell].addElectrons(Subshell.D, 1)
    shells[nextShell].removeElectrons(Subshell.S, 1)
  }
}

const addCharge = (
  shells: ElectronShells,
  maxShell: string,
  charge: number
) => {
  if (charge === 0) return

  let maxShellIndex = SHELLS.indexOf(maxShell)
  if (charge < 0) {
    charge *= -1
    while (charge > 0 && maxShellIndex < SHELLS.length) {
      const shell = SHELLS[maxShellIndex++]
      charge = shells[shell[0]].addElectrons(shell[1] as Subshell, charge)
    }
  } else {
    while (charge > 0 && maxShellIndex >= 0) {
      const shell = SHELLS[maxShellIndex--]
      charge = shells[shell[0]].removeElectrons(shell[1] as Subshell, charge)
    }
  }
}
