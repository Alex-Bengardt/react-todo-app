import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Task from "../Task";

export default class TaskList extends Component {

	static defaultProps = {
		tasks: [],
		completeTask: () => {},
		deleteTask: () => {},
		editTask: () => {},
		toggleEditMode: () => {}
	}

	static propTypes = {
		tasks: PropTypes.arrayOf(
			PropTypes.shape({
				id: PropTypes.number.isRequired,
				description: PropTypes.string.isRequired,
				isCompleted: PropTypes.bool.isRequired,
				isEditing: PropTypes.bool.isRequired,
				createdAt: PropTypes.instanceOf(Date).isRequired,
			})
		).isRequired,
		completeTask: PropTypes.func.isRequired,
		deleteTask: PropTypes.func.isRequired,
		editTask: PropTypes.func.isRequired,
		toggleEditMode: PropTypes.func.isRequired
	}

	render() {
		const { tasks, completeTask, deleteTask, editTask, toggleEditMode } = this.props;

		return (
			<ul className="todo-list">
				{tasks.map(task => (
					<Task
						key={task.id}
						task={task}
						completeTask={completeTask}
						deleteTask={deleteTask}
						editTask={editTask}
						toggleEditMode={toggleEditMode}
					/>
				))}
			</ul>
		);
	}
}
