import React from 'react'
import PropTypes from 'prop-types'

import Filters from '../TasksFilter'

function Footer({ remainingCount, clearCompleted, setFilter }) {
  return (
    <footer className="footer">
      <span className="todo-count">
        {remainingCount} item{remainingCount !== 1 ? 's' : ''} left
      </span>
      <Filters setFilter={setFilter} />
      <button className="clear-completed" onClick={clearCompleted}>
        Clear completed
      </button>
    </footer>
  )
}

Footer.defaultProps = {
  remainingCount: 0,
  clearCompleted: () => {},
  setFilter: () => {},
}

Footer.propTypes = {
  remainingCount: PropTypes.number,
  clearCompleted: PropTypes.func,
  setFilter: PropTypes.func.isRequired,
}

export default Footer
