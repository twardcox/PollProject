import * as React from 'react';
import { Button } from './Button';

export default (props) => (
	<li>
		<div>technology: {props.tech.tech}</div>
		<div>count: {props.tech.count}</div>
		<button onClick={() => props.handleClick(props.tech, 1)}>Add</button>
		<button onClick={() => props.handleClick(props.tech, -1)} disabled={props.tech.count < 1 ? true : false}>
			Remove
		</button>
	</li>
);
