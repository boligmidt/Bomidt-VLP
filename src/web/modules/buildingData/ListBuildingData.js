import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_BUILDINGDATA } from 'api/BuildingData';
import styled from 'styled-components';

import { useAppContext } from 'web/lib/AppProvider';

import Layout from 'components/layout/Layout';
import PageHeader from 'components/general/PageHeader';
import { AddButton } from 'components/general/Buttons';
import Loading from 'components/general/Loading';
import {
	ListHeader,
	HeaderTitle,
	List,
	ListItem,
	Specs,
	Spec,
} from 'components/general/Lists';
import { useWindowDimensions } from 'web/styles/breakpoints';

const Wrapper = styled.div`
	margin-top: 1em;
`;

export default function ListBuildingData({ history }) {
	const { currentHousingCooperative, isEditor } = useAppContext();
	const { width } = useWindowDimensions();

	const { data: { items = null } = {}, loading, error } = useQuery(
		GET_BUILDINGDATA,
		{
			variables: {
				housingCooperativeId: currentHousingCooperative,
			},
		}
	);

	if (loading) return <Loading />;
	if (error) return <p>Error</p>;

	return (
		<Layout>
			<PageHeader>Byggdata</PageHeader>

			<List>
				<ListHeader>
					<HeaderTitle paddingLeft="0">Adresse</HeaderTitle>
					<HeaderTitle>Kategori</HeaderTitle>
					<HeaderTitle>Bygningsdel</HeaderTitle>
					<HeaderTitle>Mengde/Enheter</HeaderTitle>
				</ListHeader>

				{items &&
					items.items.map(item => {
						return (
							<Wrapper
								key={item._id}
								onClick={() =>
									history.push(
										`/byggningsdata/${item._id}/update`
									)
								}>
								<ListItem key={item._id}>
									<Specs>
										<Spec>{item.address}</Spec>
										<Spec>{item.category}</Spec>
										<Spec>{item.object}</Spec>
										<Spec>{item.amount}</Spec>
									</Specs>
								</ListItem>
							</Wrapper>
						);
					})}
			</List>

			{isEditor && (
				<AddButton
					onClick={() => history.push(`/byggningsdata/create`)}
				/>
			)}
		</Layout>
	);
}
