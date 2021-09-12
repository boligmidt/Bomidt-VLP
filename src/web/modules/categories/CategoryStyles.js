import styled from 'styled-components';

// Styles belonging to the Category module
// shared styles:
export const IndentIcon = styled.div`
	all: unset;
	padding-top: ${p => (p.expand ? '2rem' : '0')};
	transition: ${p => (p.expand ? 'padding .3s .1s' : undefined)};
	margin: 0;
`;

export const ActionButton = styled.button`
	all: unset;
	cursor: pointer;
	padding-top: ${p => (p.expand ? '2rem' : '0')};
	transition: ${p => (p.expand ? 'padding .3s .1s' : undefined)};
	margin: 0;
`;

export const TextField = styled.span`
	margin-top: 0.5rem;
	${p => (p.last ? 'padding-left: 8rem' : undefined)};
	${p => (p.red ? `color: ${p.theme.colors.red}` : undefined)};
	${p => (p.underline ? `text-decoration: underline;` : undefined)};
	color: ${p => (p.color ? p.color : p.theme.colors.blue)};
`;

export const CategoryHeader = styled.div`
	display: flex;
	flex-direction: row;
	align-content: flex-end;
	margin-bottom: ${p => (p.marginBottom ? p.marginBottom : undefined)};
`;

// Drag & drop component styles
export const DragEntity = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	margin-top: 0.5rem;
	margin-bottom: 1rem;
	width: 100%;
`;
export const DragEntityText = styled.span`
	margin-top: 0;
	font-weight: bold;
	padding-top: ${p => (p.expand ? '2rem' : '0')};
	transition: padding 0.3s 0.1s;
	border-bottom: 1px solid ${p => p.theme.colors.border};
	&:last-of-type {
		flex: 1;
	}
`;

export const DragAreaAddItemInputField = styled.input`
	all: unset;
	color: ${p => (p.color ? p.color : undefined)};
	border-bottom: 1px solid ${p => p.theme.colors.border};
	font-size: 1rem;
	margin-left: 1rem;
	flex: 1;
`;

// Category list styles
export const StyledToggleButton = styled.button`
	all: unset;
	cursor: pointer;
	margin: 0;
`;

export const CategoryInputField = styled.input`
	all: unset;
	border-bottom: 1px solid ${p => p.theme.colors.border};
	color: ${p => (p.color ? p.color : undefined)};
	height: 1.5rem;
	font-size: 1.2rem;
	line-height: 1.5rem;
	margin: 0;
	padding-top: 0.5rem;
`;

export const CategoryHeaderEntry = styled.div`
	display: flex;
	flex-direction: ${p => (p.flexDirection ? p.flexDirection : 'column')};
	justify-content: ${p => (p.justifyContent ? p.justifyContent : 'initial')};
	align-items: ${p => (p.alignItems ? p.alignItems : 'initial')};
	margin: 0;
	margin-bottom: 1rem;
	padding-left: 1rem;

	&:nth-child(1) {
		width: 56px;
	}
	&:nth-child(2) {
		flex: 1;
	}
	&:last-child {
		width: 15rem;
	}
`;
