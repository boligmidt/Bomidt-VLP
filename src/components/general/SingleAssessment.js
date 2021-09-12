import React, { useState, useEffect, useRef } from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { useMutation } from '@apollo/react-hooks';

import Toggle from 'components/general/Toggle';
import ExpandableRow from 'components/general/ExpandableRow';
import { StateLevelTag } from 'components/general/StateLevels';
import DateWithIcon from 'components/general/DateWithIcon';
import OpenAssessment from 'components/general/SingleAssessmentOpen';
import Confirm from 'components/general/Confirm';
import circle1 from 'assets/images/circle-1.png';
import circle2 from 'assets/images/circle-2.png';
import { DELETE_ASSESSMENT } from 'api/Assessments';
import { useAppContext } from 'web/lib/AppProvider';
import { useWindowDimensions } from 'web/styles/breakpoints';
import Select from 'components/general/Select';
import { getYearOptions, getMonthOptions } from 'web/lib/helpers';

const Row = styled.div`
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
const Column = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	border-right: 1px solid #e7f5f8;
	height: 50px;
	padding: 0 25px;
`;
const Name = styled.div`
	color: ${p => p.theme.colors.blue};
	font-size: 16px;
	font-weight: 700;
	letter-spacing: 0.16px;
	line-height: 22px;
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
`;
const CircleWrap = styled.div`
	background-image: url(${p => p.image});
	background-repeat: no-repeat;
	background-position: center;
	background-size: 40px 40px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	text-align: center;
	min-height: 40px;
	min-width: 40px;
	font-size: 18px;
	font-weight: 700;
	letter-spacing: 0.16px;
	line-height: 22px;
	color: ${p => p.theme.colors.blue};
`;

const ImagesCircleWrap = styled.div`
	background-image: url(${p => p.src});
	background-color: ${p => p.theme.colors.darkGray};
	background-position: center;
	background-size: cover;
	width: 40px;
	padding-bottom: 40px;
	position: relative;
	border-radius: 50%;
`;
const ImagesCounter = styled.div`
	position: absolute;
	top: -4px;
	right: -6px;
	background: ${p => p.theme.colors.pink};
	text-align: center;
	color: white;
	font-size: ${p => p.theme.remCalc(12)};
	font-weight: 700;
	line-height: 15px;
	border-radius: 50%;
	width: 18px;
	height: 18px;
	border: 2px solid white;
`;
function ImagesCircle({ images = [], primaryImageId }) {
	let imageSrc = '';
	var timestamp = new Date().getTime();

	if (images && images.length) {
		images.filter(image =>
			image.fileType ? image.fileType.includes('image') : false
		);
		imageSrc = images[0].fileUrl + '?t=' + timestamp;

		if (primaryImageId) {
			images.forEach(image => {
				if (image._id === primaryImageId) {
					imageSrc = image.fileUrl + '?t=' + timestamp;
				}
			});
		}
	}

	return (
		<ImagesCircleWrap src={imageSrc}>
			<ImagesCounter>{images.length}</ImagesCounter>
		</ImagesCircleWrap>
	);
}

