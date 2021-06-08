import { Element } from "./elements";

enum Subshell {
  s = "s",
  p = "p",
  d = "d",
  f = "f",
}

const subshellMax = (subshell: Subshell): number => {
  let ret = 0;
  switch (subshell) {
    case Subshell.s:
      ret = 2;
      break;
    case Subshell.p:
      ret = 6;
      break;
    case Subshell.d:
      ret = 10;
      break;
    case Subshell.f:
      ret = 14;
      break;
  }
  return ret;
};

const subshellToInt = (subshell: Subshell): number => {
  let ret = -1;
  switch (subshell) {
    case Subshell.s:
      ret = 0;
      break;
    case Subshell.p:
      ret = 1;
      break;
    case Subshell.d:
      ret = 2;
      break;
    case Subshell.f:
      ret = 3;
      break;
  }
  return ret;
};

const intToSubshell = (n: number): Subshell => {
  let ret: Subshell;
  switch (n) {
    case 0:
      ret = Subshell.s;
      break;
    case 1:
      ret = Subshell.p;
      break;
    case 2:
      ret = Subshell.d;
      break;
    case 3:
      ret = Subshell.f;
      break;
    default:
      ret = intToSubshell(n % 4); // could throw error instead
      return ret;
  }
};

interface Orbitals {
  [orbital: string]: number;
}

class Shell {
  n: number;
  orbitals: Orbitals;

  constructor(n: number) {
    this.n = n;
    for (let i = 0; i < n && i < 4; i++) {
      this.orbitals[intToSubshell(n)] = 0;
    }
  }

  addElectrons(orbital: Subshell, electrons: number): number {
    const maxInShell = subshellMax(orbital);
    const shellElectrons = Math.min(electrons, maxInShell);
    this.orbitals[orbital] = shellElectrons;
    return electrons - shellElectrons;
  }

  remElectrons(orbital: Subshell, electrons: number): number {
    const shellElectrons = this.orbitals[orbital];
    const toRemove = Math.min(shellElectrons, electrons);
    this.orbitals[orbital] = shellElectrons - toRemove;
    return electrons - toRemove;
  }

  hasElectrons = (orbital: Subshell) => {
    return this.orbitals[orbital] > 0;
  };

  toString(orbital: Subshell) {
    return `${this.n}${orbital}${this.orbitals[orbital]}`;
  }
}

const shells = [
  "1s",
  "2s",
  "2p",
  "3s",
  "3p",
  "4s",
  "3d",
  "4p",
  "5s",
  "4d",
  "5p",
  "6s",
  "4f",
  "5d",
  "6p",
  "7s",
  "5f",
  "6d",
  "7p",
];

interface ElectronShells {
  [shell: string]: Shell;
}

export const getShells = (e: Element, charge = 0) => {
  const { config, maxShell } = getInitialShells(e);

  checkDOrbitals(config, maxShell);

  addCharge(config, maxShell, charge);

  const configStr = [];
  for (const shell of shells) {
    if (config[shell[0]].hasElectrons(shell[1] as Subshell)) {
      configStr.push(config[shell[0]].toString(shell[1] as Subshell));
    } else {
      break;
    }
  }

  return configStr;
};

const getInitialShells = (e: Element) => {
  let config: ElectronShells;
  let electrons = e.number;
  let maxShell = shells[0];

  for (const shell of shells) {
    if (electrons > 0) {
      maxShell = shell;
      if (!config[shell[0]]) {
        config[shell[0]] = new Shell(Number(shell[0]));
      }
      electrons = config[shell[0]].addElectrons(
        shell[1] as Subshell,
        electrons
      );
    }
  }

  return { config, maxShell };
};

const checkDOrbitals = (config: ElectronShells, maxShell: string) => {
  let found = false;
  let shell = maxShell[0];
  let nextShell = "";

  while (!found) {
    if (config[shell].hasElectrons(Subshell.d)) {
      found = true;
    } else {
      nextShell = shell;
      shell = String(Number(shell) - 1);
    }
  }

  if (config[shell].orbitals[Subshell.d] % 5 === 4) {
    config[shell].addElectrons(Subshell.d, 1);
    config[nextShell].remElectrons(Subshell.s, 1);
  }
};

const addCharge = (
  config: ElectronShells,
  maxShell: string,
  charge: number
) => {
  if (charge === 0) return;

  let idx = shells.indexOf(maxShell);
  if (charge < 0) {
    charge *= -1;
    while (charge > 0 && idx < shells.length) {
      const shell = shells[idx++];
      charge = config[shell[0]].addElectrons(shell[1] as Subshell, charge);
    }
  } else {
    while (charge > 0 && idx >= 0) {
      const shell = shells[idx--];
      charge = config[shell[0]].remElectrons(shell[1] as Subshell, charge);
    }
  }
};
