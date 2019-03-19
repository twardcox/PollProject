import * as React from 'react';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { withStyles } from '@material-ui/core/styles';
import { TableRow, TableCell } from '@material-ui/core';

const styles = (theme) => ({
	root: {
		flexGrow: 1,
		width: '100%',
		marginTop: theme.spacing.unit * 3,
		overflowX: 'auto'
	},
	paper: {
		padding: theme.spacing.unit,
		height: '100%',
		color: theme.palette.text.secondary
	},
	control: {
		padding: theme.spacing.unit
	},
	shadowEffect: {
		color: 'white',
		textShadow: `1px 1px 2px black, 0 0 25px ${theme.palette.secondary.light}, 0 0 5px ${theme.palette.secondary
			.dark}`,
		fontSize: '1.5em'
	},
	blueShadowEffect: {
		color: 'white',
		textShadow: `1px 1px 2px black, 0 0 25px ${theme.palette.primary.light}, 0 0 15px ${theme.palette.primary
			.dark}}`,
		fontSize: '1.5em'
	},
	title: {
		margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`
	},
	button: {
		width: theme.spacing.unit * 13
	}
});

const TechItem = (props) => {
	return (
		<TableRow>
			<TableCell className={props.classes.shadowEffect} component="th" scope="row">
				{props.tech.tech}
			</TableCell>
			<TableCell className={props.classes.blueShadowEffect}>{props.tech.count}</TableCell>
			<TableCell>
				<Button
					className={props.classes.button}
					variant="contained"
					color="primary"
					onClick={() => props.handleClick(props.tech, 1)}
				>
					<Icon color="secondary">add_circle</Icon>
					Add
				</Button>
			</TableCell>
			<TableCell>
				<Button
					className={props.classes.button}
					variant="contained"
					color="secondary"
					onClick={() => props.handleClick(props.tech, -1)}
					disabled={props.tech.count < 1 ? true : false}
				>
					<Icon color="primary">remove_circle</Icon>
					Remove
				</Button>
			</TableCell>
			<TableCell>
				<Button
					className={props.classes.button}
					variant="contained"
					color="default"
					onClick={() => props.handleDelete(props.tech)}
				>
					<Icon color="secondary">delete_forever</Icon>
					Delete
				</Button>
			</TableCell>
		</TableRow>
	);
};

export default withStyles(styles)(TechItem);
