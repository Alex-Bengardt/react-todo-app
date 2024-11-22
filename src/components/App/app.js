import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Header from '../Header'
import Main from '../Main'

export default class App extends Component {
  static defaultProps = {
    initialTasks: [
      {
        id: 1,
        description: 'Completed task',
        isCompleted: true,
        isEditing: false,
        createdAt: new Date(Date.now() - 17000),
        elapsedTime: 0,
        isTimerRunning: false,
      },
      {
        id: 2,
        description: 'Editing task',
        isCompleted: false,
        isEditing: true,
        createdAt: new Date(Date.now() - 300000),
        elapsedTime: 0,
        isTimerRunning: false,
      },
      {
        id: 3,
        description: 'Active task',
        isCompleted: false,
        isEditing: false,
        createdAt: new Date(Date.now() - 300000),
        elapsedTime: 0,
        isTimerRunning: false,
      },
    ],
    initialFilter: 'all',
  }

  static propTypes = {
    initialTasks: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired,
        isCompleted: PropTypes.bool,
        isEditing: PropTypes.bool,
        createdAt: PropTypes.instanceOf(Date).isRequired,
        elapsedTime: PropTypes.number.isRequired,
        isTimerRunning: PropTypes.bool.isRequired,
      })
    ),
    initialFilter: PropTypes.string,
  }

  state = {
    tasks: this.props.initialTasks,
    filter: this.props.initialFilter,
  }

  addTask = (description) => {
    const newTask = {
      id: Date.now(),
      description,
      isCompleted: false,
      isEditing: false,
      createdAt: new Date(),
      elapsedTime: 0,
      isTimerRunning: false,
    }

    this.setState(({ tasks }) => ({
      tasks: [newTask, ...tasks],
    }))
  }

  editTask = (id, newDescription) => {
    this.setState(({ tasks }) => ({
      tasks: tasks.map((task) => (task.id === id ? { ...task, description: newDescription } : task)),
    }))
  }

  completeTask = (id) => {
    this.setState(({ tasks }) => ({
      tasks: tasks.map((task) => (task.id === id ? { ...task, isCompleted: !task.isCompleted } : task)),
    }))
  }

  deleteTask = (id) => {
    this.setState(({ tasks }) => ({
      tasks: tasks.filter((task) => task.id !== id),
    }))
  }

  clearCompleted = () => {
    this.setState(({ tasks }) => ({
      tasks: tasks.filter((task) => !task.isCompleted),
    }))
  }

  toggleEditMode = (id) => {
    this.setState(({ tasks }) => ({
      tasks: tasks.map((task) => (task.id === id ? { ...task, isEditing: !task.isEditing } : task)),
    }))
  }

  setFilter = (filter) => {
    this.setState({ filter })
  }

  // Обновления для работы с таймером
  startTimer = (id) => {
    this.setState(({ tasks }) => ({
      tasks: tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              isTimerRunning: true,
              timerStart: Date.now() - task.elapsedTime * 1000, // сохраняем начальную точку
            }
          : task
      ),
    }))

    // Сохраняем интервал для каждой задачи
    if (!this.timerIntervals) this.timerIntervals = {} // Инициализация объекта для хранения интервалов

    if (this.timerIntervals[id]) {
      clearInterval(this.timerIntervals[id]) // Останавливаем старый интервал, если есть
    }

    this.timerIntervals[id] = setInterval(() => {
      this.setState(({ tasks }) => ({
        tasks: tasks.map((task) =>
          task.id === id
            ? {
                ...task,
                elapsedTime: Math.floor((Date.now() - task.timerStart) / 1000), // обновляем время
              }
            : task
        ),
      }))
    }, 1000)
  }

  stopTimer = (id) => {
    clearInterval(this.timerIntervals[id]) // Останавливаем интервал для конкретной задачи
    this.setState(({ tasks }) => ({
      tasks: tasks.map((task) => (task.id === id ? { ...task, isTimerRunning: false } : task)),
    }))
    delete this.timerIntervals[id] // Убираем интервал после его остановки
  }

  render() {
    const { tasks, filter } = this.state
    const filteredTasks = tasks.filter((task) => {
      if (filter === 'completed') return task.isCompleted
      if (filter === 'active') return !task.isCompleted
      return true
    })

    return (
      <section className="todoapp">
        <Header addTask={this.addTask} />
        <Main
          tasks={filteredTasks}
          editTask={this.editTask}
          completeTask={this.completeTask}
          deleteTask={this.deleteTask}
          clearCompleted={this.clearCompleted}
          toggleEditMode={this.toggleEditMode}
          setFilter={this.setFilter}
          totalTasks={tasks.length}
          startTimer={this.startTimer}
          stopTimer={this.stopTimer}
        />
      </section>
    )
  }
}
