import React, { useState, createContext } from 'react';
import Error from 'components/general/Error';

export const FormContext = createContext({});

function Form(props) {
	let [fields, setFields] = useState({});
	let [values, setValues] = useState(props.values || {});
	let [errors, setErrors] = useState({});
	let [preSubmitHooks, setPreSubmitHooks] = useState({});

	function removeProp(obj, propToDelete) {
		for (var key in obj) {
			if (key === propToDelete) {
				delete obj[key];

				continue;
			}

			if (typeof obj[key] === 'object') {
				obj[key] = removeProp(obj[key], propToDelete);
			}
		}

		return obj;
	}

	function registerField(field) {
		if (!field.name) {
			return;
		}
		if (field.disabled) return;
		if (fields.hasOwnProperty(field.name)) return;

		fields[field.name] = field;
		setFields(fields);

		if (field.defaultValue && field.required) {
			setValues({
				...values,
				[field.name]: field.value,
			});
		}
	}

	function updateField(field) {
		if (!field.name) {
			return;
		}
		setValues({
			...values,
			[field.name]: field.value,
		});
	}

	function validateFields() {
		let isValid = true;
		let allFieldsValidated = Object.keys(fields).map(name => ({
			...fields[name],
			isValid: validateField(fields[name], values[name]),
		}));

		let invalidFields = allFieldsValidated.filter(field => !field.isValid);

		let updatedErrors = {};
		if (invalidFields && invalidFields.length) {
			isValid = false;
			invalidFields.map(field => {
				updatedErrors[field.name] = field;
				return field;
			});
		}

		setErrors(updatedErrors);
		return isValid;
	}

	function validateField(field, value) {
		if (typeof value !== 'boolean' && field.required && !value) {
			return false;
		}

		if (field.validate) {
			return field.validate(value);
		}

		return true;
	}

	async function runPreSubmitHooks() {
		let newValues = values;

		for (let key in preSubmitHooks) {
			newValues = {
				...newValues,
				...(await preSubmitHooks[key](newValues)),
			};
		}

		return newValues;
	}

	async function onSubmit(e) {
		e.preventDefault();
		e.stopPropagation();

		if (props.isDisabled) {
			return;
		}

		values = await runPreSubmitHooks();

		values = removeProp(values, '__typename');

		let isValid = validateFields();
		let isSuccess = true;

		if (isValid) {
			try {
				await props.onSubmit(values);
			} catch (e) {
				isSuccess = false;
				console.error(e);
			}
		}

		if (isValid && isSuccess && props.onSuccess) {
			props.onSuccess();
		}
	}

	let { errorMessage, children, isDisabled, isLoading } = props;

	if (props.error) {
		return <Error />;
	}

	return (
		<FormContext.Provider
			value={{
				fields,
				values,
				errors,
				isLoading,
				isDisabled,
				updateField: field => updateField(field),
				registerField: field => registerField(field),
				errorMessage: errorMessage || 'Dette feltet er påkrevd',
				registerPreSubmitHook: (name, callback) => {
					setPreSubmitHooks({
						...preSubmitHooks,
						name: callback,
					});
				},
				removePreSubmitHook: name => {
					delete preSubmitHooks[name];

					setPreSubmitHooks(preSubmitHooks);
				},
			}}>
			<form onSubmit={e => onSubmit(e)}>
				<input
					type="submit"
					style={{
						position: 'absolute',
						left: '-9999px',
						width: '1px',
						height: '1px',
						opacity: '0',
					}}
				/>
				{children}
			</form>
		</FormContext.Provider>
	);
}

export default Form;
