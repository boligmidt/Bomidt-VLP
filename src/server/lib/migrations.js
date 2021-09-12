import draftToHtml from 'draftjs-to-html';
import Authmodel from 'server/lib/Auth.resolvers';
import uuid from 'uuid/v4';

const keyString =
	'u0YD64Tmr!IKsdgbubQrKM7R*00eP5k^XFauiJySmae@!2hB$k#p$eGFgTmUSZasyn9xLnUeF4NMwulZq#MJv0ziQ337T$W%!T$';

const migrateUsers = async models => {
	const users = await models.Users.find({
		profile: { $exists: true },
	}).toArray();

	if (!users.length) return true;

	const { access_token } = await Authmodel.getApiToken();

	users.map(async user => {
		let roles = [];

		Object.keys(user.roles).map(key => {
			roles.push({
				housingCooperativeId: key === '__global_roles__' ? '*' : key,
				role:
					user.roles[key] &&
					user.roles[key][0] &&
					user.roles[key][0] === 'superAdmin'
						? 'admin'
						: user.roles[key][0]
						? user.roles[key][0]
						: 'contact',
			});
		});

		let password = '#';
		for (var i = 0; i < 20; i++) {
			password += keyString[Math.floor(Math.random() * 100)];
		}

		let createdAt = '';
		if (user.createdAt) {
			createdAt = user.createdAt;
		}

		if (!user.username && user.emails && user.emails.length) {
			if (user.emails[0] && user.emails[0].address) {
				user.username = user.emails[0].address;
			} else {
				user.username = user._id + '-missingUsername';
				user.email =
					user.emails && user.emails.length && user.emails[0].address
						? user.emails[0].address
						: user._id + '@missingemail.com';
				user.isDeleted = true;
				user.notMigrated = true;
				await models.Users.replaceOne({ _id: user._id }, newData);

				return true;
			}
		} else {
			user.username = user._id + '-missingUsername';
		}

		let newData = {
			username: user.username,
			email:
				user.emails && user.emails.length && user.emails[0].address
					? user.emails[0].address
					: user._id + '@missingemail.com',
			name: user.profile ? user.profile.name : 'Mangler Navn',
			address: user.profile ? user.profile.address : '',
			postalNumber: user.profile ? user.profile.postalNumber : '',
			phone: user.profile ? user.profile.phone : '',
			position: user.profile ? user.profile.position : '',
			notifyPhone: user.profile ? user.profile.notifyPhone : undefined,
			notifyEmail: user.profile ? user.profile.notifyEmail : undefined,
			roles: roles,
			createdAt,
		};

		if (newData.email !== user._id + '@missingemail.com') {
			const { user_id } = await Authmodel.createAuth0LoginAccount(
				access_token,
				newData.email,
				password
			);

			newData.auth0Id = user_id;
		}

		await models.Users.replaceOne({ _id: user._id }, newData);

		return true;
	});
};

const migrateSinglePages = async models => {
	const contentPages = await models.SinglePages.find({
		'content.blocks': { $exists: true },
	}).toArray();

	if (contentPages.length) {
		contentPages.map(async doc => {
			let newData = {
				...doc,
				content: await draftToHtml(doc.content),
			};

			if (doc.contentTwo && doc.contentTwo.blocks) {
				newData.contentTwo = await draftToHtml(doc.contentTwo);
			}

			const result = models.SinglePages.replaceOne(
				{ _id: doc._id },
				newData
			);
		});
	}

	const contentTwoPages = await models.SinglePages.find({
		'contentTwo.blocks': { $exists: true },
	}).toArray();

	if (contentTwoPages.length) {
		contentTwoPages.map(async doc => {
			let newData = {
				...doc,
				content: await draftToHtml(doc.content),
			};

			if (doc.contentTwo) {
				newData.contentTwo = await draftToHtml(doc.contentTwo);
			}

			const result = models.SinglePages.replaceOne(
				{ _id: doc._id },
				newData
			);
		});
	}

	const infoPages = await models.SinglePages.find({
		'content.policyId': { $exists: true },
	}).toArray();

	if (!infoPages.length) return true;

	infoPages.map(async doc => {
		let newData = {
			...doc,
			...doc.content,
		};

		delete newData.content;

		const result = models.SinglePages.replaceOne({ _id: doc._id }, newData);
	});

	return true;
};

