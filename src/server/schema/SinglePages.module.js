import { findOne, insertOne, updateOne } from 'server/lib/resolvers.js';

const SinglePagesModule = {
	typeDefs: `
		type SinglePage inherits Document {
			housingCooperativeId: ID
			name: String
			content: String
			contentTwo: String
			policyId: String
			housingcooperative: String,
			units: String,
			plotNumberOne: String,
			plotNumberTwo: String,
			address: String,
			zipCode: String,
			buildYear: String,
			buildMaterials: String
		}

		extend type Query {
			findOneSinglePage(
				housingCooperativeId: ID!
				name: String!
			): SinglePage @auth(scope:"singlePages:read")
		}

		extend type Mutation {
			insertOneSinglePage(
				housingCooperativeId: ID!
				name: String!
				content: String
				contentTwo: String
				policyId: String
				housingcooperative: String,
				units: String,
				plotNumberOne: String,
				plotNumberTwo: String,
				address: String,
				zipCode: String,
				buildYear: String,
				buildMaterials: String
			): SinglePage @auth(scope:"singlePages:write")

			updateOneSinglePage(
				_id: ID!
				housingCooperativeId: ID!
				name: String!
				content: String
				contentTwo: String
				policyId: String
				housingcooperative: String,
				units: String,
				plotNumberOne: String,
				plotNumberTwo: String,
				address: String,
				zipCode: String,
				buildYear: String,
				buildMaterials: String
			): SinglePage @auth(scope:"singlePages:write")
		}
	`,
	resolvers: {
		Query: {
			findOneSinglePage: findOne('SinglePages'),
		},
		Mutation: {
			insertOneSinglePage: insertOne('SinglePages'),
			updateOneSinglePage: updateOne('SinglePages'),
		},
	},
};

export default SinglePagesModule;
