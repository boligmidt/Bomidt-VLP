import React, { useState, useEffect, useContext } from "react";
import { gql } from "apollo-boost";
import moment from "moment";
import styled from "styled-components";

import xWhite from "icons/x-white.svg";

import { FormContext } from "components/forms/Form";
import FormField from "components/forms/FormField";
import { Button } from "components/general/Buttons";
import { stringWildcard } from "utils/match";
import apolloClient from "utils/apollo";

const ProgressBar = styled.div`
	height: 2px;
	width: 100%;
	display: block;
	background: ${p => p.theme.colors.pink};
	transition: transform 100ms linear;
	transform-origin: left;
`;

const ImageHolder = styled.div`
	position: relative;
	max-width: 200px;
`;

const RemoveButton = styled.button`
	background-image: url(${xWhite});
	background-position: 47% 50%;
	background-repeat: no-repeat;
	background-size: 10px 10px;
	background-color: ${p => p.theme.colors.black};
	border: none;
	border-radius: 100%;
	cursor: pointer;
	position: absolute;
	top: -13px;
	right: -13px;
	text-indent: -9999px;
	width: 30px;
	height: 30px;
	transition: background-color 0.5s;

	&:hover {
		background-color: ${p => p.theme.colors.red};
	}
`;

const Image = styled.img`
	width: 100%;
	height: auto;
	display: block;
`;

const FileName = styled.div`
	margin-bottom: 5px;
`;

const Input = styled.input`
	cursor: pointer;
`;

