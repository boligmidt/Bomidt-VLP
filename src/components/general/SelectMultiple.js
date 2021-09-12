import React, { useState } from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

export default function SelectMultiple({
	name,
	defaultValue = [],
	options = [],
	disabled = false,
}) {
	const [values, setValues] = useState(defaultValue);

	let allOptions = [...options];
	if (defaultValue && defaultValue.length) {
		allOptions = [...options, ...defaultValue];
	}
	return (
		<>
			<Select
				value={values || []}
				onChange={event => setValues(event.target.value)}
				renderValue={values => (values ? values.join(', ') : [])}
				multiple
				disabled={disabled}
				autoWidth>
				{allOptions &&
					allOptions.map((option, i) => (
						<MenuItem key={i} value={option.value || option}>
							{option.label || option}
						</MenuItem>
					))}
			</Select>
			<input
				type="hidden"
				name={name}
				value={values ? values.join('|') : ''}
			/>
		</>
	);
}
