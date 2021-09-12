import { createGlobalStyle } from 'styled-components';
import { normalize } from 'polished';

import { breakpoints } from './breakpoints';

const GlobalStyles = createGlobalStyle`
	${normalize()}

	html {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
		font-size: 100%;
	}

	*, *:before, *:after {
		box-sizing: inherit;
	}

	:focus {
		outline-width: 1px;
		outline-color: ${p => p.theme.outline};
	}

	body {
		color: ${p => p.theme.colors.content};
		font-family: ${p => p.theme.fontFamily};
		font-size: 1rem;
		letter-spacing: ${p => p.theme.letterSpace};
		line-height: ${p => p.theme.lineHeights.content};
		margin: 0;
		padding: 0;
		height: 100vh;
		overflow: hidden;
	}

	#app-root {
		height: 100%;
	}

	h1 {
		color: ${p => p.theme.colors.heading};
		font-size: ${35 / 16}rem;
		font-weight: ${p => p.theme.fontWeights.regular};
		line-height: ${p => p.theme.lineHeights.heading};
		margin: 0 0 25px 0;

		${breakpoints.large`
			font-size: ${50 / 16}rem;
		`};
	}

	h2 {
		color: ${p => p.theme.colors.heading};
		font-size: ${22 / 16}rem;
		font-weight: ${p => p.theme.fontWeights.regular};
		line-height: ${p => p.theme.lineHeights.heading};
		margin: 0 0 14px 0;

		${breakpoints.large`
		font-size: ${28 / 16}rem;
		`};
	}

	h3 {
		color: ${p => p.theme.colors.heading};
		font-size: ${17 / 16}rem;
		font-weight: ${p => p.theme.fontWeights.regular};
		line-height: ${p => p.theme.lineHeights.heading};
		margin: 0 0 10px 0;

		${breakpoints.large`
		font-size: ${20 / 16}rem;
		`};
	}

	p {
		margin: 0 0 10px 0;
	}

	a {
		color: ${p => p.theme.colors.link};
		transition: color 0.5s;

		&:hover,
		&:active {
		color: ${p => p.theme.colors.linkHover};
		}
	}
`;

export default GlobalStyles;
