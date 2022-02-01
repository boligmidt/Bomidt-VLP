import {
	findOne,
	find,
	paginate,
	insertOne,
	updateOne,
	deleteOne,
} from 'server/lib/resolvers.js';
import moment from 'moment';
import { AssesmentsIcon } from 'components/icons/NavIcons';


const AssessmentModule = {
	typeDefs: `
	type Assessment inherits Document {
		housingCooperativeId: ID!
		categoryId: ID
		name: String
		objectType: String
		lifespan: [String]
		stateLevel: String
		description: String
		measure: String
		address: ID
		addressName: String
		cost: String
		productionYear: String
		lastMaintained: String
		unitAmount: String
		dimensions: String
		groupKey: Int
		groupOrder: Int
		category: String
		dueDate: DateTime
		primaryImageId: ID
		isActive: Boolean
		isCompleted: Boolean
		completedAt: DateTime
		modifiedAt: DateTime
		isFreshDuplicate: Boolean
		index: Int
		files: [File]
	}

	type SubGroup {
		title: String
		items: [Assessment]
		isSeparated: Boolean
	}

	type AssessmentGroup {
		title: String
		subGroups: [SubGroup]
	}

	input AssessmentInput {
		housingCooperativeId: ID!
		stateLevel: String
		address: ID
		categoryId: ID
		name: String
		objectType: String
		category: String
		groupKey: Int
		groupOrder: Int
		isCompleted: Boolean
		completedAt: DateTime
	}

	extend type Query {
		findOneAssessment(
			_id: ID!
		): Assessment @auth(scope:"assessments:read")

		findAssessments(
			housingCooperativeId: ID!
			isActive: Boolean
			isDeleted: Boolean
			isCompleted: Boolean
			stateLevel: [String]
			skip: Int
			limit: Int
			search: String
			address: ID
			order: Int
			orderBy: String
		): Find<Assessment> @auth(scope:"assessments:read")

		findGroupedAssessments(
			housingCooperativeId: ID!
			isActive: Boolean
			isDeleted: Boolean
			isCompleted: Boolean
			stateLevel: [String]
			skip: Int
			limit: Int
			search: String
			address: ID
			order: Int
			orderBy: String
			year: Int
		): [AssessmentGroup] @auth(scope:"assessments:read")

		paginateAssessments(
			housingCooperativeId: ID!
			skip: Int
			limit: Int
			search: String
			order: Int
			orderBy: String
			isActive: Boolean
			isDeleted: Boolean
		): Paginate<Assessment> @auth(scope:"assessments:read")
	}

	extend type Mutation {
		insertAssessments(
			assessments: [AssessmentInput]
		): Boolean @auth(scope:"assessments:write")

		insertOneAssessment(
			housingCooperativeId: ID!
			categoryId: ID
			name: String
			objectType: String
			lifespan: [String]
			stateLevel: String
			description: String
			measure: String
			address: ID
			cost: String
			productionYear: String
			lastMaintained: String
			unitAmount: String
			dimensions: String
			groupKey: Int
			groupOrder: Int
			category: String
			dueDate: DateTime
			isActive: Boolean
			isCompleted: Boolean
			completedAt: DateTime
		): Assessment @auth(scope:"assessments:write")

		updateOneAssessment(
			_id: ID!
			housingCooperativeId: ID
			name: String
			objectType: String
			lifespan: [String]
			stateLevel: String
			description: String
			measure: String
			address: ID
			cost: String
			productionYear: String
			lastMaintained: String
			unitAmount: String
			dimensions: String
			groupKey: Int
			groupOrder: Int
			category: String
			dueDate: DateTime
			createdAt: DateTime
			isActive: Boolean
			isCompleted: Boolean
			primaryImageId: ID
		): Assessment @auth(scope:"assessments:write")

		deleteOneAssessment(
			_id: ID!
		): Boolean @auth(scope:"assessments:write")

		massEditAssessmentCreatedAt(
			ids: [ID]!
			createdAt: DateTime!
		): Boolean @auth(scope:"assessments:write")
	}
	`,
	resolvers: {
		Assessment: {
			addressName: async (doc, args, context) => {
				if (!doc.address) return 'Adresse mangler';

				const address = await context.Addresses.findOne({
					_id: doc.address,
					housingCooperativeId: doc.housingCooperativeId,
					isDeleted: { $ne: true },
				});
				return (address && address.name) || 'Adresse mangler';
			},
		},
		Query: {
			findOneAssessment: findOne('Assessments'),
			findAssessments: find('Assessments', {
				transformQuery: (_, args, { address, ...query }, context) => {
					if (!query.isCompleted) {
						query.isCompleted = {
							$ne: true,
						};
					}

					if (query.search) {
						query['$or'] = [
							{ name: new RegExp(query.search, 'gi') },
							{ objectType: new RegExp(query.search, 'gi') },
						];

						delete query['$text'];
					}

					if (address) {
						query.address = address;
					}

					query.search = undefined;

					return query;
				},
			}),
			paginateAssessments: paginate('Assessments'),
			findGroupedAssessments: async (
				_,
				{ orderBy, search, year, address, ...query },
				context
			) => {
				const { Addresses, Assessments, Categories, Files } = context;
				let separatedCategories = await Categories.find({
					isSeparated: true,
				})
					.sort({ order: 1 })
					.toArray();

				const separatedCategoriesArray = [];
				separatedCategories.forEach(item =>
					separatedCategoriesArray.push(item.name)
				);
				if (!query.isCompleted) {
					query.isCompleted = {
						$ne: true,
					};
				}

				if (!query.isDeleted) {
					query.isDeleted = {
						$ne: true,
					};
				}

				if (query.stateLevel && query.stateLevel.length) {
					let matches = [];
					if (query.stateLevel.includes('tgiu')) {
						matches.push('tgiu');
					}
					if (query.stateLevel.includes('tg0')) {
						matches.push('tg0');
					}
					if (query.stateLevel.includes('tg1')) {
						matches.push.apply(matches, ['tg0tg1', 'tg1']);
					}
					if (query.stateLevel.includes('tg2')) {
						matches.push.apply(matches, [
							'tg0tg2',
							'tg1tg2',
							'tg2',
						]);
					}
					if (query.stateLevel.includes('tg3')) {
						matches.push.apply(matches, [
							'tg0tg3',
							'tg1tg3',
							'tg2tg3',
							'tg3',
						]);
					}

					query.stateLevel = {
						$in: matches,
					};
				}

				if (address) {
					query.address = address;
				}

				if (search) {
					query['$or'] = [
						{ name: new RegExp(search, 'gi') },
						{ objectType: new RegExp(search, 'gi') },
					];
				}

				let assessments = await Assessments.find(query)
					.sort({
						[orderBy]: 1,
						name: 1,
					})
					.toArray();
				await Promise.all(
					assessments.map(async (assessment, i) => {
						assessment.index = i;

						if (!assessment.address) {
							assessment.addressName = 'Adresse mangler';
						}

						const address = await Addresses.findOne({
							_id: assessment.address,
							housingCooperativeId:
								assessment.housingCooperativeId,
							isDeleted: { $ne: true },
						});

						assessment.addressName =
							(address && address.name) || 'Adresse mangler';

						return assessment;
						
					})
				);
				await Promise.all(
					assessments.map(async (assessment, i) => {
						if (assessment.addressName == 'Adresse mangler') assessments.splice(i, 1);
					})
				);
				await Promise.all(
					assessments.map(async (assessment, i) => {
						if (assessment.addressName == 'Adresse mangler') assessments.splice(i, 1);
					})
				);
				let groups = {};
				await Promise.all(
					assessments.map(async (assessment, i) => {
						assessment.index = i;
						if (
							year &&
							!context
								.moment(assessment.dueDate)
								.isBetween(`${year - 1}-12-30`, `${year}-12-30`)
						)
							return false;

						let index =
							assessment.category || assessment.objectType;
						let groupIndex = assessment.addressName;
						if (!groups.hasOwnProperty(groupIndex)) {
							groups[groupIndex] = {
								subGroups: {
									[index]: {
										items: [],
										isSeparated: separatedCategoriesArray.includes(
											assessment.category ||
												assessment.objectType
										),
									},
								},
							};
						}
						if (
							!groups[groupIndex].subGroups.hasOwnProperty(index)
						) {
							groups[groupIndex].subGroups[index] = {
								items: [],
								isSeparated: separatedCategoriesArray.includes(
									assessment.category || assessment.objectType
								),
							};
						}

						assessment.files = await Files.find({
							docId: assessment._id,
							isDeleted: {
								$ne: true,
							},
						}).toArray();

						groups[groupIndex].subGroups[index].items.splice(
							assessment.index,
							0,
							assessment
						);
					})
				);

				const orderedGroups = {};
				Object.keys(groups)
					.sort()
					.forEach(function (key) {
						
						orderedGroups[key] = groups[key];

					});
				groups = orderedGroups;
				let assessmentGroups = [];
				Object.keys(groups).forEach(groupKey => {
					let group = groups[groupKey];
					let newGroup = {
						title: groupKey,
						subGroups: [],
					};

					separatedCategoriesArray.forEach(subKey => {
						if (group.subGroups[subKey]) {
							let subGroup = group.subGroups[subKey];
							subGroup.title = subKey;
							newGroup.subGroups.push(subGroup);
						}

					});

					assessmentGroups.push(newGroup);
				});
				return assessmentGroups;
			},
		},
		Mutation: {
			insertOneAssessment: insertOne('Assessments'),
			updateOneAssessment: updateOne('Assessments', {
				transformDoc: async (_, args, doc, context) => {
					const { uuid, user, Assessments, Activities } = context;
					const { _id } = args;

					let assessment = await Assessments.findOne({ _id });

					if (doc.isCompleted === true) {
						doc.completedAt = new Date();

						const newDoc = {
							_id: uuid(),
							isFreshDuplicate: true,
							createdBy: user._id,
							createdAt: parseInt(new Date().getTime()),
							housingCooperativeId:
								assessment.housingCooperativeId,
							address: assessment.address || '',
							categoryId: assessment.categoryId || '',
							name: assessment.name || '',
							objectType: assessment.objectType || '',
							category: assessment.category || '',
							productionYear: assessment.productionYear || '',
							stateLevel: 'tgiu',
							isCompleted: false,
						};

						await Assessments.insertOne(newDoc);
					} else {
						doc.completedAt = null;
						doc.isCompleted = false;
					}

					if (doc.createdAt) {
						doc.groupKey = moment(doc.createdAt).format('YYYYMM');
					}

					doc.isFreshDuplicate = false;

					let isGlobalAdmin = false;
					user.roles.forEach(item => {
						if (item.housingCooperativeId === '*') {
							if (item.role === 'admin') {
								isGlobalAdmin = true;
							}
						}
					});

					if (isGlobalAdmin) return doc;

					let assessmentChanges = await getAssessmentChanges(
						{
							...assessment,
							...doc,
						},
						assessment
					);

					if (assessmentChanges.length > 0) {
						await Activities.insertOne({
							_id: uuid(),
							createdBy: user._id,
							createdAt: new Date(),
							userName: user.name,
							assessmentId: _id,
							type: 'change',
							diff: assessmentChanges,
						});
					}

					return doc;
				},
			}),
			deleteOneAssessment: deleteOne('Assessments'),
			insertAssessments: async (_, doc, context) => {
				const { Assessments } = context;

				let responses = [];

				doc.assessments.map(item => {
					const _id = context.uuid();
					const createdBy = context.user._id;
					const createdAt = parseInt(new Date().getTime());
					const response = Assessments.insertOne({
						_id,
						createdBy,
						createdAt,
						...item,
					});
					responses.push(response);
				});

				return true;
			},
			massEditAssessmentCreatedAt: async (_, doc, context) => {
				const { Assessments } = context;

				const result = await Promise.all(
					doc.ids.map(async (_id, i) => {
						return await Assessments.updateOne(
							{ _id },
							{
								$set: {
									createdAt: await context
										.moment(doc.createdAt)
										.add(i, 'ms')
										.toISOString(true),
								},
							}
						);
					})
				);

				return !!result;
			},
		},
	},
};

async function getAssessmentChanges(newDoc, oldDoc) {
	const keysToTrack = [
		'name',
		'stateLevel',
		'description',
		'measure',
		'address',
		'cost',
		'unitAmount',
		'productionYear',
		'lastMaintained',
		'dimensions',
		'isActive',
		'isCompleted',
	];

	let changes = [];

	keysToTrack.forEach(key => {
		if (oldDoc[key] != newDoc[key]) {
			changes.push({
				from: oldDoc[key],
				to: newDoc[key],
				key,
			});
		}
	});

	if (!moment(oldDoc.dueDate).isSame(moment(newDoc.dueDate))) {
		changes.push({
			from: moment(oldDoc.dueDate).toDate(),
			to: moment(newDoc.dueDate).toDate(),
			key: 'dueDate',
		});
	}
	if (!moment(oldDoc.createdAt).isSame(moment(newDoc.createdAt))) {
		changes.push({
			from: moment(oldDoc.createdAt).toDate(),
			to: moment(newDoc.createdAt).toDate(),
			key: 'createdAt',
		});
	}

	return changes;
}

export default AssessmentModule;
