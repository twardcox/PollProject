import * as React from 'react';
import * as axios from 'axios';
import TechList from './TechList';
import TechForm from './TechForm';

export default class TechPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = { adding: false, newTech: { tech: '', count: 0 } };
		this.props = props;
		this.onChange = this.onChange.bind(this);
		this.onAdd = this.onAdd.bind(this);
		this.onCancel = this.onCancel.bind(this);
		this.onSave = this.onSave.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
	}

	onAdd(e) {
		e.preventDefault();

		this.setState({ adding: true });
	}

	handleClick(tech, changeBy) {
		tech.count += changeBy;

		axios
			//  api = server, tech = database, tech.tech = specific document in DB
			// tech = specific record
			.put(`/api/tech/${tech.tech}`, tech)
			.catch((error) => {
				console.log('put error', error);
			})
			.then(() => this.load());
	}

	handleDelete(tech) {
		axios
			//  api = server, tech = database, tech.tech = specific document in DB
			// tech = specific record
			.delete(`/api/tech/${tech.tech}`, tech)
			.catch((error) => {
				console.log('delete error', error);
			})
			.then(() => this.load());
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
			.then(this.setState({ newTech: { tech: '', count: 0 }, adding: false }))
			.catch((error) => {
				console.log('post error', error);
			});
	}

	onCancel() {
		this.setState({ newTech: { tech: '', count: 0 }, adding: false });
	}

	componentDidMount() {
		this.load();
	}

	async load() {
		try {
			const response = await axios.get('/api/tech');
			this.setState({ technologies: response.data });
		} catch (error) {
			console.log('load error', error);
		}
	}

	render() {
		return (
			<div>
				<TechForm
					name={this.state.newTech.tech}
					count={this.state.newTech.count}
					onChange={this.onChange}
					onSave={this.onSave}
					onReset={this.onCancel}
				/>
				{(this.state.technologies &&
				this.state.technologies.length && (
					<TechList
						techs={this.state.technologies}
						handleClick={this.handleClick}
						handleDelete={this.handleDelete}
					/>
				)) || <h1>not here</h1>}
			</div>
		);
	}
}
