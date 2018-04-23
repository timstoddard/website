import React, { Component } from 'react'
import PropTypes from 'prop-types'

const getProps = (name, data, link, handleClick, showingBorders) => {
  const newLink = [...link, name]
  return {
    data: data[name],
    link: newLink,
    onClick: handleClick(newLink),
    handleClick,
    showingBorders,
  }
}

const Infinity = ({data, link, onClick, handleClick, showingBorders}) => {
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

export default class InfinityWrapper extends Component {
  constructor() {
    super()

    this.handleClick = this.handleClick.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)

    this.state = {
      data: {},
      showingBorders: false,
    }
  }

  getBaseData() {
    return { a: {}, b: {} }
  }

  handleClick(link) {
    return (e) => {
      e.stopPropagation()
      if (!link) {
        this.setState({ data: this.getBaseData() })
        return
      }
      const newState = this.state.data
      let statePointer = newState
      let canUpdate = true
      link.forEach((name, i) => {
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

  handleKeyDown(e) {
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

  render() {
    document.title = 'Infinity Demo'

    const { handleClick, handleKeyDown } = this
    const { data, showingBorders } = this.state

    return (
      <div
        onKeyDown={handleKeyDown}
        tabIndex="0"
        className="infinity">
        {(data.a && data.b) ? (
          <Infinity
            data={data}
            link={[]}
            onClick={handleClick([])}
            handleClick={handleClick}
            showingBorders={showingBorders}
            />
        ) : (
          <div
            onClick={handleClick()}
            className="infinity__child infinity__child--landing">
            Click to get started!
          </div>
        )}
      </div>
    )
  }
}
