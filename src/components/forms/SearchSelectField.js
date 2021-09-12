import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select'; // https://github.com/JedWatson/react-select
import styled from 'styled-components';

import { FormContext } from 'components/forms/Form';
import FormField from 'components/forms/FormField';

export const StyledSelect = styled(Select)`
	.react-select__control {
		color: black;
		font-size: ${18 / 16}rem;
		border-radius: 0;
		min-height: 52px;
		border: 1px solid
			${p => (p.error ? p.theme.colors.red : p.theme.colors.border)};
		background-color: ${p => p.theme.colors.white};
		box-shadow: 0 0 0 0;
		cursor: pointer;

		&:hover {
			border: 1px solid
				${p => (p.error ? p.theme.colors.red : p.theme.colors.border)};
		}
	}

	.react-select__value-container {
		padding: 2px 15px;
	}

	.react-select__menu-list {
		padding: 0;
	}

	.react-select__single-value {
		color: ${p => p.theme.colors.black};
	}

	.react-select__multi-value {
		background-color: ${p => p.theme.colors.blue};
	}

	.react-select__multi-value__label {
		color: ${p => p.theme.colors.white};
		padding-left: 12px;
	}

	.react-select__multi-value__remove {
		color: ${p => p.theme.colors.white};
	}

	.react-select__menu {
		margin-top: 0;
		border-radius: 0;
		background-color: ${p => p.theme.colors.white};
		z-index: 99;
	}

	.react-select__option {
		padding: 8px 18px;
		font-size: ${18 / 16}rem;
	}

	.react-select__option:hover,
	.react-select__option--is-focused,
	.react-select__option--is-selected {
		background-color: ${p => p.theme.colors.blue};
		color: ${p => p.theme.colors.white};
		cursor: pointer;
		font-weight: ${p => p.theme.fontWeights.regular};
	}

	.react-select__option:hover + .react-select__option--is-focused,
	.react-select__option:hover + .react-select__option--is-selected {
		background-color: ${p => p.theme.colors.white};
		color: ${p => p.theme.colors.black};
	}

	.react-select__indicator-separator {
		background-color: ${p => p.theme.colors.gray};
	}

	.react-select__dropdown-indicator svg {
		fill: ${p => p.theme.colors.blue};
	}

	.react-select__indicator {
		padding: 8px 20px;
	}
`;

function SearchSelectField(props) {
	let { name, inputStyle, placeholder, options } = props;
	const context = useContext(FormContext);
	let selectedOption = { value: '', label: '' };

	if (props.defaultValue) {
		selectedOption = props.defaultValue;
	}
	if (
		context.values.hasOwnProperty(name) &&
		context.values[name] !== undefined &&
		context.values[name] !== null
	) {
		if (
			typeof context.values[name] === 'string' ||
			typeof context.values[name] === 'boolean'
		) {
			selectedOption = options.filter(
				option => option.value === context.values[name],
			)[0];
		} else if (typeof context.values[name] === 'object') {
			if (Array.isArray(context.values[name])) {
				if (
					context.values[name][0] &&
					typeof context.values[name][0] === 'string'
				) {
					selectedOption = options.filter(option => {
						let returnOption = false;
						context.values[name].map(value => {
							if (option.value === value) returnOption = true;
							return null;
						});

						return returnOption;
					});
				}
			} else {
				selectedOption = context.values[name];
			}
		}
	}

	let [option, setOption] = useState(selectedOption || '');

	if (props.multiple && (option === null || option.value === '')) {
		option = [];
	}

	useEffect(() => {
		let field = {
			...props,
			value: props.multiple ? option : option.value,
		};
		context.registerField(field);
		// eslint-disable-next-line
	}, []);

	return (
		<FormField {...props} error={context.errors.hasOwnProperty(name)}>
			<StyledSelect
				name={name}
				style={inputStyle}
				placeholder={placeholder}
				error={context.errors.hasOwnProperty(name)}
				options={options}
				value={option}
				isDisabled={context.isDisabled || props.disabled}
				disabled={context.isDisabled || props.disabled}
				noOptionsMessage={() => 'Ingen valg'}
				onChange={option => {
					setOption(option || '');

					let value = '';

					if (option !== null) {
						value = props.multiple
							? option.map(value => value.value)
							: option.value;
					}

					context.updateField({
						name: name,
						value: value,
					});
				}}
				className="react-select"
				classNamePrefix="react-select"
				isMulti={props.multiple}
				isClearable={props.isClearable}
				isSearchable
			/>
		</FormField>
	);
}

SearchSelectField.propTypes = {
	name: PropTypes.string,
	type: PropTypes.string,
	value: PropTypes.object,
	defaultValue: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
	placeholder: PropTypes.string,
	onChange: PropTypes.func,
	inputStyle: PropTypes.object,
	required: PropTypes.bool,
};

SearchSelectField.defaultProps = {
	placeholder: '',
	multiple: false,
	required: false,
};

export default SearchSelectField;
