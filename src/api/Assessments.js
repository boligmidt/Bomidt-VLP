import gql from 'graphql-tag';

export const ADD_ASSESSMENTS = gql`
	mutation addAssessments($assessments: [AssessmentInput]) {
		insertAssessments(assessments: $assessments)
	}
`;

export const GET_ASSESSMENTS = gql`
	query getAssessments(
		$housingCooperativeId: ID!
		$stateLevel: [String]
		$isActive: Boolean
		$isCompleted: Boolean
		$search: String
		$address: ID
		$orderBy: String
		$year: Int
	) {
		assessmentGroups: findGroupedAssessments(
			housingCooperativeId: $housingCooperativeId
			stateLevel: $stateLevel
			isActive: $isActive
			isCompleted: $isCompleted
			search: $search
			address: $address
			orderBy: $orderBy
			year: $year
		) {
			title
			subGroups {
				title
				isSeparated
				items {
					_id
					index
					housingCooperativeId
					name
					stateLevel
					cost
					unitAmount
					createdAt
					dueDate
					isActive
					primaryImageId
					categoryId
					description
					measure
					lifespan
					address
					addressName
					dimensions
					isCompleted
					completedAt
					modifiedAt
					productionYear
					isFreshDuplicate
					lastMaintained
					files {
						_id
						fileName
						fileUrl
						fileType
					}
				}
			}
		}
	}
`;

export const GET_ASSESSMENT = gql`
	query getAssessment($_id: ID!, $categoryId: ID) {
		assessment: findOneAssessment(_id: $_id) {
			_id
			housingCooperativeId
			name
			description
			address
			addressName
			stateLevel
			category
			objectType
			lifespan
			measure
			cost
			productionYear
			dimensions
			unitAmount
			groupKey
			groupOrder
			createdAt
			dueDate
			isActive
			categoryId
			primaryImageId
			lastMaintained
			isCompleted
			modifiedAt
		}
		category: findOneCategory(_id: $categoryId) {
			_id
			lifeSpans {
				name
			}
		}
		files: findFiles(docId: $_id) {
			items {
				_id
				fileName
				fileUrl
				fileType
			}
			count
		}
	}
`;

export const ADD_ASSESSMENT = gql`
	mutation addAssessment(
		$housingCooperativeId: ID!
		$name: String
		$objectType: String
		$lifespan: [String]
		$stateLevel: String
		$description: String
		$measure: String
		$address: ID
		$cost: String
		$productionYear: String
		$lastMaintained: String
		$unitAmount: String
		$dimensions: String
		$groupKey: Int
		$groupOrder: Int
		$category: String
		$dueDate: DateTime
	) {
		insertOneAssessment(
			housingCooperativeId: $housingCooperativeId
			name: $name
			objectType: $objectType
			lifespan: $lifespan
			stateLevel: $stateLevel
			description: $description
			measure: $measure
			address: $address
			cost: $cost
			productionYear: $productionYear
			lastMaintained: $lastMaintained
			unitAmount: $unitAmount
			dimensions: $dimensions
			groupKey: $groupKey
			groupOrder: $groupOrder
			category: $category
			dueDate: $dueDate
		) {
			_id
			housingCooperativeId
			name
			objectType
			lifespan
			stateLevel
			description
			measure
			address
			cost
			productionYear
			lastMaintained
			unitAmount
			dimensions
			groupKey
			groupOrder
			category
			dueDate
			isActive
			categoryId
		}
	}
`;

export const UPDATE_ASSESSMENT = gql`
	mutation updateOneAssessment(
		$_id: ID!
		$name: String
		$objectType: String
		$lifespan: [String]
		$stateLevel: String
		$description: String
		$measure: String
		$address: ID
		$cost: String
		$productionYear: String
		$lastMaintained: String
		$unitAmount: String
		$createdAt: DateTime
		$dimensions: String
		$dueDate: DateTime
		$isActive: Boolean
		$isCompleted: Boolean
		$primaryImageId: ID
	) {
		updateOneAssessment(
			_id: $_id
			name: $name
			objectType: $objectType
			lifespan: $lifespan
			stateLevel: $stateLevel
			description: $description
			measure: $measure
			address: $address
			cost: $cost
			createdAt: $createdAt
			productionYear: $productionYear
			lastMaintained: $lastMaintained
			unitAmount: $unitAmount
			dimensions: $dimensions
			dueDate: $dueDate
			isActive: $isActive
			isCompleted: $isCompleted
			primaryImageId: $primaryImageId
		) {
			_id
		}
	}
`;

export const DELETE_ASSESSMENT = gql`
	mutation deleteOneAssessment($_id: ID!) {
		deleteOneAssessment(_id: $_id)
	}
`;

export const MASS_EDIT_ASSESSMENTS = gql`
	mutation massEditAssessmentCreatedAt($ids: [ID]!, $createdAt: DateTime!) {
		massEditAssessmentCreatedAt(ids: $ids, createdAt: $createdAt)
	}
`;
