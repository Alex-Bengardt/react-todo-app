import React from 'react';
import Filters from "../TasksFilter";

const Footer = ({ remainingCount, clearCompleted, setFilter }) => {
    return (
        <footer className="footer">
            <span className="todo-count">{remainingCount} item{remainingCount !== 1 ? 's' : ''} left</span>
            <Filters setFilter={setFilter} />
            <button className="clear-completed" onClick={clearCompleted}>Clear completed</button>
        </footer>
    );
}

export default Footer;
