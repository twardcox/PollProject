import * as React from 'react';
import * as axios from 'axios';
import TechList from './TechList';
import TechForm from './TechForm';
import update from 'immutability-helper';

export default class TechPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = { adding: false, newTech: {} };
		this.props = props;
		this.onChange = this.onChange.bind(this);
		this.onAdd = this.onAdd.bind(this);
		this.onCancel = this.onCancel.bind(this);
		this.onSave = this.onSave.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	onAdd(e) {
		e.preventDefault();

		this.setState({ adding: true });
	}

	handleClick(index, changeBy) {
		const newstate = update(this.state, {
			technologies: {
				[index]: { count: { $apply: (q) => Number(q) + changeBy } }
			}
		});
		this.setState(newstate);
	}

	onChange(target) {
		var newTech = { ...this.state.newTech };
		newTech[target.name] = target.value;
		this.setState({ newTech: newTech });
	}

	onSave() {
		axios
			.post('/api/tech/', this.state.newTech)
			.then(() => this.load())
			.then(this.setState({ newTech: {}, adding: false }))
			.catch((error) => {
				console.log('error', error);
			});
	}

	onCancel() {
		this.setState({ newTech: {}, adding: false });
	}

	componentDidMount() {
		this.load();
	}

	async load() {
		var response = await axios.get('/api/tech').catch((error) => {
			console.log('error', error);
		});

		this.setState({ technologies: response.data });
	}

	render() {
		return (
			<div>
				<button onClick={this.onAdd}>Add</button>
				{this.state.adding && (
					<TechForm
						name={this.state.newTech.tech}
						onChange={this.onChange}
						onSave={this.onSave}
						onReset={this.onCancel}
					/>
				)}
				{this.state.technologies &&
				this.state.technologies.length && (
					<TechList techs={this.state.technologies} handleClick={this.handleClick} />
				)}
			</div>
		);
	}
}
