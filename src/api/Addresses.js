import gql from 'graphql-tag';

export const GET_HOUSINGCOOPERATIVE_ADDRESSES = gql`
	query getHousingCooperativeAddressses($housingCooperativeId: ID!) {
		addresses: findAddressesByHousingCooperativeId(
			housingCooperativeId: $housingCooperativeId
		) {
			value: _id
			label: name
		}
	}
`;

export const CREATE_ADDRESS = gql`
	mutation insertOneAddress($housingCooperativeId: ID!, $name: String!) {
		insertOneAddress(
			housingCooperativeId: $housingCooperativeId
			name: $name
		) {
			_id
		}
	}
`;

export const DUPLICATE_ADDRESS = gql`
	mutation duplicateAddress($fromAddress: ID!, $toAddress: ID!) {
		duplicateAddress(fromAddress: $fromAddress, toAddress: $toAddress)
	}
`;

export const UPDATE_ADDRESS = gql`
	mutation updateOneAddress($_id: ID!, $name: String!) {
		updateOneAddress(_id: $_id, name: $name) {
			_id
		}
	}
`;

export const DELETE_ADDRESS = gql`
	mutation deleteOneAddress($_id: ID!) {
		deleteOneAddress(_id: $_id)
	}
`;
