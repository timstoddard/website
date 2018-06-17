import * as PropTypes from 'prop-types'
import * as React from 'react'

const getProps = (
  name: NodeName,
  data: Node,
  link: string[],
  handleClick: (links: string[]) => any,
  showingBorders: boolean,
): Props => {
  const newLink = [...link, name]
  return {
    data: data[name],
    link: newLink,
    onClick: handleClick(newLink),
    handleClick,
    showingBorders,
  }
}

interface Node {
  a?: Node
  b?: Node
}

type NodeName = 'a' | 'b'

interface Props {
  data: Node
  link: string[]
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void
  handleClick: (link: string[]) => ((e: React.MouseEvent<HTMLDivElement>) => void)
  showingBorders: boolean
}

const Infinity: React.StatelessComponent<Props> = ({
  data,
  link,
  onClick,
  handleClick,
  showingBorders,
}: Props): JSX.Element => {
  const classNames = [
    'infinity__child',
    !(data.a || data.b) ? 'infinity__child--end' : '',
    !(data.a || data.b) && showingBorders
      ? 'infinity__child--end--bordered'
      : '',
    link.length % 2 === 1 ? 'infinity--vertical' : '',
    `infinity--level${link.length}`,
  ]

  return (
    <div
      onClick={onClick}
      className={classNames.join(' ')}>
      {data.a && <Infinity {...getProps('a', data, link, handleClick, showingBorders)} />}
      {data.b && <Infinity {...getProps('b', data, link, handleClick, showingBorders)} />}
    </div>
  )
}

Infinity.propTypes = {
  data: PropTypes.shape({
    a: PropTypes.object,
    b: PropTypes.object,
  }).isRequired,
  link: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClick: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  showingBorders: PropTypes.bool.isRequired,
}

interface State {
  data: Node
  showingBorders: boolean
}

export default class InfinityWrapper extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props)

    this.state = {
      data: {},
      showingBorders: false,
    }
  }

  getBaseData = (): Node => {
    return { a: {}, b: {} }
  }

  handleClick = (link?: string[]): ((e: React.MouseEvent<HTMLDivElement>) => void) => {
    return (e: React.MouseEvent<HTMLDivElement>): void => {
      e.stopPropagation()
      if (!link) {
        this.setState({ data: this.getBaseData() })
        return
      }
      const newState = this.state.data
      let statePointer = newState
      let canUpdate = true
      link.forEach((name: NodeName, i: number) => {
        if (i === link.length - 1) {
          if (statePointer[name].a || statePointer[name].b) {
            // not last child, so don't update
            canUpdate = false
          } else {
            statePointer[name] = this.getBaseData()
          }
        } else {
          statePointer = statePointer[name]
        }
      })
      if (canUpdate) {
        this.setState({ data: newState })
      }
    }
  }

  handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>): void => {
    e.preventDefault()
    e.stopPropagation()

    switch (e.key) {
      case ' ':
        this.setState({ showingBorders: !this.state.showingBorders })
        break
      case 'r':
        this.setState({ data: {} })
        break
    }
  }

  render(): JSX.Element {
    document.title = 'Infinity Demo'

    const { handleClick, handleKeyDown } = this
    const { data, showingBorders } = this.state

    return (
      <div
        onKeyDown={handleKeyDown}
        tabIndex={0}
        className='infinity'>
        {(data.a && data.b) ? (
          <Infinity
            data={data}
            link={[]}
            onClick={handleClick([])}
            handleClick={handleClick}
            showingBorders={showingBorders} />
        ) : (
          <div
            onClick={handleClick()}
            className='infinity__child infinity__child--landing'>
            Click to get started!
          </div>
        )}
      </div>
    )
  }
}
