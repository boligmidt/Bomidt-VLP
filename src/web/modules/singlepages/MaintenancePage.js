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

export default function MaintenancePage() {
	const { currentHousingCooperative, isAdmin, isEditor } = useAppContext();

	const {
		data: { singlePageData: sectionOne = null } = {},
		loading: sectionOneLoading,
		error: sectionOneError,
	} = useQuery(GET_SINGLEPAGE, {
		variables: {
			housingCooperativeId: 'global',
			name: 'vedlikehold',
		},
	});

	const {
		data: { files: sectionTwo = null } = {},
		loading: sectionTwoLoading,
		error: sectionTwoError,
		refetch: sectionTwoRefetch,
	} = useQuery(GET_FILES, {
		variables: {
			housingCooperativeId: 'global',
			page: 'vedlikehold',
		},
	});

	const {
		data: { files: sectionThree = null } = {},
		loading: sectionThreeLoading,
		error: sectionThreeError,
		refetch: sectionThreeRefetch,
	} = useQuery(GET_FILES, {
		variables: {
			housingCooperativeId: currentHousingCooperative,
			page: 'vedlikehold',
		},
	});

	if (sectionOneLoading || sectionTwoLoading || sectionThreeLoading)
		return <Loading />;
	if (sectionOneError || sectionTwoError || sectionThreeError)
		return <p>Error</p>;

	return (
		<Layout>
			<PageHeader>Vedlikehold</PageHeader>
			<Section>
				<WysiwygSection
					header="Offentlig"
					doc={sectionOne}
					contentKey="content"
					housingCooperativeId="global"
					page="vedlikehold"
					userIsAdmin={isAdmin}
				/>
			</Section>

			<Section>
				<FileSection
					housingCooperativeId="global"
					page="vedlikehold"
					header="Offentlige filer"
					files={sectionTwo && sectionTwo.items}
					userIsAdmin={isAdmin}
					refetch={sectionTwoRefetch}
				/>
			</Section>

			{currentHousingCooperative && (
				<Section>
					<FileSection
						header="Personlige filer"
						housingCooperativeId={currentHousingCooperative}
						page="vedlikehold"
						files={sectionThree && sectionThree.items}
						userIsAdmin={isEditor}
						refetch={sectionThreeRefetch}
					/>
				</Section>
			)}
		</Layout>
	);
}
