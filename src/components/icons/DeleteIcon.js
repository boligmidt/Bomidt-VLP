import React from 'react';
import styled from 'styled-components';

const DeleteIconWrapper = styled.svg`
	all: unset;
	display: block;
	margin-bottom: ${p => p.marginBottom? p.marginBottom : undefined};
	padding-left: 1rem;
	padding-right: 1rem;
	height: ${p => p.size? p.size : '1rem'};
	width: ${p => p.size? p.size : '1rem'};
	fill: ${p => p.theme.colors.red}
`;

export const DeleteIcon = (props) => {
	return (
		<DeleteIconWrapper {...props}>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15"><g><g><g><path d="M10.778 12.188h-.937V7.03h.937zm-2.812 0h-.938V7.03h.938zm-2.813 0h-.937V7.03h.937zm-3.281-7.97v8.907A1.855 1.855 0 0 0 3.747 15h7.5a1.855 1.855 0 0 0 1.875-1.875V4.22z"/></g><g><path d="M5.622.938h3.75v1.406h-3.75zm4.687 1.406V.469A.469.469 0 0 0 9.841 0H5.153a.469.469 0 0 0-.469.469v1.875H.934a.469.469 0 1 0 0 .937H14.06a.469.469 0 1 0 0-.937z"/></g></g></g></svg>
		</DeleteIconWrapper>
	)
}
