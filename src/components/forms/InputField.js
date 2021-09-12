import React, { useEffect, useContext } from 'react';
import styled from 'styled-components';
import { darken } from 'polished';

import { FormContext } from 'components/forms/Form';
import FormField from 'components/forms/FormField';

const Prepend = styled.div`
	padding: 13px 16px;
	background: ${p => darken(0.1, p.theme.colors.white)};
	font-size: 1.2rem;
	line-height: 26px;
`;

export const Input = styled.input`
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

const Textarea = styled.textarea`
	-webkit-appearance: none;
	-moz-appearance: none;
	appearance: none;
	border: 1px solid
		${p => (p.hasError ? p.theme.colors.red : p.theme.colors.border)};
	background-color: white;
	padding: 10px;
	width: 100%;
	font-size: 1.2rem;
	resize: vertical;
`;

function InputField({ error = false, ...props }) {
	const context = useContext(FormContext);
	let { name, inputStyle, placeholder, inputProps } = props;

	useEffect(() => {
		context.registerField(props);
		// eslint-disable-next-line
	}, []);

	return (
		<FormField
			{...props}
			error={context.errors.hasOwnProperty(name)}
			fieldWrapperStyle={{
				display: props.prepend ? 'flex' : 'block',
			}}>
			{props.prepend && <Prepend>{props.prepend}</Prepend>}

			{props.type === 'textarea' ? (
				<Textarea
					name={name}
					type="textarea"
					rows={props.rows || 6}
					style={inputStyle}
					defaultValue={context.values[name]}
					placeholder={placeholder}
					disabled={context.isDisabled || props.disabled}
					hasError={!!context.errors[name]}
					ref={props.inputRef}
					onChange={e =>
						context.updateField({
							name: name,
							value: e.target.value,
						})
					}
					{...inputProps}
				/>
			) : (
				<Input
					name={name}
					ref={props.inputRef}
					type={props.type || 'text'}
					style={inputStyle}
					defaultValue={context.values[name] || props.defaultValue}
					placeholder={placeholder}
					disabled={context.isDisabled || props.disabled}
					onKeyDown={props.onKeyDown || null}
					max={props.max}
					min={props.min}
					step={props.step}
					hasError={!!context.errors[name]}
					onChange={e =>
						context.updateField({
							name: name,
							value:
								props.type === 'number'
									? parseInt(e.target.value)
									: e.target.value,
						})
					}
					{...inputProps}
				/>
			)}
		</FormField>
	);
}

export default InputField;
