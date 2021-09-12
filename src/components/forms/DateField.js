import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import DatePicker from 'react-date-picker'; // https://github.com/wojtekmaj/react-date-picker
import { darken } from 'polished';

import { FormContext } from 'components/forms/Form';
import FormField from 'components/forms/FormField';

const NoValue = styled.div`
	background: white;
	position: absolute;
	top: 1px;
	left: 1px;
	height: 52px;
	width: 150px;
	line-height: 55px;
	padding-left: 15px;
	pointer-events: none;
	font-size: 1.2rem;
	color: black;
	cursor: pointer;
`;

const StyledDatePicker = styled(DatePicker)`
	font-family: monospace;
	display: block !important;
	height: 52px;
	cursor: pointer;

	.react-date-picker__wrapper {
		border: 1px solid
			${p => (p.error ? p.theme.colors.red : p.theme.colors.border)};
		background-color: white;
	}

	.react-date-picker__inputGroup {
		height: 52px;
		padding: 0 15px;
		font-size: 1.2rem;
		color: black;
		font-family: ${p => p.theme.fontFamily};

		* {
			font-size: 1.2rem;
			color: black;
			font-family: ${p => p.theme.fontFamily};
		}
	}

	.react-date-picker__inputGroup__input {
		outline: none;
	}
	.react-calendar__tile--hasActive,
	.react-calendar__tile--active {
		background-color: ${p => p.theme.colors.red};
		color: white;

		&:hover {
			background-color: ${p =>
				darken(0.1, p.theme.colors.red)} !important;
		}
	}

	.react-calendar__tile--now {
		background-color: none;
		border: 1px solid ${p => p.theme.colors.red};
	}

	.react-calendar__year-view .react-calendar__tile,
	.react-calendar__decade-view .react-calendar__tile,
	.react-calendar__century-view .react-calendar__tile {
		padding: 0.5em;
	}

	.react-date-picker__calendar-button {
		padding-left: 0;
		padding-right: 20px;
	}

	.react-date-picker__button svg g,
	.react-date-picker__button svg g {
		stroke: ${p => p.theme.colors.blue};
	}

	.react-date-picker__button:enabled:hover svg g,
	.react-date-picker__button:enabled:focus svg g {
		stroke: ${p => p.theme.colors.blue};
	}

	.react-date-picker__clear-button:enabled:hover svg g,
	.react-date-picker__clear-button:enabled:focus svg g {
		stroke: ${p => p.theme.colors.red};
	}
`;

function DateField(props) {
	let { name, inputStyle } = props;

	const context = useContext(FormContext);

	let rawValue = context.values[name] || '';

	if (typeof rawValue === 'string' && rawValue !== '') {
		rawValue = new Date(rawValue);
	}

	const [value, setValue] = useState(rawValue);

	useEffect(() => {
		let field = {
			...props,
			value,
		};
		context.registerField(field);
	}, []);

	return (
		<FormField {...props} error={context.errors.hasOwnProperty(name)}>
			<StyledDatePicker
				name={name}
				style={inputStyle}
				value={value}
				disabled={context.isDisabled || props.disabled}
				onChange={value => {
					if (context.isDisabled) {
						return;
					}
					setValue(value);
					context.updateField({
						name,
						value,
					});
				}}
				locale="nb-NO"
				showLeadingZeros
			/>
			{!value && <NoValue>Velg dato</NoValue>}
		</FormField>
	);
}

DateField.propTypes = {
	name: PropTypes.string,
	type: PropTypes.string,
	value: PropTypes.object,
	defaultValue: PropTypes.object,
	onChange: PropTypes.func,
	inputStyle: PropTypes.object,
	required: PropTypes.bool,
};

DateField.defaultProps = {
	error: false,
};

export default DateField;
