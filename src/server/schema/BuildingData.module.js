import {
	findOne,
	find,
	paginate,
	insertOne,
	updateOne,
	deleteOne,
} from 'server/lib/resolvers.js';

const BuildingDataModule = {
	typeDefs: `
	type BuildingData inherits Document {
		address: String
		category: String
		object: String
		amount: String
		housingCooperativeId: ID
	}

	extend type Query {
		findOneBuildingData(
			_id: ID!
		): BuildingData @auth(scope:"buildingData:read")

		findBuildingData(
			_id: ID
			housingCooperativeId: ID!
			skip: Int
			limit: Int
			search: String
			order: Int
			orderBy: String
		): Find<BuildingData> @auth(scope:"buildingData:read")

		paginateBuildingData(
			housingCooperativeId: ID!
			skip: Int
			limit: Int
			search: String
			order: Int
			orderBy: String
		): Paginate<BuildingData> @auth(scope:"buildingData:read")
	}

	extend type Mutation {
		insertOneBuildingData(
			housingCooperativeId: ID!
			address: String
			category: String
			object: String
			amount: String
		): BuildingData @auth(scope:"buildingData:write")

		updateOneBuildingData(
			_id: ID!
			housingCooperativeId: ID!
			address: String
			category: String
			object: String
			amount: String
		): BuildingData @auth(scope:"buildingData:write")

		deleteOneBuildingData(
			_id: ID!
		): Boolean @auth(scope:"buildingData:write")
	}
	`,
	resolvers: {
		Query: {
			findOneBuildingData: findOne('BuildingData'),
			findBuildingData: find('BuildingData'),
			paginateBuildingData: paginate('BuildingData'),
		},
		Mutation: {
			insertOneBuildingData: insertOne('BuildingData'),
			updateOneBuildingData: updateOne('BuildingData'),
			deleteOneBuildingData: deleteOne('BuildingData'),
		},
	},
};

export default BuildingDataModule;
