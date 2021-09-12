import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';

import {
	ADD_USER,
	GET_USER,
	UPDATE_USER,
	GET_USERS,
	DELETE_USER,
} from 'api/Users';
import { GET_HOUSINGCOOPERATIVES } from 'api/HousingCooperatives';
import { useAppContext } from 'web/lib/AppProvider';

import Layout from 'components/layout/Layout';
import PageHeader from 'components/general/PageHeader';
import Loading from 'components/general/Loading';
import UserForm from './UserForm';

export default function User({ history, userId }) {
	const { isGlobalAdmin, user: currentUser } = useAppContext();

	const { data: { user = null } = {}, loading, error } = useQuery(GET_USER, {
		skip: !userId,
		variables: { _id: userId },
	});

	const [
		updateUser,
		{ error: updateError, loading: updateLoading },
	] = useMutation(UPDATE_USER);

	const [
		createUser,
		{ error: createError, loading: createLoading },
	] = useMutation(ADD_USER);

	const [
		deleteUser,
		{ error: deleteError, loading: deleteLoading },
	] = useMutation(DELETE_USER);

	const {
		data: { housingCooperatives } = {},
		error: housingCooperativesError,
		loading: housingCooperativesLoading,
	} = useQuery(GET_HOUSINGCOOPERATIVES);

	async function onSubmitForm(event) {
		event.preventDefault();

		let values = {};

		Object.keys(event.target).forEach(key => {
			let name = event.target[key].name;
			let value = event.target[key].value;

			if (name === 'roles') {
				let roles = JSON.parse(value);
				value = roles.map(role => ({
					housingCooperativeId: role.housingCooperative.value,
					role: role.role.value,
				}));
			}

			values[name] = value;
		});

		if (!values.name || !values.email || !values.roles.length) {
			alert('Navn, e-post og roller er påkrevd.');
			return;
		}

		if (userId) {
			try {
				await updateUser({
					variables: { ...values, _id: userId },
				});
				history.push('/kontakter/');
			} catch (error) {
				console.log(error);
			}
		} else {
			try {
				await createUser({
					variables: { ...values },
				});

				history.push('/kontakter/');
			} catch (error) {
				console.log(error);
			}
		}
	}

	async function onDeleteUser() {
		if (!userId || !isGlobalAdmin) return;

		if (userId === currentUser._id) {
			alert('Du kan ikke slette din egen bruker');
			return;
		}

		try {
			await deleteUser({
				variables: { _id: userId, auth0Id: '', isDeleted: true },
				refetchQueries: [{ query: GET_USERS }],
			});

			history.push('/kontakter');
		} catch (error) {
			console.log(error, deleteError);
		}
	}

	if (loading || housingCooperativesLoading) return <Loading />;
	if (error || updateError || createError || housingCooperativesError)
		return <p>Error</p>;

	return (
		<Layout>
			<PageHeader>Rediger kontakt</PageHeader>

			<UserForm
				onSubmit={onSubmitForm}
				values={user ? user : undefined}
				isNew={!userId}
				hasValidEmail={
					user &&
					user.email &&
					!user.email.includes('@missingemail.com')
				}
				housingCooperatives={housingCooperatives.items}
				isAdmin={isGlobalAdmin}
				disabled={updateLoading || createLoading}
				onDeleteClick={onDeleteUser}
			/>
		</Layout>
	);
}
