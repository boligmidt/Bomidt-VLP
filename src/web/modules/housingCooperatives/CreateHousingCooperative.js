import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import {
	ADD_HOUSINGCOOPERATIVE,
	GET_HOUSINGCOOPERATIVES,
} from 'api/HousingCooperatives';
import { useAppContext } from 'web/lib/AppProvider';

import Layout from 'components/layout/Layout';
import Form from 'components/forms/Form';
import HousingCooperativeFields from './HousingCooperativeFields';
import PageHeader from 'components/general/PageHeader';

export default function CreateHousingCooperative({ history }) {
	const { isGlobalAdmin } = useAppContext();

	const [addHousingCooperative, { error, loading }] = useMutation(
		ADD_HOUSINGCOOPERATIVE
	);

	return (
		<Layout>
			<PageHeader>Opprett boligselskap</PageHeader>
			<Form
				onSubmit={values =>
					addHousingCooperative({
						variables: {
							showInMaintenance: true,
							...values,
						},
						refetchQueries: [{ query: GET_HOUSINGCOOPERATIVES }],
					})
				}
				isLoading={loading}
				error={error}
				history={history}
				onSuccess={() => {
					history.push('/boligselskap');
				}}>
				<HousingCooperativeFields isAdmin={isGlobalAdmin} />
			</Form>
		</Layout>
	);
}
