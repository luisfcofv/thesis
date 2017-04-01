import React, { Component } from 'react';
import Select from 'react-select';

import 'react-select/dist/react-select.css';

class Selector extends Component {
	constructor(props) {
		super(props);

		this.options = props.data.map(object => ({
			label: object.name,
			value: object.id.toString(),
		}));

		const knowledge = this.props.knowledge.reduce((acc, item) => (
			[...acc, this.options.find(option => option.value === item.toString())]
		), []);

		this.state = {
			value: knowledge.map(item => item.value),
		};
	}

	handleSelectChange = (value) => {
		this.setState({ value });
	}

	render () {
		return (
			<div className="section">
				<h3 className="title">{this.props.title}</h3>
				<Select
					multi
					simpleValue
					value={this.state.value}
					placeholder={this.props.title}
					options={this.options}
					onChange={this.handleSelectChange}
				/>
			</div>
		);
	}
}

export default Selector;
