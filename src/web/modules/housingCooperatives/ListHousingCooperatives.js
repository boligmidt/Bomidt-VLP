import React, { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { GET_HOUSINGCOOPERATIVES } from 'api/HousingCooperatives';
import Layout from 'components/layout/Layout';
import { AddButton } from 'components/general/Buttons';
import PageHeader from 'components/general/PageHeader';
import Loading from 'components/general/Loading';
import {
	List,
	ListHeader,
	HeaderTitle,
	ListBody,
	ListItem,
	Specs,
	Spec,
} from 'components/general/Lists';
import { useAppContext } from 'web/lib/AppProvider';
import { useWindowDimensions } from 'web/styles/breakpoints';

export default function ListHousingCooperatives({ history }) {
	const { search } = useAppContext();
	const { width } = useWindowDimensions();

	const {
		data: { housingCooperatives = null } = {},
		loading,
		error,
		refetch,
	} = useQuery(GET_HOUSINGCOOPERATIVES, {
		variables: {
			search,
		},
	});

	useEffect(() => {
		refetch();
	}, [search]);

	if (loading) return <Loading />;
	if (error) return <p>{error}</p>;

	return (
		<Layout hasSearch>
			<PageHeader>Boligselskap</PageHeader>
			<List>
				<ListHeader>
					{width >= 1024 && (
						<HeaderTitle
							span="1"
							textAlign="center"
							paddingLeft="0">
							Indeks
						</HeaderTitle>
					)}
					<HeaderTitle span="6">Boligselskap</HeaderTitle>
					{width >= 1024 && (
						<>
							<HeaderTitle span="6">E-post</HeaderTitle>
							<HeaderTitle span="6">Telefon</HeaderTitle>
						</>
					)}
				</ListHeader>
				<ListBody>
					{housingCooperatives &&
						housingCooperatives.items.map((item, index) => {
							return (
								<ListItem key={item._id}>
									<Specs
										onClick={() =>
											history.push(
												`boligselskap/${item._id}/update`
											)
										}>
										{width >= 1024 && (
											<Spec
												maxWidth="5rem"
												textAlign="center"
												paddingLeft="0">
												{index + 1}
											</Spec>
										)}
										<Spec border={width >= 1024}>
											{item.title}
										</Spec>
										{width >= 1024 && (
											<>
												<Spec border={true}>
													{item.email}
												</Spec>
												<Spec border={true}>
													{item.mobile
														? item.mobile
														: item.phone}
												</Spec>
											</>
										)}
									</Specs>
								</ListItem>
							);
						})}
				</ListBody>
			</List>
			<AddButton onClick={() => history.push(`/boligselskap/create`)} />
		</Layout>
	);
}
