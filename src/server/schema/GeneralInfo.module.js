import { findOne, insertOne, updateOne } from 'server/lib/resolvers.js';

const GeneralInfoModule = {
	typeDefs: `
		type GeneralInfo inherits Document {
			housingCooperativeId: ID!
			housingcooperative: String
			name: String!
			policyId: String
			units: String
			plotNumberOne: String
			plotNumberTwo: String
			address: String
			zipCode: String
			buildYear: String
			buildMaterials: String
			conclusionContent: String
			generalContent: String
			costContent: String
			plotSize: String
			plotSizeBTA: String
			apartmentUnits: String
			inspectionDate: String
			responsible: String
		}

		extend type Query {
			findGeneralInfo(
				_id: ID
				name: String!
				housingCooperativeId: ID
				policyId: String
			): GeneralInfo @auth(scope:"generalInfo:read")
		}

		extend type Mutation {
			insertGeneralInfo (
				housingCooperativeId: ID!
				housingcooperative: String
				name: String!
				policyId: String
				units: String
				plotNumberOne: String
				plotNumberTwo: String
				address: String
				zipCode: String
				buildYear: String
				buildMaterials: String
				conclusionContent: String
				generalContent: String
				costContent: String
				plotSize: String
				plotSizeBTA: String
				apartmentUnits: String
				inspectionDate: String
				responsible: String
			): GeneralInfo @auth(scope:"generalInfo:write")

			updateGeneralInfo (
				_id: ID!
				housingCooperativeId: ID
				housingcooperative: String
				name: String!
				policyId: String
				units: String
				plotNumberOne: String
				plotNumberTwo: String
				address: String
				zipCode: String
				buildYear: String
				buildMaterials: String
				conclusionContent: String
				generalContent: String
				costContent: String
				plotSize: String
				plotSizeBTA: String
				apartmentUnits: String
				inspectionDate: String
				responsible: String
			): GeneralInfo @auth(scope:"generalInfo:write")
		}
	`,
	resolvers: {
		Query: {
			findGeneralInfo: findOne('SinglePages'),
		},
		Mutation: {
			insertGeneralInfo: insertOne('SinglePages'),
			updateGeneralInfo: updateOne('SinglePages'),
		},
	},
};

export default GeneralInfoModule;
