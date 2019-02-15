import React from 'react';

export const Button = ({ label, changeBy, index, handleClick, count }) => (
	<button disabled={label === 'Remove' && count < 1 ? true : false} onClick={() => handleClick(index, changeBy)}>
		{label}
	</button>
);
