import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { useAppContext } from 'web/lib/AppProvider';
import { printAllAssessmentGroups } from 'web/lib/print';
import { UPDATE_ASSESSMENT, GET_ASSESSMENTS } from 'api/Assessments';
import Layout from 'components/layout/Layout';
import { PrintButton } from 'components/general/Buttons';
import PageHeader from 'components/general/PageHeader';
import Loading from 'components/general/Loading';
import StateLevelFilter from 'components/general/StateLevels';
import AssessmentGroup from 'components/general/AssessmentGroup';

export default function CostOverviewYear({ year }) {
	const { currentHousingCooperative, search } = useAppContext();
	const [updateOneAssessment] = useMutation(UPDATE_ASSESSMENT);

	const [activeFilters, setActiveFilters] = useState({
		tgiu: true,
		tg0: true,
		tg1: true,
		tg2: true,
		tg3: true,
	});

	function handleFilterClick(filter) {
		setActiveFilters({
			...activeFilters,
			[filter]: !activeFilters[filter],
		});
	}

	const filterArray = Object.keys(activeFilters).filter(
		key => activeFilters[key]
	);

	const { loading, error, data, refetch: refetchAssessments } = useQuery(
		GET_ASSESSMENTS,
		{
			fetchPolicy: 'network-only',
			variables: {
				housingCooperativeId: currentHousingCooperative || '',
				isActive: true,
				orderBy: 'dueDate',
				year: parseInt(year),
				search,
			},
		}
	);

	async function handleActivateAssessment(item) {
		await updateOneAssessment({
			variables: {
				_id: item._id,
				isActive: false,
			},
		});

		await refetchAssessments();
	}

	if (error) return <p>error</p>;

	return (
		<Layout hasSearch>
			<StateLevelFilter
				active={filterArray}
				handleFilterClick={handleFilterClick}
			/>

			<PageHeader
				rightColumn={
					<PrintButton
						onClick={() =>
							printAllAssessmentGroups(data.assessmentGroups)
						}
					/>
				}>
				Kostnadsoversikt {year}
			</PageHeader>

			{loading || (!data && <Loading />)}

			{data &&
				data.assessmentGroups &&
				data.assessmentGroups.map((group, g) => (
					<AssessmentGroup
						key={g}
						handleActivateAssessment={handleActivateAssessment}
						group={group}
					/>
				))}
		</Layout>
	);
}
