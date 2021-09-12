import React from 'react';
import InputField from 'components/forms/InputField';
import SubmitButton from 'components/forms/SubmitButton';

export default function GeneralInfoFields(isAdmin) {
	return (
		<>
			<InputField name="policyId" label="Polisenr:" disabled={!isAdmin} />

			<InputField
				name="housingcooperative"
				label="Boligselskap:"
				disabled={!isAdmin}
			/>

			<InputField name="address" label="Adresse:" disabled={!isAdmin} />

			<InputField
				name="plotNumberOne"
				label="Gårdsnr:"
				disabled={!isAdmin}
			/>

			<InputField
				name="plotNumberTwo"
				label="Bruksnr:"
				disabled={!isAdmin}
			/>

			<InputField
				name="zipCode"
				label="Postnummer og sted:"
				disabled={!isAdmin}
			/>

			<InputField
				name="units"
				label="Antall bygninger:"
				disabled={!isAdmin}
			/>

			<InputField
				name="apartmentUnits"
				label="Antall leiligheter:"
				disabled={!isAdmin}
			/>

			<InputField
				name="plotSize"
				label="Tomtareal m2:"
				disabled={!isAdmin}
			/>

			<InputField
				name="plotSizeBTA"
				label="Bruttoareal (BTA) m2:"
				disabled={!isAdmin}
			/>

			<InputField
				name="inspectionDate"
				label="Befaringsdato:"
				disabled={!isAdmin}
			/>

			<InputField
				name="responsible"
				label="Ansvarlig:"
				disabled={!isAdmin}
			/>

			<InputField name="buildYear" label="Byggeår:" disabled={!isAdmin} />

			<InputField
				name="buildMaterials"
				label="Byggematerialer (hovedbestanddeler):"
				disabled={!isAdmin}
			/>

			<InputField
				name="conclusionContent"
				label="Hovedkonklusjon (makslengde 600 tegn):"
				type="textarea"
				inputProps={{ maxLength: 600 }}
				disabled={!isAdmin}
				rows="6"
			/>

			<SubmitButton>Lagre</SubmitButton>
		</>
	);
}
