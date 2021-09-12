import gql from 'graphql-tag';

export const GET_GENERAL_INFO = gql`
	query findGeneralInfo(
		$housingCooperativeId: ID!
		$_id: ID
		$policyId: String
		$name: String!
	) {
		generalInfo: findGeneralInfo(
			housingCooperativeId: $housingCooperativeId
			_id: $_id
			policyId: $policyId
			name: $name
		) {
			_id
			housingCooperativeId
			housingcooperative
			name
			policyId
			units
			plotNumberOne
			plotNumberTwo
			address
			zipCode
			buildYear
			buildMaterials
			conclusionContent
			generalContent
			costContent
			plotSize
			plotSizeBTA
			apartmentUnits
			inspectionDate
			responsible
		}
		housingCooperative: findOneHousingCooperative(
			_id: $housingCooperativeId
		) {
			_id
			title
		}
	}
`;

export const ADD_GENERAL_INFO = gql`
	mutation insertGeneralInformation(
		$housingCooperativeId: ID!
		$housingcooperative: String
		$name: String!
		$policyId: String
		$units: String
		$plotNumberOne: String
		$plotNumberTwo: String
		$address: String
		$zipCode: String
		$buildYear: String
		$buildMaterials: String
		$conclusionContent: String
		$generalContent: String
		$costContent: String
		$plotSize: String
		$plotSizeBTA: String
		$apartmentUnits: String
		$inspectionDate: String
		$responsible: String
	) {
		generalInfo: insertGeneralInfo(
			housingCooperativeId: $housingCooperativeId
			housingcooperative: $housingcooperative
			name: $name
			policyId: $policyId
			units: $units
			plotNumberOne: $plotNumberOne
			plotNumberTwo: $plotNumberTwo
			address: $address
			zipCode: $zipCode
			buildYear: $buildYear
			buildMaterials: $buildMaterials
			conclusionContent: $conclusionContent
			generalContent: $generalContent
			costContent: $costContent
			plotSize: $plotSize
			plotSizeBTA: $plotSizeBTA
			apartmentUnits: $apartmentUnits
			inspectionDate: $inspectionDate
			responsible: $responsible
		) {
			_id
			housingCooperativeId
			housingcooperative
			name
			policyId
			units
			plotNumberOne
			plotNumberTwo
			address
			zipCode
			buildYear
			buildMaterials
			conclusionContent
			generalContent
			costContent
			plotSize
			plotSizeBTA
			apartmentUnits
			inspectionDate
			responsible
		}
	}
`;

export const UPDATE_GENERAL_INFO = gql`
	mutation updateGeneralInformation(
		$_id: ID!
		$housingCooperativeId: ID!
		$housingcooperative: String
		$name: String!
		$policyId: String
		$units: String
		$plotNumberOne: String
		$plotNumberTwo: String
		$address: String
		$zipCode: String
		$buildYear: String
		$buildMaterials: String
		$conclusionContent: String
		$generalContent: String
		$costContent: String
		$plotSize: String
		$plotSizeBTA: String
		$apartmentUnits: String
		$inspectionDate: String
		$responsible: String
	) {
		updateGeneralInfo(
			_id: $_id
			housingCooperativeId: $housingCooperativeId
			housingcooperative: $housingcooperative
			name: $name
			policyId: $policyId
			units: $units
			plotNumberOne: $plotNumberOne
			plotNumberTwo: $plotNumberTwo
			address: $address
			zipCode: $zipCode
			buildYear: $buildYear
			buildMaterials: $buildMaterials
			conclusionContent: $conclusionContent
			generalContent: $generalContent
			costContent: $costContent
			plotSize: $plotSize
			plotSizeBTA: $plotSizeBTA
			apartmentUnits: $apartmentUnits
			inspectionDate: $inspectionDate
			responsible: $responsible
		) {
			_id
			housingCooperativeId
			housingcooperative
			name
			policyId
			units
			plotNumberOne
			plotNumberTwo
			address
			zipCode
			buildYear
			buildMaterials
			conclusionContent
			generalContent
			costContent
			plotSize
			plotSizeBTA
			apartmentUnits
			inspectionDate
			responsible
		}
	}
`;
