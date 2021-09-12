import gql from 'graphql-tag';

export const GET_ACTIVITIES = gql`
	query getActivities($assessmentId: ID!) {
		activities: getAssesmentActivities(assessmentId: $assessmentId) {
			_id
			createdAt
			fileId
			assessmentId
			type
			userName
			diff
			comment
			file {
				_id
				fileName
				fileUrl
				isDeleted
			}
		}
	}
`;

export const CREATE_ACTIVITY = gql`
	mutation createActivity(
		$assessmentId: ID!
		$fileId: ID
		$type: String!
		$userName: String
		$diff: JSON
		$comment: String
	) {
		insertOneActivity(
			assessmentId: $assessmentId
			fileId: $fileId
			type: $type
			userName: $userName
			diff: $diff
			comment: $comment
		) {
			_id
		}
	}
`;
