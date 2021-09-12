import gql from 'graphql-tag';

export const GET_CATEGORIES = gql`
	query findCategories {
		items: findCategories {
			items {
				_id
				name
				order
				isSeparated
				children {
					name
					type
					order
					orderIndex
					isSeparated
				}
				lifeSpans {
					name
					type
					order
					orderIndex
					isSeparated
				}
			}
		}
	}
`;

export const GET_CATEGORY = gql`
	query getCategory($_id: ID!) {
		category: findOneCategory(_id: $_id) {
			_id
			lifeSpans {
				name
			}
		}
	}
`;

export const ADD_CATEGORY = gql`
	mutation addCategory(
		$name: String
		$type: String
		$parentId: ID
		$order: Int
		$orderIndex: Int
		$isSeparated: Boolean
		$children: [CategoryChildInput]
		$lifeSpans: [CategoryChildInput]
	) {
		newCategory: insertOneCategory(
			name: $name
			type: $type
			parentId: $parentId
			order: $order
			orderIndex: $orderIndex
			isSeparated: $isSeparated
			children: $children
			lifeSpans: $lifeSpans
		) {
			_id
			name
			order
			isSeparated
			children {
				name
				type
				order
				orderIndex
				isSeparated
			}
			lifeSpans {
				name
				type
				order
				orderIndex
				isSeparated
			}
		}
	}
`;

export const UPDATE_CATEGORY = gql`
	mutation updateCategory(
		$_id: ID!
		$name: String
		$type: String
		$parentId: ID
		$order: Int
		$orderIndex: Int
		$isSeparated: Boolean
		$children: [CategoryChildInput]
		$lifeSpans: [CategoryChildInput]
	) {
		updateOneCategory(
			_id: $_id
			name: $name
			type: $type
			parentId: $parentId
			order: $order
			orderIndex: $orderIndex
			isSeparated: $isSeparated
			children: $children
			lifeSpans: $lifeSpans
		) {
			_id
			name
			type
			parentId
			order
			orderIndex
			isSeparated
			children {
				name
				type
				order
				orderIndex
				isSeparated
			}
			lifeSpans {
				name
				type
				order
				orderIndex
				isSeparated
			}
		}
	}
`;

export const UPDATE_CATEGORY_INDEXES = gql`
	mutation updateCategoryIndexes($updatedIndex: [orderIndexItemInput]!) {
		updateIndexes(updatedIndex: $updatedIndex)
	}
`;
export const DELETE_CATEGORY = gql`
	mutation deleteCategory($_id: ID!) {
		success: deleteOneCategory(_id: $_id)
	}
	#
`;
