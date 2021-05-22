import classNames from 'classnames'
import * as React from 'react'
import OutlookIcon, { OutlookIconName } from './OutlookIcon'
import styles from './scss/Header.scss'

interface Props {
  subredditName: string
  fakeEmail: string
  className: string
}

export default class Header extends React.Component<Props, {}> {
  showInstructions = (): void => {
    alert(
      'Click on the blue folder to pick a new subreddit.\n' +
      `Click on 'By: Conversation' to sort.\n` +
      'Made by Tim Stoddard')
  }

  render(): JSX.Element {
    const { showInstructions } = this
    const {
      subredditName,
      fakeEmail,
      className,
    } = this.props
    return (
      <div className={classNames(styles.outlookHeader, className)}>
        <div className={styles.outlookHeader__quickActions}>
          <div className={styles.outlookHeader__quickActions__action}>
            <OutlookIcon
              iconName={OutlookIconName.SAVE}
              className={classNames(
                styles.outlookHeader__quickActions__action__icon,
                styles['outlookHeader__quickActions__action__icon--save'])} />
          </div>
          <div className={styles.outlookHeader__quickActions__action}>
            <OutlookIcon
              iconName={OutlookIconName.BACK_ARROW}
              className={classNames(
                styles.outlookHeader__quickActions__action__icon,
                styles['outlookHeader__quickActions__action__icon--backArrow'])} />
          </div>
          <div className={styles.outlookHeader__quickActions__action}>
            <OutlookIcon
              iconName={OutlookIconName.BACK_ARROW}
              className={classNames(
                styles.outlookHeader__quickActions__action__icon,
                styles['outlookHeader__quickActions__action__icon--forwardArrow'])} />
          </div>
          <div className={styles.outlookHeader__quickActions__action}>
            <OutlookIcon
              iconName={OutlookIconName.PRINTER}
              className={classNames(
                styles.outlookHeader__quickActions__action__icon,
                styles['outlookHeader__quickActions__action__icon--printer'])} />
          </div>
        </div>
        <div className={styles.outlookHeader__tabs}>
          <div className={styles.outlookHeader__tabs__tab}>
            Home
          </div>
          <div className={styles.outlookHeader__tabs__tab}>
            Organize
          </div>
          <div className={styles.outlookHeader__tabs__tab}>
            Tools
          </div>
        </div>
        <div className={styles.outlookHeader__title}>
          {subredditName} • {fakeEmail}
        </div>
        <div className={styles.outlookHeader__search}>
          <OutlookIcon
            iconName={OutlookIconName.MAGNIFYING_GLASS}
            className={styles.outlookHeader__search__magnifyingGlassIcon} />
          <input
            type='text'
            placeholder='Search'
            className={styles.outlookHeader__search__input} />
        </div>
        <div className={styles.outlookHeader__help}>
          <div
            onClick={showInstructions}
            className={styles.outlookHeader__help__questionMark}>
            ?
          </div>
          <OutlookIcon
            iconName={OutlookIconName.DOWN_CHEVRON}
            className={styles.outlookHeader__help__downChevronIcon} />
        </div>
      </div>
    )
  }
}
