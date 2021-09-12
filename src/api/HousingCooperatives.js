import gql from 'graphql-tag';

export const GET_HOUSINGCOOPERATIVES = gql`
	query getHousingCooperatives($search: String) {
		housingCooperatives: findHousingCooperatives(search: $search) {
			items {
				_id
				title
				department
				address
				postalNumber
				postalCity
				mobile
				phone
				email
				hasEmployees
				caretakersCount
				extraHelpCount
				othersCount
				cleanersCount
				showInMaintenance
				value: _id
				label: title
			}
			count
		}
	}
`;

export const GET_HOUSINGCOOPERATIVE = gql`
	query getHousingCooperative($_id: ID!) {
		housingCooperative: findOneHousingCooperative(_id: $_id) {
			_id
			title
			department
			address
			postalNumber
			postalCity
			mobile
			phone
			email
			hasEmployees
			caretakersCount
			extraHelpCount
			othersCount
			cleanersCount
			showInMaintenance
		}
	}
`;

export const ADD_HOUSINGCOOPERATIVE = gql`
	mutation addHousingCooperative(
		$title: String
		$department: String
		$address: String
		$postalNumber: String
		$postalCity: String
		$mobile: String
		$phone: String
		$email: String
		$showInMaintenance: Boolean
	) {
		insertOneHousingCooperative(
			title: $title
			department: $department
			address: $address
			postalNumber: $postalNumber
			postalCity: $postalCity
			mobile: $mobile
			phone: $phone
			email: $email
			showInMaintenance: $showInMaintenance
		) {
			_id
			title
			department
			address
			postalNumber
			postalCity
			mobile
			phone
			email
			showInMaintenance
		}
	}
`;

export const UPDATE_HOUSINGCOOPERATIVE = gql`
	mutation updateHousingCooperative(
		$_id: ID!
		$title: String
		$department: String
		$address: String
		$postalNumber: String
		$postalCity: String
		$mobile: String
		$phone: String
		$email: String
		$showInMaintenance: Boolean
	) {
		updateOneHousingCooperative(
			_id: $_id
			title: $title
			department: $department
			address: $address
			postalNumber: $postalNumber
			postalCity: $postalCity
			mobile: $mobile
			phone: $phone
			email: $email
			showInMaintenance: $showInMaintenance
		) {
			_id
			title
			department
			address
			postalNumber
			postalCity
			mobile
			phone
			email
			showInMaintenance
		}
	}
`;

export const DELETE_HOUSINGCOOPERATIVE = gql`
	mutation deleteHousingCooperative($_id: ID!) {
		success: deleteOneHousingCooperative(_id: $_id)
	}
`;
