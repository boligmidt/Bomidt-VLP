import React, { useState } from 'react';
import axios from 'axios';
import { useMutation } from '@apollo/react-hooks';
import moment from 'moment';
import slugify from 'slugify';
import Compress from 'compress.js';
import styled from 'styled-components';
import { rgba } from 'polished';

import { ADD_FILE, GET_UPLOAD_URL } from 'api/Files';
import theme from 'web/styles/theme';
import { IconButton } from 'components/general/Buttons';
import Loading from 'components/general/Loading';

const Label = styled.label`
	position: relative;
`;

const StyledDropArea = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: ${p => (p.height ? p.height : '5rem')};
	width: 100%;
	margin: ${p => (p.margin ? p.margin : '1rem 0 0 0')};
	background-color: ${p => p.theme.colors.lightYellow};
	border: 2px dashed ${p => p.theme.colors.blue};
	border-radius: ${p => (p.borderRadius ? p.borderRadius : undefined)};
	color: ${p => p.theme.colors.blue};
	text-align: center;
	line-height: ${p => (p.lineHeight ? p.lineHeight : '5rem')};
`;
const UploadProgressWrap = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	background-color: ${rgba('#fff', 0.5)};
`;
const StyledInput = styled.input`
	position: absolute;
	left: 0;
	top: 0;
	height: 100%;
	width: 100%;
	opacity: 0;
`;

async function setupFileData({
	file,
	housingCooperativeId,
	page,
	getUploadUrl,
	compression,
}) {
	const dateKey = moment().format('YYYYMMDDHHmmss');
	let compressedFile;

	if (
		(file.type === 'image/jpeg' || file.type === 'image/png') &&
		compression
	) {
		const compress = new Compress();

		compressedFile = await compress
			.compress([file], {
				size: 0.5, // the max size in MB, defaults to 2MB
				maxWidth: 1024, // the max width of the output image, defaults to 1920px
				maxHeight: 1024, // the max height of the output image, defaults to 1920px
				resize: true,
			})
			.then(async results => {
				const img = results[0];
				const base64str = img.data;
				const imgExt = img.ext;
				return await Compress.convertBase64ToFile(base64str, imgExt);
			})
			.catch(err => {
				console.log(err);
			});

		compressedFile.name = file.name;
	} else {
		compressedFile = file;
	}

	let key =
		'files/' +
		(housingCooperativeId ? housingCooperativeId : 'global') +
		'/assessment/' +
		dateKey +
		'-' +
		slugify(compressedFile.name);
	if (page) {
		'files/' +
			(housingCooperativeId ? housingCooperativeId : 'global') +
			'/' +
			page +
			'/' +
			dateKey +
			'-' +
			slugify(compressedFile.name);
	}

	const {
		data: { uploadUrl },
	} = await getUploadUrl({
		variables: {
			key,
			fileContentType: compressedFile.type,
		},
	});
	console.log(uploadUrl);

	await axios
		.put(uploadUrl, compressedFile, {
			headers: {
				'Content-Type': compressedFile.type,
			},
			transformResponse: undefined,
		})
		.then(resp => {})
		.catch(err => {
			console.log(err);
		});

	return {
		page,
		housingCooperativeId,
		fileType: compressedFile.type,
		fileName: compressedFile.name,
		fileUrl: uploadUrl.split('?')[0],
	};
}

