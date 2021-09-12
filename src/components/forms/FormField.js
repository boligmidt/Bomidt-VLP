import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { breakpoints } from 'web/styles/breakpoints';

import { FormContext } from 'components/forms/Form';

const InputWrapper = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 36px;
	opacity: ${p => (p.disabled ? '0.5' : '1')};
`;

const InputLabel = styled.label`
	font-family: ${p => p.theme.fontFamily};
	font-size: ${18 / 16}rem;
	letter-spacing: 0.25px;
	line-height: 45px;

	${breakpoints.large`
		font-size: ${25 / 16}rem;
	`};
`;

const InputReqired = styled.label`
	font-family: ${p => p.theme.fontFamily};
	font-size: ${18 / 15}rem;
	letter-spacing: 0.25px;
	line-height: 45px;
	color: ${p => p.theme.colors.pink};

	${breakpoints.large`
		font-size: ${25 / 15}rem;
	`};
`;

const InputDescription = styled.span`
	margin-bottom: 10px;
	color: #989898;
`;

const FieldWrapper = styled.div`
	position: relative;
	display: block;
`;

const InputError = styled.span`
	color: ${p => p.theme.colors.red};
`;

export default function FormField({
	label,
	disabled,
	error,
	errorMessage,
	description,
	wrapperStyle,
	labelStyle,
	errorStyle,
	descriptionStyle,
	fieldWrapperStyle,
	required = false,
	className,
	children,
}) {
	const context = useContext(FormContext);

	return (
		<InputWrapper
			className={className}
			style={wrapperStyle}
			disabled={disabled}>
			{label && (
				<InputLabel style={labelStyle}>
					{label} {required && <InputReqired>*</InputReqired>}
				</InputLabel>
			)}

			{description && (
				<InputDescription style={descriptionStyle}>
					{description}
				</InputDescription>
			)}

			<FieldWrapper style={fieldWrapperStyle}>{children}</FieldWrapper>

			{error && (
				<InputError style={errorStyle}>
					{errorMessage || context.errorMessage}
				</InputError>
			)}
		</InputWrapper>
	);
}

FormField.propTypes = {
	label: PropTypes.string,
	error: PropTypes.bool,
	errorMessage: PropTypes.string,
	description: PropTypes.string,
	wrapperStyle: PropTypes.object,
	labelStyle: PropTypes.object,
	errorStyle: PropTypes.object,
	descriptionStyle: PropTypes.object,
	validate: PropTypes.func,
	required: PropTypes.bool,
};
