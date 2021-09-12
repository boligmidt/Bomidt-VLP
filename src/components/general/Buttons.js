import React from 'react';
import styled from 'styled-components';
import { darken } from 'polished';

import { breakpoints } from 'web/styles/breakpoints';
import Icon from 'components/general/Icon';

const StyledButton = styled.button`
	font-family: ${p => p.theme.fontFamily};
	background: ${p => p.theme.colors.buttonBg};
	color: white;
	border: none;
	font-size: ${17 / 16}rem;
	font-weight: 700;
	letter-spacing: 0.2px;
	line-height: 50px;
	padding: 0 20px;
	transition: background-color 0.5s;
	cursor: pointer;
	height: 50px;

	${breakpoints.large`
		font-size: ${20 / 16}rem;
	`};

	&:hover,
	&:active {
		background-size: 22px 22px;
		background-color: ${p => darken(0.1, p.theme.colors.buttonBg)};
	}
`;

const PlusButton = styled.button`
	background-color: ${p => p.theme.colors.buttonBg};
	border: none;
	cursor: pointer;
	display: block;
	position: fixed;
	right: 20px;
	bottom: 20px;
	transition: background 0.5s;
	height: 45px;
	width: 45px;

	${breakpoints.large`
		right: 60px;
		bottom: 40px;
	`};

	&:hover,
	&:active {
		background-color: ${p => darken(0.1, p.theme.colors.buttonBg)};
	}
`;

export function AddButton(props) {
	return (
		<PlusButton {...props}>
			<Icon icon="plus" color="white" />
		</PlusButton>
	);
}

export function Button({ loading = false, children, ...rest }) {
	return (
		<StyledButton type="button" {...rest}>
			{loading ? '…' : children}
		</StyledButton>
	);
}

const StyledPrintButton = styled.button`
	background: ${p => p.theme.colors.blue};
	border: none;
	outline: none;
	display: flex;
	align-items: center;
	padding: 10px;
	width: 227px;
	cursor: pointer;
`;
const PrintLabel = styled.div`
	color: white;
	font-weight: 700;
`;

export function PrintButton({ onClick }) {
	return (
		<StyledPrintButton onClick={onClick}>
			<Icon icon="print" color="white" marginRight="10px" solid />
			<PrintLabel>Skriv ut alle</PrintLabel>
		</StyledPrintButton>
	);
}

const StyledIconButton = styled.button`
	display: flex;
	align-items: center;
	background: ${p =>
		p.backgroundColor ? p.backgroundColor : p.theme.colors.pink};
	border: 1px solid ${p => (p.borderColor ? p.borderColor : 'transparent')};
	color: ${p => (p.color ? p.color : 'white')};
	font-size: ${17 / 16}rem;
	font-weight: 700;
	letter-spacing: 0.2px;
	padding: 0 20px;
	transition: all 0.5s;
	cursor: pointer;
	height: 50px;
	width: ${p => (p.fullWidth ? '100%' : 'auto')};

	${breakpoints.large`
		font-size: ${20 / 16}rem;
	`};

	&:hover,
	&:active {
		background-color: ${p =>
			p.hoverBackgroundColor
				? darken(0.1, p.hoverBackgroundColor)
				: darken(0.1, p.theme.colors.pink)};
		border-color: ${p =>
			p.hoverBorderColor
				? darken(0.1, p.hoverBorderColor)
				: 'transparent'};
		color: ${p => (p.hoverColor ? p.hoverColor : p.color)};
	}
`;
const StyledLabel = styled.span``;

export function IconButton({
	label = '',
	iconProps = null,
	fullWidth = false,
	...rest
}) {
	return (
		<StyledIconButton fullWidth={fullWidth} {...rest}>
			{iconProps && (
				<span>
					<Icon marginRight="10px" {...iconProps} />
				</span>
			)}
			{label && <StyledLabel>{label}</StyledLabel>}
		</StyledIconButton>
	);
}
