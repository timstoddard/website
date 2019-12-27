import * as React from 'react'

import { Element } from './elements'
import { Mode } from './PeriodicTable'

interface Props {
  element: Element
  mode: Mode
}

const CurrentElement: React.StatelessComponent<Props> = ({
  element,
  mode,
}: Props): JSX.Element => (
  <div className='currentElement'>
    <div className='currentElement__symbol'>
      {element.symbol}
    </div>
    <div className='currentElement__number'>
      {element.number}
    </div>
    <div className='currentElement__name'>
      {element.name}
    </div>
    <div className='currentElement__electrons'>
      {getElectrons(element).map((shell: string) => (
        <div
          key={shell}
          className={[
            'currentElement__electron',
            `currentElement__electron--${mode === Mode.NORMAL ? shell[1] : 'plain'}`,
          ].join(' ')}>
          {shell}
        </div>
      ))}
    </div>
  </div>
)

const getElectrons = (e: Element, charge: number = 0): string[] => {
  const shells = [
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
  const result = []
  let totalElectrons = e.number - charge
  for (const shell of shells) {
    if (totalElectrons > 0) {
      let maxInShell = 0
      switch (shell[1]) {
        case 's':
          maxInShell = 2
          break
        case 'p':
          maxInShell = 6
          break
        case 'd':
          maxInShell = 10
          break
        case 'f':
          maxInShell = 14
          break
      }
      const shellElectrons = Math.min(maxInShell, totalElectrons)
      result.push(`${shell}${shellElectrons}`)
      totalElectrons -= shellElectrons
    } else {
      break
    }
  }
  return result
}

export default CurrentElement
