import React from 'react';
import NewTaskForm from "../NewTaskForm";

const Header = ({ addTask }) => {
	return (
		<header className="header">
			<h1>todos</h1>
			<NewTaskForm addTask={addTask} />
		</header>
	);
}

export default Header;
