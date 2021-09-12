import React from 'react';
import styled from 'styled-components';
import { Switch } from '@material-ui/core';

const StyledToggle = styled(Switch)`
	.Mui-checked {
		.MuiIconButton-label {
			color: ${p => p.theme.colors.green};
		}
	}
`;

export default function Toggle({
	isChecked,
	ariaLabel,
	onToggle,
	disabled = false,
}) {
	return (
		<StyledToggle
			checked={isChecked}
			onClick={e => e.stopPropagation()}
			onChange={e => onToggle(e.target.checked)}
			color="default"
			inputProps={{
				'aria-label': ariaLabel,
			}}
			disabled={disabled}
		/>
	);
}
