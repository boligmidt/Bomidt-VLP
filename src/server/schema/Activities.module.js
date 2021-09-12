import {
	findOne,
	find,
	paginate,
	insertOne,
	updateOne,
	deleteOne,
} from 'server/lib/resolvers.js';

const ActivitiesModule = {
	typeDefs: `
	type Activity inherits Document {
		fileId: ID
		assessmentId: ID!
		type: String
		userName: String
		diff: JSON
		comment: String
		file: File
	}

	extend type Query {
		findOneActivity(
			_id: ID!
		): Activity @auth(scope:"activities:read")

		findActivities(
			assessmentId: ID!
			type: String
			limit: Int
			skip: Int
			search: String
			order: Int
			orderBy: String
		): Find<Activity> @auth(scope:"activities:read")

		getAssesmentActivities(
			assessmentId: ID!
		): [Activity] @auth(scope:"activities:read")

		paginateActivities(
			assessmentId: ID!
			limit: Int
			skip: Int
			search: String
			order: Int
			orderBy: String
		): Paginate<Activity> @auth(scope:"activities:read")
	}

	extend type Mutation {
		insertOneActivity(
			assessmentId: ID!
			type: String
			userName: String
			diff: JSON
			fileId: ID
			comment: String
		): Activity @auth(scope:"activities:write")

		updateOneActivity(
			_id: ID!
			assessmentId: ID!
			type: String
			userName: String
			diff: JSON
			fileId: ID
		): Activity @auth(scope:"activities:write")

		deleteOneActivity(
			_id: ID!
		): Boolean @auth(scope:"activities:write")
	}
	`,
	resolvers: {
		Query: {
			findOneActivity: findOne('Activities'),
			findActivities: find('Activities'),
			getAssesmentActivities: async (_, query, context, model) => {
				let activities = await context.Activities.find({
					assessmentId: query.assessmentId,
				})
					.sort({ createdAt: -1 })
					.toArray();

				return activities.map(async activity => {
					if (!activity.type === 'file' || !activity.fileId)
						return activity;

					activity.file = await context.Files.findOne({
						_id: activity.fileId,
					});

					return activity;
				});
			},
			paginateActivities: paginate('Activities'),
		},
		Mutation: {
			insertOneActivity: insertOne('Activities'),
			updateOneActivity: updateOne('Activities'),
			deleteOneActivity: deleteOne('Activities'),
		},
	},
};

export default ActivitiesModule;
