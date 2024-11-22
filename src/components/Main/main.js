import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Footer from '../Footer'
import TaskList from '../TaskList'

export default class Main extends Component {
  static defaultProps = {
    tasks: [],
    editTask: () => {}, // Исправлено название
    completeTask: () => {},
    deleteTask: () => {},
    clearCompleted: () => {},
    toggleEditMode: () => {},
    setFilter: () => {},
    startTimer: () => {},
    stopTimer: () => {},
  }

  static propTypes = {
    tasks: PropTypes.arrayOf(
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
    editTask: PropTypes.func,
    completeTask: PropTypes.func,
    deleteTask: PropTypes.func,
    clearCompleted: PropTypes.func,
    toggleEditMode: PropTypes.func,
    setFilter: PropTypes.func.isRequired,
    startTimer: PropTypes.func.isRequired,
    stopTimer: PropTypes.func.isRequired,
  }

  render() {
    const {
      tasks,
      editTask,
      completeTask,
      deleteTask,
      clearCompleted,
      toggleEditMode,
      setFilter,
      startTimer,
      stopTimer,
    } = this.props

    const remainingCount = tasks.filter((task) => !task.isCompleted).length

    return (
      <section className="main">
        <TaskList
          tasks={tasks}
          editTask={editTask}
          completeTask={completeTask}
          deleteTask={deleteTask}
          toggleEditMode={toggleEditMode}
          startTimer={startTimer}
          stopTimer={stopTimer}
        />
        <Footer remainingCount={remainingCount} clearCompleted={clearCompleted} setFilter={setFilter} />
      </section>
    )
  }
}
