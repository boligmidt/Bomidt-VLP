import React from 'react';
import styled from 'styled-components';

const ToggleIconWrapper = styled.svg`
	all: unset;
	display: block;
	margin-top: -.5rem;
	padding-right: 2rem;
	height: 1rem;
	width: 1rem;
	margin-right: ${p => p['margin-right'] || '0px'};
`;

export const ToggleIsOnIcon = ({ style }) => {
	return (
		<ToggleIconWrapper {...style} ok={true} >
			<svg xmlns="http://www.w3.org/2000/svg" width="37" height="28" viewBox="0 0 37 28"><defs><mask id="yze9b" width="2" height="2" x="-1" y="-1"><path fill="#fff" d="M4 2h19v19H4z"/><path d="M4.513 11.145a9.145 9.145 0 1 1 18.29 0 9.145 9.145 0 0 1-18.29 0z"/></mask><filter id="yze9a" width="51" height="54" x="-12" y="-14" filterUnits="userSpaceOnUse"><feOffset dy="3" in="SourceGraphic" result="FeOffset1030Out"/><feGaussianBlur in="FeOffset1030Out" result="FeGaussianBlur1031Out" stdDeviation="2.4 2.4"/></filter></defs><g><g><g><path fill="#bed790" d="M9.085 11.373c0-3.315 3.315-6.63 6.63-6.63h14.632c3.315 0 6.63 3.315 6.63 6.63 0 3.316-3.315 6.63-6.63 6.63H15.715c-3.315 0-6.63-3.314-6.63-6.63z"/></g><g><g filter="url(#yze9a)"><path fill="none" d="M4.513 11.145a9.145 9.145 0 1 1 18.29 0 9.145 9.145 0 0 1-18.29 0z" mask="url(&quot;#yze9b&quot;)"/><path fillOpacity=".16" d="M4.513 11.145a9.145 9.145 0 1 1 18.29 0 9.145 9.145 0 0 1-18.29 0z"/></g><path fill="#f5f5f5" d="M4.513 11.145a9.145 9.145 0 1 1 18.29 0 9.145 9.145 0 0 1-18.29 0z"/></g></g></g></svg>
		</ToggleIconWrapper>
	)
};

export const ToggleIsOffIcon = ({ style }) => {
	return (
		<ToggleIconWrapper {...style} fill='red' >
			<svg xmlns="http://www.w3.org/2000/svg" width="37" height="28" viewBox="0 0 37 28"><defs><mask id="gd4rb" width="2" height="2" x="-1" y="-1"><path fill="#fff" d="M4 2h19v19H4z"/><path d="M4.513 11.145a9.145 9.145 0 1 1 18.29 0 9.145 9.145 0 0 1-18.29 0z"/></mask><filter id="gd4ra" width="51" height="54" x="-12" y="-14" filterUnits="userSpaceOnUse"><feOffset dy="3" in="SourceGraphic" result="FeOffset1057Out"/><feGaussianBlur in="FeOffset1057Out" result="FeGaussianBlur1058Out" stdDeviation="2.4 2.4"/></filter></defs><g><g><g><path fill="#bdbdbd" d="M9.085 11.373c0-3.315 3.315-6.63 6.63-6.63h14.632c3.315 0 6.63 3.315 6.63 6.63 0 3.316-3.315 6.63-6.63 6.63H15.715c-3.315 0-6.63-3.314-6.63-6.63z"/></g><g><g filter="url(#gd4ra)"><path fill="none" d="M4.513 11.145a9.145 9.145 0 1 1 18.29 0 9.145 9.145 0 0 1-18.29 0z" mask="url(&quot;#gd4rb&quot;)"/><path fillOpacity=".16" d="M4.513 11.145a9.145 9.145 0 1 1 18.29 0 9.145 9.145 0 0 1-18.29 0z"/></g><path fill="#f5f5f5" d="M4.513 11.145a9.145 9.145 0 1 1 18.29 0 9.145 9.145 0 0 1-18.29 0z"/></g></g></g></svg>
		</ToggleIconWrapper>
	)
};
