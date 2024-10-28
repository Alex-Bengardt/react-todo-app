import React from 'react';
import PropTypes from 'prop-types';


const Filters = ({ setFilter, currentFilter }) => {
	return (
		<ul className="filters">
			<li>
				<button className={currentFilter === 'all' ? "selected" : ''} 
						onClick={() => setFilter('all')}>
						All
				</button>
			</li>
			<li>
				<button className={currentFilter === 'active' ? "selected" : ''}
						onClick={() => setFilter('active')}>
						Active
				</button>
			</li>
			<li>
				<button className={currentFilter === 'completed' ? "selected" : ''}
						onClick={() => setFilter('completed')}>
						Completed
				</button>
			</li>
		</ul>
	);
}

Filters.defaultProps = {
	setFilter: () => {},
	currentFilter: 'all'
}

Filters.propTypes = {
	setFilter: PropTypes.func.isRequired,
	currentFilter: PropTypes.string.isRequired
}

export default Filters;
