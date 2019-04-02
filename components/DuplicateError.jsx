import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import React from 'react';

const styles = (theme) => ({
	iconography: {
		marginLeft: theme.spacing.unit * 2
	},
	errorFlash: {
		width: 500,
		border: '2px solid red',
		borderRadius: 5,
		padding: 4,
		margin: theme.spacing.unit * 2,
		backgroundColor: '#e6e6e6'
	}
});

const DuplicateError = (props) => {
	return (
		<Typography className={props.classes.errorFlash} variant="subtitle1" color="error">
			You have entered a value that already exists in the database.
			<Icon className={props.classes.iconography} onClick={() => props.onDuplicateCancel()} color="error">
				cancel_presentation
			</Icon>
		</Typography>
	);
};

export default withStyles(styles)(DuplicateError);
