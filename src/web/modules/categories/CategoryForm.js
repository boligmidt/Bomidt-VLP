import React, { useState } from 'react';
import styled from 'styled-components';
import theme from 'web/styles/theme';
import Icon from 'components/general/Icon';
import {
	TextField,
	CategoryHeader,
	CategoryInputField,
	CategoryHeaderEntry,
} from 'web/modules/categories/CategoryStyles.js';
import Toggle from 'components/general/Toggle'; // delete me

const CategoryItemWrapper = styled.div`
	background-color: ${p => p.theme.colors.white};
	color: ${p => p.theme.colors.blue};
	padding-bottom: 5px;
	margin: 5px;
`;
const ActionButton = styled.button`
	background: none;
	border: none;
	padding: 10px;
	margin-top: 8px;
	display: flex;
	justify-content: flex-end;
	color: ${p => p.theme.colors.blue};
	cursor: pointer;
	outline: none;
`;

export default function CategoryForm({ newCategory }) {
	const [categoryName, setCategoryName] = useState('');
	const [categoryOrder, setCategoryOrder] = useState(0);
	const [isSeparated, setIsSeparated] = useState(false);

	async function submit() {
		if (!categoryName) return;

		await newCategory({
			isSeparated: isSeparated,
			name: categoryName,
			order: parseInt(categoryOrder),
		});

		setCategoryOrder(0);
		setCategoryName('');
		setIsSeparated(false);
	}

	return (
		<CategoryItemWrapper>
			<CategoryHeader>
				<CategoryHeaderEntry>
					<TextField />

					<CategoryInputField
						type="number"
						value={categoryOrder}
						onChange={e => setCategoryOrder(e.target.value)}
					/>
				</CategoryHeaderEntry>

				<CategoryHeaderEntry>
					<TextField color="black">Kategori</TextField>

					<CategoryInputField
						type="text"
						value={categoryName}
						placeholder="Legg til kategori"
						onChange={e => setCategoryName(e.target.value)}
					/>
				</CategoryHeaderEntry>

				<CategoryHeaderEntry>
					<TextField color="black">
						Separasjon
						<Toggle
							isChecked={isSeparated}
							ariaLabel="Aktiver"
							onToggle={() => setIsSeparated(!isSeparated)}
						/>
					</TextField>
				</CategoryHeaderEntry>

				<CategoryHeaderEntry>
					<ActionButton onClick={() => submit()}>
						<span>Lagre</span>

						<Icon icon="save" solid={true} marginRight="0" />
					</ActionButton>
				</CategoryHeaderEntry>
			</CategoryHeader>
		</CategoryItemWrapper>
	);
}
