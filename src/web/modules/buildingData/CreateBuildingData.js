import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { useAppContext } from 'web/lib/AppProvider';
import { ADD_BUILDINGDATA, GET_BUILDINGDATA } from 'api/BuildingData';

import Layout from 'components/layout/Layout';
import Form from 'components/forms/Form';
import BuildingDataFields from './BuildingDataFields';
import PageHeader from 'components/general/PageHeader';

export default function CreateBuildingData({ history }) {
	const { isEditor, currentHousingCooperative } = useAppContext();

	const [addBuildingData, { error, loading }] = useMutation(
		ADD_BUILDINGDATA,
		{
			variables: {
				housingCooperativeId: currentHousingCooperative,
			},
			refetchQueries: [
				{
					query: GET_BUILDINGDATA,
					variables: {
						housingCooperativeId: currentHousingCooperative,
					},
				},
			],
		}
	);

	return (
		<Layout>
			<PageHeader>Ny byggdata</PageHeader>
			<Form
				onSubmit={values => addBuildingData({ variables: values })}
				isLoading={loading}
				error={error}
				history={history}
				onSuccess={() => history.push(`/byggningsdata`)}>
				<BuildingDataFields isAdmin={isEditor} isNew={true} />
			</Form>
		</Layout>
	);
}
