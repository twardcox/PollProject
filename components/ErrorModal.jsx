import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Paper } from '@material-ui/core';

const styles = (theme) => ({
	paper: {
		width: theme.spacing.unit * 100,
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		padding: theme.spacing.unit * 4,
		outline: 'none',
		margin: 'auto'
	}
});

// on delete setState tech.count = 0 then run handleDelete again
// on Undo reset deleteError: false to remove Modal

const ErrorModal = (props) => {
	const { classes } = props;

	return (
		<Paper className={classes.paper}>
			<Typography color="primary" component="h5" variant="h5" gutterBottom>
				Warning the item you want to delete has poll results.
			</Typography>
			<Button onClick={props.onContinue}>Continue with delete</Button>
			<Button onClick={props.onUndo}>Undo</Button>
		</Paper>
	);
};

export default withStyles(styles)(ErrorModal);
