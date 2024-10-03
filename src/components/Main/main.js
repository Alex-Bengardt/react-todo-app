import React from 'react';

import Footer from '../Footer';
import TaskList from '../TaskList';


const Main = () => {
	const tasks = [
		{ id: 1, description: 'Completed task', isCompleted: true, isEditing: false, createdAt: '17 seconds' },
		{ id: 2, description: 'Editing task', isCompleted: false, isEditing: true, createdAt: '5 minutes' },
		{ id: 3, description: 'Active task', isCompleted: false, isEditing: false, createdAt: '5 minutes' }
	];

	return (
		<section className="main">
			<TaskList tasks={tasks}/>
			<Footer />
		</section>
	)
}

export default Main;