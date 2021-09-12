import React, { useState, useReducer } from 'react';
import { useMutation } from '@apollo/react-hooks';

import {
	ListHeader,
	ListBody,
	ListItem,
	Specs,
	Spec,
	HeaderTitle,
} from 'components/general/Lists';
import { AngleUpIcon, AngleDownIcon } from 'components/icons/Angles.js';
import Icon from 'components/general/Icon';
import theme from 'web/styles/theme.js';
import styled from 'styled-components';
import { Uploader } from 'components/general/Uploader';

import { DELETE_FILE } from 'api/Files';

const SectionWrapper = styled.section`
	margin-bottom: 1em;
`;

const StyledHeader = styled.div`
	font-size: 1.2rem;
	font-weight: bold;
	margin-bottom: 0.5rem;
`;
export const ActionButton = styled.button`
	all: unset;
	cursor: pointer;
	margin: 0;
`;

export default function FileSection({
	files,
	userIsAdmin,
	header,
	housingCooperativeId,
	page,
	docId,
	refetch = null,
}) {
	const [deleteFile] = useMutation(DELETE_FILE);

	const [sortedFiles, dispatchFile] = useReducer(
		(
			{ lastSortCase = '', files = [] } = {},
			{ task = 'sort', data, sortkey = 'fileName' }
		) => {
			let newFileList = [...files];

			switch (task) {
				case 'sort':
					newFileList.sort((a, b) => {
						if (a[sortkey] < b[sortkey]) {
							return -1;
						} else if (a[sortkey] > b[sortkey]) {
							return 1;
						} else {
							return 0;
						}
					});
					return {
						lastSortCase: `asc${sortkey}`,
						files: newFileList,
					};
					break;

				case 'sortReverse':
					newFileList.sort((a, b) => {
						if (a[sortkey] < b[sortkey]) {
							return 1;
						} else if (a[sortkey] > b[sortkey]) {
							return -1;
						} else {
							return 0;
						}
					});
					return {
						lastSortCase: `desc${sortkey}`,
						files: newFileList,
					};
					break;

				case 'addFile':
					if (
						newFileList.length === 0 &&
						data.hasOwnProperty('length')
					) {
						newFileList = data;
						newFileList.sort((a, b) => {
							if (a[sortkey] < b[sortkey]) {
								return -1;
							} else if (a[sortkey] > b[sortkey]) {
								return 1;
							} else {
								return 0;
							}
						});
					} else {
						newFileList.push(data);
					}
					return {
						lastSortCase: lastSortCase || 'ascfileName',
						files: newFileList,
					};
					break;

				case 'removefile':
					const itemIndex = newFileList.findIndex(
						element => element._id === data
					);
					newFileList.splice(itemIndex, 1);
					newFileList.sort((a, b) => {
						return a[sortkey] - b[sortkey];
					});
					return {
						lastSortCase: lastSortCase || 'ascfileName',
						files: newFileList,
					};
					break;
				default:
			}
		}
	);

	const deleteItem = id => {
		const accepted = confirm(
			'Dette vil slette dokumentet. \n Er du sikker?'
		);
		if (accepted) {
			deleteFile({ variables: { _id: id } });
			dispatchFile({ data: id, task: 'removefile' });
		}
	};
	const parseDate = timestamp => {
		const dateTime = new Date(timestamp);
		const months = [
			'Januar',
			'Februar',
			'Mars',
			'April',
			'Mai',
			'Juni',
			'Juli',
			'August',
			'September',
			'Oktober',
			'November',
			'Desember',
		];
		return `${dateTime.getDate()}. ${
			months[dateTime.getMonth()]
		} ${dateTime.getFullYear()}`;
	};

	if (files && !sortedFiles) {
		dispatchFile({ data: files, task: 'addFile' });
		return null;
	}

	if (!files && !userIsAdmin) {
		return null;
	}

	if (files) {
		return (
			<SectionWrapper>
				<StyledHeader>{header}</StyledHeader>
				{sortedFiles && sortedFiles.files.length !== 0 && (
					<ListHeader>
						<HeaderTitle
							span="5"
							cursor="pointer"
							onClick={() =>
								dispatchFile({
									task: `${
										sortedFiles &&
										sortedFiles.lastSortCase ===
											'ascfileName'
											? 'sortReverse'
											: 'sort'
									}`,
									sortkey: 'fileName',
								})
							}>
							Filnavn
							<AngleUpIcon translate="0px, .2rem" />
							<AngleDownIcon translate="-.3rem, .2rem" />
						</HeaderTitle>
						<HeaderTitle
							span="7"
							cursor="pointer"
							onClick={() =>
								dispatchFile({
									task: `${
										sortedFiles &&
										sortedFiles.lastSortCase ===
											'asccreatedAt'
											? 'sortReverse'
											: 'sort'
									}`,
									sortkey: 'createdAt',
								})
							}>
							Opplastningsdato
							<AngleUpIcon translate="0px, .2rem" />
							<AngleDownIcon translate="-.3rem, .2rem" />
						</HeaderTitle>
					</ListHeader>
				)}
				<ListBody>
					{sortedFiles &&
						sortedFiles.files.map(file => (
							<ListItem
								lineHeight="3rem"
								marginBottom=".5rem"
								key={file._id}>
								{file.fileType !== 'image/jpeg' && (
									<Specs>
										<Spec maxWidth="3rem">
											<Icon
												icon="file"
												size="md"
												regular
											/>
										</Spec>
										<Spec>{file.fileName}</Spec>
										<Spec>{parseDate(file.createdAt)}</Spec>
										<Spec maxWidth="3rem">
											<Icon
												icon="download"
												size="md"
												cursor="pointer"
												onClick={() => {
													window.open(file.fileUrl);
												}}
												regular
											/>
										</Spec>
										{userIsAdmin && (
											<Spec maxWidth="3rem">
												<Icon
													icon="trash-alt"
													size="md"
													color={theme.colors.red}
													cursor="pointer"
													onClick={e => {
														e.preventDefault();
														e.stopPropagation();
														deleteItem(file._id);
													}}
													regular
												/>
											</Spec>
										)}
									</Specs>
								)}
								{file.fileType === 'image/jpeg' && (
									<Specs
										onClick={() => {
											window.open(file.fileUrl);
										}}>
										<Spec>
											<img
												src={file.fileUrl}
												style={{
													width: '100%',
												}}
												alt={file.fileName}
											/>
										</Spec>
										{userIsAdmin && (
											<Spec maxWidth="3rem">
												<Icon
													icon="trash-alt"
													size="md"
													color={theme.colors.red}
													cursor="pointer"
													onClick={e => {
														e.preventDefault();
														e.stopPropagation();
														deleteItem(file._id);
													}}
													regular
												/>
											</Spec>
										)}
									</Specs>
								)}
							</ListItem>
						))}
				</ListBody>

				{userIsAdmin && (
					<Uploader
						dispatch={file => {
							dispatchFile(file);
						}}
						housingCooperativeId={housingCooperativeId}
						page={page}
						docId={docId}
						onUploadFinished={() => {
							if (refetch) {
								refetch();
							}
						}}
					/>
				)}
			</SectionWrapper>
		);
	}
	return <p>Error</p>;
}
