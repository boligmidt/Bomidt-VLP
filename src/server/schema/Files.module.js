import {
	findOne,
	find,
	paginate,
	insertOne,
	updateOne,
	deleteOne,
} from 'server/lib/resolvers.js';

const FilesModule = {
	typeDefs: `
	type File inherits Document {
		fileType: String
		fileName: String
		fileUrl: String
		docId: ID
		page: String
		housingCooperativeId: ID
	}

	extend type Query {
		findOneFile(
			_id: ID!
		): File @auth(scope:"files:read")

		findFiles(
			docId: ID
			housingCooperativeId: ID
			page: String
			skip: Int
			limit: Int
			search: String
			order: Int
			orderBy: String
		): Find<File> @auth(scope:"files:read")

		paginateFiles(
			docId: ID
			housingCooperativeId: ID
			skip: Int
			limit: Int
			search: String
			order: Int
			orderBy: String
		): Paginate<File> @auth(scope:"files:read")
	}
	
	extend type Mutation {
		insertOneFile(
			docId: ID
			page: String
			housingCooperativeId: ID
			fileType: String
			fileName: String
			fileUrl: String
		): File @auth(scope:"files:write")

		updateOneFile(
			_id: ID!
			docId: ID
			fileType: String
			fileName: String
			fileUrl: String
			page: String
			housingCooperativeId: ID
			isDeleted: Boolean
		): File @auth(scope:"files:write")
		
		deleteOneFile(
			_id: ID!
		): Boolean @auth(scope:"files:write")
		
		getUploadUrl(
			key: String!
			fileContentType: String!
		): String @auth(scope:"files:write")
	}
	`,
	resolvers: {
		Query: {
			findOneFile: findOne('Files'),
			findFiles: find('Files'),
			paginateFiles: paginate('Files'),
		},
		Mutation: {
			insertOneFile: insertOne('Files'),
			updateOneFile: updateOne('Files'),
			deleteOneFile: deleteOne('Files'),
			getUploadUrl: async (_, doc, context) => {
				const { S3 } = context;
				const { key, fileContentType } = doc;
				console.log(S3);
				return await new Promise((resolve, reject) => {
					S3.getSignedUrl(
						'putObject',
						{
							Bucket: process.env.AWS_S3_BUCKET,
							Key: key,
							ContentType: fileContentType,
							Expires: 600,
							//ACL: 'public-read',
						},
						(error, data) => {
							if (error) {
								return reject(error);
							}

							resolve(data);
						}
					);
				});
			},
		},
	},
};

export default FilesModule;
