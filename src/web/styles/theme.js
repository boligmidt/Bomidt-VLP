const theme = {
	fontFamily: 'mr-eaves-xl-modern, sans-serif',
	fontWeights: {
		regular: 400,
		bold: 700,
	},
	letterSpace: '0.01em',
	lineHeights: {
		heading: '1.2',
		content: '1.6',
	},
	widths: {
		small: '400px',
		medium: '700px',
		large: '1000px',
	},
	colors: {
		white: '#FFFFFF',
		black: '#000000',
		turquoise: '#E5FAF2',
		lightGray: '#dcdcdc',
		gray: '#F5F7FC',
		darkGray: '#444444',
		pink: '#F06385',
		red: '#DB2424',
		lightBlue: '#A7BEFF',
		blue: '#4E67AB',
		orange: '#E8A72E',
		lightYellow: '#F9F5EA',
		yellow: '#EEDE4B',
		green: '#8BC34A',
		primary: '#4E67AB',
		heading: '#000000',
		content: '#000000',
		buttonBg: '#F06385',
		border: '#E7F5F8', //@todo: Change to turquoise?
		outline: '#F06385',
		link: '#4E67AB',
		linkHover: '#F06385',
		navLink: '#5374ba',
		navLinkActive: '#5c81bc',
	},
	graph: {
		low: '#F06385',
		medium: '#84CCB1',
		high: '#4E67AB',
	},
	remCalc: px => {
		let rem = px / 16;
		return `${rem.toFixed(3)} rem`;
	},
};

export default theme;
