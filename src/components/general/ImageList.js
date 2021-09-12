import React, { useState } from 'react';
import styled from 'styled-components';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { Uploader } from 'components/general/Uploader';
import Icon from 'components/general/Icon';
import CheckBox from 'components/general/CheckBox';
import { IconButton } from 'components/general/Buttons';
import { Input } from 'components/general/SingleAssessmentOpen';
import Confirm from 'components/general/Confirm';
import theme from 'web/styles/theme';
import { GET_FILES, UPDATE_FILE } from 'api/Files';
import { ListBody, ListItem, Specs, Spec } from 'components/general/Lists';
import Jimp from 'jimp';
import { ADD_FILE, GET_UPLOAD_URL } from 'api/Files';
import axios from 'axios';
import { rgba } from 'polished';
import Loading from 'components/general/Loading';


const ImageListWrap = styled.div`
	display: flex;
	flex-wrap: wrap;
	margin: 0 -15px;
`;
const ImageWrap = styled.div`
	flex: 0 0 50%;
	padding: 0 15px 30px;
	@media (min-width: 768px) {
		flex: 0 0 25%;
	}
	@media (min-width: 1024px) {
		flex: 0 0 20%;
	}
`;
const ImageBox = styled.a`
	display: block;
	background-image: url(${p => p.href});
	background-size: cover;
	background-position: center;
	padding-bottom: 100%;
	margin-bottom: 15px;
	border-radius: 50%;
    transform: rotate(0deg);
`;
const ActionsWrap = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 20px;
`;

const RotateProgressWrap = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	background-color: ${rgba('#fff', 0.5)};
`;
const StyledIconButton = styled(IconButton)`
	padding: 0;
	width: 24px;
	line-height: 24px;
	height: 24px;
	border: none;
	backgroundColor: ${p => p.backgroundColor};

	&&& i {
		margin: 0;
		width: 24px;
	}
`;

const UploadWrapper = styled.div`
	position: relative;
`;
const UploadWrap = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
`;
const UploadBox = styled.div`
	padding-bottom: 100%;
