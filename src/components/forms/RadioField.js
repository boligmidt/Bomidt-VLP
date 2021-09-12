import React, { useEffect, useContext } from 'react';
import styled from 'styled-components';

import { FormContext } from 'components/forms/Form';
import FormField from 'components/forms/FormField';

const OptionsWrapper = styled.div`
	display: flex;
	padding: 15px 15px 5px;
	flex-direction: ${p => (p.vertical ? 'column' : 'row')};
	border: 1px solid
		${p => (p.hasError ? p.theme.colors.red : p.theme.colors.border)};
`;

const Option = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	margin: 0 20px 10px 0;
	position: relative;
`;

const Input = styled.input`
	position: absolute;
	opacity: 0;
	cursor: pointer;
	height: 0;
	width: 0;
`;

const Label = styled.div`
	display: flex;
	font-size: 1.2rem;
	align-items: center;
	cursor: pointer;
	order: ${p => (p.labelBefore ? '1' : '0')};
`;

const Checkbox = styled.div`
	background: ${p => (p.active ? 'white' : '#ccc')};
	border: 7px solid ${p => (p.active ? p.theme.colors.pink : '#ccc')};
	height: 20px;
	width: 20px;
	border-radius: 10px;
	margin: ${p => (p.labelBefore ? '0 0 0 6px' : '0 6px 0 0')};
	order: ${p => (p.labelBefore ? '2' : '0')};
	pointer-events: none;
`;

function RadioField({
	error = false,
	vertical = false,
	labelBefore = false,
	...props
}) {
	const context = useContext(FormContext);
	let { name, inputStyle, options } = props;

	if (props.defaultValue) {
		options.map(option => {
			option.defaultChecked = option.value === props.defaultValue;
			return option;
		});
	}

	if (context.values.hasOwnProperty(name)) {
		options.map(option => {
			option.defaultChecked = option.value === context.values[name];
			return option;
		});
	}

	useEffect(() => {
		context.registerField(props);
	}, []);

	return (
		<FormField {...props} error={context.errors.hasOwnProperty(name)}>
			<OptionsWrapper vertical={props.vertical}>
				{options &&
					options.map((option, index) => (
						<Option key={index} style={props.optionStyle}>
							<Label
								htmlFor={name}
								labelBefore={props.labelBefore}
								onClick={() =>
									context.updateField({
										name: name,
										value: option.value,
									})
								}>
								<Checkbox
									active={option.defaultChecked}
									labelBefore={props.labelBefore}
								/>

								<Input
									{...option}
									id={name}
									name={name}
									type={'radio'}
									style={inputStyle}
									defaultChecked={
										option.defaultChecked || false
									}
									disabled={
										context.isDisabled || props.disabled
									}
								/>
								{option.label}
							</Label>
						</Option>
					))}
			</OptionsWrapper>
		</FormField>
	);
}

export default RadioField;
