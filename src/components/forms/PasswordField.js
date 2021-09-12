import React, { useEffect, useContext, useState } from 'react';
import styled from 'styled-components';

import { FormContext } from 'components/forms/Form';
import FormField from 'components/forms/FormField';

const StyledInput = styled.input`
	display: block;
	-webkit-appearance: none;
	-moz-appearance: none;
	appearance: none;
	background-color: ${p => p.theme.colors.white};
	border: 1px solid
		${p => (p.hasError ? p.theme.colors.red : p.theme.colors.border)};
	font-size: 1.2rem;
	height: 52px;
	padding: 14px 15px;
	width: 100%;
`;

const ShowPasswordButton = styled.button`
	background: ${p => (p.active ? p.theme.colors.darkGray : 'transparent')};
	color: ${p => (p.active ? p.theme.colors.white : p.theme.colors.darkGray)};
	cursor: pointer;
	border: 1px solid ${p => p.theme.colors.darkGray};
	border-radius: 3px;
	font-size: ${14 / 16}rem;
	line-height: 1;
	outline: none;
	position: absolute;
	right: 25px;
	bottom: 17px;
	padding: 4px 10px;
`;

const PasswordProgess = styled.div`
	height: 3px;
	position: relative;

	&:before {
		content: ' ';
		display: block;
		position: absolute;
		height: 3px;
		top: 0;
		left: 0;
		transition: all 300ms ease-in;
		width: ${p => Math.round((p.validity / 4) * 100)}%;
		background: ${p => {
			if (p.validity === 1) return p.theme.colors.red;
			if (p.validity === 2) return p.theme.colors.orange;
			if (p.validity === 3) return p.theme.colors.yellow;
			if (p.validity === 4) return p.theme.colors.green;
		}};
	}
`;

function PasswordField(props) {
	let { name, inputStyle, placeholder, error = false, ...rest } = props;

	const context = useContext(FormContext);
	const [type, setType] = useState('password');
	const [validity, setValidity] = useState({});
	const [localError, setLocalError] = useState(
		context.errors.hasOwnProperty(name) || false
	);

	useEffect(() => {
		context.registerField(props);
		setLocalError(context.errors.hasOwnProperty(name));
	}, [name]);

	return (
		<FormField
			{...props}
			error={localError}
			errorMessage={
				localError
					? 'Passordet må inneholde minst 8 tegn og bestå av tall samt store og små bokstaver'
					: ''
			}>
			<StyledInput
				defaultValue={context.values[name]}
				hasError={localError}
				type={type}
				onKeyUp={e => {
					let currentValidity = {
						num: e.target.value.search(/[0-9]/) >= 0,
						lower: e.target.value.search(/[æøåa-z]/) >= 0,
						upper: e.target.value.search(/[ÆØÅA-Z]/) >= 0,
						length: e.target.value.length >= 8,
					};

					const isValid =
						currentValidity.num &&
						currentValidity.lower &&
						currentValidity.upper &&
						currentValidity.length;

					if (isValid && isValid >= 0) {
						setLocalError(false);
						context.updateField({
							name: name,
							value: e.target.value,
						});
					} else {
						setLocalError(true);
						context.updateField({
							name: name,
							value: undefined,
						});
					}

					setValidity(currentValidity);
				}}
				inputProps={Object.assign(
					{},
					{ autoComplete: 'off', type },
					rest
				)}
			/>
			<ShowPasswordButton
				type="button"
				onClick={() =>
					setType(type === 'password' ? 'text' : 'password')
				}
				active={type === 'text'}>
				Vis
			</ShowPasswordButton>

			<PasswordProgess
				validity={
					Object.keys(validity).filter(key => validity[key]).length
				}
			/>
		</FormField>
	);
}

export default PasswordField;
