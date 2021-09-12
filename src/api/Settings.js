import gql from 'graphql-tag';

export const GET_SYSTEM_SETTINGS = gql`
	query findOneSetting {
		settings: findOneSetting(name: "systemSettings") {
			logoId
			logoURL
			systemName
		}
	}
`;

export const GET_SETTINGS = gql`
	query findSettings {
		settings: findSettings {
			items {
				_id
				name
				isComplete
				value
				logoId
				logoURL
				systemName
			}
		}
	}
`;

export const CREATE_SETTING = gql`
	mutation insertOneSetting(
		$name: String!
		$value: String
		$isComplete: Boolean
		$logoId: ID
		$logoURL: String
		$systemName: String
	) {
		insertOneSetting(
			name: $name
			value: $value
			isComplete: $isComplete
			logoId: $logoId
			logoURL: $logoURL
			systemName: $systemName
		) {
			_id
		}
	}
`;

export const UPDATE_SETTING = gql`
	mutation updateOneSetting(
		$_id: ID!
		$name: String
		$value: String
		$isComplete: Boolean
		$logoId: ID
		$logoURL: String
		$systemName: String
	) {
		updateOneSetting(
			_id: $_id
			name: $name
			value: $value
			isComplete: $isComplete
			logoId: $logoId
			logoURL: $logoURL
			systemName: $systemName
		) {
			_id
		}
	}
`;

export const DELETE_SETTING = gql`
	mutation deleteOneSetting($_id: ID!) {
		deleteOneSetting(_id: $_id)
	}
`;

export const MIGRATE_DATA = gql`
	mutation migrateData($name: String!) {
		migrateData(name: $name)
	}
`;
