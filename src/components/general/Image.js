import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { DELETE_FILE } from 'api/Files';

import styled from 'styled-components';
import theme from 'web/styles/theme.js';

import Icon from 'components/general/Icon';
import Confirm from 'components/general/Confirm';

const ImageWrapper = styled.div`
	display: flex;
	margin: 0;
	margin-top: 1rem;
`;
const Img = styled.img`
	border: 1px solid ${p => p.theme.colors.border};
	width: auto;
	height: 10rem;
	margin-right: -1rem;
`;
const Imagebutton = styled.div`
	background-color: ${p => p.theme.colors.red};
	transform: ${p => (p.translate ? `translate(${p.translate})` : undefined)};
	height: 2.2rem;
	width: 2.2rem;
	border-radius: 50%;
	padding-top: 0.25rem;
	opacity: 70%;
`;

export default function Image({ dispatchFile, fileUrl, id }) {
	const [confirmModal, toggleConfirmModal] = useState(false);

	const [deleteFile] = useMutation(DELETE_FILE);
	const handleDelete = async () => {
		const success = await deleteFile({ variables: { _id: id } });
		if (success) {
			dispatchFile({ data: id, task: 'removefile' });
		}
	};

	return (
		<ImageWrapper key={id}>
			<Img src={fileUrl} />
			<Imagebutton translate="-1.5rem, 7.5rem">
				<Icon
					onClick={() => toggleConfirmModal(true)}
					icon="trash-alt"
					size="md"
					cursor="pointer"
					color={theme.colors.white}
				/>
			</Imagebutton>
			<Confirm
				modal={confirmModal}
				toggleModal={toggleConfirmModal}
				confirm={() => handleDelete()}
			/>
		</ImageWrapper>
	);
}
