import * as React from 'react'
import Form from 'react-bootstrap/Form'
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

    return (
      <li
        className={`todo ${isDropTarget ? 'todo__dropZone' : ''}`}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDragOver={onDragOver}
        onDrop={onDrop}
        draggable={isDraggable}
        ref={(elem: HTMLLIElement): void => { this.dropTarget = elem }}>
        <Form>
          {!isEditing &&
            <Form.Check
              custom
              type='checkbox'
              id={`todo-checkbox-${index}`}>
              <Form.Check.Input
                type='checkbox'
                onChange={toggleTodo(index)}
                checked={completed} />
              <Form.Check.Label className={`todo__label ${completed ? 'todo__label--completed' : ''}`}>
                {message}
              </Form.Check.Label>
            </Form.Check>
          }
          {isEditing &&
            <Form.Control
              type='text'
              className='todo__input'
              onInput={handleInput}
              onKeyDown={handleKeyDown}
              value={currentTodoMessage} />
          }
        </Form>
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
