import React from 'react';
import styled from 'styled-components';

const AngleIconWrapper = styled.svg`
	all: unset;
	display: block;
	margin-bottom: -.2rem;
	padding: 0;
	height: 1rem;
	width: 1rem;
	fill: ${p => p.color};
	transform: ${p => p.translate? `translate(${p.translate})` : undefined};

	&:first-child {
		padding-left: .5rem;
	}
`;

export const AngleUpIcon = (props) => {
	return (
		<AngleIconWrapper {...props}>
			<svg xmlns="http://www.w3.org/2000/svg" width="9" height="6" viewBox="0 0 9 6"><g><g opacity=".5"><path d="M.872 4.743a.432.432 0 0 0 0 .545c.13.155.323.155.452 0l3.439-4.151 3.31 4.15c.129.156.322.156.451 0a.432.432 0 0 0 0-.544L4.741.125z"/><path stroke="#000" strokeMiterlimit="50" strokeWidth=".3" d="M.872 4.743a.432.432 0 0 0 0 .545c.13.155.323.155.452 0l3.439-4.151v0l3.31 4.15c.129.156.322.156.451 0a.432.432 0 0 0 0-.544L4.741.125v0z"/></g></g></svg>
		</AngleIconWrapper>
	)
}

export const AngleDownIcon = (props) => {

	return (
		<AngleIconWrapper {...props}>
			<svg xmlns="http://www.w3.org/2000/svg" width="10" height="7" viewBox="0 0 10 7"><g><g opacity=".5"><path d="M8.896 1.812a.432.432 0 0 0 0-.544c-.129-.156-.322-.156-.451 0l-3.44 4.15-3.31-4.15c-.128-.156-.322-.156-.45 0a.432.432 0 0 0 0 .544L5.026 6.43z"/><path stroke="#000" strokeMiterlimit="50" strokeWidth=".3" d="M8.896 1.812a.432.432 0 0 0 0-.544c-.129-.156-.322-.156-.451 0l-3.44 4.15v0l-3.31-4.15c-.128-.156-.322-.156-.45 0a.432.432 0 0 0 0 .544L5.026 6.43v0z"/></g></g></svg>
			</AngleIconWrapper>

	)
}
