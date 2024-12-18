import React, { Component } from "react";
import PropTypes from 'prop-types';

export default class NewTaskForm extends Component {

	static defaultProps = {
		addTask: () => {}
	}

	static propTypes = {
		addTask: PropTypes.func.isRequired
	}

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
