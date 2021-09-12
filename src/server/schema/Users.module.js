import { findOne, find, paginate, updateOne } from 'server/lib/resolvers.js';
import AuthResolvers from 'server/lib/Auth.resolvers';

const UsersModule = {
	typeDefs: `
	type Role {
		housingCooperativeId: String!
		role: String!
	}

	input RoleInput {
		housingCooperativeId: String!
		role: String!
	}

	type User inherits Document {
		username: String
		email: String!
		auth0Id: ID
		name: String
		address: String
		postalNumber: String
		postalCity: String
		phone: String
		position: String
		notifyPhone: Boolean
		notifyEmail: Boolean
		roles: [Role]
	}

	extend type Query {
		findOneUser(
			_id: ID
			auth0Id: ID
		): User @auth(scope:"user:read")

		findOneUserRaw(
			auth0Id: ID!
		): User

		findUsers(
			skip: Int
			limit: Int
			search: String
			order: Int
			orderBy: String
			currentHousingCooperativeId: ID
		): Find<User> @auth(scope:"user:read")

		paginateUsers(
			skip: Int
			limit: Int
			search: String
			order: Int
			orderBy: String
		): Paginate<User>
	}

	extend type Mutation {
		insertOneUser(
			auth0Id: ID
			password: String
			username: String
			email: String!
			name: String
			address: String
			postalNumber: String
			postalCity: String
			phone: String
			position: String
			roles: [RoleInput]
			claims: [String]
		): User @auth(scope:"user:write")

		updateOneUser(
			_id: ID!
			username: String
			email: String
			name: String
			address: String
			postalNumber: String
			postalCity: String
			phone: String
			position: String
			auth0Id: ID
			roles: [RoleInput]
			claims: [String]
			isDeleted: Boolean
		): User @auth(scope:"user:write")

		deleteOneUser(
			_id: ID!
		): Boolean @auth(scope:"user:write")

		migrateUser(
			_id: ID!
		): Boolean
	}
	`,
	// @auth((scope: 'user:write'))
	resolvers: {
		Query: {
			findOneUser: findOne('Users'),
			findOneUserRaw: findOne('Users'),
			findUsers: find('Users', {
				transformQuery: async (
					_,
					args,
					{ search, currentHousingCooperativeId, ...query },
					context
				) => {
					if (!query.isDeleted) {
						query.isDeleted = {
							$ne: true,
						};
					}

					if (search) {
						query['$or'] = [
							{ name: new RegExp(search, 'gi') },
							{ username: new RegExp(search, 'gi') },
							{ email: new RegExp(search, 'gi') },
						];

						delete query['$text'];
					}

					if (currentHousingCooperativeId) {
						query.roles = {
							$elemMatch: {
								housingCooperativeId: {
									$in: ['*', currentHousingCooperativeId],
								},
							},
						};
					}

					return query;
				},
			}),
			paginateUsers: paginate('Users'),
		},
		Mutation: {
			insertOneUser: AuthResolvers.createUser(),
			updateOneUser: updateOne('Users'),
			deleteOneUser: AuthResolvers.deleteUser(),
			migrateUser: AuthResolvers.migrateUser(),
		},
	},
};

export default UsersModule;
