import * as React from 'react';
import TechItem from './TechItem';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

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

const TechList = (props) => {
	const { classes } = props;

	return (
		<Paper className={classes.root}>
			<Table className={classes.table}>
				<TableHead>
					<TableRow>
						<TableCell className={props.classes.tableCell} width={'84%'}>
							Technology
						</TableCell>
						<TableCell className={props.classes.tableCell} width={'10%'}>
							Count
						</TableCell>
						<TableCell width={'2%'} />
						<TableCell width={'2%'} />
						<TableCell width={'2%'} />
					</TableRow>
				</TableHead>
				<TableBody>
					{props.techs.map((tech, i) => (
						<TechItem
							tech={tech}
							key={i}
							handleClick={props.handleClick}
							onChange={tech.onChange}
							onSave={tech.onSave}
							handleDelete={props.handleDelete}
						/>
					))}
				</TableBody>
			</Table>
			<a href={'/report.html'} target="_parent">
				View Report
			</a>
		</Paper>
	);
};

export default withStyles(styles)(TechList);
