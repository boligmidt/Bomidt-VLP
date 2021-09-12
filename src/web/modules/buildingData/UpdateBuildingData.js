import React from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import {
	GET_BUILDINGDATA,
	GET_ONE_BUILDINGDATA,
	UPDATE_BUILDINGDATA,
	DELETE_BUILDINGDATA,
} from 'api/BuildingData';
import { useAppContext } from 'web/lib/AppProvider';

import Layout from 'components/layout/Layout';
import Form from 'components/forms/Form';
import PageHeader from 'components/general/PageHeader';
import BuildingDataFields from './BuildingDataFields';
import Loading from 'components/general/Loading';

export default function UpdateBuildingData({
	history,
	buildingDataId,
	housingCooperativeId,
}) {
	const { isEditor, currentHousingCooperative } = useAppContext();
	let { data: { item = null } = {}, loading, error } = useQuery(
		GET_ONE_BUILDINGDATA,
		{
			variables: {
				_id: buildingDataId,
				housingCooperativeId: housingCooperativeId,
			},
		}
	);
	const [
		updateBuildingData,
		{ error: mutationError, loading: mutationLoading },
	] = useMutation(UPDATE_BUILDINGDATA);

	const [deleteBuildingData] = useMutation(DELETE_BUILDINGDATA);

	async function onDeleteClick() {
		try {
			await deleteBuildingData({
				variables: { _id: buildingDataId },
				refetchQueries: [
					{
						query: GET_BUILDINGDATA,
						variables: {
							housingCooperativeId: currentHousingCooperative,
						},
					},
				],
			});

			history.push('/byggningsdata');
		} catch (error) {
			console.log(error);
		}
	}

	if (loading || mutationLoading) return <Loading />;
	if (error || mutationError) return <p>Error</p>;

	return (
		<Layout>
			<PageHeader>Oppdater byggdata</PageHeader>
			<Form
				values={item}
				onSubmit={values => {
					updateBuildingData({ variables: values });
				}}
				onSuccess={() => history.push(`/byggningsdata`)}
				isLoading={loading}
				error={error}>
				<BuildingDataFields
					isAdmin={isEditor}
					onDeleteClick={onDeleteClick}
				/>
			</Form>
		</Layout>
	);
}
