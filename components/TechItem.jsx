import * as React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import { Typography } from '@material-ui/core';

const styles = (theme) => ({
	root: {
		flexGrow: 1
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
		textShadow: '1px 1px 2px black, 0 0 25px blue, 0 0 5px darkblue'
	},
	title: {
		margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`
	},
	button: {
		margin: theme.spacing.unit,
		width: theme.spacing.unit * 13
	}
});

const TechItem = (props) => {
	return (
		<Typography variant="h6" className={props.classes.title}>
			<Grid container justify="flex-start" spacing={8}>
				<Grid item xs={8}>
					<Grid container justify="flex-start" spacing={8}>
						<Grid item xs={10}>
							<div className={props.classes.shadowEffect}>technology: {props.tech.tech}</div>
						</Grid>
						<Grid item xs={2}>
							<div className={props.classes.shadowEffect}>count: {props.tech.count}</div>
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={4}>
					<Grid container justify="center" spacing={8}>
						<Grid item xs={4}>
							<Button
								className={props.classes.button}
								variant="contained"
								color="primary"
								onClick={() => props.handleClick(props.tech, 1)}
							>
								<Icon color="secondary">add_circle</Icon>
								Add
							</Button>
						</Grid>
						<Grid item xs={4}>
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
						</Grid>
						<Grid item xs={4}>
							<Button
								className={props.classes.button}
								variant="contained"
								color="default"
								onClick={() => props.handleDelete(props.tech)}
							>
								<Icon color="secondary">delete_forever</Icon>
								Delete
							</Button>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
			<Divider style={{ margin: 25 }} />
		</Typography>
	);
};

export default withStyles(styles)(TechItem);
