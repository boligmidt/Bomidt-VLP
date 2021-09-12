import React from 'react';
import styled from 'styled-components';

// margin-bottom: -.2rem;
const CheckboxIconWrapper = styled.svg`
all: unset;
display: block;
margin-bottom: -.2rem;
padding-left: 1rem;
padding-right: 1rem;
height: 1rem;
width: 1rem;
fill: ${p => p.theme.colors.red}
`;

export const CheckBox = ({ checked }) => {
	if (checked) {
		return (
			<CheckboxIconWrapper>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25"><defs><clipPath id="xa8ra"><path fill="#fff" d="M0 0h25v25H0z"/></clipPath><clipPath id="xa8rb"><path fill="#fff" d="M0 25V0h25v25z"/></clipPath></defs><g><g><path fill="#f06385" d="M0 0h25v25H0z"/><path fill="none" stroke="#f06385" strokeMiterlimit="50" strokeWidth="4" d="M0 0v0h25v25H0v0z" clipPath="url(&quot;#xa8ra&quot;)"/></g><g><path fill="#f06385" d="M0 25V0h25v25z"/><path fill="none" stroke="#f06385" strokeMiterlimit="50" strokeWidth="4" d="M0 25v0V0v0h25v25z" clipPath="url(&quot;#xa8rb&quot;)"/></g><g opacity=".98"><path fill="#f9f5ea" d="M10.458 18.034l-6.3-6.3 1.278-1.279 5.022 4.931 8.31-8.31 1.278 1.28z"/></g></g></svg>
				</CheckboxIconWrapper>
		)
	}

	return (
		<CheckboxIconWrapper>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25"><defs><clipPath id="siq0a"><path fill="#fff" d="M0 25V0h25v25z"/></clipPath></defs><g><g><path fill="#fff" d="M0 25V0h25v25z"/><path fill="none" stroke="#f06385" strokeMiterlimit="50" strokeWidth="4" d="M0 25v0V0v0h25v25z" clipPath="url(&quot;#siq0a&quot;)"/></g></g></svg>
			</CheckboxIconWrapper>
	)
}
