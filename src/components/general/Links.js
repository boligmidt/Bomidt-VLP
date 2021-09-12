import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { darken } from 'polished';

import { breakpoints } from 'web/styles/breakpoints';

import plus from 'assets/icons/plus.svg';

export const LinkButton = styled(Link)`
	background-color: ${p => p.theme.colors.pink};
	color: ${p => p.theme.colors.white};
	cursor: pointer;
	display: inline-blocK;
	font-size: ${17 / 16}rem;
	text-decoration: none;
	line-height: 1;
	padding: 15px 30px;
	transition: background-color 0.5s;

	${breakpoints.large`
		font-size: ${20 / 16}rem;
	`};

	&:hover,
	&:active {
		background-color: ${p => darken(0.1, p.theme.colors.pink)};
		color: ${p => p.theme.colors.white};
	}
`;

export const AddLink = styled(Link)`
	background-image: url(${plus});
	background-repeat: no-repeat;
	background-size: 20px 20px;
	background-position: 50% 50%;
	background-color: ${p => p.theme.colors.pink};
	cursor: pointer;
	display: block;
	width: 45px;
	height: 45px;
	position: fixed;
	bottom: 40px;
	right: 40px;
	text-indent: -9999px;
	transition: background-color 0.5s;

	${breakpoints.large`
		right: 60px;
		bottom: 40px;
	`};

	&:hover,
	&:active {
		background-size: 22px 22px;
		background-color: ${p => darken(0.1, p.theme.colors.pink)};
	}
`;
