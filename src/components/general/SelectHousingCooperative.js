import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_HOUSINGCOOPERATIVES } from 'api/HousingCooperatives';
import Select, { CurrentOption, IconWrap } from 'components/general/Select';
import styled from 'styled-components';
import { rgba } from 'polished';

import theme from 'web/styles/theme.js';
import Icon from 'components/general/Icon';
import { useAppContext } from 'web/lib/AppProvider';

const Wrapper = styled.div`
	display: flex;
	align-items: center;
`;

export const StyledSelect = styled(Select)`
	color: ${p => p.theme.colors.blue};
	font-size: ${18 / 16}rem;
	border-radius: 0;
	border: none;
	border-bottom: 1px solid ${rgba('#26579e', 0.2)};
	background-color: transparent;
	width: 250px;

	&:hover {
		border: none;
		border-bottom: 1px solid #26579e;
	}
	${CurrentOption} {
		padding: 0 35px 0 0;
		border: none;
	}

	${IconWrap} {
		top: 0;
		right: 0;
	}
`;

export default function SelectHousingCooperative() {
	const { data: { housingCooperatives } = {}, error, loading } = useQuery(
		GET_HOUSINGCOOPERATIVES
	);

	const {
		currentHousingCooperative,
		setCurrentHousingCooperative,
		impersonate,
		currentUser,
		isGlobalAdmin,
	} = useAppContext();

	if (error) {
		console.log(error);
		return <Wrapper>Ingen tilgjengelige</Wrapper>;
	}
	if (loading) {
		return null;
	}

	let filteredHousingCooperatives = [];
	if (isGlobalAdmin && filteredHousingCooperatives.length === 0) {
		filteredHousingCooperatives = housingCooperatives.items;
	}

	if (
		filteredHousingCooperatives.length === 0 &&
		housingCooperatives &&
		!isGlobalAdmin
	) {
		const roles = impersonate
			? impersonate.user.roles
			: currentUser.user.roles;

		housingCooperatives.items.map(item => {
			roles.map(role => {
				if (role.housingCooperativeId === item.value) {
					filteredHousingCooperatives.push(item);
				}
			});
		});
	}

	if (!currentHousingCooperative && filteredHousingCooperatives.length) {
		setCurrentHousingCooperative(filteredHousingCooperatives[0].value);
	}
	let isCurrentHousingCooperativeValid = false;

	if (currentHousingCooperative) {
		filteredHousingCooperatives.map(item => {
			if (currentHousingCooperative === item.value) {
				isCurrentHousingCooperativeValid = true;
			}
		});
	}
	if (
		!isCurrentHousingCooperativeValid &&
		filteredHousingCooperatives.length
	) {
		setCurrentHousingCooperative(filteredHousingCooperatives[0].value);
	}

	if (filteredHousingCooperatives.length) {
		filteredHousingCooperatives.sort(function(a, b) {
			if (a.title < b.title) {
				return -1;
			}
			if (a.title > b.title) {
				return 1;
			}
			return 0;
		});
	}

	return (
		<Wrapper>
			<Icon
				icon="building"
				color={theme.colors.blue}
				fontSize="1rem"
				marginRight="0"
				regular
			/>
			<StyledSelect
				placeholder="Velg borettslag"
				defaultValue={currentHousingCooperative || null}
				options={filteredHousingCooperatives || []}
				onSelect={value => setCurrentHousingCooperative(value)}
				renderInput={false}
				searchable
			/>
		</Wrapper>
	);
}
