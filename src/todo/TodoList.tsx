import classNames from 'classnames'
import * as React from 'react'
import { Form } from 'react-bootstrap'
import IconButton, { IconPath } from './IconButton'
import Todo from './Todo'
import { TRANSITION_MS, TransitionState } from './transition'
import { EmptyObject } from '../types'
import styles from './scss/TodoList.scss'

interface State {
  todos: TodoItem[],
  currentTodoMessage: string
  todosRemaining: number
  showingList: boolean
  transitionState: string,
  isDragging: boolean
}

interface TodoItem {
  message: string
  completed: boolean
  isEditing: boolean
}

export default class TodoList extends React.Component<EmptyObject, State> {
  constructor(props: EmptyObject) {
    super(props)

    this.state = {
      todos: [],
      currentTodoMessage: '',
      todosRemaining: 0,
      showingList: false,
      transitionState: TransitionState.STOPPED,
      isDragging: false,
    }
  }

  componentDidMount(): void {
    const todos = JSON.parse(localStorage.getItem('todos'))
    if (todos) {
      this.setState({ todos })
    }
    this.toggleShowingList()
  }

  handleInput = (e: React.FormEvent): void => {
    this.setState({ currentTodoMessage: (e.target as HTMLInputElement).value })
  }

  handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    const {
      todos,
      currentTodoMessage,
    } = this.state

