import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import styled from 'styled-components';

import theme from 'web/styles/theme';
import Icon from 'components/general/Icon';
import { UPDATE_CATEGORY } from 'api/Categories';
import DragItem from 'web/modules/categories/DragItem';
import {
	IndentIcon,
	ActionButton,
	DragAreaAddItemInputField,
	TextField,
	CategoryHeader,
} from 'web/modules/categories/CategoryStyles.js';

const DragAreaWrapper = styled.div`
	margin-bottom: 5px;
	margin-left: 1rem;
`;

const DragArea = ({ items = [], type, categoryId, typeName }) => {
	const [
		updateOneCategory,
		{ error: updateError, loading: updateLoading },
	] = useMutation(UPDATE_CATEGORY);

	const [orderedItems, setOrderedItems] = useState(
		items
			? items.sort((a, b) => {
					return a.orderIndex - b.orderIndex;
			  })
			: []
	);

	const [name, setName] = useState(' ');

	async function updateIndex(from, to) {
		let updatedData = { _id: categoryId };
		let updateIndex = orderedItems;
		if (from === to.toString()) {
			return null;
		}

		let indexItem = updateIndex.splice(from, 1)[0];
		if (from <= to && to != 0) {
			to--;
		}
		updateIndex.splice(to, 0, indexItem);

		let updatedIndex = [];
		updateIndex.forEach((entry, index) => {
			entry.orderIndex = index;

			delete entry['__typename'];
			updatedIndex.push(entry);
		});

		updatedData[type] = updatedIndex;

		await updateOneCategory({ variables: updatedData });

		setOrderedItems(updatedIndex);
	}

	if (updateError) {
		return <p>Error</p>;
	}

	async function createEntry() {
		if (!name) return;

		let newChild = {
			orderIndex: 0,
			name: name,
		};

		let oldIndex = orderedItems;

		let newIndex = [newChild];

		oldIndex.forEach((entry, index) => {
			entry.orderIndex = index;

			delete entry['__typename'];
			newIndex.push(entry);
		});

		let updatedData = { _id: categoryId };

		updatedData[type] = newIndex;

		await updateOneCategory({ variables: updatedData });

		setOrderedItems(newIndex);

		setName('');
	}

	async function onDeleteClick(itemIndex) {
		if (!confirm('Er du sikker?')) return;
		let updatedData = {
			_id: categoryId,
			[type]: [],
		};

		orderedItems.forEach((child, index) => {
			if (itemIndex === index) return;

			updatedData[type].push({
				name: child.name,
				orderIndex: index,
				type,
			});
		});

		await updateOneCategory({
			variables: updatedData,
			refetchQueries: ['findCategories'],
		});

		setOrderedItems(updatedData[type]);
	}

	return (
		<DragAreaWrapper>
			<CategoryHeader>
				<IndentIcon>
					<Icon icon="equals" margin-right=".1em" />
				</IndentIcon>

				<TextField color="black">{typeName}</TextField>

				<DragAreaAddItemInputField
					value={name}
					onChange={e => setName(e.target.value)}
				/>

				<ActionButton onClick={() => createEntry()}>
					<Icon icon="plus" color={theme.colors.green} />
				</ActionButton>
			</CategoryHeader>

			{orderedItems && orderedItems.length
				? orderedItems.map((item, index) => {
						return (
							<DragItem
								key={`${categoryId}${index}`}
								item={item}
								itemIndex={index}
								parentObject={`${categoryId}`}
								updateIndex={updateIndex}
								deleteCategory={() => onDeleteClick(index)}
							/>
						);
				  })
				: ''}
		</DragAreaWrapper>
	);
};

export default DragArea;
