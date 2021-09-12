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

export default function HousingCooperativeFields({
	isAdmin,
	onDeleteClick,
	isEdit = false,
}) {
	return (
		<>
			<InputField
				name="title"
				label="Tittel"
				required
				disabled={!isAdmin}
			/>
			<InputField name="address" label="Adresse" disabled={!isAdmin} />
			<InputField
				name="postalNumber"
				label="Postnummer"
				disabled={!isAdmin}
			/>
			<InputField name="postalCity" label="Sted" disabled={!isAdmin} />
			<InputField name="phone" label="Telefon" disabled={!isAdmin} />
			<InputField name="mobile" label="Mobil" disabled={!isAdmin} />
			<InputField name="email" label="E-post" disabled={!isAdmin} />

			<ActionsWrap>
				<SubmitButton disabled={!isAdmin}>Lagre</SubmitButton>

				{isEdit && (
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
