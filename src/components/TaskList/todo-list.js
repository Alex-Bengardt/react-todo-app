import React, { Component } from 'react';
import Task from "../Task";

export default class TaskList extends Component {
	
	render() {
		const { tasks, completeTask, deleteTask } = this.props;

		return (
			<ul className="todo-list">
				{tasks.map(task => (
					<Task
						key={task.id}
						task={task}
						completeTask={completeTask} // Обновили здесь
						deleteTask={deleteTask}
					/>
				))}
			</ul>
		);
	}
}
