import gql from 'graphql-tag';

export const ADD_BUILDINGDATA = gql`
	mutation addBuildingData(
		$address: String
		$category: String
		$object: String
		$amount: String
		$housingCooperativeId: ID!
	) {
		insertOneBuildingData(
			address: $address
			category: $category
			object: $object
			amount: $amount
			housingCooperativeId: $housingCooperativeId
		) {
			_id
			address
			category
			object
			amount
			housingCooperativeId
		}
	}
`;

export const GET_ONE_BUILDINGDATA = gql`
	query getBuildingData($_id: ID!) {
		item: findOneBuildingData(_id: $_id) {
			_id
			address
			category
			object
			amount
			housingCooperativeId
		}
	}
`;

export const GET_BUILDINGDATA = gql`
	query findBuildingData($housingCooperativeId: ID!) {
		items: findBuildingData(housingCooperativeId: $housingCooperativeId) {
			items {
				_id
				address
				category
				object
				amount
				housingCooperativeId
			}
		}
	}
`;

export const UPDATE_BUILDINGDATA = gql`
	mutation updateBuildingData(
		$_id: ID!
		$address: String
		$category: String
		$object: String
		$amount: String
		$housingCooperativeId: ID!
	) {
		updateOneBuildingData(
			_id: $_id
			address: $address
			category: $category
			object: $object
			amount: $amount
			housingCooperativeId: $housingCooperativeId
		) {
			_id
			address
			category
			object
			amount
			housingCooperativeId
		}
	}
`;

export const DELETE_BUILDINGDATA = gql`
	mutation deleteBuildingData($_id: ID!) {
		success: deleteOneBuildingData(_id: $_id)
	}
`;