const migrateActivities = async models => {
	console.log('migrating activities');

	const activities = await models.Activities.find({
		type: 'change',
		isMigrated: { $ne: true },
	}).toArray();

	if (activities.length === 0) {
		return true;
	}

	await Promise.all(
		activities.map(async doc => {
			let newData = { ...doc };

			newData.diff = [];
			newData.isMigrated = true;

			if (doc.diff && Object.keys(doc.diff).length) {
				Object.keys(doc.diff).forEach(key => {
					newData.diff.push({
						from:
							typeof doc.diff[key][0] === 'object'
								? 0
								: doc.diff[key][0],
						to:
							typeof doc.diff[key][1] === 'object'
								? 0
								: doc.diff[key][1],
						key: key,
					});
				});
			}

			const result = await models.Activities.replaceOne(
				{ _id: doc._id },
				newData
			);
		})
	);

	return true;
};

const migrateBuildingData = async models => {
	const buildingData = await models.BuildingData.find({
		building: {
			$exists: true,
		},
	}).toArray();

	if (buildingData.length === 0) {
		return true;
	}

	buildingData.map(doc => {
		let newData = { ...doc };

		delete newData.building;
		delete newData.count;

		newData.category = doc.building;
		newData.amount = doc.count;

		const result = models.BuildingData.replaceOne(
			{ _id: doc._id },
			newData
		);
	});

	return true;
};

const migrateCategories = async models => {
	let categories = await models.Categories.find({
		parentId: { $exists: false },
		isDeleted: { $ne: true },
		children: { $exists: false },
	}).toArray();

	if (categories.length === 0) {
		return true;
	}

	let updatedCategories = [];

	for (let index = 0; index < categories.length; index++) {
		let category = categories[index];
		category.children = [];
		category.lifeSpans = [];

		category.lifeSpans = await models.Categories.find({
			parentId: category._id,
			isDeleted: { $ne: true },
			type: 'lifespan',
		}).toArray();

		category.children = await models.Categories.find({
			parentId: category._id,
			isDeleted: { $ne: true },
			type: { $exists: false },
		}).toArray();

		updatedCategories.push(category);
	}

	await models.Categories.deleteMany({});

	updatedCategories.map(async doc => {
		await models.Categories.insertOne({ ...doc });
	});
};

const migrateAssessments = async models => {
	let assessments = await models.Assessments.find({
		isDeleted: {
			$ne: true,
		},
		categoryId: {
			$exists: false,
		},
	}).toArray();

	if (assessments.length === 0) {
		return true;
	}

	await assessments.forEach(async assessment => {
		let query = {
			$or: [
				{
					name: assessment.objectType,
				},
				{
					'children.name': assessment.objectType,
				},
			],
		};

		if (assessment.lifespan && assessment.lifespan.length) {
			query.$or.push({
				'lifeSpans.name': assessment.lifespan[0].name,
			});
		}
		if (assessment.groupOrder) {
			query.$or.push({
				order: assessment.groupOrder,
			});
		}

		const category = await models.Categories.findOne(query);

		if (category) {
			assessment.categoryId = category._id;
			const result = await models.Assessments.replaceOne(
				{ _id: assessment._id },
				assessment
			);
		}
	});

	return true;
};

const migrateAddresses = async models => {
	let assessments = await models.Assessments.find({
		isDeleted: {
			$ne: true,
		},
		isCompleted: {
			$ne: true,
		},
		address: { $exists: true, $not: { $size: 0 } },
	}).toArray();

	if (assessments.length === 0) {
		return true;
	}

	let uniqueAddresses = [];

	await Promise.all(
		assessments.map(async assessment => {
			const matchingAddress = uniqueAddresses.find(
				address => address.name === assessment.address
			);

			let address = {
				_id: '',
				name: '',
				housingCooperativeId: '',
			};

			if (matchingAddress) {
				address = matchingAddress;
			} else {
				address = {
					_id: uuid(),
					name: assessment.address,
					housingCooperativeId: assessment.housingCooperativeId,
				};

				uniqueAddresses.push(address);

				await models.Addresses.insertOne({ ...address });
			}

			await models.Assessments.updateOne(
				{ _id: assessment._id },
				{ $set: { address: address._id } }
			);
		})
	);

	return true;
};

const migrateAssessmentDates = async models => {
	let assessments = await models.Assessments.find({
		isDeleted: {
			$ne: true,
		},
		dueDate: { $exists: true },
	}).toArray();

	if (assessments.length === 0) {
		return true;
	}

	await Promise.all(
		assessments.map(async assessment => {
			const updated = {};
			if (assessment.createdAt) {
				updated.createdAt = models
					.moment(assessment.createdAt)
					.toDate();
			}
			if (assessment.dueDate) {
				updated.dueDate = models.moment(assessment.dueDate).toDate();
			}

			await models.Assessments.updateOne(
				{ _id: assessment._id },
				{
					$set: updated,
				}
			);
		})
	);

	return true;
};

export {
	migrateUsers,
	migrateSinglePages,
	migrateActivities,
	migrateBuildingData,
	migrateCategories,
	migrateAssessments,
	migrateAddresses,
	migrateAssessmentDates,
};
