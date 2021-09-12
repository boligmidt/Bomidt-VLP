import React from 'react';
import styled, { keyframes } from 'styled-components';

/*
svg icons with css/onclick functionality.
keys:
style: prop with a style object for replacing the default values in the styled wrapper
*/

const NavIconWrapper = styled.svg`
all: unset;
display: block;
height: ${p => p.height || '1.5rem'};
width: ${p => p.width || '35px'};
margin-right: ${p => p['margin-right'] || '20px'};
fill: ${p => p.fill || p.theme.colors.blue};
stroke: ${p => (p.stroke ? p.stroke : '')};
transform: rotate(${p => p.rotate || '0deg'});
animation: ${p => p.animation} 0.5s 1 linear;
`;

export const ExitIcon = ({ style }) => {
	return (
		<NavIconWrapper {...style}>
			<svg
				fill="#4e67ab"
				viewBox="0 0 12.686 13.504"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path d="M3.045 10.05a.614.614 0 1 0 .868-.868L2.096 7.365h7.521a.614.614 0 0 0 0-1.228H2.096l1.817-1.815a.614.614 0 0 0-.868-.868L.181 6.318a.614.614 0 0 0 0 .868z" />
				<path d="M6.752.004a.614.614 0 0 0 0 1.228h4.706v11.044H6.752a.614.614 0 0 0 0 1.228h5.32a.614.614 0 0 0 .614-.614V.614A.614.614 0 0 0 12.072 0z" />
			</svg>
		</NavIconWrapper>
		)
	};


	const rotateLeft = keyframes`
	0% {transform:rotate(180deg);},
	100% {transform:rotate(0deg);}
	`;

	const rotateRight = keyframes`
	0% {transform:rotate(0deg);},
	100% {transform:rotate(180deg);}
	`;

	export const OpenNavIcon = ({ open, style }) => {
		return (
			<NavIconWrapper
				{...style}
				animation={open ? rotateLeft : rotateRight}
				rotate={open ? '0deg' : '180deg'}
			>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 16">
					<g>
						<g>
							<path
								fill="none"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeMiterlimit="50"
								strokeWidth="1.5"
								d="M17 8H1"
							/>
						</g>
						<g>
							<path
								fill="none"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeMiterlimit="50"
								strokeWidth="1.5"
								d="M18 15H8"
							/>
						</g>
						<g>
							<path
								fill="none"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeMiterlimit="50"
								strokeWidth="1.5"
								d="M18 1H8"
							/>
						</g>
						<g>
							<path
								fill="none"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeMiterlimit="50"
								strokeWidth="1.5"
								d="M4.708 11.91v0L1 8.202v0l3.708-3.707v0"
							/>
						</g>
					</g>
				</svg>
			</NavIconWrapper>
		);
	};

	export const AssesmentsIcon = ({ style }) => {
		return (
			<NavIconWrapper {...style}>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27 24">
					<g>
						<g>
							<path	fill="none" stroke="#f9f5ea" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="50" strokeWidth="1.5" d="M1 7.897h24.635" />
						</g>
						<g>
							<path	fill="none"	stroke="#f9f5ea" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="50" strokeWidth="1.5" d="M1 1.738h24.635"/>
						</g>
						<g>
							<path fill="none" stroke="#f9f5ea" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="50" strokeWidth="1.5" d="M1 15.288h11.779"/>
						</g>
						<g>
							<path fill="none" stroke="#f9f5ea" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="50" strokeWidth="1.5" d="M1.012 21.6h11.954"/>
						</g>
						<g>
							<path fill="none" stroke="#f9f5ea" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="50" strokeWidth="1.5" d="M20.4 13.517v9.161"/>
						</g>
						<g>
							<path fill="none" stroke="#f9f5ea" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="50" strokeWidth="1.5" d="M25.635 17.751h-9.161"/>
						</g>
					</g>
				</svg>
			</NavIconWrapper>
	)
}

export const ControllPanelIcon = ({ style }) => {
	return (
		<NavIconWrapper {...style}>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 16">
				<g>
					<g>
						<path fill="none" stroke="#4e67ab" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="50" d="M1 8v0-7 0h6v7z"/>
					</g>
					<g>
						<path fill="none" stroke="#4e67ab" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="50" d="M1 15v0-4 0h6v4z"/>
					</g>
					<g>
						<path fill="none" stroke="#4e67ab" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="50" d="M10 5v0-4 0h5v4z"/>
					</g>
					<g>
						<path fill="none" stroke="#4e67ab" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="50" d="M10 15v0-7 0h5v7z"/>
					</g>
				</g>
			</svg>
		</NavIconWrapper>
)};

export const InformationIcon = ({ style }) => {
	return (
		<NavIconWrapper {...style}>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 19">
				<g>
					<g>
						<g>
							<path fill="none" stroke="#4e67ab" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="50" d="M1 18.341v0-15 0h13v15z"/>
						</g>
						<g>
							<path fill="none" stroke="#4e67ab" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="50" d="M4 7.341h7"/>
						</g>
						<g>
							<path fill="none" stroke="#4e67ab" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="50" d="M4 11.341h7"/>
						</g>
						<g>
							<path fill="none" stroke="#4e67ab" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="50" d="M4 14.341h3"/>
						</g>
						<g>
							<path fill="none" stroke="#4e67ab" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="50" d="M3.167 1v0h13.295v15.607"/>
						</g>
					</g>
				</g>
			</svg>
		</NavIconWrapper>
)}
