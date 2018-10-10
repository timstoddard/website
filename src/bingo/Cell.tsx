import * as PropTypes from 'prop-types'
import * as React from 'react'

export class CellState {
  static get UNSELECTED(): number { return 0 }
  static get SELECTED(): number { return 1 }
  static get SUBMITTED(): number { return 2 }
}

interface Props {
  title: string
  status: number
  onClick: () => any
}

export default class Cell extends React.Component<Props, {}> {
  static propTypes: any = {
    onClick: PropTypes.func,
    status: PropTypes.number,
    title: PropTypes.string,
  }

  static defaultProps: any = {
    onClick: (): void => {},
    status: 0,
    title: '',
  }

  constructor(props: Props) {
    super(props)
  }

  getModifierClassName = (): string => {
    switch (this.props.status) {
      case CellState.SUBMITTED:
        return 'green accent-3'
      case CellState.SELECTED:
        return 'yellow lighten-1'
      default:
        return ''
    }
  }

  render(): JSX.Element {
    const { onClick, title } = this.props
    return (
      <td
        className={`board__cell ${this.getModifierClassName()}`}
        onClick={onClick}>
        {title}
      </td>
    )
  }
}