import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';

import Logo from 'assets/images/logo.svg';

import NavigationModal from 'components/layout/NavigationModal';
import Navigation from 'components/layout/Navigation';
import { NavLink } from 'components/layout/NavigationElements';
import { AssesmentsIcon } from 'components/icons/NavIcons';
import Icon from 'components/general/Icon';
import { useAppContext } from 'web/lib/AppProvider';
import { GET_SYSTEM_SETTINGS } from 'api/Settings';
import { useWindowDimensions } from 'web/styles/breakpoints';

const StyledSidebar = styled.div`
	z-index: 99;
	overflow-y: visible;
	overflow-x: visible;
	transition: width 0.5s;
	position: absolute;
	width: ${p => (p.open ? '225px' : '100px')};
	top: 0;
	bottom: 0;
	left: 0;

	@media (min-width: 768px) {
		position: relative;
		height: 100%;
		width: ${p => (p.open ? '300px' : '100px')};
	}
`;

const SidebarInner = styled.aside`
	z-index: 10;
	position: relative;
	height: 100%;
	background-color: ${p => p.theme.colors.white};
	display: flex;
	flex-direction: column;
	padding: 60px 30px 30px 0;
`;

const Branding = styled.div`
	max-width: 120px;
	margin: 0 0 40px 30px;
`;

export const ExtLink = styled.a`
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

export default function Sidebar({ open }) {
	const [navigationModalOpen, setNavigationModalOpen] = useState(0);
	const { isGlobalAdmin } = useAppContext();
	const { loading, error, data } = useQuery(GET_SYSTEM_SETTINGS);
	const { width } = useWindowDimensions();

	if (loading || error) return null;

	return (
		<StyledSidebar open={open}>
			<SidebarInner>
				<Branding>
					<Link to="/">
						{data && data.settings && data.settings.logoURL ? (
							<img
								src={data.settings.logoURL}
								alt={data.settings.systemName || 'VLP'}
								style={{ maxWidth: '100%' }}
							/>
						) : data &&
						  data.settings &&
						  data.settings.systemName ? (
							<h2>
								{open && data.settings.systemName
									? data.settings.systemName
									: 'VLP'}
							</h2>
						) : (
							<Logo />
						)}
					</Link>
				</Branding>

				<Navigation
					setNavigationModalOpen={setNavigationModalOpen}
					navigationModalOpen={navigationModalOpen}
				/>
			</SidebarInner>

			{navigationModalOpen === 1 && (
				<NavigationModal
					open={open}
					closeModal={() => setNavigationModalOpen(0)}>
					{isGlobalAdmin && (
						<NavLink to="/boligselskap">
							<Icon icon="building" />
							Boligselskap
						</NavLink>
					)}

					<NavLink to="/kontakter">
						<Icon icon="address-card" />
						Kontaktpersoner
					</NavLink>

					{isGlobalAdmin && (
						<NavLink to="/generell-info">
							<Icon icon="users-cog" />
							Generell info
						</NavLink>
					)}

					<NavLink to="/tilstandsvurdering">
						<AssesmentsIcon />
						Tilstandsvurdering
					</NavLink>

					{isGlobalAdmin && (
						<NavLink to="/kategorier">
							<Icon icon="list-alt" />
							Kategorier
						</NavLink>
					)}

					{isGlobalAdmin && (
						<ExtLink
							href="http://www.kalkonline.no"
							target="_blank">
							<Icon icon="calculator-alt" />
							Kalkulasjon
						</ExtLink>
					)}
				</NavigationModal>
			)}

			{navigationModalOpen === 2 && (
				<NavigationModal
					open={open}
					closeModal={() => setNavigationModalOpen(0)}>
					<NavLink exact to="/">
						<Icon icon="clipboard-list-check" />
						Vedlikeholdsplan 10 år
					</NavLink>

					<NavLink to="/historikk">
						<Icon icon="history" />
						Historikk
					</NavLink>

					<NavLink to="/kostnadsoversikt">
						<Icon icon="chart-bar" />
						Kostnadsoversikt
					</NavLink>

					<NavLink to="/byggningsdata">
						<Icon icon="hammer" />
						Byggdata
					</NavLink>
				</NavigationModal>
			)}

			{navigationModalOpen === 3 && (
				<NavigationModal
					open={open}
					closeModal={() => setNavigationModalOpen(0)}>
					<NavLink to="/regler">
						<Icon icon="file-edit" />
						Tekniske forskrifter og tegninger
					</NavLink>

					<NavLink to="/vedlikehold">
						<Icon icon="id-badge" />
						Vedlikehold
					</NavLink>

					<NavLink to="/skjemaer">
						<Icon icon="ballot-check" />
						Skjema
					</NavLink>

					<NavLink to="/vedlikeholdsplikt">
						<Icon icon="paint-roller" />
						Lagets vedlikeholdsplikt
					</NavLink>

					<NavLink to="/avtaler">
						<Icon icon="calendar-plus" />
						Avtaler
					</NavLink>

					<NavLink to="/hjelp">
						<Icon icon="info-circle" />
						Hjelp / Kontaktinfo
					</NavLink>
				</NavigationModal>
			)}
		</StyledSidebar>
	);
}
