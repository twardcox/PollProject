import * as React from 'react';
import TechItem from './TechItem';

export default (props) => (
	<ul>{props.techs.map((tech, i) => <TechItem tech={tech} key={i} {...props} index={i} count={tech.count} />)}</ul>
);