export default function SingleAssessment({
	showExtendedAssessment,
	refetchAssessments,
	handleUpload,
	isHistory = false,
	isFreshDuplicate = false,
	...props
}) {
	const [dueDateMonth, setDueDateMonth] = useState(
		props.dueDate ? moment(props.dueDate).format('M') : null
	);
	const [dueDateYear, setDueDateYear] = useState(
		props.dueDate ? moment(props.dueDate).format('YYYY') : null
	);

	const [showConfirm, setShowConfirm] = useState(false);
	const { isGlobalAdmin, isAdmin, isEditor, isUser } = useAppContext();
	const { width } = useWindowDimensions();

	const assessmentRef = useRef(null);
	const [isOpen, setIsOpen] = useState(false);

	const [deleteAssessment] = useMutation(DELETE_ASSESSMENT);

	useEffect(() => {
		setDueDateMonth(moment(props.dueDate).format('M'));
		setDueDateYear(moment(props.dueDate).format('YYYY'));
	}, [props.dueDate]);

	function handleAssessmentOpen(open) {
		setIsOpen(open);
	}

	async function handleDeleteAssessment() {
		setIsOpen(false);

		await deleteAssessment({
			variables: {
				_id: props._id,
			},
		});
	}

	return (
		<div ref={assessmentRef}>
			<ExpandableRow
				isOpen={
					isOpen && (isGlobalAdmin || isAdmin || isEditor || isUser)
				}
				handleOpen={() => handleAssessmentOpen(!isOpen)}
				closeAction={refetchAssessments}
				dim={isFreshDuplicate}
				keepClosedContent
				closedContent={
					<Row>
						<Column>
							<Toggle
								isChecked={props.isActive}
								ariaLabel="Aktiver"
								onToggle={() => {
									if (!props.isActive) {
										setShowConfirm(true);
									} else {
										props.handleActivateAssessment(props);
									}
								}}
								disabled={!isAdmin}
							/>
						</Column>
						<Column>
							<StateLevelTag stateLevel={props.stateLevel} />
						</Column>
						<Column
							style={{
								overflow: 'hidden',
							}}>
							<Name>{props.name}</Name>
						</Column>
						{width >= 768 && (
							<>
								{width >= 1024 && (
									<>
										<Column>
											<CircleWrap image={circle1}>
												{props.cost}
											</CircleWrap>
										</Column>
										<Column>
											<CircleWrap image={circle2}>
												{props.unitAmount}
											</CircleWrap>
										</Column>
									</>
								)}
								<Column>
									<DateWithIcon
										date={moment(props.createdAt).format(
											'YYYY/MM/DD'
										)}
									/>
								</Column>
								<Column>
									<DateWithIcon
										date={
											props.dueDate &&
											moment(props.dueDate).format(
												'YYYY/MM'
											)
										}
									/>
								</Column>
								<Column>
									<ImagesCircle
										images={props.files}
										primaryImageId={props.primaryImageId}
									/>
								</Column>
							</>
						)}
					</Row>
				}>
				<OpenAssessment
					handleUpload={handleUpload}
					closeAssessment={() => handleAssessmentOpen(false)}
					handleDeleteAssessment={handleDeleteAssessment}
					showExtendedAssessment={showExtendedAssessment}
					refetchAssessments={refetchAssessments}
					canEdit={isAdmin}
					isHistory={isHistory}
					{...props}
				/>
			</ExpandableRow>

			{showConfirm && (
				<Confirm
					modal={showConfirm}
					toggleModal={async () => {
						await refetchAssessments();
						setShowConfirm(false);
					}}
					confirm={() => {
						if (!props.dueDate && !dueDateMonth && !dueDateYear) {
							alert('Frist mangler');
							return;
						}
						const date = `${dueDateYear}${moment(
							dueDateMonth,
							'M'
						).format('MM')}`;

						const dueDate = moment(date, 'YYYYMM');
						props.handleActivateAssessment({ ...props, dueDate });
						setShowConfirm(false);
					}}
					confirmLabel="Lagre"
					cancelLabel="Avbryt">
					<h3 style={{ textAlign: 'center' }}>Set frist</h3>
					<Select
						name="dueDateMonth"
						placeholder="Velg måned"
						options={getMonthOptions()}
						onSelect={value => setDueDateMonth(value)}
						defaultValue={
							props.dueDate ? parseInt(dueDateMonth) : null
						}
					/>
					<Select
						name="dueDateYear"
						placeholder="Velg år"
						options={getYearOptions()}
						onSelect={value => setDueDateYear(value)}
						defaultValue={
							props.dueDate ? parseInt(dueDateYear) : null
						}
					/>
				</Confirm>
			)}
		</div>
	);
}
