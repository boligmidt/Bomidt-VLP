import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useAppContext } from 'web/lib/AppProvider';

// components
import Layout from 'components/layout/Layout';
import PageHeader from 'components/general/PageHeader';
import Loading from 'components/general/Loading';
import { Section } from 'components/general/Section';
import WysiwygSection from 'web/modules/singlepages/wysiwygSection';
import FileSection from 'web/modules/singlepages/FileSection';

// queries
import { GET_SINGLEPAGE } from 'api/SinglePages';
import { GET_FILES } from 'api/Files';

export default function DealsPage() {
	const { currentHousingCooperative, isAdmin, isEditor } = useAppContext();

	const {
		data: { singlePageData: sectionOne = null } = {},
		loading: sectionOneLoading,
		error: sectionOneError,
	} = useQuery(GET_SINGLEPAGE, {
		variables: {
			housingCooperativeId: 'global',
			name: 'avtaler',
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
			page: 'avtaler-images',
		},
	});

	const {
		data: { files: sectionFour = null } = {},
		loading: sectionFourLoading,
		error: sectionFourError,
		refetch: sectionFourRefetch,
	} = useQuery(GET_FILES, {
		variables: {
			housingCooperativeId: currentHousingCooperative,
			page: 'avtaler-images',
		},
	});

	const {
		data: { singlePageData: sectionThree = null } = {},
		loading: sectionThreeLoading,
		error: sectionThreeError,
	} = useQuery(GET_SINGLEPAGE, {
		variables: {
			housingCooperativeId: currentHousingCooperative,
			name: 'avtaler',
		},
	});

	if (
		sectionOneLoading ||
		sectionTwoLoading ||
		sectionThreeLoading ||
		sectionFourLoading
	)
		return <Loading />;
	if (
		sectionOneError ||
		sectionTwoError ||
		sectionThreeError ||
		sectionFourError
	)
		return <p>Error</p>;
	return (
		<Layout>
			<PageHeader>Avtaler</PageHeader>
			<Section>
				<WysiwygSection
					header="Offentlig"
					doc={sectionOne}
					contentKey="contentTwo"
					housingCooperativeId="global"
					name="avtaler"
					userIsAdmin={isAdmin}
				/>
			</Section>

			<Section>
				<FileSection
					header="Offentlige filer"
					page="avtaler-images"
					housingCooperativeId="global"
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
						page="avtaler-images"
						files={sectionFour && sectionFour.items}
						userIsAdmin={isEditor}
						refetch={sectionFourRefetch}
					/>
				</Section>
			)}

			{currentHousingCooperative && (
				<Section>
					<WysiwygSection
						header="Personlig"
						doc={sectionThree}
						contentKey="content"
						housingCooperativeId={currentHousingCooperative}
						name="avtaler"
						userIsAdmin={isEditor}
					/>
				</Section>
			)}
		</Layout>
	);
}