function UploadField({ children, key, ...props }) {
	const { accept, keyGenerator } = props;
	const context = useContext(FormContext);

	let [fileUpdate, setFileUpdate] = useState({});
	let [count, setCount] = useState(0);
	let [uploadProgress, setUploadProgress] = useState(0);
	let [isUploading, setIsUploading] = useState(false);
	let value = context.values[props.name];
	let canRemove = !!(value && value.key) || !!fileUpdate.newFile;
	let canReset = !!fileUpdate.removeKey || !!fileUpdate.newFile;
	let isImage = false;
	let imageSrc = "";

	if (
		value &&
		value.fileContentType &&
		value.fileContentType.indexOf("image") > -1
	) {
		isImage = true;
		imageSrc = value.url;
	} else if (
		fileUpdate.newFile &&
		fileUpdate.newFile.type.indexOf("image") > -1
	) {
		isImage = true;
		imageSrc = fileUpdate.base64Src;
	}

	let preSubmitHook = async values => {
		let uploadUrl, file, key;

		if (!fileUpdate.removeKey && !fileUpdate.newFile) {
			return values;
		}

		if (fileUpdate.removeKey) {
			try {
				let {
					data: { success },
				} = await new Promise((resolve, reject) =>
					apolloClient
						.mutate({
							variables: {
								key: fileUpdate.removeKey,
							},
							mutation: gql`
								mutation deleteOneDocumentFile($key: String!) {
									success: deleteOneDocumentFile(key: $key)
								}
							`,
						})
						.catch(reject)
						.then(resolve),
				);

				if (success) {
					values[props.name] = null;
				}
			} catch (error) {
				console.error(error);
			}
		}

		if (fileUpdate.newFile) {
			file = fileUpdate.newFile;
			let extension = "";

			if (file.name.indexOf(".") > -1) {
				extension = "." + file.name.split(".").pop();
			}

			key = keyGenerator({
				...file,
				extension,
			});

			try {
				({
					data: { uploadUrl },
				} = await new Promise((resolve, reject) =>
					apolloClient
						.mutate({
							variables: {
								key,
								fileContentType: file.type,
							},
							mutation: gql`
								mutation requestDocumentFileUpload(
									$key: String!
									$fileContentType: String!
								) {
									uploadUrl: requestDocumentFileUpload(
										key: $key
										fileContentType: $fileContentType
									)
								}
							`,
						})
						.catch(reject)
						.then(resolve),
				));
			} catch (error) {
				console.log(error.toString());
			}
		}

		if (!uploadUrl) {
			setFileUpdate({});
			fileUpdate = {};
			return values;
		}

		setIsUploading(true);
		setUploadProgress(0);

		let uploadSuccess = await new Promise((resolve, reject) => {
			let req = new XMLHttpRequest();

			req.overrideMimeType("text/plain");
			req.open("PUT", uploadUrl);
			req.setRequestHeader("Content-Type", file.type);
			req.setRequestHeader("x-amz-acl", "public-read");

			let nextCallAllowed = new Date();

			const updateProgress = e => {
				if (new Date() < nextCallAllowed) {
					return;
				}

				nextCallAllowed = moment()
					.add(110, "ms")
					.toDate();

				if (uploadProgress === 100) {
					return;
				}

				let newProgress = Math.round((e.loaded / e.total) * 100);

				if (uploadProgress > newProgress) {
					return;
				}

				setUploadProgress && setUploadProgress(newProgress);
			};

			req.onprogress = updateProgress;
			req.upload.onprogress = updateProgress;

			req.onload = e => {
				if (req.status >= 200 && req.status < 300) {
					setUploadProgress && setUploadProgress(100);
					resolve(true);
				}
			};
			req.onerror = () => {
				resolve(false);
			};

			req.send(file);
		});

		setIsUploading(false);

		if (uploadSuccess) {
			values[props.name] = {
				url: uploadUrl.split("?")[0],
				key: key,
				status: "uploaded",
				fileName: file.name,
				fileSize: file.size,
				fileContentType: file.type,
			};
		}
		setFileUpdate({});
		fileUpdate = {};

		return values;
	};

	useEffect(() => {
		context.registerPreSubmitHook(props.name, preSubmitHook);

		return () => {
			context.removePreSubmitHook(props.name);
		};
	}, []);

	return (
		<FormField {...props} error={context.errors.hasOwnProperty(props.name)}>
			{canReset && (
				<Button
					disabled={context.isDisabled || props.disabled}
					type="button"
					onClick={() => {
						fileUpdate.removeKey = null;
						fileUpdate.newFile = null;

						setFileUpdate(fileUpdate);
						setCount(count + 1);
					}}
				>
					Angre
				</Button>
			)}

			{isUploading && (
				<ProgressBar
					style={{
						transform: `scale(${uploadProgress * 0.01}, 1)`,
					}}
				/>
			)}

			<ImageHolder>
				{canRemove && (
					<RemoveButton
						type="button"
						onClick={() => {
							if (value && value.key) {
								fileUpdate.removeKey = value.key;
							}

							fileUpdate.newFile = null;

							setFileUpdate(fileUpdate);
							setCount(count + 1);
						}}
						title="Fjern"
					>
						Fjern
					</RemoveButton>
				)}

				{!fileUpdate.removeKey && (
					<>
						{isImage && <Image src={imageSrc} alt="" />}

						{(value && <FileName>{value.fileName}</FileName>) ||
							(fileUpdate.newFile && (
								<FileName>{fileUpdate.newFile.name}</FileName>
							))}
					</>
				)}
			</ImageHolder>

			<Input
				type="file"
				accept={props.accept && props.accept.join(",")}
				disabled={context.isDisabled || props.disabled}
				onChange={async e => {
					let file = e.target.files[0];
					let accepted = false;

					accept.forEach(match => {
						if (stringWildcard(file.type, match)) {
							accepted = true;
						}
					});

					if (!accepted) {
						return;
					}

					fileUpdate.newFile = file;

					if (file.type.indexOf("image") > -1) {
						fileUpdate.base64Src = await new Promise(
							(resolve, reject) => {
								const reader = new FileReader();
								reader.readAsDataURL(file);
								reader.onload = () => resolve(reader.result);
								reader.onerror = error => reject(error);
							},
						);
					}

					setFileUpdate(fileUpdate);
					setCount(count + 1);
				}}
			/>
		</FormField>
	);
}

export default UploadField;