`;

export default function ImageList({ docId, primaryImageId, disabled = false}) {
	const [getUploadUrl] = useMutation(GET_UPLOAD_URL);
	const [showDeleteConfirm, setShowDeleteConfirm] = useState('');
	const [isRotating, setIsRotating] = useState(false);
	var timestamp = new Date().getTime();
	const [value, setValue] = useState(
		primaryImageId ||
			(files &&
				files.items &&
				files.items.length &&
				files.items[0]._id) ||
			''
	);

	const { data: { files = null } = {}, refetch } = useQuery(GET_FILES, {
		variables: {
			docId,
		},
	});

	const [updateFile] = useMutation(UPDATE_FILE);

	async function handleDeleteFile(fileId) {
		await updateFile({
			variables: {
				_id: fileId,
				isDeleted: true,
			},
		});		

		await refetch();
	}
	async function handleRotateFile(inputImage, rotation) {
		setIsRotating(true);
		timestamp = await new Date().getTime();
		let imgurl = inputImage.fileUrl + '?t=' + timestamp;
		const image = await Jimp.read(imgurl).catch(err => {
			console.log(err);
			setIsRotating(false);
		});
		let image2 = await image.rotate(rotation);
		
		let contentPath = inputImage.fileUrl.substr(inputImage.fileUrl.indexOf('/', 10) + 1);
		const {
			data: { uploadUrl },
		} = await getUploadUrl({
			variables: {
				key: contentPath,
				fileContentType: inputImage.fileType,
			},
		});
		const _operatedImageBuffer = await image2.getBufferAsync(inputImage.fileType);
		await axios
			.put(uploadUrl, _operatedImageBuffer, {
				headers: {
					'Content-Type': inputImage.fileType,
				},
				transformResponse: undefined,
			})
			.then(resp => { })
			.catch(err => {
				console.log(err);
				setIsRotating(false);
			});
		setIsRotating(false);
	}

	const images =
		files && files.items && files.items.length
			? files.items.filter(file =>
					file.fileType ? file.fileType.includes('image') : false
			  )
			: [];

	const documents =
		files && files.items && files.items.length
			? files.items.filter(file =>
					file.fileType ? !file.fileType.includes('image') : false
			  )
			: [];

	return (
		<>
			<h4>Bilder</h4>

			<ImageListWrap>
				{!disabled && (
					<ImageWrap key="upload">
						<UploadWrapper>
							<UploadBox />
							<UploadWrap style={{}}>
								<Uploader
									style={{
										borderRadius: '50%',
										height: '100%',
									}}
									margin="0"
									onUploadFinished={() => refetch()}
									docId={docId}
									compression={true}
								/>
							</UploadWrap>
						</UploadWrapper>
					</ImageWrap>
				)}

				{images.map((image, i) => (
					<ImageWrap key={image._id}>
						<ImageBox href={image.fileUrl + '?t=' + timestamp} target="_blank" />
						<div>
							{!disabled && (
								<ActionsWrap>
									<div onClick={e => setValue(image._id)}>
										<CheckBox
											color={theme.colors.blue}
											checked={value === image._id}
										/>
									</div>
									<StyledIconButton backgroundColor={"#4E67AB"} hoverBackgroundColor={"#4E67AB"}
										onClick={e => {
											e.preventDefault();
											e.stopPropagation();
											handleRotateFile(image,-90);

											
										}}
										iconProps={{
											icon: 'redo',
											size: 'sm',
											regular: true,
											marginRight: 0,
										}}
									/>
									<StyledIconButton
										onClick={e => {
											e.preventDefault();
											e.stopPropagation();
											setShowDeleteConfirm(image._id);
										}}
										iconProps={{
											icon: 'trash-alt',
											size: 'sm',
											regular: true,
											marginRight: 0,
										}}
									/>
									
								</ActionsWrap>
							)}

							<Input
								type="text"
								name={`files-${i}`}
								data-fileid={image._id}
								defaultValue={image.fileName}
								disabled={disabled}
							/>
						</div>
					</ImageWrap>
				))}

				<input type="hidden" name="primaryImageId" value={value} />
			</ImageListWrap>

			<h4>Vedlegg</h4>

			{documents.length > 0 ? (
				<ListBody>
					{documents &&
						documents.map(doc => (
							<ListItem
								lineHeight="1.6"
								marginBottom=".1rem"
								key={doc._id}>
								<Specs>
									<Spec
										maxWidth="3rem"
										paddingTop="0"
										paddingBottom="0">
										<Icon icon="file" size="md" />
									</Spec>
									<Spec paddingTop="0" paddingBottom="0">
										{doc.fileName}
									</Spec>
									<Spec
										maxWidth="3rem"
										paddingTop="0"
										paddingBottom="0">
										<StyledIconButton
											onClick={e => {
												e.preventDefault();
												e.stopPropagation();
												window.open(doc.fileUrl);
											}}
											iconProps={{
												icon: 'download',
												size: 'sm',
												regular: true,
												marginRight: 0,
												backgroundColor:
													theme.colors.blue,
												hoverBackgroundColor:
													theme.colors.blue,
											}}
										/>
									</Spec>
									<Spec
										maxWidth="3rem"
										paddingTop="0"
										paddingBottom="0">
										<StyledIconButton
											onClick={e => {
												e.preventDefault();
												e.stopPropagation();
												setShowDeleteConfirm(doc._id);
											}}
											iconProps={{
												icon: 'trash-alt',
												size: 'sm',
												regular: true,
												marginRight: 0,
											}}
										/>
									</Spec>
								</Specs>
							</ListItem>
						))}
				</ListBody>
			) : null}

			{showDeleteConfirm && (
				<Confirm
					modal={showDeleteConfirm}
					toggleModal={() => setShowDeleteConfirm('')}
					confirm={() => {
						handleDeleteFile(showDeleteConfirm);
						setShowDeleteConfirm('');
					}}
				/>
			)}
			{isRotating && (
				<RotateProgressWrap>
					<Loading style={{ height: '100vh' }} />
				</RotateProgressWrap>
			)}
		</>
	);
}
