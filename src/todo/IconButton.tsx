import classNames from 'classnames'
import * as React from 'react'

const styles = require('./scss/IconButton.scss') // tslint:disable-line no-var-requires

interface Props {
  onClick?: () => void
  onDragStart?: (e: React.DragEvent<HTMLDivElement>) => void
  path: string
  hidden?: boolean
  className?: string
  isDraggable?: boolean
}

const IconButton: React.StatelessComponent<Props> = ({
  onClick,
  onDragStart,
  path,
  hidden,
  className,
  isDraggable,
}: Props): JSX.Element => (
  <div
    className={classNames(
      styles.iconButton,
      className,
      { [styles['iconButton--hidden']]: hidden })}
    onDragStart={onDragStart}
    draggable={isDraggable}>
    <svg
      xmlns='http://www.w3.org/2000/svg'
      version='1.1'
      viewBox='0 0 24 24'
      onClick={onClick}
      style={{ width: '100%', height: '100%' }}>
      <g>
        <path d={path} />
      </g>
    </svg>
  </div>
)

export const IconPath = {
  // tslint:disable-next-line:max-line-length
  EDIT: 'M 18.40625 2 C 18.15625 2 17.886719 2.113281 17.6875 2.3125 L 16 4 L 20 8 L 21.6875 6.3125 C 22.085938 5.914063 22.085938 5.207031 21.6875 4.90625 L 19.09375 2.3125 C 18.894531 2.113281 18.65625 2 18.40625 2 Z M 15 5.09375 L 2 18 L 2 22 L 6 22 L 18.90625 9 Z',
  // tslint:disable-next-line:max-line-length
  DELETE: 'M 5.625 4.21875 L 4.21875 5.625 L 10.59375 12 L 4.21875 18.375 L 5.625 19.78125 L 12 13.40625 L 18.375 19.78125 L 19.78125 18.375 L 13.40625 12 L 19.78125 5.625 L 18.375 4.21875 L 12 10.59375 Z',
  // tslint:disable-next-line:max-line-length
  SWAP: 'M 16.3125 2.3125 L 14.8125 3.8125 L 18.09375 7 L 10 7 L 10 9 L 18.09375 9 L 14.8125 12.3125 L 16.3125 13.6875 L 21.1875 8.6875 L 21.90625 8 L 21.1875 7.3125 Z M 2 7 L 2 9 L 4 9 L 4 7 Z M 6 7 L 6 9 L 8 9 L 8 7 Z M 7.8125 10.3125 L 2.8125 15.3125 L 2.09375 16 L 2.8125 16.6875 L 7.8125 21.6875 L 9.1875 20.3125 L 5.90625 17 L 14 17 L 14 15 L 5.90625 15 L 9.1875 11.8125 Z M 16 15 L 16 17 L 18 17 L 18 15 Z M 20 15 L 20 17 L 22 17 L 22 15 Z',
  // tslint:disable-next-line:max-line-length
  DRAG: 'M 12 2 L 9 5 L 15 5 Z M 2 7 L 2 9 L 22 9 L 22 7 Z M 2 11 L 2 13 L 22 13 L 22 11 Z M 2 15 L 2 17 L 22 17 L 22 15 Z M 9 19 L 12 22 L 15 19 Z',
}

export default IconButton
