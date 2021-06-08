import classNames from 'classnames'
import * as React from 'react'
import { getShells } from './Element'
import { Element } from './elements'
import { Mode } from './PeriodicTable'
import styles from './scss/CurrentElement.scss'

interface Props {
  element: Element
  mode: Mode
}

const CurrentElement: React.FunctionComponent<Props> = ({
  element,
  mode,
}: Props): JSX.Element => (
  <div className={styles.currentElement}>
    <div className={styles.currentElement__symbol}>
      {element.symbol}
    </div>
    <div className={styles.currentElement__number}>
      {element.number}
    </div>
    <div className={styles.currentElement__name}>
      {element.name}
    </div>
    <div className={styles.currentElement__electrons}>
      {getShells(element).map((shell: string) => (
        <div
          key={shell}
          className={classNames(
            styles.currentElement__electron,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (styles as any)[`currentElement__electron--${mode === Mode.NORMAL ? shell[1] : 'plain'}`])}>
          {shell}
        </div>
      ))}
    </div>
  </div>
)

export default CurrentElement
