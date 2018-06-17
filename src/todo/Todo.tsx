import * as PropTypes from 'prop-types'
import * as React from 'react'

import IconButton, { IconPath } from './IconButton'

interface Props {
  message: string
  completed: boolean
  isEditing: boolean
  hideIcons: boolean
  index: number
  toggleTodo: (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => void
  editTodo: (index: number) => () => void
  deleteTodo: (index: number) => () => void
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void
  currentTodoMessage: string
  updateOrder: (insertAt: number) => void
  updateDragState: (isDragging: boolean) => void
}

interface State {
  isDraggable: boolean
  isDropTarget: boolean
}

export default class Todo extends React.Component<Props, State> {
  static propTypes: any = {
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

  dropTarget: HTMLLIElement

  constructor(props: Props) {
    super(props)

    this.state = {
      isDraggable: false,
      isDropTarget: false,
    }
  }

  onDragStart = (e: React.DragEvent<HTMLDivElement>): void => {
    const { index, updateDragState } = this.props
    e.dataTransfer.setData('text/plain', `${index}`)
    e.dataTransfer.dropEffect = 'link'
    updateDragState(true)
    this.setState({ isDraggable: true })
  }

  onDragEnter = (): void => {
    this.setState({ isDropTarget: true })
  }

  onDragLeave = (e: React.DragEvent<HTMLLIElement>): void => {
    const targetPath = (e.nativeEvent as any).path.slice(1)
    if (!targetPath.includes(this.dropTarget)) {
      this.setState({ isDropTarget: false })
    }
  }

  onDragOver = (e: React.DragEvent<HTMLLIElement>): void => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'link'
  }

  onDrop = (e: React.DragEvent<HTMLLIElement>): void => {
    e.preventDefault()
    const { index, updateOrder, updateDragState } = this.props
    const data = e.dataTransfer.getData('text')
    const droppedTodoIndex = parseInt(data, 10)
    this.setState({ isDropTarget: false })
    if (droppedTodoIndex !== index) {
      updateOrder(droppedTodoIndex)
    }
    updateDragState(false)
    this.setState({ isDraggable: false })
  }

  render(): JSX.Element {
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
        ref={(elem: HTMLLIElement): void => { this.dropTarget = elem }}>
        <div>
          <input
            type='checkbox'
            className='todo__checkbox'
            onChange={toggleTodo(index)}
            id={checkboxId}
            checked={completed} />
          {!isEditing &&
            <label
              htmlFor={checkboxId}
              className={`todo__label ${completed ? 'todo__label--completed' : ''}`}>
              {message}
            </label>
          }
          {isEditing &&
            <input
              type='text'
              className='todo__input'
              onChange={handleInput}
              onKeyDown={handleKeyDown}
              value={currentTodoMessage} />
          }
        </div>
        <div className='todo__buttons'>
          <IconButton
            path={IconPath.EDIT}
            hidden={hideIcons}
            onClick={editTodo(index)} />
          <IconButton
            className='todo__button--drag'
            path={IconPath.DRAG}
            hidden={hideIcons && !isDraggable}
            onDragStart={onDragStart}
            isDraggable={true} />
          <IconButton
            path={IconPath.DELETE}
            hidden={hideIcons}
            onClick={deleteTodo(index)} />
        </div>
      </li>
    )
  }
}
