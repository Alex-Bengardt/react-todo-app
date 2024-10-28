import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { differenceInSeconds, differenceInMinutes } from 'date-fns';

export default class Task extends Component {

	static defaultProps = {
		task: {
			id: null,
			description: '',
			isCompleted: false,
			isEditing: false,
			createdAt: new Date()
		},
		completeTask: () => {},
		deleteTask: () => {},
		toggleEditMode: () => {},
		editTask: () => {}
	}

	static propTypes = {
		task: PropTypes.shape({
			id: PropTypes.number.isRequired,
			description: PropTypes.string.isRequired,
			isCompleted: PropTypes.bool.isRequired,
			isEditing: PropTypes.bool.isRequired,
			createdAt: PropTypes.instanceOf(Date).isRequired,
		}).isRequired,
		completeTask: PropTypes.func.isRequired,
		deleteTask: PropTypes.func.isRequired,
		toggleEditMode: PropTypes.func.isRequired,
		editTask: PropTypes.func.isRequired
	}

	state = {
		timeSinceCreation: '',
		editedDescription: this.props.task.description
	};

	componentDidMount() {
		this.interval = setInterval(() => {
			this.updateTimeSinceCreation();
		}, 5000);
		this.updateTimeSinceCreation();
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	formatTimeSinceCreation = (createdAt) => {
		const now = new Date();
		const createdDate = new Date(createdAt);
		const seconds = differenceInSeconds(now, createdDate);
		const minutes = differenceInMinutes(now, createdDate);

		if (seconds < 60) {
			return `${seconds} seconds ago`;
		} else if (minutes < 60) {
			return `${minutes} minutes ago`;
		}
		return `more than an hour ago`;
	};

	updateTimeSinceCreation = () => {
		const { task } = this.props;
		const timeSinceCreation = `created ${this.formatTimeSinceCreation(task.createdAt)}`;
		this.setState({ timeSinceCreation });
	};

	handleEditChange = (e) => {
		this.setState({ editedDescription: e.target.value });
	};

	handleEditSubmit = (e) => {
		const { task, editTask, toggleEditMode } = this.props;
		if (e.key === 'Enter') {
			editTask(task.id, this.state.editedDescription);
			toggleEditMode(task.id);
		}
	};

	render() {
		const { task, completeTask, deleteTask, toggleEditMode } = this.props;
		const { timeSinceCreation, editedDescription } = this.state;

		return (
			<li className={task.isEditing ? "editing" : task.isCompleted ? "completed" : ""}>
				<div className="view">
					<input
						className="toggle"
						type="checkbox"
						checked={task.isCompleted}
						onChange={() => completeTask(task.id)}
					/>
					<label>
						<span className="description">{task.description}</span>
						<span className="created">{timeSinceCreation}</span>
					</label>
					<button className="icon icon-edit" onClick={() => toggleEditMode(task.id)}></button>
					<button className="icon icon-destroy" onClick={() => deleteTask(task.id)}></button>
				</div>
				{task.isEditing && (
					<input
						type="text"
						className="edit"
						value={editedDescription}
						onChange={this.handleEditChange}
						onKeyDown={this.handleEditSubmit}
						onBlur={() => toggleEditMode(task.id)}
					/>
				)}
			</li>
		);
	}
}
