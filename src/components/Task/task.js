import React, { Component } from "react";

export default class Task extends Component {
	render() {
		const { task, completeTask, deleteTask } = this.props;

		return (
			<li
				className={
					task.isEditing ? "editing" : task.isCompleted ? "completed" : ""
				}
			>
				<div className="view">
					<input
						className="toggle"
						type="checkbox"
						checked={task.isCompleted}
						onChange={() => completeTask(task.id)}
					/>
					<label>
						<span className="description">{task.description}</span>
						<span className="created">created {task.createdAt} ago</span>
					</label>
					<button className="icon icon-edit" disabled></button>
					<button
						className="icon icon-destroy"
						onClick={() => deleteTask(task.id)}
					></button>
				</div>
				{task.isEditing && (
					<input
						type="text"
						className="edit"
						value={task.description}
						readOnly
					/>
				)}
			</li>
		);
	}
}
