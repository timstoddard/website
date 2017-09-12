import React, { Component, PropTypes } from 'react'

import IconButton, { IconPath } from './IconButton'

export default class Todo extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isDraggable: false,
      isDropTarget: false,
    }

    this.onDragStart = this.onDragStart.bind(this)
    this.onDragEnter = this.onDragEnter.bind(this)
    this.onDragLeave = this.onDragLeave.bind(this)
    this.onDragOver = this.onDragOver.bind(this)
    this.onDrop = this.onDrop.bind(this)
  }

  onDragStart(e) {
    const { index } = this.props
    e.dataTransfer.setData('text/plain', index)
    e.dataTransfer.dropEffect = 'link'
    this.props.updateDragState(true)
    this.setState({ isDraggable: true })
  }

  onDragEnter() {
    this.setState({ isDropTarget: true })
  }

  onDragLeave(e) {
    const targetPath = e.nativeEvent.path.slice(1)
    if (!targetPath.includes(this.dropTarget)) {
      this.setState({ isDropTarget: false })
    }
  }

  onDragOver(e) {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'link'
  }

  onDrop(e) {
    e.preventDefault()
    const { index, updateOrder } = this.props
    const data = e.dataTransfer.getData('text')
    this.setState({ isDropTarget: false })
    if (data !== index) {
      updateOrder(data)
    }
    this.props.updateDragState(false)
    this.setState({ isDraggable: false })
  }

  render() {
    const {
      onDragStart,
      onDragEnter,
      onDragLeave,
      onDragOver,
      onDrop,
    } = this
    const {
      message,
      completed,
      isEditing,
      hideIcons,
      index,
      toggleTodo,
      editTodo,
      deleteTodo,
      handleInput,
      handleKeyDown,
      currentTodoMessage,
    } = this.props
    const {
      isDraggable,
      isDropTarget,
    } = this.state
    const checkboxId = `checkbox${index}`

    return (
      <li
        className={`todo ${isDropTarget ? 'todo__dropZone' : ''}`}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDragOver={onDragOver}
        onDrop={onDrop}
        draggable={isDraggable}
        ref={elem => this.dropTarget = elem}>
        <div>
          <input
            type="checkbox"
            className="todo__checkbox"
            onChange={toggleTodo(index)}
            id={checkboxId}
            checked={completed}
            />
          {!isEditing &&
            <label
              htmlFor={checkboxId}
              className={`todo__label ${completed ? 'todo__label--completed' : ''}`}>
              {message}
            </label>
          }
          {isEditing &&
            <input
              type="text"
              className="todo__input"
              onChange={handleInput}
              onKeyDown={handleKeyDown}
              value={currentTodoMessage}
              />
          }
        </div>
        <div className="todo__buttons">
          <IconButton
            path={IconPath.EDIT}
            hidden={hideIcons}
            onClick={editTodo(index)}
            />
          <IconButton
            className="todo__button--drag"
            path={IconPath.DRAG}
            hidden={hideIcons && !isDraggable}
            onDragStart={onDragStart}
            isDraggable={true}
            />
          <IconButton
            path={IconPath.DELETE}
            hidden={hideIcons}
            onClick={deleteTodo(index)}
            />
        </div>
      </li>
    )
  }
}

Todo.propTypes = {
  message: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  isEditing: PropTypes.bool.isRequired,
  hideIcons: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
  toggleTodo: PropTypes.func.isRequired,
  editTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  handleInput: PropTypes.func.isRequired,
  handleKeyDown: PropTypes.func.isRequired,
  currentTodoMessage: PropTypes.string.isRequired,
  updateOrder: PropTypes.func.isRequired,
  updateDragState: PropTypes.func.isRequired,
}
