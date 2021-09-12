import React, { useState } from 'react';
import styled from 'styled-components';
import { Input } from 'components/forms/InputField';
import { Button } from 'components/general/Buttons';

const Wrapper = styled.div`
	display: flex;
	margin-bottom: 10px;
`;
const Label = styled.div`
	flex: 1;
	font-size: 1.2rem;
	height: 52px;
	padding: 14px 15px;
`;
const ActionsWrapper = styled.div`
	& > * {
		margin-left: 10px;
	}
`;

export default function EditableInput({
	defaultValue,
	isNew = false,
	onUpdateClick,
	onDeleteClick = null,
}) {
	const [value, setValue] = useState(defaultValue);
	const [isEditing, setIsEditing] = useState(isNew);

	return (
		<Wrapper>
			{!isEditing && <Label>{value}</Label>}

			{isEditing && (
				<Input
					value={value}
					onChange={e => setValue(e.target.value)}
					onFocus={() => (isNew ? setValue('') : null)}
				/>
			)}

			<ActionsWrapper>
				{!isEditing && (
					<Button onClick={() => setIsEditing(true)}>Rediger</Button>
				)}

				{isEditing && (
					<Button
						onClick={() => {
							onUpdateClick(value);
							setIsEditing(false);
							setValue(isNew ? defaultValue : '');
						}}>
						Lagre
					</Button>
				)}

				{!isEditing && !isNew && onDeleteClick && (
					<Button onClick={onDeleteClick}>Slett</Button>
				)}
			</ActionsWrapper>
		</Wrapper>
	);
}
