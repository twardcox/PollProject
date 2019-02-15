import * as React from 'react';
import { Button } from './Button';

export default (props) => (
	<li>
		<div>technology: {props.tech.tech}</div>
		<div>count: {props.tech.count}</div>
		<Button {...props} label="Add" changeBy={1} />
		<Button {...props} label="Remove" changeBy={-1} />
	</li>
);
