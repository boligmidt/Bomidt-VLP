import React from 'react';
import styled from 'styled-components';

import { useAppContext } from 'web/lib/AppProvider';
import ScrollPane from 'components/layout/ScrollPane';
import Sidebar from 'components/layout/Sidebar';
import Header from 'components/layout/Header';
import { useWindowDimensions } from 'web/styles/breakpoints';

export const Container = styled.div`
	background-color: ${p => p.theme.colors.gray};
	position: relative;
	height: ${p => (p.height ? `${p.height}px` : '')};
`;

export const Main = styled(ScrollPane)`
	position: absolute;
	top: 0;
	bottom: 0;
	right: 0;
	transition: left 0.5s;
	left: 100px;

	@media (min-width: 768px) {
		left: ${p => (p.open ? '300px' : '100px')};
	}
`;

const Content = styled.div`
	padding: 30px 15px;
`;

export default function Layout({ children, hasSearch, hasAddressSelect }) {
	const {
		appData: { isSidebarOpen },
	} = useAppContext();

	const { height } = useWindowDimensions();

	return (
		<Container height={height}>
			<Sidebar open={isSidebarOpen} />

			<Main open={isSidebarOpen}>
				<Header
					hasSearch={hasSearch}
					hasAddressSelect={hasAddressSelect}
				/>

				<Content>{children}</Content>
			</Main>
		</Container>
	);
}
