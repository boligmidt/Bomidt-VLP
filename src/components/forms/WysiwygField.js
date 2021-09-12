import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { EditorState, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg'; // https://jpuri.github.io/react-draft-wysiwyg
import styled from 'styled-components';
import { darken } from 'polished';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import { FormContext } from 'components/forms/Form';
import FormField from 'components/forms/FormField';

const WysiwygWrapper = styled.div`
	border: 1px solid
		${p => (p.hasError ? p.theme.colors.red : p.theme.colors.border)};
	background-color: white;

	.rdw-editor-toolbar {
		border: none;
		background-color: ${p => darken(0.02, p.theme.colors.gray)};
	}

	.rdw-editor-main {
		font-size: 1.2rem;
		color: black;
		font-family: ${p => p.theme.fontFamily};
	}
`;

function WysiwygField(props) {
	const context = useContext(FormContext);
	let { name, inputStyle, placeholder, toolbarOptions } = props;

	let html = context.values[name] || '';
	let contentState, initialState;
	const contentBlock = htmlToDraft(html);
	if (contentBlock) {
		contentState = ContentState.createFromBlockArray(
			contentBlock.contentBlocks
		);
		initialState = EditorState.createWithContent(contentState);
	}

	const [editorState, setEditorState] = useState(initialState);

	useEffect(() => {
		let field = { ...props, value: html };
		context.registerField(field);
	}, []);

	return (
		<FormField {...props} error={context.errors.hasOwnProperty(name)}>
			<WysiwygWrapper>
				<Editor
					defaultEditorState={editorState}
					placeholder={placeholder}
					readOnly={context.isDisabled || props.disabled}
					toolbarHidden={false}
					editorStyle={{
						minHeight: '400px',
						padding: '0 15px',
						...inputStyle,
					}}
					toolbar={{
						options: [
							'inline',
							'list',
							'textAlign',
							'blockType',
							'fontSize',
							'remove',
							'history',
						],
						inline: {
							inDropdown: false,
							options: ['bold', 'italic', 'underline'],
						},
						list: {
							inDropdown: false,
							options: ['unordered', 'ordered'],
						},
						textAlign: { inDropdown: true },
						history: { inDropdown: true },
						...toolbarOptions,
					}}
					onChange={value => {
						setEditorState(value);

						let html = draftToHtml(value);
						if (html === '<p></p>') html = '';

						context.updateField({
							name,
							value: html,
						});
					}}
					spellCheck
				/>
			</WysiwygWrapper>
		</FormField>
	);
}

WysiwygField.propTypes = {
	name: PropTypes.string,
	type: PropTypes.string,
	placeholder: PropTypes.string,
	onChange: PropTypes.func,
	inputStyle: PropTypes.object,
	toolbarOptions: PropTypes.object,
	required: PropTypes.bool,
};

WysiwygField.defaultProps = {
	error: false,
};

export default WysiwygField;
