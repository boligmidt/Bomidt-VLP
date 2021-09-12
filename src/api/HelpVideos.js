import gql from 'graphql-tag';

export const GET_HELPVIDEOS = gql`
	query findAllHelpVideos {
		helpVideos: findHelpVideos(orderBy: "order", order: 1) {
			items {
				_id
				isMainVideo
				forEditor
				title
				order
				embedCode
			}
		}
	}
`;

export const GET_HELPVIDEO = gql`
	query getHelpVideo($_id: ID!) {
		helpVideo: findOneHelpVideo(_id: $_id) {
			_id
			isMainVideo
			forEditor
			title
			order
			embedCode
		}
	}
`;

export const CREATE_HELPVIDEO = gql`
	mutation createHelpVideo(
		$isMainVideo: Boolean
		$forEditor: Boolean
		$title: String
		$order: Int
		$embedCode: String
	) {
		video: insertOneHelpVideo(
			isMainVideo: $isMainVideo
			forEditor: $forEditor
			title: $title
			order: $order
			embedCode: $embedCode
		) {
			_id
			isMainVideo
			forEditor
			title
			order
			embedCode
		}
	}
`;

export const EDIT_HELPVIDEO = gql`
	mutation editHelpVideo(
		$_id: _id
		$isMainVideo: Boolean
		$forEditor: Boolean
		$title: String
		$order: Int
		$embedCode: String
	) {
		video: updateOneHelpVideo(
			ID: $_id
			isMainVideo: $isMainVideo
			forEditor: $forEditor
			title: $title
			order: $order
			embedCode: $embedCode
		) {
			_id
			isMainVideo
			forEditor
			title
			order
			embedCode
		}
	}
`;
