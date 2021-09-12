import {
	findOne,
	find,
	insertOne,
	deleteOne,
	updateOne,
} from 'server/lib/resolvers.js';
import {
	migrateUsers,
	migrateSinglePages,
	migrateActivities,
	migrateBuildingData,
	migrateCategories,
	migrateAssessments,
	migrateAddresses,
	migrateAssessmentDates,
} from 'server/lib/migrations';

const SettingsModule = {
	typeDefs: `
	type Setting inherits Document {
		name: String
		value: String
		isComplete: Boolean
		logoId: ID
		logoURL: String
		systemName: String
	}

	extend type Query {
		findOneSetting(
			_id: ID
			name: String
		): Setting @auth(scope:"settings:read")

		findSettings(
			skip: Int
			limit: Int
			search: String
			order: Int
			orderBy: String
		): Find<Setting> @auth(scope:"settings:read")
	}

	extend type Mutation {
		insertOneSetting(
			name: String
			isComplete: Boolean
			value: String
			logoId: ID
			logoURL: String
			systemName: String
		): Setting @auth(scope:"settings:write")
			
		updateOneSetting(
			_id: ID!
			name: String
			isComplete: Boolean
			value: String
			logoId: ID
			logoURL: String
			systemName: String
		): Setting @auth(scope:"settings:write")

		deleteOneSetting(
			_id: ID!
		): Boolean @auth(scope:"settings:write")

		migrateData(
			name: String!
		): Boolean @auth(scope:"settings:write")
	}
		`,
	resolvers: {
		Query: {
			findOneSetting: findOne('Settings'),
			findSettings: find('Settings'),
		},
		Mutation: {
			insertOneSetting: insertOne('Settings'),
			updateOneSetting: updateOne('Settings'),
			deleteOneSetting: deleteOne('Settings'),
			migrateData: async (_, { name }, context, model) => {
				if (!name) return false;

				let setting = await context.Settings.findOne({
					name,
				});

				if (!setting) {
					setting = {
						_id: context.uuid(),
						createdBy: context.user._id,
						createdAt: new Date(),
						name,
					};

					await context.Settings.insertOne(setting);
				}

				if (setting.isComplete) return false;

				let migrated = false;
				switch (name) {
					case 'users':
						await migrateUsers(context);
						migrated = true;
						break;
					case 'singlePages':
						await migrateSinglePages(context);
						migrated = true;
						break;
					case 'activities':
						await migrateActivities(context);
						migrated = true;
						break;
					case 'buildingData':
						await migrateBuildingData(context);
						migrated = true;
						break;
					case 'categories':
						await migrateCategories(context);
						migrated = true;
						break;
					case 'assessments':
						await migrateAssessments(context);
						migrated = true;
						break;
					case 'addresses':
						await migrateAddresses(context);
						migrated = true;
						break;
					case 'assessmentDates':
						migrated = await migrateAssessmentDates(context);
						break;
					default:
						break;
				}

				if (migrated) {
					setting.isComplete = true;
					await context.Settings.replaceOne(
						{ _id: setting._id },
						setting
					);

					return true;
				} else {
					return false;
				}
			},
		},
	},
};

export default SettingsModule;
