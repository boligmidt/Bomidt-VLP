import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import moment from "moment";

import apolloClient from "utils/apollo";
import FormField from "components/forms/FormField";

const UploadPanel = styled.div`
	width: 100%;
	min-height: 120px;
	background: ${p => p.theme.colors.white};
	text-align: center;
	border: 1px dashed ${p => p.theme.colors.blue};
	color: ${p => p.theme.colors.darkGray};
	position: relative;
	cursor: pointer;
`;

const UploadPanelText = styled.span`
	margin: 60px auto;
	width: 100%;
	display: inline-block;
`;

const FileInput = styled.input`
	position: absolute;
	top: 0;
	bottom: 0;
	right: 0;
	left: 0;
	opacity: 0;
	width: 100%;
	cursor: pointer;
`;

const DeleteButton = styled.button`
	margin-left: 5px;
	border: none;
	background-color: transparent;
	padding: 5px 0;
	color: ${p => p.theme.colors.red};
	cursor: pointer;
	font-size: ${12 / 16}rem;
`;

const DocumentElement = ({ _id, fileName, url, children, onDelete }) => (
	<li>
		{url && (
			<a href={url} target="_blank" rel="noopener noreferrer">
				{fileName}
			</a>
		)}

		{!url && fileName}

		{onDelete && (
			<DeleteButton type="button" onClick={onDelete}>
				(Slett)
			</DeleteButton>
		)}

		{children}
	</li>
);

const ProgressBar = styled.div`
	height: 2px;
	width: 100%;
	display: block;
	background: ${p => p.theme.colors.blue};
	transition: transform 100ms linear;
	transform-origin: left;
`;

function UploadElement({
	fileId,
	fileName,
	uploadUrl,
	fileObject,
	onCompleted,
	onDelete,
}) {
	let [progress, setProgress] = useState(0);
	let [isUploading, setIsUploading] = useState(false);

	useEffect(() => {
		if (isUploading || !fileObject || !uploadUrl) {
			return;
		}

		let req = new XMLHttpRequest();

		req.overrideMimeType("text/plain");
		req.open("PUT", uploadUrl);
		req.setRequestHeader("Content-Type", fileObject.type);
		req.setRequestHeader("x-amz-acl", "public-read");

		setIsUploading(true);
		let nextCallAllowed = new Date();

		const updateProgress = e => {
			if (new Date() < nextCallAllowed) {
				return;
			}

			nextCallAllowed = moment()
				.add(110, "ms")
				.toDate();

			if (progress === 100) {
				return;
			}

			let newProgress = Math.round((e.loaded / e.total) * 100);

			if (progress > newProgress) {
				return;
			}

			setProgress && setProgress(newProgress);
		};

		req.onprogress = updateProgress;
		req.upload.onprogress = updateProgress;

		req.onload = e => {
			if (req.status >= 200 && req.status < 300) {
				setProgress && setProgress(100);

				apolloClient
					.mutate({
						variables: {
							_id: fileId,
						},
						mutation: gql`
							mutation setFileUploadStatus($_id: ID!) {
								setFileUploadStatus(
									_id: $_id
									s3UploadStatus: "uploaded"
								) {
									_id
									fileName
									url
								}
							}
						`,
					})
					.then(({ data, error }) => {
						onCompleted && onCompleted();
					});
			}
		};
		req.onerror = () => {
			onCompleted && onCompleted("An error occurred");
		};

		req.send(fileObject);
	});

	return (
		<DocumentElement fileName={fileName} onDelete={onDelete}>
			<ProgressBar
				style={{
					transform: `scale(${progress * 0.01}, 1)`,
				}}
			/>
		</DocumentElement>
	);
}

const DELETE_FILE_MUTATION = gql`
	mutation deleteOneFile($_id: ID!) {
		deleteOneFile(_id: $_id)
	}
`;

