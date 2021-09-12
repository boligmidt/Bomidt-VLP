import React from 'react';
import styled from 'styled-components';

const SaveIconWrapper = styled.svg`
all: unset;
display: block;
margin: 0;
margin-bottom: -.2rem;
padding-left: 1rem;
padding-right: 1rem;
height: 1rem;
width: 1rem;
margin-right: ${p => p['margin-right'] || '0px'};
`;
// margin-top: -.5rem;

export const SaveIcon = () => {
	return (
		<SaveIconWrapper>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 14"><g><g><path fill="#4e67ab" d="M11.875 12.183h-8.75V9.558c0-.525.35-.875.875-.875h7c.525 0 .875.35.875.875zM10.738.196a.794.794 0 0 0-.613-.263H9.25v2.625c0 .525-.35.875-.875.875H4c-.525 0-.875-.35-.875-.875V-.067h-1.75C.85-.067.5.283.5.808v12.25c0 .525.35.875.875.875h12.25c.525 0 .875-.35.875-.875v-8.75a.794.794 0 0 0-.263-.612z"/></g><g><path fill="#4e67ab" d="M6.625 2.558V-.067h1.75v2.625z"/></g></g></svg>
		</SaveIconWrapper>
	)
}
