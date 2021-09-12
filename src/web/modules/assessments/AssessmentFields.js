import React from 'react';
import InputField from 'components/forms/InputField';
import SubmitButton from 'components/forms/SubmitButton';

export default function AssessmentFields() {
	return (
		<>
			<InputField name="name" label="Navn" required />
			<InputField name="objectType" label="Objekt type" />
			{/* <InputField name="lifespan" label="Levetid"  /> Disabled due to strange dataType*/}
			<InputField name="stateLevel" label="Tilstand" />
			<InputField name="description" label="Beskrivelse" />
			<InputField name="measure" label="Mål" />
			<InputField name="address" label="Adresse" />
			<InputField name="cost" label="Kostnad" />
			<InputField name="productionYear" label="Produksjones år" />
			<InputField
				name="lastMaintained"
				label="Sist vedlikeholdt"
				type="date"
			/>
			<InputField name="unitAmount" label="Antall enheter" />
			<InputField name="dimensions" label="Dimensjoner" />
			<InputField name="groupKey" label="Gruppe" type="number" />
			<InputField name="groupOrder" label="Rekkefølge" type="number" />
			<InputField name="category" label="Kategori" />
			<InputField name="dueDate" label="Frist" type="date" />
			<SubmitButton>Lagre</SubmitButton>
		</>
	);
}
