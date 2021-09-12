import React from 'react';
import styled from 'styled-components';
import InputField from 'components/forms/InputField';
import SubmitButton from 'components/forms/SubmitButton';
import { Button } from 'components/general/Buttons';

const ActionsWrap = styled.div`
	display: flex;
`;

const DeleteButton = styled(Button)`
	margin-left: 20px;
`;

export default function BuildingDataFields({
	isAdmin,
	isNew = false,
	onDeleteClick,
}) {
	return (
		<>
			<InputField name="address" label="Adresse" disabled={!isAdmin} />
			<InputField name="category" label="Kategori" disabled={!isAdmin} />
			<InputField name="object" label="Bygningsdel" disabled={!isAdmin} />
			<InputField
				name="amount"
				label="Mengde/enhet"
				disabled={!isAdmin}
			/>

			<ActionsWrap>
				<SubmitButton disabled={!isAdmin}>Lagre</SubmitButton>

				{!isNew && isAdmin && (
					<DeleteButton
						type="button"
						onClick={e => {
							e.preventDefault();
							e.stopPropagation();
							onDeleteClick();
						}}>
						Slett
					</DeleteButton>
				)}
			</ActionsWrap>
		</>
	);
}
