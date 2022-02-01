import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';

import {
	GET_ASSESSMENTS,
	UPDATE_ASSESSMENT,
	MASS_EDIT_ASSESSMENTS,
} from 'api/Assessments';
import { useAppContext } from 'web/lib/AppProvider';
import Layout from 'components/layout/Layout';
import { PrintButton, AddButton } from 'components/general/Buttons';
import MassDateEditButton from 'components/general/MassDateEditButton';
import PageHeader from 'components/general/PageHeader';
import Loading from 'components/general/Loading';
import StateLevelFilter from 'components/general/StateLevels';
import AssessmentGroup from 'components/general/AssessmentGroup';

export default function ListAssessments({ history }) {
	const {
		currentHousingCooperative,
		search,
		address,
		isAdmin,
	} = useAppContext();
	const [updateOneAssessment] = useMutation(UPDATE_ASSESSMENT);
	const [massEditAssessments] = useMutation(MASS_EDIT_ASSESSMENTS);

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
				orderBy: 'groupOrder',
				address,
				search,
			},
		}
	);

	async function handleActivateAssessment(item) {
		await updateOneAssessment({
			variables: {
				_id: item._id,
				isActive: !item.isActive,
				dueDate: item.dueDate,
			},
		});

		await refetchAssessments();
	}

	async function handleMassEdit(date) {
		let assessmentIds = [];
		data.assessmentGroups.forEach(group => {
			group.subGroups.forEach(subGroup => {
				subGroup.items.forEach(item => {
					if (!assessmentIds.includes(item._id))
						assessmentIds.push(item._id);
				});
			});
		});

		await massEditAssessments({
			variables: {
				ids: assessmentIds,
				createdAt: date,
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
							flexDirection: 'column',
							alignItems: 'flex-end',
						}}>
						<PrintButton
							onClick={() =>
								history.push('/print/tilstandsvurderinger')
							}
						/>

						{isAdmin && (
							<MassDateEditButton
								handleExecution={handleMassEdit}
							/>
						)}
					</div>
				}>
				Tilstandsvurderinger
			</PageHeader>

			{loading && <Loading />}

			{data &&
				data.assessmentGroups &&
				data.assessmentGroups.map((group, g) => (
					<AssessmentGroup
						key={g}
						handleActivateAssessment={handleActivateAssessment}
						refetchAssessments={refetchAssessments}
						group={group}
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
