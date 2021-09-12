import {
	findOne,
	find,
	paginate,
	insertOne,
	updateOne,
	deleteOne,
} from 'server/lib/resolvers.js';

const CategoriesModule = {
	typeDefs: `
	type CategoryChild {
		name: String
		type: String
		order: Int
		orderIndex: Int
		isSeparated: Boolean
	}
	type Category inherits Document {
		name: String
		type: String
		parentId: ID
		order: Int
		orderIndex: Int
		isSeparated: Boolean
		children: [CategoryChild]
		lifeSpans: [CategoryChild]
	}

	input CategoryChildInput {
		name: String
		type: String
		order: Int
		orderIndex: Int
		isSeparated: Boolean
	}

	extend type Query {
		findOneCategory(
			_id: ID
		): Category @auth(scope:"categories:read")

		findCategories(
			skip: Int
			limit: Int
			search: String
			order: Int
			orderBy: String
			parentId: ID
		): Find<Category> @auth(scope:"categories:read")

		paginateCategories(
			skip: Int
			limit: Int
			search: String
			order: Int
			orderBy: String
		): Paginate<Category> @auth(scope:"categories:read")

	}
	extend type Mutation {
		insertOneCategory(
			name: String
			type: String
			parentId: ID
			order: Int
			orderIndex: Int
			isSeparated: Boolean
			children: [CategoryChildInput]
			lifeSpans: [CategoryChildInput]
		): Category @auth(scope:"categories:write")

		updateOneCategory(
			_id: ID!
			name: String
			type: String
			parentId: ID
			order: Int
			orderIndex: Int
			isSeparated: Boolean
			children: [CategoryChildInput]
			lifeSpans: [CategoryChildInput]
		): Category @auth(scope:"categories:write")

		deleteOneCategory(
			_id: ID!
		): Boolean @auth(scope:"categories:write")
	}
	`,
	resolvers: {
		Query: {
			findOneCategory: findOne('Categories'),
			findCategories: find('Categories'),
			paginateCategories: paginate('Categories'),
		},
		Mutation: {
			insertOneCategory: insertOne('Categories'),
			updateOneCategory: updateOne('Categories'),
			deleteOneCategory: deleteOne('Categories'),
		},
	},
};

export default CategoriesModule;
