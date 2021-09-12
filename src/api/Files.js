import gql from 'graphql-tag';

export const GET_FILES = gql`
	query findFiles($housingCooperativeId: ID, $docId: ID, $page: String) {
		files: findFiles(
			housingCooperativeId: $housingCooperativeId
			docId: $docId
			page: $page
		) {
			items {
				_id
				docId
				fileType
				fileName
				fileUrl
				page
				housingCooperativeId
				createdAt
			}
			count
		}
	}
`;

export const ADD_FILE = gql`
	mutation uploadOneFile(
		$fileType: String
		$fileName: String
		$fileUrl: String
		$docId: ID
		$page: String
		$housingCooperativeId: ID
	) {
		file: insertOneFile(
			fileType: $fileType
			fileName: $fileName
			fileUrl: $fileUrl
			docId: $docId
			page: $page
			housingCooperativeId: $housingCooperativeId
		) {
			_id
			fileType
			fileName
			fileUrl
			docId
			page
			housingCooperativeId
			createdAt
		}
	}
`;

export const UPDATE_FILE = gql`
	mutation updateOneFile($_id: ID!, $isDeleted: Boolean, $fileName: String) {
		updateOneFile(_id: $_id, isDeleted: $isDeleted, fileName: $fileName) {
			_id
		}
	}
`;

export const GET_UPLOAD_URL = gql`
	mutation getUploadUrl($key: String!, $fileContentType: String!) {
		uploadUrl: getUploadUrl(key: $key, fileContentType: $fileContentType)
	}
`;

export const DELETE_FILE = gql`
	mutation deleteFile($_id: ID!) {
		deleteOneFile(_id: $_id)
	}
`;