export function Uploader({
	housingCooperativeId = null,
	docId = null,
	page = null,
	margin = null,
	onUploadFinished = null,
	dispatch = null,
	compression = false,
	style,
}) {
	const [isUploading, setIsUploading] = useState(false);

	const [uploadOneFile, { error, loading }] = useMutation(ADD_FILE);
	const [getUploadUrl] = useMutation(GET_UPLOAD_URL);

	function handleUpload({ files }) {
		setIsUploading(true);

		Promise.all(
			[...files].map(async file => {
				let fileData = await setupFileData({
					file,
					housingCooperativeId,
					page,
					getUploadUrl,
					compression,
				});

				const {
					data: { file: newFile },
				} = await uploadOneFile({
					variables: {
						...fileData,
						docId,
					},
				});

				if (dispatch) {
					dispatch({ data: newFile, task: 'addFile' });
				}
			})
		)
			.then(() => {
				if (onUploadFinished) {
					onUploadFinished();
				}

				setIsUploading(false);
			})
			.catch(error => {
				console.log(error);
				setIsUploading(false);
			});
	}

	const dragOverEventHandler = e => {
		e.stopPropagation();
		e.preventDefault();
	};
	// when item leaves a valid target area:
	const leaveEventHandler = e => {
		e.stopPropagation();
		e.preventDefault();
	};

	// when item enter a valid target area:
	const enterEventHandler = (e, targetParent) => {
		e.stopPropagation();
		e.preventDefault();
	};
	//* when an item is dropped.
	const dropEventHandler = (e, targetIndex, targetParent) => {
		e.stopPropagation();
		e.preventDefault();
		const files = e.dataTransfer.files;

		handleUpload({ files });
	};

	return (
		<Label
			onDragEnter={e => enterEventHandler(e)}
			onDragOver={e => dragOverEventHandler(e)}
			onDragLeave={e => leaveEventHandler(e)}
			onDrop={e => dropEventHandler(e)}>
			<StyledDropArea {...style} margin={margin}>
				Last opp
			</StyledDropArea>

			<StyledInput
				type="file"
				onChange={e => {
					e.preventDefault();
					e.stopPropagation();
					handleUpload(e.target);
				}}
				label="Slipp fil her."
			/>

			{isUploading && (
				<UploadProgressWrap>
					<Loading style={{ height: '100vh' }} />
				</UploadProgressWrap>
			)}
		</Label>
	);
}

const InputButtonWrapper = styled.div`
	position: relative;
	display: inline-block;
	width: 100%;
`;

export function UploadButton({
	housingCooperativeId = null,
	page = null,
	docId = null,
	onUploadFinished = null,
	dispatch = null,
	compression = false,
}) {
	const [isUploading, setIsUploading] = useState(false);
	const [uploadOneFile] = useMutation(ADD_FILE);
	const [getUploadUrl] = useMutation(GET_UPLOAD_URL);

	function handleUpload({ files }) {
		setIsUploading(true);

		Promise.all(
			[...files].map(async file => {
				let fileData = await setupFileData({
					file,
					housingCooperativeId,
					page,
					getUploadUrl,
					compression,
				});

				const {
					data: { file: newFile },
				} = await uploadOneFile({
					variables: {
						...fileData,
						docId,
					},
				});

				if (dispatch) {
					dispatch({ data: newFile, task: 'addFile' });
				}
			})
		)
			.then(() => {
				if (onUploadFinished) {
					onUploadFinished();
				}

				setIsUploading(false);
			})
			.catch(error => {
				console.log(error);
				setIsUploading(false);
			});
	}

	return (
		<InputButtonWrapper>
			<IconButton
				label="Last opp vedlegg"
				iconProps={{
					icon: 'paperclip',
					solid: true,
					size: 'sm',
				}}
				backgroundColor={theme.colors.gray}
				hoverBackgroundColor={theme.colors.blue}
				borderColor={theme.colors.gray}
				hoverBorderColor={theme.colors.blue}
				color={theme.colors.blue}
				hoverColor="white"
				fullWidth={true}
				type="button"
				onClick={e => {
					e.preventDefault();
					e.stopPropagation();
				}}
			/>

			<StyledInput
				type="file"
				onChange={e => {
					e.preventDefault();
					e.stopPropagation();
					handleUpload(e.target);
				}}
			/>

			{isUploading && (
				<UploadProgressWrap>
					<Loading style={{ height: '100vh' }} />
				</UploadProgressWrap>
			)}
		</InputButtonWrapper>
	);
}
