import React, { useState, useEffect } from 'react';
import Select from 'components/general/Select';
import styled from 'styled-components';
import Icon from 'components/general/Icon';

const RolesWrap = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	width: 100%;
`;
const Row = styled.div`
	display: flex;
	justify-content: space-between;
	margin: 0 -10px 20px;
`;
const Column = styled.div`
	flex: ${p => (p.flex ? p.flex : '1')};
	padding: 0 10px;
`;
const Cell = styled.div`
	background: white;
	padding: 10px;
`;
const Button = styled.button`
	border: none;
	background: ${p => (p.add ? p.theme.colors.green : p.theme.colors.red)};
	color: white;
	display: inline-block;
	padding: 5px 0;
	border-radius: 50px;
`;

export default function RolesSelect({ housingCooperatives, values }) {
	const [state, setState] = useState([]);
	const [currentHouse, setCurrentHouse] = useState(null);
	const [currentRole, setCurrentRole] = useState(null);
	const [iterate, setIterate] = useState(0);

	useEffect(() => {
		if (!values) return;

		let currentValues = [];

		values.map((role, i) => {
			let housingCooperative = housingCooperatives.find(
				item => item.value === role.housingCooperativeId
			);

			if (!housingCooperative) {
				housingCooperative = {
					value: '*',
					label: 'Global',
				};
			}

			currentValues.push({
				housingCooperative,
				role: {
					value: role.role,
					label: roleLabels[role.role],
				},
			});
		});

		setState(currentValues);
	}, [values]);

	function addRole(e) {
		e.preventDefault();
		e.stopPropagation();

		if (!currentHouse || !currentRole) return;

		let housingCooperative = housingCooperatives.find(
			item => item.value === currentHouse
		);

		let label = 'Global';
		if (housingCooperative) {
			label = housingCooperative.label;
		}

		state.push({
			housingCooperative: {
				value: currentHouse,
				label,
			},
			role: {
				value: currentRole,
				label: roleLabels[currentRole],
			},
		});

		setIterate(iterate + 1);
		setCurrentHouse(null);
		setCurrentRole(null);
		setState(state);
	}

	function removeRole(e, i) {
		e.preventDefault();
		e.stopPropagation();

		let updatedState = [...state];

		updatedState.splice(i, 1);
		setState(updatedState);
	}

	return (
		<RolesWrap>
			<Row>
				<Column>
					<strong>Borettslag</strong>
				</Column>
				<Column>
					<strong>Rolle</strong>
				</Column>
				<Column flex="0 0 110px">
					<strong>Legg til/fjern</strong>
				</Column>
			</Row>

			{state &&
				state.map((role, i) => {
					return (
						<Row key={`roleKey-${i}`}>
							<Column>
								<Cell>{role.housingCooperative.label}</Cell>
							</Column>
							<Column>
								<Cell>{role.role.label}</Cell>
							</Column>
							<Column flex="0 0 110px">
								<Button
									type="button"
									onClick={e => removeRole(e, i)}>
									<Icon
										icon="minus"
										solid="true"
										size="md"
										marginRight="0"
									/>
								</Button>
							</Column>
						</Row>
					);
				})}

			<Row>
				<Column>
					<Select
						key={`housingco-select-${iterate}`}
						name="housingCooperativeId"
						options={[
							{ value: '*', label: 'Global' },
							...housingCooperatives,
						]}
						placeholder="Velg borettslag"
						value={currentHouse}
						onSelect={value => setCurrentHouse(value)}
						renderInput={false}
					/>
				</Column>
				<Column>
					<Select
						key={`role-select-${iterate}`}
						name="role"
						options={roleOptions}
						placeholder="Velg rolle"
						value={currentRole}
						onSelect={value => setCurrentRole(value)}
						renderInput={false}
					/>
				</Column>
				<Column flex="0 0 110px">
					<Button type="button" onClick={e => addRole(e)} add>
						<Icon
							icon="plus"
							solid="true"
							size="md"
							marginRight="0"
						/>
					</Button>
				</Column>
			</Row>
			<input
				key={`role-input-${iterate}`}
				type="hidden"
				name="roles"
				value={JSON.stringify(state)}
			/>
		</RolesWrap>
	);
}

export const roleLabels = {
	admin: 'Superbruker',
	editor: 'Redaktør',
	user: 'Bruker',
	contact: 'Kontakt',
};

const roleOptions = [
	{
		value: 'admin',
		label: 'Superbruker',
	},
	{
		value: 'editor',
		label: 'Redaktør',
	},
	{
		value: 'user',
		label: 'Bruker',
	},
	{
		value: 'contact',
		label: 'Kontakt',
	},
];
