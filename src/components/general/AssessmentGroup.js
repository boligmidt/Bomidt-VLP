import React from 'react';
import styled from 'styled-components';

import SingleAssessment from 'components/general/SingleAssessment';
import { useWindowDimensions } from 'web/styles/breakpoints';

const GroupWrap = styled.div`
	margin-bottom: 40px;
`;
const GroupHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;
const GroupTitle = styled.h3`
	font-size: 20px;
	font-weight: 700;
	letter-spacing: 0.2px;
	line-height: 50px;
`;
const AssessmentListHeader = styled.div`
	display: flex;
	width: 100%;
	padding: 10px 0;
	display: inline-grid;
	grid-template-columns: 1fr 1fr 3fr;
	@media (min-width: 768px) {
		grid-template-columns: 1fr 1fr 3fr 2fr 2fr 2fr;
	}
	@media (min-width: 1024px) {
		grid-template-columns: 1fr 1fr 3fr 2fr 2fr 2fr 2fr 2fr;
	}
`;
const AssessmentListHeaderColumn = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 0 25px;
	word-break: break;
`;
const SubGroupHeader = styled.h4``;

export default function AssessmentGroup({
	group,
	handleActivateAssessment,
	showExtendedAssessment = false,
	isHistory = false,
	refetchAssessments,
}) {
	const { width } = useWindowDimensions();

	return (
		<GroupWrap>
			<GroupHeader>
				<GroupTitle>{group.title}</GroupTitle>
			</GroupHeader>

			<AssessmentListHeader>
				<AssessmentListHeaderColumn>Aktiver</AssessmentListHeaderColumn>
				<AssessmentListHeaderColumn>
					Tilstands-grad
				</AssessmentListHeaderColumn>
				<AssessmentListHeaderColumn>Objekt</AssessmentListHeaderColumn>
				{width >= 768 && (
					<>
						{width >= 1024 && (
							<>
								<AssessmentListHeaderColumn>
									Kostnad inkl. mva.
								</AssessmentListHeaderColumn>
								<AssessmentListHeaderColumn>
									Mengde/enhet
								</AssessmentListHeaderColumn>
							</>
						)}
						<AssessmentListHeaderColumn>
							Opprettet
						</AssessmentListHeaderColumn>
						<AssessmentListHeaderColumn>
							Frist
						</AssessmentListHeaderColumn>
						<AssessmentListHeaderColumn>
							Bilder
						</AssessmentListHeaderColumn>
					</>
				)}
			</AssessmentListHeader>

			{group.subGroups &&
				group.subGroups.map((subGroup, s) => {
					if (subGroup && subGroup.items) {
						subGroup.items.sort((a, b) => a.index - b.index);
					}

					return (
						<div key={s}>
							{subGroup.isSeparated && (
								<SubGroupHeader>
									{subGroup.title}
								</SubGroupHeader>
							)}

							<div>
								{subGroup.items &&
									subGroup.items.map(item => (
										<SingleAssessment
											key={item._id}
											handleActivateAssessment={item =>
												handleActivateAssessment(item)
											}
											showExtendedAssessment={
												showExtendedAssessment
											}
											refetchAssessments={
												refetchAssessments
											}
											isHistory={isHistory}
											{...item}
										/>
									))}
							</div>
						</div>
					);
				})}
		</GroupWrap>
	);
}
