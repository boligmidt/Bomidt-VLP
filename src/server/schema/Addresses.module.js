import {
	findOne,
	insertOne,
	updateOne,
	deleteOne,
} from 'server/lib/resolvers.js';

const AddressesModule = {
	typeDefs: `
		type Address inherits Document {
			housingCooperativeId: ID!
			name: String!
		}

		extend type Query {
			findOneAddress(
				housingCooperativeId: ID!
				name: String!
			): Address @auth(scope:"addresses:read")

			findAddressesByHousingCooperativeId(
				housingCooperativeId: ID!
			): [Address] @auth(scope:"addresses:read")
		}

		extend type Mutation {
			insertOneAddress(
				housingCooperativeId: ID!
				name: String!
			): Address @auth(scope:"addresses:write")

			updateOneAddress(
				_id: ID!
				name: String!
			): Address @auth(scope:"addresses:write")

			duplicateAddress(
				fromAddress: ID!
				toAddress: ID!
			): Boolean @auth(scope:"addresses:write")

			deleteOneAddress(
				_id: ID!
			): Boolean @auth(scope:"addresses:write")
		}
	`,
	resolvers: {
		Query: {
			findOneAddress: findOne('Addresses'),
			findAddressesByHousingCooperativeId: async (
				_,
				{ housingCooperativeId },
				context
			) => {
				const { Addresses } = context;

				return await Addresses.find({
					housingCooperativeId,
					isDeleted: { $ne: true },
				})
					.sort({ name: 1 })
					.toArray();
			},
		},
		Mutation: {
			insertOneAddress: insertOne('Addresses'),
			updateOneAddress: updateOne('Addresses'),
			deleteOneAddress: deleteOne('Addresses'),
			duplicateAddress: async (
				_,
				{ fromAddress, toAddress, ...query },
				context
			) => {
				const { Assessments } = context;

				if (!query.isDeleted) {
					query.isDeleted = {
						$ne: true,
					};
				}

				query.address = fromAddress;

				const projection = {
					name: 1,
					description: 1,
					measure: 1,
					cost: 1,
					unitAmount: 1,
					dimensions: 1,
					objectType: 1,
					housingCooperativeId: 1,
					lifespan: 1,
					categoryId: 1,
					category: 1,
					groupKey: 1,
					groupOrder: 1,
					isActive: 1,
					isCompleted: 1,
					dueDate: 1,
					productionYear: 1,
					lastMaintained: 1,
				};

				const assessments = await Assessments.find(query)
					.project(projection)
					.toArray();

				if (!assessments) return false;

				assessments.map(assessment => {
					assessment.createdAt = new Date();
					assessment.isDeleted = false;
					assessment._id = context.uuid();
					assessment.address = toAddress;
					assessment.stateLevel = 'tgiu';
					if (context.user) {
						assessment.createdBy = context.user._id;
						assessment.createdByDisplayName = context.user.name;
					}

					return assessment;
				});

				await Assessments.insertMany(assessments);

				return true;
			},
		},
	},
};

export default AddressesModule;
