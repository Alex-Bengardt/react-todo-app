import React, { Component } from "react";

import Footer from "../Footer";
import TaskList from "../TaskList";


export default class Main extends Component {
	state = {
		tasks: [
			{ id: 1, description: 'Completed task', isCompleted: true, isEditing: false, createdAt: '17 seconds' },
			{ id: 2, description: 'Editing task', isCompleted: false, isEditing: true, createdAt: '5 minutes' },
			{ id: 3, description: 'Active task', isCompleted: false, isEditing: false, createdAt: '5 minutes' }
		]
	};

	completeTask = (id) => {
		this.setState(({ tasks }) => ({
			tasks: tasks.map(task =>
				task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
			)
		}));
	};

	deleteTask = (id) => {
		this.setState(({ tasks }) => ({
			tasks: tasks.filter(task => task.id !== id)
		}));
	};

	render() {
		const { tasks } = this.state;

		return (
			<section className="main">
				<TaskList
					tasks={tasks}
					completeTask={this.completeTask}
					deleteTask={this.deleteTask}
				/>
				<Footer />
			</section>
		);
	}
}
