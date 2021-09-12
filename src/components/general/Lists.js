import React from 'react';
import styled from 'styled-components';

export const List = styled.div`
	width: 100%;
	margin-top: 1em;
`;
export const ListHeader = styled.div`
	display: flex;
`;

export const SortButton = styled.button`
	all: unset;
	display: inline-flex;
	flex-direction: row;
	margin: 0;
	width: auto;
	flex-grow: 1;
	cursor: pointer;
	padding: 1rem;
	padding-right: 1rem;
	padding-bottom: 0.3rem;
	line-height: ${p => (p.lineHeight ? p.lineHeight : '1rem')};
	font-size: ${p => (p.fontSize ? p.fontSize : '1rem')};
`;

export const HeaderSpec = styled.div`
	display: inline-flex;
	flex-direction: row;
	margin: 0;
	cursor: pointer;
	padding: 1rem;
	padding-bottom: 0.3rem;
	font-size: ${p => (p.fontSize ? p.fontSize : '1rem')};
	line-height: ${p => (p.lineHeight ? p.lineHeight : '1rem')};
`;

// span = the fraction of the total width given to this particular HeaderTitle in relation to the other HeaderTitle entries in a HeaderSpec block
// padding-left: 2rem;
export const HeaderTitle = styled.div`
	display: inline-flex;
	flex-direction: row;
	padding-left: 1rem;
	padding: 1rem;
	padding-bottom: 0.3rem;
	flex: ${p => (p.span ? p.span : 1)};
	font-size: ${p => (p.fontSize ? p.fontSize : '1rem')};
	line-height: ${p => (p.lineHeight ? p.lineHeight : '1rem')};
	text-align: ${p => (p.textAlign ? p.textAlign : 'left')};
	cursor: ${p => (p.cursor ? p.cursor : undefined)};
	margin-bottom: 10px;
`;
export const ListBody = styled.div``;

export const Specs = styled.div`
	display: flex;
`;

// span = the fraction of the total width given to this particular Spec in relation to the other Spec entries in a Specs block
export const Spec = styled.div`
	text-align: ${p => (p.textAlign ? p.textAlign : undefined)};
	max-width: ${p => (p.maxWidth ? p.maxWidth : undefined)};
	margin: 0;
	padding-left: ${p => (p.paddingLeft ? p.paddingLeft : '1rem')};
	padding-top: 10px;
	padding-bottom: 10px;
	flex: ${p => (p.span ? p.span : 1)};
	background-color: ${p => p.theme.colors.white};
	border-left: ${p =>
		p.border ? `2px solid ${p.theme.colors.border}` : undefined};
`;

export const ListItem = styled.div`
	background: white;
	padding: 0.2rem;
	margin-bottom: ${p => (p.marginBottom ? p.marginBottom : '1rem')};
`;
