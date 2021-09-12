import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { UPDATE_CATEGORY } from 'api/Categories';
import styled from 'styled-components';
import Toggle from 'components/general/Toggle';
import Icon from 'components/general/Icon';
import {
	TextField,
	CategoryHeader,
	CategoryInputField,
	CategoryHeaderEntry,
} from 'web/modules/categories/CategoryStyles.js';
import DragArea from 'web/modules/categories/DragArea';

const CategoryItemWrapper = styled.div`
	background-color: ${p => p.theme.colors.white};
	color: ${p => p.theme.colors.blue};
	padding-bottom: 5px;
	margin: 5px;
	margin-bottom: 1rem;
`;

const ActionButton = styled.button`
	background: none;
	border: none;
	padding: 10px;
	margin-top: 8px;
	display: flex;
	justify-content: flex-end;
	align-items: center;
	color: ${p => p.theme.colors.red};
	cursor: pointer;
	outline: none;
`;

const UpdateButton = styled(ActionButton)`
	color: ${p => p.theme.colors.blue};
`;

export default function Category({ category, deleteCategory }) {
	const [order, setOrder] = useState(category.order || 0);
	const [name, setName] = useState(category.name);
	const [isSeparated, setIsSeparated] = useState(category.isSeparated);
	const [updateOneCategory] = useMutation(UPDATE_CATEGORY);

	const { children = null, lifeSpans = null } = category;

	function toggleIsSeparated() {
		const updateData = {
			_id: category._id,
			isSeparated: !category.isSeparated,
		};
		updateOneCategory({ variables: updateData });
		setIsSeparated(updateData.isSeparated);
	}

	function submitEditedCategory() {
		const updateData = {
			_id: category._id,
			order: parseInt(order),
			name: name,
		};
		updateOneCategory({ variables: updateData });
	}

	return (
		<CategoryItemWrapper key={category._id}>
			<CategoryHeader>
				<CategoryHeaderEntry>
					<TextField />

					<CategoryInputField
						type="number"
						value={order}
						onChange={e => setOrder(e.target.value)}
					/>
				</CategoryHeaderEntry>

				<CategoryHeaderEntry>
					<TextField color="black">Kategori</TextField>

					<CategoryInputField
						type="text"
						value={name}
						onChange={e => setName(e.target.value)}
					/>
				</CategoryHeaderEntry>

				<CategoryHeaderEntry>
					<TextField color="black">
						Separasjon
						<Toggle
							isChecked={isSeparated}
							ariaLabel="Aktiver"
							onToggle={() => toggleIsSeparated()}
						/>
					</TextField>
				</CategoryHeaderEntry>

				<CategoryHeaderEntry
					flexDirection="row"
					justifyContent="flex-end"
					alignItems="flex-start">
					<ActionButton onClick={() => deleteCategory(category._id)}>
						<span>Slett</span>
						<Icon icon="trash-alt" marginRight="0" size="sm" />
					</ActionButton>

					<UpdateButton onClick={() => submitEditedCategory()}>
						<span>Oppdater</span>
						<Icon icon="sync-alt" marginRight="0" size="sm" />
					</UpdateButton>
				</CategoryHeaderEntry>
			</CategoryHeader>

			<DragArea
				categoryId={category._id}
				items={children}
				typeName="Objekt"
				type="children"
			/>

			<DragArea
				categoryId={category._id}
				items={lifeSpans}
				typeName="Levetid"
				type="lifeSpans"
			/>
		</CategoryItemWrapper>
	);
}
