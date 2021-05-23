import classNames from 'classnames'
import * as React from 'react'
import { EmptyObject } from '../types'
import styles from './scss/Bingo.scss'

export enum CellState {
  UNSELECTED,
  SELECTED,
  SUBMITTED,
}

interface Props {
  title: string
  status: number
  onClick: () => void
}

export default class Cell extends React.Component<Props, EmptyObject> {
  constructor(props: Props) {
    super(props)
  }

  getModifierClassName = (): string => {
    switch (this.props.status) {
      case CellState.SUBMITTED:
        return styles['board__cell--green']
      case CellState.SELECTED:
        return styles['board__cell--yellow']
      default:
        return ''
    }
  }

  render(): JSX.Element {
    const { onClick, title } = this.props
    return (
      <td
        className={classNames(
          styles.board__cell,
          this.getModifierClassName())}
        onClick={onClick}>
        {title}
      </td>
    )
  }
}
