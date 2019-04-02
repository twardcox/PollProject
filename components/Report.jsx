import * as React from 'react';
import ReportItem from './ReportItem';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import * as axios from 'axios';

const styles = (theme) => ({
	root: {
		width: '100%',
		marginTop: theme.spacing.unit * 3,
		overflowX: 'auto'
	},
	table: {
		minWidth: 700,
		align: 'right'
	},
	tableCell: {
		fontSize: '1.5em'
	}
});

class Report extends React.Component {
	constructor(props) {
		super(props);
		this.state = { technologies: [] };
		this.props = props;
	}

	componentDidMount() {
		console.log(`component did mount`);
		this.load();
	}

	compare(a, b) {
		let NameA = a.count;
		let NameB = b.count;

		if (NameA < NameB) {
			return -1;
		}
		if (NameA > NameB) {
			return 1;
		}
		// a must be equal to b
		return 0;
	}

	async load() {
		try {
			const response = await axios.get('/api/tech');

			this.setState({ technologies: response.data.sort(this.compare) });
			console.log(this.state.technologies);
		} catch (error) {
			console.log('load error', error);
		}
	}

	render() {
		const { classes } = this.props;

		return (
			<Paper className={classes.root}>
				<Table className={classes.table}>
					<TableHead>
						<TableRow>
							<TableCell className={this.props.classes.tableCell} width={'84%'}>
								Technology
							</TableCell>
							<TableCell className={this.props.classes.tableCell} width={'10%'}>
								Count
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{this.state.technologies.map((tech, i) => <ReportItem tech={tech} key={i} />)}
					</TableBody>
				</Table>
				<a href={'/'} target="_parent">
					Home
				</a>
			</Paper>
		);
	}
}

export default withStyles(styles)(Report);
