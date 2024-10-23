import React, { Component } from 'react';
import Header from "../Header";
import Main from '../Main';

class App extends Component {
	state = {
		tasks: [
			{ id: 1, description: 'Completed task', isCompleted: true, isEditing: false, createdAt: new Date(Date.now() - 17000) },
			{ id: 2, description: 'Editing task', isCompleted: false, isEditing: true, createdAt: new Date(Date.now() - 300000) },
			{ id: 3, description: 'Active task', isCompleted: false, isEditing: false, createdAt: new Date(Date.now() - 300000) }
		],
		filter: 'all',
	};

	addTask = (description) => {
		const newTask = {
			id: Date.now(),
			description,
			isCompleted: false,
			isEditing: false,
			createdAt: new Date()
		};

		this.setState(({ tasks }) => ({
			tasks: [newTask, ...tasks]
		}));
	};

	editTask = (id, newDescription) => {
		this.setState(({ tasks }) => ({
			tasks: tasks.map(task =>
				task.id === id ? { ...task, description: newDescription } : task
			)
		}));
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

	clearCompleted = () => {
		this.setState(({ tasks }) => ({
			tasks: tasks.filter(task => !task.isCompleted)
		}));
	};

	toggleEditMode = (id) => {
		this.setState(({ tasks }) => ({
			tasks: tasks.map(task =>
				task.id === id ? { ...task, isEditing: !task.isEditing } : task
			)
		}));
	};

	setFilter = (filter) => {
		this.setState({ filter });
	};

	render() {
		const { tasks, filter } = this.state;
		const filteredTasks = tasks.filter(task => {
			if (filter === 'completed') return task.isCompleted;
			if (filter === 'active') return !task.isCompleted;
			return true;
		});

		return (
			<section className="todoapp">
				<Header addTask={this.addTask} />
				<Main
					tasks={filteredTasks}
					editTask={this.editTask}
					completeTask={this.completeTask}
					deleteTask={this.deleteTask}
					clearCompleted={this.clearCompleted}
					toggleEditMode={this.toggleEditMode}
					setFilter={this.setFilter}
					totalTasks={tasks.length}
				/>
			</section>
		);
	}
}

export default App;
