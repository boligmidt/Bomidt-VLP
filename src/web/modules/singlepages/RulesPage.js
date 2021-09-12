import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useAppContext } from 'web/lib/AppProvider';

// components
import Layout from 'components/layout/Layout';
import PageHeader from 'components/general/PageHeader';
import Loading from 'components/general/Loading';
import FileSection from 'web/modules/singlepages/FileSection';
import { Section } from 'components/general/Section';
// queries
import { GET_FILES } from 'api/Files';

export default function RulesPage() {
	const { isAdmin, isEditor, currentHousingCooperative } = useAppContext();
	const {
		data: { files: sectionOne = null } = {},
		loading: sectionOneLoading,
		error: sectionOneError,
		refetch: sectionOneRefetch,
	} = useQuery(GET_FILES, {
		variables: {
			housingCooperativeId: 'global',
			page: 'tekniske',
		},
	});

	const {
		data: { files: sectionTwo = null } = {},
		loading: sectionTwoLoading,
		error: sectionTwoError,
		refetch: sectionTwoRefetch,
	} = useQuery(GET_FILES, {
		variables: {
			housingCooperativeId: currentHousingCooperative,
			page: 'tekniske',
		},
	});

	if (sectionOneLoading || sectionTwoLoading) return <Loading />;
	if (sectionOneError || sectionTwoError) return <p>Error</p>;

	return (
		<Layout>
			<PageHeader>Tekniske forskrifter og tegninger</PageHeader>
			<Section>
				<FileSection
					header="Offentlige regler / tegninger"
					housingCooperativeId="global"
					page="tekniske"
					files={sectionOne && sectionOne.items}
					userIsAdmin={isAdmin}
					refetch={sectionOneRefetch}
				/>
			</Section>

			{currentHousingCooperative && (
				<Section>
					<FileSection
						header="Lokale regler / tegninger"
						housingCooperativeId={currentHousingCooperative}
						page="tekniske"
						files={sectionTwo && sectionTwo.items}
						userIsAdmin={isEditor}
						refetch={sectionTwoRefetch}
					/>
				</Section>
			)}
		</Layout>
	);
}
