import { css } from 'styled-components';
import { useState, useEffect } from 'react';

function getWindowDimensions() {
	const { innerWidth: width, innerHeight: height } = window;
	return {
		width,
		height,
	};
}

export function useWindowDimensions() {
	const [windowDimensions, setWindowDimensions] = useState(
		getWindowDimensions()
	);

	// useEffect(() => {
	// 	function handleResize() {
	// 		setWindowDimensions(getWindowDimensions());
	// 	}

	// 	window.addEventListener('resize', handleResize);
	// 	return () => window.removeEventListener('resize', handleResize);
	// }, []);

	return windowDimensions;
}

export const breakpointSizes = {
	small: 0,
	medium: 640,
	large: 1100,
	xlarge: 1550,
	xxlarge: 1800,
};

export const breakpoints = Object.keys(breakpointSizes).reduce((acc, label) => {
	acc[label] = (...args) => css`
		@media (min-width: ${breakpointSizes[label] / 16}em) {
			${css(...args)};
		}
	`;

	return acc;
}, {});

export default breakpoints;
