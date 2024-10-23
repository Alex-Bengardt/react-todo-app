import React, { Component } from "react";

class NewTaskForm extends Component {
	state = {
		description: ''
	};

	handleChange = (e) => {
		this.setState({ description: e.target.value });
	};

	handleSubmit = (e) => {
		e.preventDefault();
		if (this.state.description.trim()) {
			this.props.addTask(this.state.description);
			this.setState({ description: '' });
		}
	};

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<input
					className="new-todo"
					placeholder="What needs to be done?"
					autoFocus
					value={this.state.description}
					onChange={this.handleChange}
				/>
			</form>
		);
	}
}

export default NewTaskForm;
