import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import styled from 'styled-components';

import { Uploader } from 'components/general/Uploader';
import { Button } from 'components/general/Buttons';
import Layout from 'components/layout/Layout';
import PageHeader from 'components/general/PageHeader';
import Loading from 'components/general/Loading';
import { IconButton } from 'components/general/Buttons';
import Image from 'components/general/Image';

import {
	GET_SETTINGS,
	MIGRATE_DATA,
	CREATE_SETTING,
	UPDATE_SETTING,
} from 'api/Settings';

const Setting = styled.div`
	padding-bottom: 20px;
`;
const Input = styled.input`
	-webkit-appearance: none;
	-moz-appearance: none;
	appearance: none;
	background-color: ${p => p.theme.colors.white};
	border: 1px solid
		${p => (p.hasError ? p.theme.colors.red : p.theme.colors.border)};
	font-size: 1.2rem;
	height: 52px;
	padding: 14px 15px;
	width: 100%;
	margin-bottom: 20px;
`;

export default function SuperSettings() {
	const acceptedFormKeys = ['systemName'];
	const [disabled, setDisabled] = useState('');
	const { loading, error, data: settings = [], refetch } = useQuery(
		GET_SETTINGS
	);
	const [migrateData] = useMutation(MIGRATE_DATA);
	const [createSetting] = useMutation(CREATE_SETTING);
	const [updateSetting] = useMutation(UPDATE_SETTING);

	async function handleMigrationClick(name) {
		setDisabled(name);
		await migrateData({ variables: { name } });
		setDisabled('');

		refetch();
	}

	if (loading) return <Loading />;
	if (error) return <div>Error</div>;

	const { settings: { items = [] } = null } = settings;

	let completed = {};
	let systemSettings = {};

	items.forEach(setting => {
		completed[setting.name] = setting.isComplete;
		if (setting.name === 'systemSettings') {
			systemSettings = setting;
		}
	});

	async function handleFileUploadComplete({ data: file }) {
		if (systemSettings && systemSettings._id) {
			await updateSetting({
				variables: {
					_id: systemSettings._id,
					logoId: file._id,
					logoURL: file.fileUrl,
				},
			});
		} else {
			await createSetting({
				variables: {
					name: 'systemSettings',
					logoId: file._id,
					logoURL: file.fileUrl,
				},
			});
		}

		await refetch();
	}

	async function handleDeleteLogo() {
		if (!systemSettings || !systemSettings._id) return;

		await updateSetting({
			variables: {
				_id: systemSettings._id,
				logoId: null,
				logoURL: null,
			},
		});

		await refetch();
	}

	async function handleSubmitForm(values) {
		if (systemSettings && systemSettings._id) {
			await updateSetting({
				variables: {
					_id: systemSettings._id,
					...values,
				},
			});
		} else {
			await createSetting({
				variables: {
					name: 'systemSettings',
					...values,
				},
			});
		}

		await refetch();
	}

	return (
		<Layout>
			<PageHeader>Innstillinger</PageHeader>

			<Setting>
				<form
					onSubmit={e => {
						e.preventDefault();
						let values = {};

						Object.keys(event.target).forEach(key => {
							let name = event.target[key].name;
							let value = event.target[key].value;
							if (acceptedFormKeys.includes(name)) {
								values[name] = value || '';
							}
						});

						handleSubmitForm(values);
					}}>
					<Input
						name="systemName"
						placeholder="Systemnavn"
						defaultValue={
							systemSettings && systemSettings.systemName
						}
					/>
					<Button type="submit">Lagre</Button>
				</form>
			</Setting>

			{systemSettings.logoURL ? (
				<Setting>
					<h3>Logo</h3>
					<Image
						key={systemSettings.logoId}
						id={systemSettings.logoId}
						fileUrl={systemSettings.logoURL}
						dispatchFile={() => handleDeleteLogo()}
					/>
				</Setting>
			) : null}

			<Setting>
				<Uploader
					dispatch={file => {
						handleFileUploadComplete(file);
					}}
					housingCooperativeId="global"
					page="super-admin"
				/>
			</Setting>

			{!completed.users && (
				<Setting>
					<IconButton
						label="Migrer brukere"
						onClick={() => handleMigrationClick('users')}
						disabled={disabled === 'users'}
					/>
				</Setting>
			)}
			{!completed.singlePages && (
				<Setting>
					<IconButton
						label="Migrer sider"
						onClick={() => handleMigrationClick('singlePages')}
						disabled={disabled === 'singlePages'}
					/>
				</Setting>
			)}
			{!completed.activities && (
				<Setting>
					<IconButton
						label="Migrer aktivitetslogger"
						onClick={() => handleMigrationClick('activities')}
						disabled={disabled === 'activities'}
					/>
				</Setting>
			)}
			{!completed.categories && (
				<Setting>
					<IconButton
						label="Migrer kategorier"
						onClick={() => handleMigrationClick('categories')}
						disabled={disabled === 'categories'}
					/>
				</Setting>
			)}
			{!completed.assessments && (
				<Setting>
					<IconButton
						label="Migrer vurderinger"
						onClick={() => handleMigrationClick('assessments')}
						disabled={disabled === 'assessments'}
					/>
				</Setting>
			)}
			{!completed.addresses && (
				<Setting>
					<IconButton
						label="Migrer adresser"
						onClick={() => handleMigrationClick('addresses')}
						disabled={disabled === 'addresses'}
					/>
				</Setting>
			)}
			{!completed.assessmentDates && (
				<Setting>
					<IconButton
						label="Migrer vurderingsdatoer"
						onClick={() => handleMigrationClick('assessmentDates')}
						disabled={disabled === 'assessmentDates'}
					/>
				</Setting>
			)}

			{/* <Setting>
				<IconButton label="Importer data" />
			</Setting> */}
		</Layout>
	);
}
