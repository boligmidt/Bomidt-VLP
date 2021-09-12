import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { useAppContext } from 'web/lib/AppProvider';
import { UPDATE_ASSESSMENT, GET_ASSESSMENTS } from 'api/Assessments';
import Layout from 'components/layout/Layout';
import { AddButton, PrintButton } from 'components/general/Buttons';
import PageHeader from 'components/general/PageHeader';
import Loading from 'components/general/Loading';
import StateLevelFilter from 'components/general/StateLevels';
import AssessmentGroup from 'components/general/AssessmentGroup';

export default function ImprovementPlan({ history }) {
	const {
		currentHousingCooperative,
		search,
		address,
		isAdmin,
	} = useAppContext();
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
			variables: {
				housingCooperativeId: currentHousingCooperative || '',
				stateLevel: filterArray,
				isActive: true,
				orderBy: 'dueDate',
				search,
				address,
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

	useEffect(() => {
		refetchAssessments();
	}, [search, address]);

	if (error) return <p>error</p>;

	return (
		<Layout hasSearch hasAddressSelect>
			<StateLevelFilter
				active={filterArray}
				handleFilterClick={handleFilterClick}
			/>

			<PageHeader
				rightColumn={
					<div
						style={{
							display: 'flex',
							justifyContent: 'flex-end',
						}}>
						<PrintButton
							onClick={() =>
								history.push('/print/vedlikeholdsplan')
							}
						/>
					</div>
				}>
				Vedlikeholdsplan 10 år
			</PageHeader>

			{loading || (!data && <Loading />)}

			{data &&
				data.assessmentGroups &&
				data.assessmentGroups.map((group, g) => (
					<AssessmentGroup
						key={g}
						handleActivateAssessment={handleActivateAssessment}
						refetchAssessments={refetchAssessments}
						group={group}
						showExtendedAssessment
					/>
				))}

			{isAdmin && (
				<AddButton
					onClick={() => history.push(`/tilstandsvurdering/ny/`)}
				/>
			)}
		</Layout>
	);
}
