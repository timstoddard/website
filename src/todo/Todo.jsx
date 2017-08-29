import React, { PropTypes } from 'react'

import IconButton, { IconPath } from './IconButton'

const Todo = ({
  message,
  completed,
  isEditing,
  index,
  checkboxId,
  toggleTodo,
  editTodo,
  deleteTodo,
  handleInput,
  handleKeyDown,
  currentTodoMessage,
}) =>
  <li className="todo">
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

Todo.propTypes = {
  message: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  isEditing: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
  checkboxId: PropTypes.string.isRequired,
  toggleTodo: PropTypes.func.isRequired,
  editTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  handleInput: PropTypes.func.isRequired,
  handleKeyDown: PropTypes.func.isRequired,
  currentTodoMessage: PropTypes.string.isRequired,
}

export default Todo
