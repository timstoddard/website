import React, { Component } from 'react'

import Todo from './Todo'
import IconButton, { IconPath } from './IconButton'
import { TransitionState, TRANSITION_MS } from './transition'

export default class TodoList extends Component {
  constructor() {
    super()

    // input handlers
    this.handleInput = this.handleInput.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)

    // list logic
    this.addTodo = this.addTodo.bind(this)
    this.editTodo = this.editTodo.bind(this)
    this.deleteTodo = this.deleteTodo.bind(this)
    this.toggleTodo = this.toggleTodo.bind(this)
    this.toggleShowingList = this.toggleShowingList.bind(this)

    this.state = {
      todos: [],
      currentTodoMessage: '',
      todosRemaining: 0,
      showingList: false,
      transitionState: TransitionState.STOPPED,
    }
  }

  componentDidMount() {
    this.toggleShowingList()
  }

  handleInput(e) {
    this.setState({ currentTodoMessage: e.target.value })
  }

  handleKeyDown(e) {
    const { todos, currentTodoMessage } = this.state
    if (e.key === 'Enter') {
      const editedTodo = todos.find(todo => todo.isEditing)
      if (editedTodo) {
        const index = todos.findIndex(todo => todo.isEditing)
        this.updateTodo(index, currentTodoMessage)
      } else {
        this.addTodo()
      }
    }
  }

  addTodo() {
    const { currentTodoMessage, todos } = this.state
    if (currentTodoMessage) {
      const newTodo = {
        message: currentTodoMessage,
        completed: false,
        isEditing: false,
      }
      const newTodos = [...todos, newTodo]
      this.setState({
        currentTodoMessage: '',
        todos: newTodos,
        todosRemaining: newTodos.filter(todo => !todo.completed).length,
      })
    }
  }

  editTodo(i) {
    return () => {
      const { currentTodoMessage, todos } = this.state
      const { message, completed, isEditing } = todos[i]
      const updatedTodo = {
        message,
        completed,
        isEditing: !isEditing,
      }

      if (updatedTodo.isEditing) {
        const elementsBefore = todos.slice(0, i)
        const elementsAfter = todos.slice(i + 1)
        const newTodos = [...elementsBefore, updatedTodo, ...elementsAfter]
        this.setState({
          currentTodoMessage: message,
          todos: newTodos,
          todosRemaining: newTodos.filter(todo => !todo.completed).length,
        })
      } else {
        const index = todos.findIndex(todo => todo.isEditing)
        this.updateTodo(index, currentTodoMessage)
      }
    }
  }

  deleteTodo(i) {
    return () => {
      const { todos } = this.state
      const elementsBefore = todos.slice(0, i)
      const elementsAfter = todos.slice(i + 1)
      const newTodos = [...elementsBefore, ...elementsAfter]
      this.setState({
        todos: newTodos,
        todosRemaining: newTodos.filter(todo => !todo.completed).length,
      })
    }
  }

  updateTodo(i, message) {
    const { todos } = this.state
    const { completed } = todos[i]
    const updatedTodo = {
      message,
      completed,
      isEditing: false,
    }

    const elementsBefore = todos.slice(0, i)
    const elementsAfter = todos.slice(i + 1)
    const newTodos = [...elementsBefore, updatedTodo, ...elementsAfter]
    this.setState({
      currentTodoMessage: '',
      todos: newTodos,
      todosRemaining: newTodos.filter(todo => !todo.completed).length,
    })
  }

  toggleTodo(i) {
    return (e) => {
      const { todos } = this.state
      const { message, isEditing } = todos[i]
      const updatedTodo = {
        message,
        completed: e.target.checked,
        isEditing,
      }

      const elementsBefore = todos.slice(0, i)
      const elementsAfter = todos.slice(i + 1)
      const newTodos = [...elementsBefore, updatedTodo, ...elementsAfter]
      this.setState({
        todos: newTodos,
        todosRemaining: newTodos.filter(todo => !todo.completed).length,
      })
    }
  }

  toggleShowingList() {
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

  currentTransition() {
    switch (this.state.transitionState) {
      case TransitionState.OUT:
        return `transform ${TRANSITION_MS / 1000}s ease-out`
      case TransitionState.IN:
        return 'none'
      default:
        return `transform ${TRANSITION_MS / 1000}s ease-out`
    }
  }

  currentTransform() {
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

  render() {
    document.title = 'Todo List'

    const {
      handleInput,
      handleKeyDown,
      editTodo,
      deleteTodo,
      toggleTodo,
      toggleShowingList,
    } = this
    const {
      todos,
      currentTodoMessage,
      todosRemaining,
      showingList,
    } = this.state

    const transform = this.currentTransform()
    const transition = this.currentTransition()

    return (
      <div className={`todoList ${showingList ? 'todoList--showingList' : ''}`}>
        <div
          className="todoList__contentWrapper"
          style={{
            transition,
            transform,
          }}>
          {!showingList &&
            <input
              type="text"
              className="todoList__input"
              onChange={handleInput}
              onKeyDown={handleKeyDown}
              value={currentTodoMessage}
              />
          }
          {showingList &&
            <div className="todoList__listWrapper">
              <h2>Todo List</h2>
              <h5>{todos.length} item{todos.length !== 1 && 's'}, {todosRemaining} remaining</h5>
              <ul className="todoList__list">
                {todos.map(({ message, completed, isEditing }, i) =>
                  <Todo
                    key={`${message}~${i + 1}`}
                    message={message}
                    completed={completed}
                    isEditing={isEditing}
                    index={i}
                    checkboxId={`checkbox${i}`}
                    toggleTodo={toggleTodo}
                    editTodo={editTodo}
                    deleteTodo={deleteTodo}
                    handleInput={handleInput}
                    handleKeyDown={handleKeyDown}
                    currentTodoMessage={currentTodoMessage}
                    />
                )}
              </ul>
            </div>
          }
        </div>
        <IconButton
          path={IconPath.SWAP}
          className="todoList__toggle"
          onClick={toggleShowingList}
          />
      </div>
    )
  }
}
