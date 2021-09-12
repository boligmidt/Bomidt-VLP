import React, { useState, useEffect } from 'react';
import { CheckBox } from 'components/icons/Checkboxes';
import styled from 'styled-components';

const ChildWrapper = styled.div`
	display: flex;
	flex-direction: row;
`;
const ActionButton = styled.button`
	all: unset;
	cursor: pointer;
	display: flex;
	align-items: center;
`;

export default function CategoryItem({
	register,
	child,
	parent,
	housingCooperativeId,
	selectedAssessments,
	registrationKey,
	address,
}) {
	const [checked, setChecked] = useState(false);

	useEffect(() => {
		let isChecked = false;
		if (selectedAssessments) {
			selectedAssessments.map(item => {
				if (item.registrationKey === registrationKey) {
					isChecked = true;
				}
			});
		}
		setChecked(isChecked);
	}, []);

	let date = new Date();
	const groupKey = parseInt(`${date.getFullYear()}${date.getMonth() + 1}`);
	const entry = {
		registrationKey: registrationKey,
		parentKey: parent.key,
		housingCooperativeId: housingCooperativeId,
		name: child.name,
		objectType: child.name,
		categoryId: parent._id,
		category: parent.name,
		groupOrder: parseInt(parent.order),
		groupKey: groupKey,
		stateLevel: 'tgiu',
		address: address,
	};
	return (
		<ChildWrapper>
			<ActionButton
				onClick={() => {
					if (!checked) {
						register({ data: entry, action: 'add' });
					} else {
						register({ data: entry, action: 'delete' });
					}
					setChecked(!checked);
				}}>
				<CheckBox checked={checked} />

				<div key={entry.registrationKey}>{entry.objectType}</div>
			</ActionButton>
		</ChildWrapper>
	);
}
