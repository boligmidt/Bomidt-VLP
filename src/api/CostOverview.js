import gql from 'graphql-tag';

export const GET_ASSESSMENTS = gql`
	query getAssessments(
		$housingCooperativeId: ID!
		$isActive: Boolean
		$search: String
		$address: ID
	) {
		assessments: findAssessments(
			housingCooperativeId: $housingCooperativeId
			isActive: $isActive
			search: $search
			address: $address
		) {
			items {
				_id
				housingCooperativeId
				name
				description
				address
				addressName
				stateLevel
				objectType
				lifespan
				measure
				cost
				productionYear
				dimensions
				unitAmount
				groupKey
				groupOrder
				dueDate
				isActive
			}
		}
	}
`;
