import React, { Component } from "react";
import Footer from "../Footer";
import TaskList from "../TaskList";

export default class Main extends Component {
	render() {
		const { tasks, editTask, completeTask, deleteTask, clearCompleted, toggleEditMode, setFilter } = this.props;

		const remainingCount = tasks.filter(task => !task.isCompleted).length;

		return (
			<section className="main">
				<TaskList
					tasks={tasks}
					editTask={editTask}
					completeTask={completeTask}
					deleteTask={deleteTask}
					toggleEditMode={toggleEditMode}
				/>
				<Footer
					remainingCount={remainingCount}
					clearCompleted={clearCompleted}
					setFilter={setFilter}
				/>
			</section>
		);
	}
}
