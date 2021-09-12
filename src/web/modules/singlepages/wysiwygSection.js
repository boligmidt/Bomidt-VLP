import React, { useState, useRef } from 'react';
import { useMutation } from '@apollo/react-hooks';
import Loading from 'components/general/Loading';
import TextArea from 'components/general/TextArea';
import styled from 'styled-components';
import { darken } from 'polished';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { EditorState, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg'; // https://jpuri.github.io/react-draft-wysiwyg
import { debounce } from 'lodash';

import { Button } from 'components/general/Buttons';
import { NEW_SINGLEPAGE, EDIT_SINGLEPAGE } from 'api/SinglePages';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

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

const EditButton = styled(Button)`
	background: ${p =>
		p.disabled ? p.theme.colors.darkGray : p.theme.colors.pink};
	opacity: ${p => (p.disabled ? '0.5' : '1')};
	cursor: ${p => (p.disabled ? 'default' : 'pointer')};
	&:hover,
	&:active {
		background: ${p =>
			p.disabled
				? p.theme.colors.darkGray
				: darken(0.1, p.theme.colors.buttonBg)};
	}
	&:last-child {
		margin-left: 0.5rem;
	}
`;

const StyledHeader = styled.div`
	font-size: 1.2rem;
	font-weight: bold;
	margin-bottom: 0.5rem;
`;

const ActionsWrap = styled.div`
	display: flex;
	justify-content: flex-end;
	margin-bottom: 20px;
`;

export default function WysiwygSection({
	doc,
	header,
	contentKey,
	housingCooperativeId,
	name,
	userIsAdmin = false,
	saveAction = null,
}) {
	const [isEditActive, toggleEdit] = useState(false);

	return (
		<>
			<StyledHeader>
				<p>{header}</p>
			</StyledHeader>

			{!isEditActive && userIsAdmin && (
				<ActionsWrap>
					<EditButton onClick={() => toggleEdit(true)}>
						Rediger
					</EditButton>
				</ActionsWrap>
			)}

			{isEditActive && !doc && (
				<NewWysiwygForm
					housingCooperativeId={housingCooperativeId}
					name={name}
					contentKey={contentKey}
					closeDialog={toggleEdit}
					saveAction={saveAction}
				/>
			)}

			{isEditActive && doc && (
				<EditWysiwygForm
					doc={doc}
					contentKey={contentKey}
					closeDialog={toggleEdit}
					saveAction={saveAction}
				/>
			)}

			{!isEditActive && <TextArea innerHtml={doc && doc[contentKey]} />}
		</>
	);
}

// create a new wyziwyg document
function NewWysiwygForm({
	housingCooperativeId,
	name,
	contentKey,
	closeDialog,
	saveAction,
}) {
	const contentRef = useRef({ content: '' });

	let contentState, initialState;
	const contentBlock = htmlToDraft('');
	if (contentBlock) {
		contentState = ContentState.createFromBlockArray(
			contentBlock.contentBlocks
		);
		initialState = EditorState.createWithContent(contentState);
	}

	const [newSinglePage, { error, loading }] = useMutation(NEW_SINGLEPAGE);

	const onContentChange = debounce(value => {
		contentRef.current.content = draftToHtml(value);
	}, 1000);

	if (loading) return <Loading />;
	if (error) return <p>Error</p>;

	return (
		<>
			<ActionsWrap>
				<Button
					onClick={async () => {
						if (saveAction) {
							saveAction(contentRef.current.content);

							closeDialog(false);

							return;
						}

						await newSinglePage({
							variables: {
								name: name,
								housingCooperativeId: housingCooperativeId,
								[contentKey]: contentRef.current.content,
							},
							refetchQueries: ['findOneSinglePage'],
						});
						closeDialog(false);
					}}>
					Lagre
				</Button>

				<EditButton type="button" onClick={() => closeDialog(false)}>
					Avbryt
				</EditButton>
			</ActionsWrap>

			<WysiwygWrapper>
				<Editor
					defaultEditorState={initialState}
					toolbarHidden={false}
					editorStyle={{
						minHeight: '400px',
						padding: '0 15px',
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
					}}
					onChange={onContentChange}
					spellCheck
				/>
			</WysiwygWrapper>
		</>
	);
}

function EditWysiwygForm({ doc, contentKey, closeDialog, saveAction }) {
	const contentRef = useRef({ content: doc[contentKey] });

	let contentState, initialState;
	const contentBlock = htmlToDraft(doc[contentKey] || '');

	if (contentBlock) {
		contentState = ContentState.createFromBlockArray(
			contentBlock.contentBlocks
		);
		initialState = EditorState.createWithContent(contentState);
	}

	const [editOneSinglePage, { error, loading }] = useMutation(
		EDIT_SINGLEPAGE
	);

	const onContentChange = debounce(value => {
		contentRef.current.content = draftToHtml(value);
	}, 1000);

	if (loading) return <Loading />;
	if (error) return <p>Error</p>;
	return (
		<>
			<ActionsWrap>
				<Button
					onClick={async () => {
						if (saveAction) {
							await saveAction(contentRef.current.content);

							closeDialog(false);

							return;
						}

						await editOneSinglePage({
							variables: {
								...doc,
								[contentKey]: contentRef.current.content,
							},
							refetchQueries: ['findOneSinglePage'],
						});
						closeDialog(false);
					}}>
					Lagre
				</Button>

				<EditButton type="button" onClick={() => closeDialog(false)}>
					Avbryt
				</EditButton>
			</ActionsWrap>

			<WysiwygWrapper>
				<Editor
					defaultEditorState={initialState}
					toolbarHidden={false}
					editorStyle={{
						minHeight: '400px',
						padding: '0 15px',
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
					}}
					onChange={onContentChange}
					spellCheck
				/>
			</WysiwygWrapper>
		</>
	);
}
