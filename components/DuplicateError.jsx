import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import React from 'react';

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
	iconography: {
		marginLeft: theme.spacing.unit
	},
	errorFlash: {
		marginLeft: theme.spacing.unit * 2
	}
});

const DuplicateError = (props) => {
	return (
		<Typography className={props.classes.errorFlash} variant="subheading" color="error">
			You have entered a value that already exists in the database.
			<Icon className={props.classes.iconography} onClick={() => props.onDuplicateCancel()} color="error">
				cancel_presentation
			</Icon>
		</Typography>
	);
};

export default withStyles(styles)(DuplicateError);
