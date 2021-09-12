import gql from 'graphql-tag';

export const GET_SINGLEPAGE = gql`
	query findOneSinglePage($housingCooperativeId: ID!, $name: String!) {
		singlePageData: findOneSinglePage(
			housingCooperativeId: $housingCooperativeId
			name: $name
		) {
			_id
			housingCooperativeId
			name
			content
			contentTwo
			policyId
			housingcooperative
			units
			plotNumberOne
			plotNumberTwo
			address
			zipCode
			buildYear
			buildMaterials
		}
	}
`;

export const NEW_SINGLEPAGE = gql`
	mutation newSinglePage(
		$housingCooperativeId: ID!
		$name: String!
		$content: String
		$contentTwo: String
		$policyId: String
		$housingcooperative: String
		$units: String
		$plotNumberOne: String
		$plotNumberTwo: String
		$address: String
		$zipCode: String
		$buildYear: String
		$buildMaterials: String
	) {
		insertOneSinglePage(
			housingCooperativeId: $housingCooperativeId
			name: $name
			content: $content
			contentTwo: $contentTwo
			policyId: $policyId
			housingcooperative: $housingcooperative
			units: $units
			plotNumberOne: $plotNumberOne
			plotNumberTwo: $plotNumberTwo
			address: $address
			zipCode: $zipCode
			buildYear: $buildYear
			buildMaterials: $buildMaterials
		) {
			housingCooperativeId
			name
			content
			contentTwo
			policyId
			housingcooperative
			units
			plotNumberOne
			plotNumberTwo
			address
			zipCode
			buildYear
			buildMaterials
		}
	}
`;

export const EDIT_SINGLEPAGE = gql`
	mutation editOneSinglePage(
		$_id: ID!
		$housingCooperativeId: ID!
		$name: String!
		$content: String
		$contentTwo: String
		$policyId: String
		$housingcooperative: String
		$units: String
		$plotNumberOne: String
		$plotNumberTwo: String
		$address: String
		$zipCode: String
		$buildYear: String
		$buildMaterials: String
	) {
		updateOneSinglePage(
			_id: $_id
			housingCooperativeId: $housingCooperativeId
			name: $name
			content: $content
			contentTwo: $contentTwo
			policyId: $policyId
			housingcooperative: $housingcooperative
			units: $units
			plotNumberOne: $plotNumberOne
			plotNumberTwo: $plotNumberTwo
			address: $address
			zipCode: $zipCode
			buildYear: $buildYear
			buildMaterials: $buildMaterials
		) {
			_id
			housingCooperativeId
			name
			content
			contentTwo
			policyId
			housingcooperative
			units
			plotNumberOne
			plotNumberTwo
			address
			zipCode
			buildYear
			buildMaterials
		}
	}
`;
