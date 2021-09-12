import React from 'react';
import styled from 'styled-components';
import Checkmark from 'assets/icons/checkmark.svg';

const Wrapper = styled.div`
	background-color: ${p => (p.checked ? p.color : 'transparent')};
	background-size: 16px auto;
	background-repeat: no-repeat;
	background-position: 50%;
	border: 2px solid ${p => (p.checked ? p.color : p.theme.colors.lightGray)};
	cursor: pointer;
	margin-right: 8px;
	height: 24px;
	width: 24px;
`;

export default function CheckBox({ checked, color }) {
	return (
		<Wrapper checked={checked} color={color}>
			{checked && <Checkmark />}
		</Wrapper>
	);
}
