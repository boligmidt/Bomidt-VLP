import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { breakpoints } from 'web/styles/breakpoints';

const StyledTextArea = styled.div`
	background: white;
	padding: 15px 15px 15px 30px;
	font-size: ${17 / 16}rem;
	line-height: 1.5;
	margin-bottom: 20px;
	${breakpoints.large`
		font-size: ${20 / 16}rem;
	`};
`;

export default function TextArea({ innerHtml }) {
	if (!innerHtml) return null;

	return <StyledTextArea dangerouslySetInnerHTML={{ __html: innerHtml }} />;
}

TextArea.propTypes = {
	innerHtml: PropTypes.string,
};

TextArea.defaultProps = {
	innerHtml: null,
};
