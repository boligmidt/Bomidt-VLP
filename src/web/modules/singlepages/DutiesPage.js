import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useAppContext } from 'web/lib/AppProvider';

// components
import Layout from 'components/layout/Layout';
import PageHeader from 'components/general/PageHeader';
import Loading from 'components/general/Loading';
import WysiwygSection from 'web/modules/singlepages/wysiwygSection';
import FileSection from 'web/modules/singlepages/FileSection';
import { Section } from 'components/general/Section';

// queries
import { GET_SINGLEPAGE } from 'api/SinglePages';
import { GET_FILES } from 'api/Files';

export default function DutiesPage() {
	const { currentHousingCooperative, isAdmin, isEditor } = useAppContext();
	const {
		data: { files: sectionOne = null } = {},
		loading: sectionOneLoading,
		error: sectionOneError,
		refetch: sectionOneRefetch,
	} = useQuery(GET_FILES, {
		variables: {
			housingCooperativeId: 'global',
			page: 'vedlikeholdsplikt-images',
			docId: 'vedlikeholdsplikt',
		},
	});

	const {
		data: { singlePageData: sectionTwo = null } = {},
		loading: sectionTwoLoading,
		error: sectionTwoError,
	} = useQuery(GET_SINGLEPAGE, {
		variables: {
			housingCooperativeId: 'global',
			name: 'vedlikeholdsplikt',
		},
	});

	const {
		data: { singlePageData: sectionThree = null } = {},
		loading: sectionThreeLoading,
		error: sectionThreeError,
	} = useQuery(GET_SINGLEPAGE, {
		variables: {
			housingCooperativeId: currentHousingCooperative,
			name: 'vedlikeholdsplikt',
		},
	});

	if (sectionOneLoading || sectionTwoLoading || sectionThreeLoading)
		return <Loading />;
	if (sectionOneError || sectionTwoError || sectionThreeError)
		return <p>Error</p>;

	return (
		<Layout>
			<PageHeader>Lagets vedlikeholdsplikt</PageHeader>
			<Section>
				<FileSection
					header="Offentlige filer"
					housingCooperativeId="global"
					page="vedlikeholdsplikt-images"
					docId="vedlikeholdsplikt"
					files={sectionOne && sectionOne.items}
					userIsAdmin={isAdmin}
					refetch={sectionOneRefetch}
				/>
			</Section>

			<Section>
				<WysiwygSection
					header="Offentlig"
					doc={sectionTwo}
					contentKey="contentTwo"
					housingCooperativeId="global"
					name="vedlikeholdsplikt"
					userIsAdmin={isAdmin}
				/>
			</Section>

			{currentHousingCooperative && (
				<Section>
					<WysiwygSection
						header="Generell informasjon"
						doc={sectionThree}
						contentKey="content"
						housingCooperativeId={currentHousingCooperative}
						name="vedlikeholdsplikt"
						userIsAdmin={isEditor}
					/>
				</Section>
			)}
		</Layout>
	);
}
