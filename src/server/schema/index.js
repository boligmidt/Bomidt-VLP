const { transpileSchema } = require('graphql-s2s').graphqls2s;
import { makeExecutableSchema } from 'graphql-tools';
import { GraphQLScalarType } from 'graphql';
import JSONScalar from 'graphql-type-json';
import merge from 'lodash/merge';

import { AccessDirective as auth } from 'server/lib/Directives';

import ActivitiesModule from './Activities.module';
import AssessmentsModule from './Assessments.module';
import BuildingDataModule from './BuildingData.module';
import CategoriesModule from './Categories.module';
import FilesModule from './Files.module';
import HelpVideosModule from './HelpVideos.module';
import HousingCooperativesModule from './HousingCooperatives.module';
import UsersModule from './Users.module';
import SinglePagesModule from './SinglePages.module';
import GeneralInfoModule from './GeneralInfo.module';
import SettingsModule from './Settings.module';
import AddressesModule from './Addresses.module';

const API_VERSION = '0.0.1';

const DateTime = new GraphQLScalarType({
	name: 'DateTime',
	description: 'Resolves to javascript date object',
	serialize(value) {
		return (value && new Date(value)) || null;
	},
	parseValue(value) {
		return new Date(value);
	},
	parseLiteral(ast) {
		return new Date(ast.value);
	},
});

const baseTypeDefs = `
	directive @auth(scope: String) on OBJECT | FIELD_DEFINITION

	scalar JSON
	scalar DateTime

	type Find<T> {
		items: [T]
		count: Int
	}

	type Paginate<T> {
		items: [T]
		count: Int
	}

	type Document {
		_id: ID!
		createdAt: DateTime
		updatedAt: DateTime
		createdBy: ID
		updatedBy: ID
		createdByDisplayName: String
		updatedByDisplayName: String
		isDeleted: Boolean
	}

	type Query {
		apiVersion: String!
	}

	type Mutation {
		checkTime: String!
	}
`;

const baseResolvers = {
	Query: {
		apiVersion: (_, args, context) => {
			return API_VERSION;
		},
	},
	Mutation: {
		checkTime: () => new Date(),
	},
};

const schema = makeExecutableSchema({
	typeDefs: transpileSchema(
		baseTypeDefs +
			ActivitiesModule.typeDefs +
			AssessmentsModule.typeDefs +
			BuildingDataModule.typeDefs +
			CategoriesModule.typeDefs +
			FilesModule.typeDefs +
			HelpVideosModule.typeDefs +
			HousingCooperativesModule.typeDefs +
			UsersModule.typeDefs +
			SinglePagesModule.typeDefs +
			GeneralInfoModule.typeDefs +
			SettingsModule.typeDefs +
			AddressesModule.typeDefs +
			''
	),
	resolvers: merge(
		baseResolvers,
		ActivitiesModule.resolvers,
		AssessmentsModule.resolvers,
		BuildingDataModule.resolvers,
		CategoriesModule.resolvers,
		FilesModule.resolvers,
		HelpVideosModule.resolvers,
		HousingCooperativesModule.resolvers,
		UsersModule.resolvers,
		SinglePagesModule.resolvers,
		GeneralInfoModule.resolvers,
		SettingsModule.resolvers,
		AddressesModule.resolvers,
		{
			JSON: JSONScalar,
			DateTime,
		}
	),
	schemaDirectives: {
		auth,
	},
});

export default schema;
