import classNames from 'classnames'
import * as React from 'react'
import OutlookIcon, { OutlookIconName } from './OutlookIcon'
import { EmptyObject } from '../types'
import styles from './scss/Folders.scss'

interface Props {
  fakeEmail: string
  subredditName: string
  setSubredditName: () => void
  className: string
}

export default class Folders extends React.Component<Props, EmptyObject> {
  render(): JSX.Element {
    const {
      fakeEmail,
      subredditName,
      setSubredditName,
      className,
    } = this.props
    return (
      <div className={classNames(styles.folders, className)}>
        <div className={classNames(
          styles.folders__row,
          styles['folders__row--first'])}>
          <OutlookIcon
            iconName={OutlookIconName.DOWN_CHEVRON}
            className={styles.folders__downChevronIcon} />
          {fakeEmail}
        </div>
        <ul className={styles.folders__ul}>
          <li className={styles.folders__li}>
            <div className={classNames(
              styles.folders__row,
              styles['folders__row--indent1'])}>
              <OutlookIcon
                iconName={OutlookIconName.DOWN_CHEVRON}
                className={styles.folders__downChevronIcon} />
              <OutlookIcon
                iconName={OutlookIconName.FOLDER}
                className={styles.folders__folderIcon} />
              Inbox
            </div>
            <ul className={styles.folders__ul}>
              <li className={styles.folders__li}>
                <div className={classNames(
                  styles.folders__row,
                  styles['folders__row--indent2'],
                  styles['folders__row--selected'])}>
                  <OutlookIcon
                    iconName={OutlookIconName.DOWN_CHEVRON}
                    className={styles['folders__downChevronIcon--hidden']} />
                  <a
                    onClick={setSubredditName}
                    className={styles.folders__newSubreddit}>
                    <OutlookIcon
                      iconName={OutlookIconName.FOLDER}
                      className={styles.folders__folderIcon} />
                  </a>
                  {subredditName}
                </div>
              </li>
            </ul>
          </li>
          <li className={styles.folders__li}>
            <div className={classNames(
              styles.folders__row,
              styles['folders__row--indent1'])}>
              <OutlookIcon
                iconName={OutlookIconName.DOWN_CHEVRON}
                className={styles['folders__downChevronIcon--hidden']} />
              <OutlookIcon
                iconName={OutlookIconName.FOLDER}
                className={styles.folders__folderIcon} />
              Drafts
            </div>
          </li>
          <li className={styles.folders__li}>
            <div className={classNames(
              styles.folders__row,
              styles['folders__row--indent1'])}>
              <OutlookIcon
                iconName={OutlookIconName.DOWN_CHEVRON}
                className={styles['folders__downChevronIcon--hidden']} />
              <OutlookIcon
                iconName={OutlookIconName.FOLDER}
                className={styles.folders__folderIcon} />
              Sent
            </div>
          </li>
          <li className={styles.folders__li}>
            <div className={classNames(
              styles.folders__row,
              styles['folders__row--indent1'])}>
              <OutlookIcon
                iconName={OutlookIconName.DOWN_CHEVRON}
                className={styles['folders__downChevronIcon--hidden']} />
              <OutlookIcon
                iconName={OutlookIconName.FOLDER}
                className={styles.folders__folderIcon} />
              Trash
            </div>
          </li>
          <li className={styles.folders__li}>
            <div className={classNames(
              styles.folders__row,
              styles['folders__row--indent1'])}>
              <OutlookIcon
                iconName={OutlookIconName.DOWN_CHEVRON}
                className={styles['folders__downChevronIcon--hidden']} />
              <OutlookIcon
                iconName={OutlookIconName.FOLDER}
                className={styles.folders__folderIcon} />
              Junk Email
            </div>
          </li>
        </ul>
        <footer className={styles.folders__footer}>
          <OutlookIcon
            iconName={OutlookIconName.EMAIL}
            className={styles.folders__footer__icon} />
          <OutlookIcon
            iconName={OutlookIconName.EMAIL}
            className={styles.folders__footer__icon} />
          <OutlookIcon
            iconName={OutlookIconName.EMAIL}
            className={styles.folders__footer__icon} />
          <OutlookIcon
            iconName={OutlookIconName.EMAIL}
            className={styles.folders__footer__icon} />
          <OutlookIcon
            iconName={OutlookIconName.EMAIL}
            className={styles.folders__footer__icon} />
        </footer>
      </div>
    )
  }
}
