import {
	findOne,
	find,
	paginate,
	insertOne,
	updateOne,
	deleteOne,
} from 'server/lib/resolvers.js';

const HousingCooperativesModule = {
	typeDefs: `
	type HousingCooperative inherits Document {
		title: String
		department: String
		address: String
		postalNumber: String
		postalCity: String
		mobile: String
		phone: String
		email: String
		hasEmployees: Boolean
		caretakersCount: Int
		extraHelpCount: Int
		othersCount: Int
		cleanersCount: Int
		ownersCount: Int
		showInMaintenance: Boolean
	}

	extend type Query {
		findOneHousingCooperative(
			_id: ID!
		): HousingCooperative @auth(scope:"housingCooperatives:read")

		findHousingCooperatives(
			skip: Int
			limit: Int
			search: String
			order: Int
			orderBy: String
		): Find<HousingCooperative> @auth(scope:"housingCooperatives:read")

		paginateHousingCooperatives(
			skip: Int
			limit: Int
			search: String
			order: Int
			orderBy: String
		): Paginate<HousingCooperative> @auth(scope:"housingCooperatives:read")
	}
	extend type Mutation {
		insertOneHousingCooperative(
			title: String
			department: String
			address: String
			postalNumber: String
			postalCity: String
			mobile: String
			phone: String
			email: String
			hasEmployees: Boolean
			caretakersCount: Int
			extraHelpCount: Int
			othersCount: Int
			cleanersCount: Int
			showInMaintenance: Boolean
		): HousingCooperative @auth(scope:"housingCooperatives:write")

		updateOneHousingCooperative(
			_id: ID!
			title: String
			department: String
			address: String
			postalNumber: String
			postalCity: String
			mobile: String
			phone: String
			email: String
			hasEmployees: Boolean
			caretakersCount: Int
			extraHelpCount: Int
			othersCount: Int
			cleanersCount: Int
			showInMaintenance: Boolean
		): HousingCooperative @auth(scope:"housingCooperatives:write")

		deleteOneHousingCooperative(
			_id: ID!
		): Boolean @auth(scope:"housingCooperatives:write")
	}
	`,
	resolvers: {
		Query: {
			findOneHousingCooperative: findOne('HousingCooperatives'),
			findHousingCooperatives: find('HousingCooperatives', {
				transformQuery: async (
					_,
					args,
					{ search, ...query },
					context
				) => {
					query.showInMaintenance = true;

					if (!query.isDeleted) {
						query.isDeleted = {
							$ne: true,
						};
					}

					if (search) {
						query['$or'] = [
							{ name: new RegExp(search, 'gi') },
							{ objectType: new RegExp(search, 'gi') },
							{ address: new RegExp(search, 'gi') },
						];

						delete query['$text'];
					}

					return query;
				},
			}),
			paginateHousingCooperatives: paginate('HousingCooperatives', {
				transformQuery: async (_, args, query, context) => {
					query.showInMaintenance = true;

					return query;
				},
			}),
		},
		Mutation: {
			insertOneHousingCooperative: insertOne('HousingCooperatives'),
			updateOneHousingCooperative: updateOne('HousingCooperatives'),
			deleteOneHousingCooperative: deleteOne('HousingCooperatives'),
		},
	},
};

export default HousingCooperativesModule;
