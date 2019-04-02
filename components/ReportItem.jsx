import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { TableRow, TableCell } from '@material-ui/core';

const ReportItem = (props) => {
	return (
		<TableRow>
			<TableCell component="th" scope="row">
				{props.tech.tech}
			</TableCell>
			<TableCell>{props.tech.count}</TableCell>
		</TableRow>
	);
};

export default ReportItem;
