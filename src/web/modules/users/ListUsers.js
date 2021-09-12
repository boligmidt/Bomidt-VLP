import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_USERS, MIGRATE_USER } from 'api/Users';
import theme from 'web/styles/theme.js';

import {
	List,
	ListHeader,
	HeaderTitle,
	ListBody,
	ListItem,
	Specs,
	Spec,
} from 'components/general/Lists';
import Icon from 'components/general/Icon';
import Layout from 'components/layout/Layout';
import { AddButton } from 'components/general/Buttons';
import PageHeader from 'components/general/PageHeader';
import Loading from 'components/general/Loading';
import { useAppContext } from 'web/lib/AppProvider';
import { roleLabels } from './RolesSelect';
import { useWindowDimensions } from 'web/styles/breakpoints';

const LastSpec = styled(Spec)`
	display: flex;
	align-items: center;
	justify-content: flex-end;
`;

export default function ListUsers({ history }) {
	const {
		search,
		setImpersonate,
		impersonate,
		isGlobalAdmin,
		currentHousingCooperative,
	} = useAppContext();

	const { width } = useWindowDimensions();
	const { data: { users = null } = {}, loading, error, refetch } = useQuery(
		GET_USERS,
		{
			variables: {
				housingCooperativeId: currentHousingCooperative,
				search,
			},
		}
	);
	const [migrateOneUser] = useMutation(MIGRATE_USER);

	function getPositionLabel(position) {
		if (positionLabels.hasOwnProperty(position)) {
			return positionLabels[position];
		}
		return position;
	}

	function getRoles(roles) {
		if (!roles || !roles.length) return null;
		const returnRoles = roles.map(role => roleLabels[role.role]);
		return <div>{returnRoles.join(', ')}</div>;
	}

	useEffect(() => {
		refetch();
	}, [search]);

	if (error) return <p>{error}</p>;
	if (loading) return <Loading />;

	return (
		<Layout hasSearch>
			<PageHeader>Kontaktpersoner</PageHeader>
			<List>
				<ListHeader>
					<HeaderTitle>Navn</HeaderTitle>
					{width >= 768 && (
						<>
							<HeaderTitle>Stilling</HeaderTitle>
							<HeaderTitle>Rolle</HeaderTitle>
							<HeaderTitle />
						</>
					)}
				</ListHeader>

				<ListBody>
					{users &&
						users.items.map(item => {
							return (
								<ListItem key={item._id}>
									<Specs>
										<Spec>{item.name}</Spec>
										{width >= 768 && (
											<>
												<Spec border={true}>
													{getPositionLabel(
														item.position
													)}
												</Spec>
												<Spec border={true}>
													{getRoles(item.roles)}
												</Spec>
											</>
										)}
										<LastSpec>
											<Icon
												icon="user"
												size="md"
												cursor="pointer"
												onClick={() => {
													history.push(
														`/bruker/${item._id}/`
													);
												}}
											/>

											{isGlobalAdmin && (
												<Icon
													icon="fingerprint"
													size="md"
													color={
														impersonate &&
														impersonate.user._id ===
															item._id
															? theme.colors.red
															: theme.colors
																	.darkGray
													}
													cursor="pointer"
													onClick={() => {
														setImpersonate({
															action: 'set',
															data: item,
														});
													}}
												/>
											)}

											{isGlobalAdmin && (
												<Icon
													icon="link"
													size="md"
													color={
														item.auth0Id
															? theme.colors
																	.darkGray
															: theme.colors.red
													}
													cursor="pointer"
													onClick={async () => {
														if (item.auth0Id) {
															return;
														}

														await migrateOneUser({
															variables: {
																_id: item._id,
															},
														});

														refetch();
													}}
												/>
											)}
										</LastSpec>
									</Specs>
								</ListItem>
							);
						})}
				</ListBody>
			</List>
			<AddButton onClick={() => history.push(`/bruker/ny/`)} />
		</Layout>
	);
}

const positionLabels = {
	chairman: 'Styreleder',
	hseAdvisor: 'HMS-rådgiver',
	boardMember: 'Styremedlem',
	surveyor: 'Takstman',
	contact: 'Kontakt',
	janitor: 'Vaktmester',
	cleaner: 'Renholder',
	extraHelp: 'Ekstrahjelp',
	other: 'Andre',
	supplier: 'Leverandør',
	voluntaryWorkLeader: 'Dugnadsleder',
	deputy: 'Varamedlem',
	hseResponsible: 'HMS-ansvarlig',
	fireChief: 'Brannvernleder',
	ceo: 'Daglig leder',
	constructionEngineer: 'Byggingeniør',
	technicalAdvisor: 'Teknisk rådgiver',
	technicalManager: 'Teknisk sjef',
	operationEngineer: 'Driftstekniker',
};
