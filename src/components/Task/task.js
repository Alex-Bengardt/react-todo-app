import React from 'react';


const Task = ({ task }) => {
	return (
		<li className={task.isEditing ? 'editing' : task.isCompleted ? 'completed' : ''}>
			<div className="view">
				<input
					className="toggle"
					type="checkbox"
					checked={task.isCompleted}
				/>
				<label>
					<span className="description">{task.description}</span>
					<span className="created">created {task.createdAt} ago</span>
				</label>
				<button className="icon icon-edit" disabled></button>
				<button className="icon icon-destroy" disabled></button>
			</div>
			{task.isEditing && (
				<input
					type="text"
					className="edit"
					value={task.description}
				/>
			)}
		</li>
	);
};

export default Task;