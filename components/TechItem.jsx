import * as React from 'react';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';

const styles = (theme) => ({
	root: {
		display: 'flex',
		justifyContent: 'start',
		alignItems: 'flex-end'
	},
	button: {
		margin: theme.spacing.unit
	},
	leftIcon: {
		marginRight: theme.spacing.unit
	},
	rightIcon: {
		marginLeft: theme.spacing.unit
	},
	iconSmall: {
		fontSize: 20
	},
	icon: {
		margin: theme.spacing.unit * 2
	},
	div1: {
		fontSize: 30,
		margin: 10,
		width: 350,
		color: '#cc0066',
		border: '1px solid #003399',
		padding: 4
	},
	div2: {
		fontSize: 30,
		margin: 10,
		width: 200,
		color: '#cc0066',
		border: '1px solid #003399',
		padding: 4
	}
});

const TechItem = (props) => {
	const { classes } = props;
	return (
		<li className={classes.root}>
			<div className={classes.div1}>technology: {props.tech.tech}</div>
			<div className={classes.div2}>count: {props.tech.count}</div>
			<div>
				<Button
					className={classes.button}
					variant="contained"
					color="primary"
					onClick={() => props.handleClick(props.tech, 1)}
				>
					<Icon className={classes.leftIcon} color="secondary">
						add_circle
					</Icon>
					Add
				</Button>
				<Button
					className={classes.button}
					variant="contained"
					color="secondary"
					onClick={() => props.handleClick(props.tech, -1)}
					disabled={props.tech.count < 1 ? true : false}
				>
					<Icon className={classes.leftIcon} color="primary">
						remove_circle
					</Icon>
					Remove
				</Button>
			</div>
		</li>
	);
};

export default withStyles(styles)(TechItem);