export function UploadArea({
	taskId,
	onRequestFileUploads,
	isTemplate,
	disabled,
}) {
	return (
		<UploadPanel>
			<UploadPanelText>
				Klikk eller slipp filer her for å laste opp.
			</UploadPanelText>
			<Mutation
				mutation={gql`
					mutation requestFileUpload(
						$fileName: String!
						$fileSize: Int!
						$fileContentType: String!
						$taskId: ID!
						$isTemplate: Boolean
					) {
						requestFileUpload(
							fileName: $fileName
							fileSize: $fileSize
							fileContentType: $fileContentType
							taskId: $taskId
							isTemplate: $isTemplate
						) {
							_id
							key
							url
							fileName
							fileContentType
							fileSize
							s3UploadStatus
							uploadUrl
							uploadExpiresAt
						}
					}
				`}
			>
				{requestFileUpload => (
					<FileInput
						type="file"
						multiple
						disabled={disabled}
						onChange={async e => {
							let rawFiles = e.target.files;
							let newFiles = [];

							for (let i = 0; i < rawFiles.length; i++) {
								newFiles.push(rawFiles[i]);
							}

							let dbFiles = await Promise.all(
								newFiles.map(file => {
									return requestFileUpload({
										variables: {
											fileName: file.name,
											fileSize: file.size,
											fileContentType: file.type,
											taskId,
											isTemplate,
										},
									});
								}),
							);

							dbFiles = dbFiles.map((file, i) => {
								return {
									...file.data.requestFileUpload,
									fileObject: newFiles[i],
								};
							});

							onRequestFileUploads(dbFiles);
						}}
					/>
				)}
			</Mutation>
		</UploadPanel>
	);
}

export default function MultiUpload({
	taskId,
	isTemplate,
	disabled,
	...props
}) {
	let [uploadFileObjects, setUploadFileObjects] = useState({});

	return (
		<Query
			variables={{
				taskId,
			}}
			query={gql`
				query getAllFiles($taskId: ID) {
					completedFiles: paginateFiles(
						taskId: $taskId
						isReady: true
					) {
						items {
							_id
							fileName
							url
						}
					}
					filesForUpload: paginateFiles(
						taskId: $taskId
						isReady: false
					) {
						items {
							_id
							fileName
							uploadUrl
							s3UploadStatus
						}
					}
				}
			`}
		>
			{({ data, loading, error, refetch: refetchFiles }) => (
				<FormField {...props} error={!!error}>
					{error && <h3>{error}</h3>}
					<Mutation mutation={DELETE_FILE_MUTATION}>
						{deleteOneFile => (
							<>
								{data && data.completedFiles && (
									<ul>
										{data.completedFiles.items.map(file => (
											<DocumentElement
												key={file._id}
												url={file.url}
												fileName={file.fileName}
												onDelete={() => {
													if (disabled) {
														return;
													}
													if (
														!window.confirm(
															`Sikker på at du vil slette ${
																file.fileName
															}?`,
														)
													) {
														return;
													}

													deleteOneFile({
														variables: {
															_id: file._id,
														},
													}).then(refetchFiles);
												}}
											/>
										))}
									</ul>
								)}

								{data && data.filesForUpload && (
									<ul>
										{data.filesForUpload.items.map(file => (
											<UploadElement
												key={file._id}
												fileId={file._id}
												fileName={file.fileName}
												uploadUrl={file.uploadUrl}
												fileObject={
													uploadFileObjects[file._id]
												}
												onCompleted={refetchFiles}
												onDelete={() => {
													if (disabled) {
														return;
													}

													if (
														!window.confirm(
															`Sikker på at du vil slette ${
																file.fileName
															}?`,
														)
													) {
														return;
													}

													deleteOneFile({
														variables: {
															_id: file._id,
														},
													}).then(refetchFiles);
												}}
											/>
										))}
									</ul>
								)}
							</>
						)}
					</Mutation>
					{loading && <h3>Laster...</h3>}

					<UploadArea
						taskId={taskId}
						isTemplate={isTemplate}
						disabled={disabled}
						onRequestFileUploads={files => {
							files.forEach(file => {
								uploadFileObjects[file._id] = file.fileObject;
							});

							setUploadFileObjects(uploadFileObjects);
							refetchFiles();
						}}
					/>
				</FormField>
			)}
		</Query>
	);
}
