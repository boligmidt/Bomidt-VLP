import React, { useState, useEffect, useContext, useRef } from 'react';
import PropTypes from 'prop-types';

import { FormContext } from 'components/forms/Form';
import FormField from 'components/forms/FormField';
import { Button } from 'components/general/Buttons';

// TODO: implement default value?
function FileField(props) {
	const context = useContext(FormContext);
	const inputEl = useRef(null);
	const [file, setFile] = useState(null);

	useEffect(() => {
		let field = {
			...props,
			value: props.value || props.defaultValue || '',
		};
		context.registerField(field);
	}, []);

	return (
		<FormField {...props} error={context.errors.hasOwnProperty(props.name)}>
			{file ? (
				<Button
					type="button"
					disabled={context.isDisabled}
					onClick={() => {
						if (context.isDisabled) {
							return;
						}
						inputEl.current.value = '';
						context.updateField({
							name: props.name,
							value: null,
						});
						setFile(null);
					}}
				>{`Fjern ${file.name}`}</Button>
			) : (
				<Button
					type="button"
					onClick={() => {
						if (context.isDisabled) {
							return;
						}

						inputEl.current.click();
					}}
				>
					{props.buttonLabel || 'Last opp fil'}
				</Button>
			)}
			<input
				name={props.name}
				type="file"
				disabled={context.isDisabled}
				onChange={e => {
					if (!e.target.files && !e.target.files.length) return;
					context.updateField({
						name: props.name,
						value: e.target.files[0],
					});
					setFile(e.target.files[0]);
				}}
				hidden={true}
				ref={inputEl}
			/>
		</FormField>
	);
}

FileField.propTypes = {
	name: PropTypes.string,
	buttonLabel: PropTypes.string,
	required: PropTypes.bool,
};

FileField.defaultProps = {
	error: false,
};

export default FileField;
