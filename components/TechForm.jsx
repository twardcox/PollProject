import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { FormControl, Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import LocalLibrary from '@material-ui/icons/LocalLibrary';
import Grid from '@material-ui/core/Grid';

const styles = (theme) => ({
	root: {
		flexGrow: 1,
		margin: theme.spacing.unit * 6
	},
	paper: {
		padding: theme.spacing.unit,
		height: '100%',
		color: theme.palette.text.secondary
	},
	control: {
		padding: theme.spacing.unit
	},
	textInput: {
		margin: theme.spacing.unit
	}
});

class TechForm extends React.Component {
	constructor(props) {
		super(props);

		this.props = props;
		this.onSubmit = this.onSubmit.bind(this);
		this.onChange = this.onChange.bind(this);
	}

	onSubmit(e) {
		e.preventDefault();

		this.props.onSave && this.props.onSave.call(this);
	}

	onChange(e) {
		e.preventDefault();

		this.props.onChange && this.props.onChange(e.target);
	}

	render() {
		return (
			<FormControl onSubmit={this.onSubmit}>
				<Grid container justify="center" spacing={8}>
					<Grid item sm={6}>
						<Grid container justify="flex-start" spacing={8}>
							<Grid item sm={12}>
								<TextField
									className={this.props.textInput}
									autoFocus={true}
									type="text"
									name="tech"
									placeholder="technology used"
									value={this.props.name}
									onChange={this.props.onChange}
									id="input-with-icon-textfield"
									label={this.props.isFiltering ? 'Tech Filter' : 'Favorite Technology'}
									fullWidth={true}
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												<LocalLibrary />
											</InputAdornment>
										)
									}}
								/>
							</Grid>
						</Grid>
					</Grid>
					<Grid item sm={6}>
						<Grid spacing={8} container justify="flex-end">
							{!this.props.isFiltering && (
								<Grid item sm={6}>
									<Button
										variant="contained"
										color="primary"
										type="submit"
										value="Submit"
										onClick={this.onSubmit}
									>
										Submit
									</Button>
								</Grid>
							)}

							<Grid item sm={6}>
								<Button
									variant="contained"
									color="default"
									type="reset"
									value="Cancel"
									onClick={this.props.toggleFilter}
								>
									{this.props.isFiltering ? 'Clear' : 'Filter'}
								</Button>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</FormControl>
		);
	}
}

export default withStyles(styles)(TechForm);