    if (e.key === 'Enter') {
      const editedTodoIndex = todos.findIndex((todo: TodoItem) => todo.isEditing)
      if (editedTodoIndex === -1) {
        this.addTodo()
      } else {
        this.updateTodo(editedTodoIndex, currentTodoMessage)
      }
    }
  }

  addTodo = (): void => {
    const { currentTodoMessage, todos } = this.state
    if (currentTodoMessage) {
      const newTodo: TodoItem = {
        message: currentTodoMessage,
        completed: false,
        isEditing: false,
      }
      const newTodos = [...todos, newTodo]
      this.setState({
        currentTodoMessage: '',
        todos: newTodos,
        todosRemaining: newTodos.filter((todo: TodoItem) => !todo.completed).length,
      })
      this.saveList(newTodos)
    }
  }

  editTodo = (i: number): (() => void) => {
    return (): void => {
      const { currentTodoMessage, todos } = this.state
      const updatedTodo = Object.assign({}, todos[i], {
        isEditing: !todos[i].isEditing,
      })

      if (updatedTodo.isEditing) {
        const elementsBefore = todos.slice(0, i)
        const elementsAfter = todos.slice(i + 1)
        const newTodos = [...elementsBefore, updatedTodo, ...elementsAfter]
        this.setState({
          currentTodoMessage: updatedTodo.message,
          todos: newTodos,
          todosRemaining: newTodos.filter((todo: TodoItem) => !todo.completed).length,
        })
        this.saveList(newTodos)
      } else {
        const index = todos.findIndex((todo: TodoItem) => todo.isEditing)
        this.updateTodo(index, currentTodoMessage)
      }
    }
  }

  deleteTodo = (i: number): (() => void) => {
    return (): void => {
      const { todos } = this.state
      const elementsBefore = todos.slice(0, i)
      const elementsAfter = todos.slice(i + 1)
      const newTodos = [...elementsBefore, ...elementsAfter]
      this.setState({
        todos: newTodos,
        todosRemaining: newTodos.filter((todo: TodoItem) => !todo.completed).length,
      })
      this.saveList(newTodos)
    }
  }

  updateTodo = (i: number, message: string): void => {
    const { todos } = this.state
    const updatedTodo = Object.assign({}, todos[i], {
      message,
      isEditing: false,
    })

    const elementsBefore = todos.slice(0, i)
    const elementsAfter = todos.slice(i + 1)
    const newTodos = [...elementsBefore, updatedTodo, ...elementsAfter]
    this.setState({
      currentTodoMessage: '',
      todos: newTodos,
      todosRemaining: newTodos.filter((todo: TodoItem) => !todo.completed).length,
    })
    this.saveList(newTodos)
  }

  toggleTodo = (i: number): ((e: React.ChangeEvent<HTMLInputElement>) => void) => {
    return (e: React.ChangeEvent<HTMLInputElement>): void => {
      const { todos } = this.state
      const updatedTodo = Object.assign({}, todos[i], {
        completed: e.target.checked,
      })

      const elementsBefore = todos.slice(0, i)
      const elementsAfter = todos.slice(i + 1)
      const newTodos = [...elementsBefore, updatedTodo, ...elementsAfter]
      this.setState({
        todos: newTodos,
        todosRemaining: newTodos.filter((todo: TodoItem) => !todo.completed).length,
      })
      this.saveList(newTodos)
    }
  }

  updateOrder = (insertAt: number): ((i: number) => void) => {
    return (i: number): void => {
      const { todos } = this.state
      const updatedTodo = Object.assign({}, todos[i])
      const newTodos = [...todos]
      newTodos.splice(i, 1)
      newTodos.splice(insertAt, 0, updatedTodo)
      this.setState({
        todos: newTodos,
        todosRemaining: newTodos.filter((todo: TodoItem) => !todo.completed).length,
      })
      this.saveList(newTodos)
    }
  }

  toggleShowingList = (): void => {
    this.setState({ transitionState: TransitionState.OUT }, () => {
      setTimeout(() => {
        this.setState({ transitionState: TransitionState.IN }, () => {
          setTimeout(() => {
            this.setState({
              showingList: !this.state.showingList,
              transitionState: TransitionState.STOPPED,
            })
          }, 20)
        })
      }, TRANSITION_MS)
    })
  }

  saveList = (todos: TodoItem[]): void => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }

  updateDragState = (isDragging: boolean): void => {
    this.setState({ isDragging })
  }

  currentTransition = (): string => {
    switch (this.state.transitionState) {
      case TransitionState.OUT:
        return `transform ${TRANSITION_MS / 1000}s ease-out`
      case TransitionState.IN:
        return 'none'
      default:
        return `transform ${TRANSITION_MS / 1000}s ease-out`
    }
  }

  currentTransform = (): string => {
    const { transitionState, showingList } = this.state
    switch (transitionState) {
      case TransitionState.OUT:
        return showingList ? 'scale(0, 0)' : 'scale(0, 1)'
      case TransitionState.IN:
        return showingList ? 'scale(0, 1)' : 'scale(0, 0)'
      default:
        return 'scale(1, 1)'
    }
  }

  render(): JSX.Element {
    document.title = 'Todo List'

    const {
      handleInput,
      handleKeyDown,
      editTodo,
      deleteTodo,
      toggleTodo,
      updateOrder,
      toggleShowingList,
      updateDragState,
    } = this
    const {
      todos,
      currentTodoMessage,
      todosRemaining,
      showingList,
      isDragging,
    } = this.state

    const transform = this.currentTransform()
    const transition = this.currentTransition()

    return (
      <div
        className={classNames(
          styles.todoList,
          { [styles['todoList--showingList']]: showingList })}>
        <div
          className={styles.todoList__contentWrapper}
          style={{
            transition,
            transform,
          }}>
          {!showingList &&
            <Form.Control
              type='text'
              className={styles.todoList__input}
              // onInput={handleInput}
              onChange={handleInput}
              onKeyDown={handleKeyDown}
              value={currentTodoMessage} />
          }
          {showingList &&
            <div className={styles.todoList__listWrapper}>
              <h2 className={styles.todoList__title}>
                Todo List
              </h2>
              <h5 className={styles.todoList__subtitle}>
                {todos.length} item{todos.length !== 1 && 's'}, {todosRemaining} remaining
              </h5>
              <ul className={styles.todoList__list}>
                {todos.map(({ message, completed, isEditing }: TodoItem, i: number) => (
                  <Todo
                    key={`${message}~${i + 1}`}
                    message={message}
                    completed={completed}
                    isEditing={isEditing}
                    hideIcons={isDragging}
                    index={i}
                    toggleTodo={toggleTodo}
                    editTodo={editTodo}
                    deleteTodo={deleteTodo}
                    handleInput={handleInput}
                    handleKeyDown={handleKeyDown}
                    currentTodoMessage={currentTodoMessage}
                    updateOrder={updateOrder(i)}
                    updateDragState={updateDragState} />
                ))}
              </ul>
            </div>
          }
        </div>
        <IconButton
          path={IconPath.SWAP}
          className={styles.todoList__toggle}
          onClick={toggleShowingList} />
      </div>
    )
  }
}
