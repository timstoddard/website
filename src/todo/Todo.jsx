import React, { Component, PropTypes } from 'react'

import IconButton, { IconPath } from './IconButton'

export default class Todo extends Component {
  constructor(props) {
    super(props)

    this.state = { isDropTarget: false }

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
  }

  onDragEnter() {
    this.setState({ isDropTarget: true })
  }
  
  onDragLeave() {
    this.setState({ isDropTarget: false })
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
      index,
      toggleTodo,
      editTodo,
      deleteTodo,
      handleInput,
      handleKeyDown,
      currentTodoMessage,
    } = this.props
    const {
      isDropTarget,
    } = this.state
    const checkboxId = `checkbox${index}`

    return (
      <li
        className={`todo ${isDropTarget ? 'todo__dropZone' : ''}`}
        onDragStart={onDragStart}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDragOver={onDragOver}
        onDrop={onDrop}
        draggable={true}>
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
            onClick={editTodo(index)}
            />
          <IconButton
            path={IconPath.DELETE}
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
  index: PropTypes.number.isRequired,
  toggleTodo: PropTypes.func.isRequired,
  editTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  handleInput: PropTypes.func.isRequired,
  handleKeyDown: PropTypes.func.isRequired,
  currentTodoMessage: PropTypes.string.isRequired,
  updateOrder: PropTypes.func.isRequired,
}
