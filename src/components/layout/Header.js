import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import { rgba } from 'polished';
import debounce from 'lodash/debounce';
import { useApolloClient } from '@apollo/react-hooks';

import SelectHousingCooperative, {
	StyledSelect,
} from 'components/general/SelectHousingCooperative';
import Icon from 'components/general/Icon';
import Select from 'components/general/Select';
import Impersonate from 'components/general/Impersonate';
import { useAppContext } from 'web/lib/AppProvider';
import theme from 'web/styles/theme';
import { GET_HOUSINGCOOPERATIVE_ADDRESSES } from 'api/Addresses';

const HeaderWrap = styled.header`
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
`;

const NavBarWrap = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1;
	padding: 10px;

	@media (min-width: 1023px) {
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}
`;

export const AddressSelectWrap = styled.div`
	margin: 15px;
	@media (min-width: 1023px) {
		margin: 0 15px;
		display: flex;
		justify-content: center;
		flex: 1;
	}
`;

const SearchWrap = styled.div`
	height: 38px;
	display: flex;
	align-items: center;
`;
const SearchInput = styled.input`
	background: transparent;
	border: none;
	color: ${p => p.theme.colors.blue};
	font-size: ${18 / 16}rem;
	font-weight: 700;
	width: 250px;
	height: 29px;
	border-bottom: 1px solid ${rgba('#26579e', 0.2)};
	outline: none;
`;
const SearchIcon = styled(Icon)``;

export default function Header({
	hasSearch = false,
	hasAddressSelect = false,
}) {
	const [addressOptions, setAddressOptions] = useState([]);
	const {
		search,
		setSearch,
		address,
		setAddress,
		searchFocus,
		setSearchFocus,
		currentHousingCooperative,
	} = useAppContext();

	const client = useApolloClient();

	useMemo(async () => {
		if (!hasAddressSelect || !currentHousingCooperative) return;

		let { data: { addresses = [] } = {} } = await client.query({
			query: GET_HOUSINGCOOPERATIVE_ADDRESSES,
			variables: {
				housingCooperativeId: currentHousingCooperative,
			},
		});

		setAddressOptions(addresses);
	}, [currentHousingCooperative]);

	const handleSearchOnChange = debounce(
		value => setSearch(value.trim()),
		500
	);

	return (
		<HeaderWrap>
			<NavBarWrap>
				<SelectHousingCooperative />

				{addressOptions && addressOptions.length ? (
					<AddressSelectWrap>
						<StyledSelect
							name="address"
							placeholder="Velg adresse"
							options={[
								{ label: 'Velg adresse', value: '' },
								...addressOptions,
							]}
							defaultValue={address}
							renderInput={false}
							onSelect={value => setAddress(value)}
						/>
					</AddressSelectWrap>
				) : null}

				{hasSearch && (
					<SearchWrap>
						<SearchIcon
							color={theme.colors.blue}
							icon="search"
							marginRight="0"
							fontSize="1rem"
							regular
						/>

						<SearchInput
							autoFocus={searchFocus}
							defaultValue={search}
							onFocus={() => setSearchFocus(true)}
							onBlur={() => setSearchFocus(false)}
							onChange={e => handleSearchOnChange(e.target.value)}
						/>
					</SearchWrap>
				)}

				<Impersonate />
			</NavBarWrap>
		</HeaderWrap>
	);
}
