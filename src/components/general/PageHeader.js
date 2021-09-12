import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { breakpoints } from 'web/styles/breakpoints';

const Header = styled.div`
	margin-bottom: 40px;

	${breakpoints.large`
		margin-bottom: 60px;
	`};
`;

const Row = styled.div`
	align-items: center;
	display: flex;
	margin-bottom: 20px;
`;

const LeftColumn = styled.div`
	flex: 2;
`;

const RightColumn = styled.div`
	flex: 1;
	justify-content: flex-end;
`;

const PageTitle = styled.h1`
	color: ${p => p.theme.colors.primary};
	line-height: 1;
	margin: 0;
`;

export default function PageHeader({ children, description, rightColumn }) {
	return (
		<Header>
			<Row>
				<LeftColumn>
					<PageTitle>{children}</PageTitle>
				</LeftColumn>

				{rightColumn && <RightColumn>{rightColumn}</RightColumn>}
			</Row>
		</Header>
	);
}
