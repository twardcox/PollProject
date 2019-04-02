import * as React from 'react';
import * as axios from 'axios';
import TechList from './TechList';
import TechForm from './TechForm';
import Typography from '@material-ui/core/Typography';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './theme';
import Divider from '@material-ui/core/Divider';
import ErrorModal from './ErrorModal';
import Modal from '@material-ui/core/Modal';
import DuplicateError from './DuplicateError';
import Slide from '@material-ui/core/Slide';

class TechPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = { adding: false, techInput: '', isFiltering: false, deleteError: false, duplicateRecord: false };
		this.props = props;
		this.onChange = this.onChange.bind(this);
		this.onAdd = this.onAdd.bind(this);
		this.onCancel = this.onCancel.bind(this);
		this.onSave = this.onSave.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		this.toggleFilter = this.toggleFilter.bind(this);
		this.onDuplicateCancel = this.onDuplicateCancel.bind(this);
		this.modalDelete = this.modalDelete.bind(this);
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
		if (tech.count > 0) {
			this.setState({ deleteError: tech });
		} else {
			this.modalDelete(tech);
		}
	}

	modalDelete(tech) {
		axios
			.delete(`/api/tech/${tech.tech}`, tech)
			.catch((error) => {
				console.log('delete error', error);
			})
			.then(() => this.load());
	}

	onChange(e) {
		this.setState({ techInput: e.target.value });
	}

	duplicateFilter(data) {
		return data.findIndex((item) => item.tech.toUpperCase() === this.state.techInput.toUpperCase());
	}

	onSave() {
		if (this.duplicateFilter(this.state.technologies) >= 0) {
			this.setState({ duplicateRecord: true });
			return;
		} else {
			axios
				.post('/api/tech/', { tech: this.state.techInput, count: 0 })
				.then(() => this.load())
				.then(this.setState({ techInput: '', adding: false }))
				.catch((error) => {
					console.log('post error', error);
				});
		}
	}

	onDuplicateCancel() {
		this.setState({ duplicateRecord: false });
	}

	onCancel() {
		this.setState({ techInput: '', adding: false });
	}

	componentDidMount() {
		this.load();
	}

	compare(a, b) {
		let NameA = a.tech.toUpperCase();
		let NameB = b.tech.toUpperCase();

		if (NameA < NameB) {
			return -1;
		}
		if (NameA > NameB) {
			return 1;
		}
		// a must be equal to b
		return 0;
	}

	toggleFilter() {
		let toggle = this.state.isFiltering ? false : true;
		this.setState({ isFiltering: toggle });
	}

	async load() {
		try {
			const response = await axios.get('/api/tech');
			this.setState({ technologies: response.data.sort(this.compare) });
		} catch (error) {
			console.log('load error', error);
		}
	}

	render() {
		const applyFilter = (data) => {
			if (!this.state.isFiltering) return data;

			return data.filter((item) => item.tech.toUpperCase().startsWith(this.state.techInput.toUpperCase()));
		};

		return (
			<div>
				<Modal open={Boolean(this.state.deleteError)} onClose={() => this.setState({ deleteError: false })}>
					<ErrorModal
						onContinue={() => {
							this.modalDelete(this.state.deleteError);
							this.setState({ deleteError: false });
						}}
						onUndo={() => this.setState({ deleteError: false })}
					/>
				</Modal>
				<TechForm
					name={this.state.techInput}
					onChange={this.onChange}
					onSave={this.onSave}
					onReset={this.onCancel}
					isFiltering={this.state.isFiltering}
					duplicateRecord={this.state.duplicateRecord}
					toggleFilter={this.toggleFilter}
					applyFilter={this.applyFilter}
					entry={this.state.techInput}
				/>
				{this.state.duplicateRecord && (
					<Slide
						timeout={{ union: 10 }}
						direction="left"
						in={this.state.duplicateRecord}
						mountOnEnter
						unmountOnExit
					>
						<DuplicateError onDuplicateCancel={this.onDuplicateCancel} />
					</Slide>
				)}
				<Divider style={{ margin: 25 }} />

				{this.state.technologies && this.state.technologies.length ? (
					<TechList
						techs={applyFilter(this.state.technologies)}
						handleClick={this.handleClick}
						handleDelete={this.handleDelete}
						modalDelete={this.modalDelete}
						deleteError={this.state.deleteError}
					/>
				) : (
					<Typography color="primary" component="h2" variant="h1" gutterBottom>
						No Items to Display
					</Typography>
				)}
			</div>
		);
	}
}

export default (props) => (
	<MuiThemeProvider theme={theme}>
		<TechPage {...props} />
	</MuiThemeProvider>
);
