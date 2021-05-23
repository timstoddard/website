import classNames from 'classnames'
import * as React from 'react'
import { EmptyObject } from '../types'
import styles from './scss/Footer.scss'

interface Props {
  fakeEmail: string
  className: string
}

export default class Footer extends React.Component<Props, EmptyObject> {
  render(): JSX.Element {
    const {
      fakeEmail,
      className,
    } = this.props
    return (
      <footer className={classNames(styles.footer, className)}>
        <div className={styles.footer__items}>
          Items: {Math.random() > 0.5 ? 420 : 69}
        </div>
        <div className={styles.footer__email}>
          Connected to: {fakeEmail}
        </div>
      </footer>
    )
  }
}
