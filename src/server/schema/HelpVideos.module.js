import {
	findOne,
	find,
	paginate,
	insertOne,
	updateOne,
	deleteOne,
} from 'server/lib/resolvers.js';

const HelpVideosModule = {
	typeDefs: `
	type HelpVideo inherits Document {
		isMainVideo: Boolean
		forEditor: Boolean
		title: String
		order: Int
		embedCode: String
	}

	extend type Query {
		findOneHelpVideo(
			_id: ID!
		): HelpVideo @auth(scope:"helpVideos:read")

		findHelpVideos(
			skip: Int
			limit: Int
			search: String
			order: Int
			orderBy: String
		): Find<HelpVideo> @auth(scope:"helpVideos:read")

		paginateHelpVideos(
			skip: Int
			limit: Int
			search: String
			order: Int
			orderBy: String
		): Paginate<HelpVideo> @auth(scope:"helpVideos:read")
	}

	extend type Mutation {
		insertOneHelpVideo(
			isMainVideo: Boolean
			forEditor: Boolean
			title: String
			order: Int
			embedCode: String
		): HelpVideo @auth(scope:"helpVideos:write")

		updateOneHelpVideo(
			_id: ID!
			isMainVideo: Boolean
			forEditor: Boolean
			title: String
			order: Int
			embedCode: String
		): HelpVideo @auth(scope:"helpVideos:write")

		deleteOneHelpVideo(_id: ID!): Boolean @auth(scope:"helpVideos:write")
	}
	`,

	resolvers: {
		Query: {
			findOneHelpVideo: findOne('HelpVideos'),
			findHelpVideos: find('HelpVideos'),
			paginateHelpVideos: paginate('HelpVideos'),
		},
		Mutation: {
			insertOneHelpVideo: insertOne('HelpVideos'),
			updateOneHelpVideo: updateOne('HelpVideos'),
			deleteOneHelpVideo: deleteOne('HelpVideos'),
		},
	},
};

export default HelpVideosModule;
