import React from 'react';
import styled from 'styled-components';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { useAppContext } from 'web/lib/AppProvider';
import {
	GET_HOUSINGCOOPERATIVE,
	GET_HOUSINGCOOPERATIVES,
	UPDATE_HOUSINGCOOPERATIVE,
	DELETE_HOUSINGCOOPERATIVE,
} from 'api/HousingCooperatives';
import {
	GET_HOUSINGCOOPERATIVE_ADDRESSES,
	CREATE_ADDRESS,
	UPDATE_ADDRESS,
	DELETE_ADDRESS,
} from 'api/Addresses';

import Layout from 'components/layout/Layout';
import Form from 'components/forms/Form';
import PageHeader from 'components/general/PageHeader';
import HousingCooperativeFields from './HousingCooperativeFields';
import Loading from 'components/general/Loading';
import EditableInput from 'components/general/EditableInput';
import { DELETE_ASSESSMENT } from 'api/Assessments';

const Divider = styled.div`
	padding-bottom: 60px;
`;

export default function UpdateHousingCooperative({
	history,
	housingCooperativeId,
}) {
	const { isGlobalAdmin } = useAppContext();

	const {
		data: { housingCooperative = {} } = {},
		loading,
		error,
		refetch,
	} = useQuery(GET_HOUSINGCOOPERATIVE, {
		variables: { _id: housingCooperativeId },
	});

	const {
		data: { addresses = [] } = {},
		refetch: refetchAddresses,
	} = useQuery(GET_HOUSINGCOOPERATIVE_ADDRESSES, {
		variables: { housingCooperativeId },
	});

	const [
		updateHousingCooperative,
		{ error: mutationError, loading: mutationLoading },
	] = useMutation(UPDATE_HOUSINGCOOPERATIVE);

	const [deleteHousingCooperative] = useMutation(DELETE_HOUSINGCOOPERATIVE);

	const [updateAddress] = useMutation(UPDATE_ADDRESS);
	const [createAddress] = useMutation(CREATE_ADDRESS);
	const [deleteAddress] = useMutation(DELETE_ADDRESS);
	const [deleteAssessment] = useMutation(DELETE_ASSESSMENT);
	async function onDeleteHousingCooperative() {
		if (!confirm('Er du sikker?')) return;

		await deleteHousingCooperative({
			variables: { _id: housingCooperativeId },
			refetchQueries: [{ query: GET_HOUSINGCOOPERATIVES }],
		});

		history.push('/boligselskap');
	}

	async function onUpdateAddress(address) {
		if (address.name.length) {
			await updateAddress({
				variables: { ...address },
			});
		}
	}

	async function onCreateAddress(name) {
		if (name) {
			await createAddress({
				variables: { name, housingCooperativeId },
			});

			await refetchAddresses();
		}
	}

	async function onCreateAddress(name) {
		if (name) {
			await createAddress({
				variables: { name, housingCooperativeId },
			});

			await refetchAddresses();
		}
	}

	async function onDeleteAddress(_id) {
		if (!confirm('Er du sikker?')) return;

		await deleteAddress({
			variables: { _id },
		});
		let assessments = await Assessments.find(query)
		await refetchAddresses();
	}

	if (loading || mutationLoading) return <Loading />;
	if (error || mutationError) return <p>Error</p>;

	return (
		<Layout>
			<PageHeader>Boligselskap</PageHeader>
			<Form
				values={housingCooperative}
				onSubmit={values =>
					updateHousingCooperative({ variables: values })
				}
				onSuccess={() => history.push(`/boligselskap`)}
				isLoading={loading}
				error={error}>
				<HousingCooperativeFields
					isAdmin={isGlobalAdmin}
					onDeleteClick={onDeleteHousingCooperative}
					isEdit
				/>
			</Form>

			<Divider />

			<h2>Tilhørende adresser</h2>

			{addresses &&
				addresses.map(address => (
					<EditableInput
						key={address.value}
						defaultValue={address.label}
						onUpdateClick={name =>
							onUpdateAddress({ _id: address.value, name })
						}
						onDeleteClick={() => onDeleteAddress(address.value)}
					/>
				))}

			<EditableInput
				defaultValue="Ny adresse"
				onUpdateClick={onCreateAddress}
				isNew
			/>
		</Layout>
	);
}
