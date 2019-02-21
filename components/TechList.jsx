import * as React from 'react';
import TechItem from './TechItem';

export default (props) => (
	<ul>
		{props.techs.map((tech, i) => (
			<TechItem
				tech={tech}
				key={i}
				handleClick={props.handleClick}
				onChange={tech.onChange}
				onSave={tech.onSave}
			/>
		))}
	</ul>
);
