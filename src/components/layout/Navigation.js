import React from 'react';
import styled from 'styled-components';

import { useAuth0 } from 'web/lib/react-auth0-spa';
import { useAppContext } from 'web/lib/AppProvider';
import theme from 'web/styles/theme';
import { NavButton } from 'components/layout/NavigationElements';
import {
	ExitIcon,
	OpenNavIcon,
	ControllPanelIcon,
	InformationIcon,
} from 'components/icons/NavIcons';
import Icon from 'components/general/Icon';

const StyledNavigation = styled.nav`
	display: flex;
	flex-direction: column;
	flex: 1;
	position: relative;
`;

const NavigationLabel = styled.div``;

const Spacer = styled.div`
	flex-grow: 1;
`;

const Sep = styled.div`
	border-bottom: 1px solid ${p => p.theme.colors.turquoise};
	margin: 40px 0 20px 30px;
`;

const Bottom = styled.div`
	position: absolute;
	left: 0;
	bottom: 0;
	right: 0;
`;

export default function Navigation({
	setNavigationModalOpen,
	navigationModalOpen,
}) {
	const { logout } = useAuth0();
	const logoutWithRedirect = () =>
		logout({
			returnTo: window.location.origin,
		});

	const {
		appData: { isSidebarOpen },
		updateAppData,
		isEditor,
	} = useAppContext();

	return (
		<>
			<StyledNavigation>
				{isEditor ? (
					<NavButton
						color={
							navigationModalOpen === 1
								? theme.colors.red
								: undefined
						}
						borderleft={
							navigationModalOpen === 1 && theme.colors.red
						}
						onClick={() => setNavigationModalOpen(1)}>
						<Icon icon="user-lock" />
						{isSidebarOpen && (
							<NavigationLabel>Admin</NavigationLabel>
						)}
					</NavButton>
				) : null}
				<NavButton
					color={
						navigationModalOpen === 2 ? theme.colors.red : undefined
					}
					borderleft={navigationModalOpen === 2 && theme.colors.red}
					onClick={() => setNavigationModalOpen(2)}>
					<ControllPanelIcon />
					{isSidebarOpen && (
						<NavigationLabel>Kontrollpanel</NavigationLabel>
					)}
				</NavButton>
				<NavButton
					color={
						navigationModalOpen === 3 ? theme.colors.red : undefined
					}
					borderleft={navigationModalOpen === 3 && theme.colors.red}
					onClick={() => setNavigationModalOpen(3)}>
					<InformationIcon />
					{isSidebarOpen && (
						<NavigationLabel>Informasjon</NavigationLabel>
					)}
				</NavButton>

				<Bottom>
					<Sep />

					<NavButton onClick={() => logoutWithRedirect({})}>
						<ExitIcon
							style={{
								rotate: '180deg',
								fill: 'red',
							}}
						/>
						{isSidebarOpen && (
							<NavigationLabel>Logg ut</NavigationLabel>
						)}
					</NavButton>

					<NavButton
						onClick={() =>
							updateAppData({ isSidebarOpen: !isSidebarOpen })
						}>
						<OpenNavIcon
							open={isSidebarOpen}
							style={{ stroke: theme.colors.blue }}
						/>{' '}
						{isSidebarOpen && (
							<NavigationLabel>Skjul meny</NavigationLabel>
						)}
					</NavButton>
				</Bottom>
			</StyledNavigation>
		</>
	);
}
