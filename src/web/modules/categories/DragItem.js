import React, { useState } from 'react';
import styled from 'styled-components';
import {
	DragEntity,
	DragEntityText,
	IndentIcon,
	ActionButton,
} from 'web/modules/categories/CategoryStyles.js';
import theme from 'web/styles/theme';
import Icon from 'components/general/Icon';

const DrageEntityWrapper = styled.div`
	padding-left: 3rem;
`;

const DragItem = ({
	item,
	updateIndex,
	itemIndex,
	parentObject,
	deleteCategory,
}) => {
	const [isCurrentTarget, setIsCurrentTarget] = useState(false);
	const dragEventHandler = (e, sourceIndex, sourceParent) => {
		e.dataTransfer.setData('sourceIndex', sourceIndex);
		e.dataTransfer.setData('sourceParent', sourceParent);
		e.dataTransfer.dropEffect = 'move';
	};

	const dragOverEventHandler = e => {
		e.preventDefault();
		setIsCurrentTarget(true);
	};
	// when item leaves a valid target area:
	const leaveEventHandler = e => {
		e.preventDefault();
		setIsCurrentTarget(false);
	};

	// when item enter a valid target area:
	const enterEventHandler = (e, targetParent) => {
		e.preventDefault();
		setIsCurrentTarget(true);
	};
	//* when an item is dropped.
	const dropEventHandler = (e, targetIndex, targetParent) => {
		e.preventDefault();
		let sourceIndex = e.dataTransfer.getData('sourceIndex');
		let sourceParent = e.dataTransfer.getData('sourceParent');
		setIsCurrentTarget(false);
		if (targetParent === sourceParent) {
			updateIndex(sourceIndex, targetIndex);
		}
	};

	return (
		<DrageEntityWrapper>
			<DragEntity
				expand={isCurrentTarget}
				draggable="true"
				onDragStart={e => dragEventHandler(e, itemIndex, parentObject)}
				onDragEnter={e => enterEventHandler(e, parentObject)}
				onDragLeave={e => leaveEventHandler(e)}
				onDragOver={e => dragOverEventHandler(e)}
				onDrop={e => dropEventHandler(e, itemIndex, parentObject)}>
				<IndentIcon expand={isCurrentTarget}>
					<Icon icon="equals" margin-right=".1em" />
				</IndentIcon>

				<DragEntityText expand={isCurrentTarget}>
					{item.name}
				</DragEntityText>

				<ActionButton onClick={deleteCategory} expand={isCurrentTarget}>
					<Icon icon="minus" color={theme.colors.red} />
				</ActionButton>
			</DragEntity>
		</DrageEntityWrapper>
	);
};

export default DragItem;
