import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
	root: {
		display: 'flex',
		justifyContent: 'start',
		alignItems: 'flex-end'
	},
	button: {
		margin: theme.spacing.unit,
		backGroundColor: 'red'
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

class TechForm extends React.Component {
	constructor(props) {
		super(props);

		this.props = props;
		this.onSubmit = this.onSubmit.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onReset = this.onReset.bind(this);
	}

	onSubmit(e) {
		e.preventDefault();

		this.props.onSave && this.props.onSave.call(this);
	}

	onChange(e) {
		e.preventDefault();

		this.props.onChange && this.props.onChange(e.target);
	}

	onReset(e) {
		e.preventDefault();

		this.props.onReset && this.props.onReset(e.target);
	}

	render() {
		const { classes } = this.props;
		return (
			<form onSubmit={this.onSubmit} onReset={this.onReset}>
				<input
					type="text"
					name="tech"
					placeholder="technology used"
					value={this.props.tech}
					onChange={this.onChange}
				/>
				<input
					type="number"
					name="count"
					placeholder="usage"
					value={this.props.count}
					onChange={this.onChange}
				/>
				<input className={classes.button} type="submit" value="Submit" />
				<input type="reset" value="Cancel" />
			</form>
		);
	}
}

export default withStyles(styles)(TechForm);
