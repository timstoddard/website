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

class Shell {
  n: number
  orbitals: Map<string, number> = new Map<string, number>()

  constructor(n: number) {
    this.n = n
    for (let i = 0; i < Math.min(n, 4); i++) {
      this.orbitals.set(intToSubshell(i), 0)
    }
  }

  addElectrons = (orbital: Subshell, electrons: number): number => {
    const maxInShell = getSubshellMax(orbital)
    const shellElectrons = this.orbitals.get(orbital)
    const toAdd = Math.min(electrons, maxInShell - shellElectrons)
    this.orbitals.set(orbital, shellElectrons + toAdd)
    return electrons - toAdd
  }

  removeElectrons = (orbital: Subshell, electrons: number): number => {
    const shellElectrons = this.orbitals.get(orbital)
    const toRemove = Math.min(shellElectrons, electrons)
    this.orbitals.set(orbital, shellElectrons - toRemove)
    return electrons - toRemove
  }

  hasElectrons = (orbital: Subshell) => {
    return this.orbitals.get(orbital) && this.orbitals.get(orbital) > 0
  }

  toString = (orbital: Subshell) => {
    return `${this.n}${orbital}${this.orbitals.get(orbital)}`
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

export const getShells = (e: Element, charge = 0) => {
  const { shells, maxShell } = getInitialShells(e)

  checkDOrbitals(shells, maxShell)

  if (charge != 0) {
    addCharge(shells, maxShell, charge)

    checkDOrbitals(shells, maxShell)
  }

  const shellStrings = []
  for (const shell of SHELLS) {
    if (
      shells.get(shell[0]) &&
      shells.get(shell[0]).hasElectrons(shell[1] as Subshell)
    ) {
      shellStrings.push(shells.get(shell[0]).toString(shell[1] as Subshell))
    }
  }

  if (shellStrings.length == 0) {
    shellStrings.push('1s0')
  }

  return shellStrings
}

const getInitialShells = (e: Element) => {
  const shells: Map<string, Shell> = new Map<string, Shell>()
  let electrons = e.number
  let maxShell = ''

  for (const shell of SHELLS) {
    if (electrons > 0) {
      maxShell = shell
      if (!shells.has(shell[0])) {
        shells.set(shell[0], new Shell(Number(shell[0])))
      }
      electrons = shells
        .get(shell[0])
        .addElectrons(shell[1] as Subshell, electrons)
    }
  }

  return { shells, maxShell }
}

const checkDOrbitals = (shells: Map<string, Shell>, maxShell: string) => {
  let found = false
  let shell = maxShell[0]
  let nextShell = ''

  while (!found) {
    if (shells.get(shell).hasElectrons(Subshell.D)) {
      found = true
      nextShell = getNextShell(shell)
    } else if (shell !== '1') {
      nextShell = shell
      shell = String(Number(shell) - 1)
    } else {
      break
    }
  }

  if (
    found &&
    shells.get(shell).orbitals.get(Subshell.D) % 5 === 4 &&
    shells.get(nextShell).hasElectrons(Subshell.S)
  ) {
    shells.get(shell).addElectrons(Subshell.D, 1)
    if (!shells.has(nextShell)) {
      shells.set(nextShell, new Shell(Number(shell)))
    }
    shells.get(nextShell).removeElectrons(Subshell.S, 1)
  }
}

const addCharge = (
  shells: Map<string, Shell>,
  maxShell: string,
  charge: number
) => {
  let maxShellIndex = SHELLS.indexOf(maxShell)

  if (charge < 0) {
    charge *= -1
    while (charge > 0 && maxShellIndex < SHELLS.length) {
      const shell = SHELLS[maxShellIndex++]
      charge = shells.get(shell[0]).addElectrons(shell[1] as Subshell, charge)
    }
  } else {
    while (charge > 0 && maxShellIndex >= 0) {
      const shell = SHELLS[maxShellIndex]
      if (
        shell[1] === Subshell.D &&
        shells.get(getNextShell(shell[0])).hasElectrons(Subshell.S)
      ) {
        charge = shells
          .get(getNextShell(shell[0]))
          .removeElectrons(Subshell.S, charge)
      } else {
        charge = shells
          .get(shell[0])
          .removeElectrons(shell[1] as Subshell, charge)
        maxShellIndex--
      }
    }
  }
}

const getNextShell = (shell: string): string => {
  return String(Number(shell) + 1)
}
