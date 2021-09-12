function insertOne(model, options) {
	return async (_, doc, context) => {
		doc.createdAt = new Date();
		doc.isDeleted = false;
		const _id = context.uuid();

		if (context.user) {
			doc.createdBy = context.user._id;
			doc.createdByDisplayName = context.user.name;
		}

		if (options && options.transformDoc) {
			doc = await options.transformDoc(_, { _id }, doc, context);
		}

		const response = await context[model].insertOne({
			_id,
			...doc,
		});

		if (options && options.afterInsert) {
			await options.afterInsert(_, response.ops[0], doc, context);
		}

		return response.ops[0];
	};
}

function updateOne(model, options) {
	return async (_, { _id, ...doc }, context) => {
		doc.updatedAt = new Date();

		if (context.user) {
			doc.updatedBy = context.user._id;
			doc.updatedByDisplayName = context.user.name;
		}

		if (options && options.transformDoc) {
			doc = await options.transformDoc(_, { _id }, doc, context);
		}

		const response = await context[model].updateOne({ _id }, { $set: doc });

		if (!response.matchedCount) {
			throw new Error('Document not found');
		}

		const updatedDoc = await context[model].findOne({ _id });

		return updatedDoc;
	};
}

function deleteOne(model, options) {
	return async (_, { _id }, context) => {
		let doc = await context[model].findOne({ _id });

		doc.updatedAt = new Date();
		doc.isDeleted = true;

		if (context.user) {
			doc.updatedBy = context.user._id;
			doc.updatedByDisplayName = context.user.name;
		}
		let deleteReturn = await context[model].updateOne(
			{ _id },
			{ $set: doc }
		);

		if (options && options.afterDelete) {
			await options.afterDelete(_, deleteReturn.ops[0], doc, context);
		}

		return deleteReturn.deletedCount === 1;
	};
}

function findOne(model, options) {
	let afterFindOne =
		(options && options.afterFindOne) ||
		(async (doc, _, { _id }, context) => {
			return doc;
		});

	return async (_, args, context) => {
		let query = args;

		if (options && options.transformQuery) {
			query = await options.transformQuery(_, args, query, context);
		}

		const doc = await context[model].findOne(query);

		return await afterFindOne(doc, _, args, context);
	};
}

function hasOne(model, { localKey }) {
	return async (parentNode, {}, context) => {
		return await context[model].findOne({ _id: parentNode[localKey] });
	};
}

function find(model, options) {
	return async (
		parentNode,
		{ limit, skip, search, order, orderBy, ...args },
		context
	) => {
		let query = {
			...args,
		};

		if (!query.isDeleted) {
			query.isDeleted = {
				$ne: true,
			};
		}

		let queryArgs = (options && options.queryArgs) || [];

		if (search) {
			query['$text'] = {
				$search: search,
			};
		}

		queryArgs.forEach(key => {
			if (typeof args[key] == 'undefined') {
				return;
			}

			query[key] = args[key];
		});

		if (options && options.transformQuery) {
			query = await options.transformQuery(
				parentNode,
				args,
				{ search, ...query },
				context
			);
		}

		let cursor = context[model]
			.find(query)
			.collation({ locale: 'nb', caseLevel: false });

		if (orderBy) {
			cursor.sort({ [orderBy]: order || -1 });
		}

		if (skip) {
			cursor.skip(skip);
		}

		if (limit) {
			cursor.limit(limit);
		}

		const count = await cursor.count();
		const items = await cursor.toArray();

		return {
			count,
			items,
		};
	};
}

function paginate(model, options) {
	return async (
		parentNode,
		{ limit, skip, search, order, orderBy, ...args },
		context,
		info
	) => {
		let query = {
			...args,
		};

		if (!query.isDeleted) {
			query.isDeleted = {
				$ne: true,
			};
		}

		let queryArgs = (options && options.queryArgs) || [];
		let selectionSetArray = [];

		info.fieldNodes[0].selectionSet.selections.map(selection =>
			selectionSetArray.push(selection.name.value)
		);

		if (search) {
			query['$text'] = {
				$search: search,
			};
		}

		queryArgs.forEach(key => {
			if (typeof args[key] == 'undefined') {
				return;
			}

			query[key] = args[key];
		});

		if (options && options.transformQuery) {
			query = await options.transformQuery(
				parentNode,
				args,
				query,
				context
			);
		}

		let cursor = context[model]
			.find(query)
			.collation({ locale: 'nb', caseLevel: false });

		if (orderBy) {
			cursor.sort({ [orderBy]: order || -1 });
		}

		cursor.skip(skip || 0).limit(limit || 25);

		let count = null;
		let items = null;

		if (selectionSetArray.indexOf('count') > -1) {
			count = await context[model].find(query).count();
		}

		if (selectionSetArray.indexOf('items') > -1) {
			items = await cursor.toArray();
		}

		if (options && options.afterPaginate) {
			return options.afterPaginate(
				{
					count,
					items,
				},
				parentNode,
				{ ...query, ...args },
				context,
				info
			);
		}

		return {
			count,
			items,
		};
	};
}

function connection(model, options) {
	return async (
		parentNode,
		{ limit, skip, search, order, orderBy, ...args },
		context
	) => {
		let query = {};
		let queryArgs = (options && options.queryArgs) || [];

		query[options.foreignKey] = parentNode[options.localKey || '_id'];

		if (search) {
			query['$search'] = {
				$search: search,
			};
		}

		queryArgs.forEach(key => {
			query[key] = args[key];
		});

		if (options.transformQuery) {
			query = await options.transformQuery(
				parentNode,
				args,
				query,
				context
			);
		}

		let cursor = context[model].find(query);

		if (orderBy) {
			cursor.sort({ [orderBy]: order || -1 });
		}

		cursor.skip(skip || 0).limit(limit || 25);

		return {
			count: await context[model].find(query).count(),
			items: await cursor.toArray(),
		};
	};
}

export {
	insertOne,
	updateOne,
	deleteOne,
	findOne,
	find,
	hasOne,
	paginate,
	connection,
};
