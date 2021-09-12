import gql from 'graphql-tag';

export const ADD_USER = gql`
	mutation createUser(
		$username: String
		$email: String!
		$name: String
		$address: String
		$postalNumber: String
		$postalCity: String
		$phone: String
		$position: String
		$roles: [RoleInput]
	) {
		insertOneUser(
			username: $username
			email: $email
			name: $name
			address: $address
			postalNumber: $postalNumber
			postalCity: $postalCity
			phone: $phone
			position: $position
			roles: $roles
		) {
			_id
			username
			email
			name
			address
			postalNumber
			postalCity
			phone
			position
			roles {
				housingCooperativeId
				role
			}
		}
	}
`;

export const UPDATE_USER = gql`
	mutation updateUser(
		$_id: ID!
		$username: String
		$name: String
		$address: String
		$postalNumber: String
		$postalCity: String
		$phone: String
		$position: String
		$roles: [RoleInput]
		$email: String
	) {
		updateOneUser(
			_id: $_id
			username: $username
			name: $name
			address: $address
			postalNumber: $postalNumber
			postalCity: $postalCity
			phone: $phone
			position: $position
			roles: $roles
			email: $email
		) {
			_id
			username
			email
			name
			address
			postalNumber
			postalCity
			phone
			position
			roles {
				housingCooperativeId
				role
			}
		}
	}
`;

export const GET_USERS = gql`
	query getUsers($housingCooperativeId: ID, $search: String) {
		users: findUsers(
			currentHousingCooperativeId: $housingCooperativeId
			search: $search
		) {
			items {
				_id
				username
				email
				name
				address
				postalNumber
				postalCity
				phone
				position
				notifyPhone
				notifyEmail
				auth0Id
				roles {
					housingCooperativeId
					role
				}
			}
			count
		}
	}
`;

export const GET_USER = gql`
	query getUser($_id: ID!) {
		user: findOneUser(_id: $_id) {
			_id
			username
			email
			name
			address
			postalNumber
			postalCity
			phone
			position
			notifyPhone
			notifyEmail
			auth0Id
			roles {
				housingCooperativeId
				role
			}
		}
	}
`;

export const DELETE_USER = gql`
	mutation updateOneUser($_id: ID!, $auth0Id: ID, $isDeleted: Boolean) {
		updateOneUser(_id: $_id, auth0Id: $auth0Id, isDeleted: $isDeleted) {
			_id
		}
	}
`;

export const MIGRATE_USER = gql`
	mutation migrateOneUser($_id: ID!) {
		migrateUser(_id: $_id)
	}
`;
