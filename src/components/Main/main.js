import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Footer from '../Footer'
import TaskList from '../TaskList'

export default class Main extends Component {
  static defaultProps = {
    tasks: [],
    editTaks: () => {},
    completeTask: () => {},
    deleteTask: () => {},
    clearCompleted: () => {},
    toggleEditMode: () => {},
    setFilter: () => {},
  }

  static propTypes = {
    tasks: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired,
        isCompleted: PropTypes.bool,
        isEditing: PropTypes.bool,
        createdAt: PropTypes.instanceOf(Date).isRequired,
      })
    ),
    editTask: PropTypes.func,
    completeTask: PropTypes.func,
    deleteTask: PropTypes.func,
    clearCompleted: PropTypes.func,
    toggleEditMode: PropTypes.func,
    setFilter: PropTypes.func.isRequired,
  }

  render() {
    const { tasks, editTask, completeTask, deleteTask, clearCompleted, toggleEditMode, setFilter } = this.props

    const remainingCount = tasks.filter((task) => !task.isCompleted).length

    return (
      <section className="main">
        <TaskList
          tasks={tasks}
          editTask={editTask}
          completeTask={completeTask}
          deleteTask={deleteTask}
          toggleEditMode={toggleEditMode}
        />
        <Footer remainingCount={remainingCount} clearCompleted={clearCompleted} setFilter={setFilter} />
      </section>
    )
  }
}
