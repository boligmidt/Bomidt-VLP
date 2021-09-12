import React, { useState } from 'react';
import styled from 'styled-components';
import {
	IndentIcon,
	ActionButton,
	DragAreaAddItemInputField,
	TextField,
	CategoryHeader,
} from 'web/modules/categories/CategoryStyles.js';
import Icon from 'components/general/Icon';
import theme from 'web/styles/theme';

import DragItem from './DragItem';

const DragAreaWrapper = styled.div`
	margin-bottom: 1rem;
	margin-left: 3rem;
`;

const CategoryFormChildren = ({
	type,
	typeName,
	orderedItems,
	setOrderedItems,
}) => {
	const defaultName = '';

	const [name, setName] = useState(defaultName);
	const updateIndex = (from, to) => {
		let updateIndex = orderedItems;
		if (from === to.toString()) {
			return null;
		}
		let indexItem = updateIndex.splice(from, 1)[0];
		if (from <= to && to !== 0) {
			to--;
		}
		updateIndex.splice(to, 0, indexItem);

		let updatedIndex = [];
		updateIndex.forEach((entry, index) => {
			entry.orderIndex = index;
			updatedIndex.push(entry);
		});
		setOrderedItems(updatedIndex);
	};

	const NewEntry = () => {
		let newChild = {
			orderIndex: 0,
			name: name,
		};
		let oldIndex = orderedItems;

		let newIndex = [newChild];
		oldIndex.forEach((entry, index) => {
			entry.orderIndex = index;
			newIndex.push(entry);
		});
		setOrderedItems(newIndex);
		setName('');
	};

	return (
		<DragAreaWrapper>
			<CategoryHeader marginBottom="1rem">
				<IndentIcon>
					<Icon icon="equals" margin-right=".1em" />
				</IndentIcon>

				<TextField color="black">{typeName}</TextField>

				<DragAreaAddItemInputField
					color={
						name === defaultName
							? theme.colors.lightGray
							: undefined
					}
					defaultValue={name}
					placeholder={`Legg til nytt ${typeName.toLowerCase()}`}
					onChange={e => setName(e.target.value)}
				/>

				<ActionButton onClick={() => NewEntry()}>
					<Icon icon="plus" color={theme.colors.green} />
				</ActionButton>
			</CategoryHeader>

			{orderedItems && orderedItems.length
				? orderedItems.map((item, index) => {
						return (
							<DragItem
								key={`${type}${index}`}
								item={item}
								itemIndex={index}
								parentObject={`new`}
								updateIndex={updateIndex}
							/>
						);
				  })
				: ''}
		</DragAreaWrapper>
	);
};

export default CategoryFormChildren;
