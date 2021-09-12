import styled from 'styled-components';
import { NavLink as Link } from 'react-router-dom';

export const NavLink = styled(Link)`
	color: ${p => p.theme.colors.white};
	background-color: ${p => p.theme.colors.navLink};
	align-items: center;
	width: 100%;
	cursor: pointer;
	display: flex;
	font-size: 1.25rem;
	text-decoration: none;
	line-height: 1.8;
	margin: 0;
 	${'' /* margin-bottom: 10px;  */}
	padding-left: 20px;
	padding-top: 10px;
	padding-bottom: 10px;
	${'' /* transition: color 0.5s; */}

	&.active {
		background-color: ${p => p.theme.colors.navLinkActive};
		color: ${p => p.theme.colors.white};
	}
	&:hover {
		color: ${p => p.theme.colors.white};
	}
`;

// border-left: ${p => `5px solid ${p.borderleft}` || `5px solid ${p.theme.colors.white}`}
// border: none;
export const NavButton = styled.button`
	all: unset;
	align-items: center;
	background-color: transparent;
	border-left: 5px solid ${p => p.theme.colors.white};
	border-left: ${p => `5px solid ${p.borderleft}`};
	color: ${p => p.color || p.theme.colors.blue};
	cursor: pointer;
	display: flex;
	font-size: 1.25rem;
	line-height: 1.8;
	height: 1.8em;
	margin-bottom: 10px;
	padding: 0 0 0 25px;
	${'' /* transition: color 0.5s; */}

	&:hover {
		${'' /* color: ${p => p.theme.colors.pink}; */}
	}
`;

export const NavIcon = styled.img`
	width: auto;
	height: 20px;
	margin-right: 15px;
	display: block;
`;
