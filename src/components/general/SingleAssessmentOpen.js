import React, { useState } from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { StateLevelSelect } from 'components/general/StateLevels';
import Select from 'components/general/Select';
import DatePicker from 'components/general/DatePicker';
import ExtendedAssessment from 'components/general/SingleAssessmentExtended';
import SelectMultiple from 'components/general/SelectMultiple';
import { IconButton } from 'components/general/Buttons';
import ImageList from 'components/general/ImageList';
import Confirm from 'components/general/Confirm';
import { getYearOptions, getMonthOptions } from 'web/lib/helpers';
import { GET_ASSESSMENT, UPDATE_ASSESSMENT } from 'api/Assessments';
import { GET_HOUSINGCOOPERATIVE_ADDRESSES } from 'api/Addresses';
import { GET_ACTIVITIES } from 'api/Activities';
import { UPDATE_FILE } from 'api/Files';
import theme from 'web/styles/theme';
import { printAssessment } from 'web/lib/print';

export default function OpenAssessment({
	refetchAssessments,
	showExtendedAssessment,
	closeAssessment,
	handleDeleteAssessment,
	canEdit,
	isHistory = false,
	...props
}) {
	const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
	const { data, loading, refetch: refetchAssessment } = useQuery(
		GET_ASSESSMENT,
		{
			fetchPolicy: 'network-only',
			variables: {
				_id: props._id,
				categoryId: props.categoryId,
			},
		}
	);

	const {
		data: { addresses = [] } = {},
		loadingAddresses,
		refetch: refetchAddresses,
	} = useQuery(GET_HOUSINGCOOPERATIVE_ADDRESSES, {
		variables: { housingCooperativeId: props.housingCooperativeId },
	});

	const [updateAssessment] = useMutation(UPDATE_ASSESSMENT);
	const [updateFile] = useMutation(UPDATE_FILE);
	var refresh = false;
	async function updateAssessmentSubmit(event) {
		event.preventDefault();
		event.stopPropagation();
		
		const assessmentObject = {
			dueDate: moment(
				`${event.target.dueDateYear.value}${event.target.dueDateMonth.value}`,
				'YYYYMM'
			),
		};
		const preloadImage = src =>
			new Promise(r => {
				const image = new Image()
				image.onload = r
				image.onerror = r
				image.src = src
			})

		if (!props.isActive) {
			assessmentObject.dueDate = null;
		}

		const filesObject = {};

		Object.keys(event.target).forEach(key => {
			let name = event.target[key].name;
			let value = event.target[key].value;
			if (!name || name.includes('dueDate')) return;

			if (name.includes('files')) {
				filesObject[event.target[key].dataset.fileid] =
					event.target[key].value;

				return;
			}

			if (name === 'lifespan' && value && value.includes('|')) {
				value = value.split('|');
			}

			if (name === 'createdAt') {
				value = moment(value, 'x');
			}

			assessmentObject[name] = value;
		});

		assessmentObject.isCompleted = isHistory;

		if (Object.keys(assessmentObject).length) {
			await updateAssessment({
				variables: { ...assessmentObject, _id: props._id },
				refetchQueries: [
					{
						query: GET_ACTIVITIES,
						variables: {
							assessmentId: props._id,
						},
					},
				],
			});
		}

		if (Object.keys(filesObject).length) {
			Object.keys(filesObject).forEach(async fileId => {
				await updateFile({
					variables: { _id: fileId, fileName: filesObject[fileId] },
				});
			});
		}
		await refetchAssessment();

		await closeAssessment();

		return;
	}

	async function deactivateAssessmentClick() {
		await updateAssessment({
			variables: { _id: props._id, isActive: false },
		});

		await closeAssessment();
	}

	async function completeAssessmentClick() {
		const proceed = confirm('Er du sikker?');

		if (!proceed) return;

		await updateAssessment({
			variables: { _id: props._id, isCompleted: true },
		});

		await closeAssessment();
	}

	if (loading || loadingAddresses || !data) return null;

	const { assessment, category } = data;

	return (
		<>
			<form onSubmit={updateAssessmentSubmit}>
				<FormRow>
					<Field label="Objekt">
						<Input
							type="text"
							name="name"
							disabled={!canEdit}
							defaultValue={assessment.name}
						/>
					</Field>
					<Field label="Tilstandsgrad">
						<StateLevelSelect
							onSelect={() => {}}
							disabled={!canEdit}
							defaultValue={assessment.stateLevel}
						/>
					</Field>
				</FormRow>
				<FormRow>
					<Field label="Frist: År">
						<Select
							name="dueDateYear"
							placeholder="Velg år"
							options={getYearOptions()}
							disabled={!canEdit}
							defaultValue={
								parseInt(
									moment(assessment.dueDate).format('YYYY')
								) || false
							}
						/>
					</Field>
					<Field label="Frist: Måned">
						<Select
							name="dueDateMonth"
							placeholder="Velg måned"
							options={getMonthOptions()}
							disabled={!canEdit}
							defaultValue={
								parseInt(
									moment(assessment.dueDate).format('M')
								) || false
							}
						/>
					</Field>
					<Field label="Opprettelsesdato">
						<DatePicker
							name="createdAt"
							disabled={!canEdit}
							defaultValue={moment(assessment.createdAt)}
						/>
					</Field>
				</FormRow>
				<FormRow>
					<Field label="Tilstandsbeskrivelse">
						<Input
							type="text"
							name="description"
							disabled={!canEdit}
							defaultValue={assessment.description}
						/>
					</Field>
				</FormRow>
				<FormRow>
					<Field label="Tiltak">
						<Input
							type="text"
							name="measure"
							disabled={!canEdit}
							defaultValue={assessment.measure}
						/>
					</Field>
				</FormRow>
				{assessment.lifespan || category ? (
					<FormRow>
						<Field label="Levetider" style={{ maxWidth: '100%' }}>
							<SelectMultiple
								name="lifespan"
								disabled={!canEdit}
								defaultValue={assessment.lifespan}
								options={
									category && category.lifeSpans
										? category.lifeSpans.map(
												item => item.name
										  )
										: []
								}
							/>
						</Field>
					</FormRow>
				) : null}
				<FormRow>
					<Field label="Adresse">
						<Select
							name="address"
							placeholder="Velg adresse"
							options={addresses}
							disabled={!canEdit}
							defaultValue={assessment.address}
						/>
					</Field>
				</FormRow>
				<FormRow>
					<Field label="Kostnad inkl. mva.">
						<Input
							type="text"
							name="cost"
							disabled={!canEdit}
							defaultValue={assessment.cost}
						/>
					</Field>
					<Field label="Mengde, Enhet">
						<Input
							type="text"
							name="unitAmount"
							disabled={!canEdit}
							defaultValue={assessment.unitAmount}
						/>
					</Field>
					<Field label="Dimensjoner">
						<Input
							type="text"
							name="dimensions"
							disabled={!canEdit}
							defaultValue={assessment.dimensions}
						/>
					</Field>
				</FormRow>
				<FormRow>
					<Field label="Produksjonsår">
						<Input
							type="text"
							name="productionYear"
							disabled={!canEdit}
							defaultValue={assessment.productionYear}
						/>
					</Field>
					<Field label="Sist vedlikeholdt">
						<Input
							type="text"
							name="lastMaintained"
							disabled={!canEdit}
							defaultValue={assessment.lastMaintained}
						/>
					</Field>
				</FormRow>
				<FormRow>
					<Field>
						<ImageList
							docId={props._id}
							primaryImageId={assessment.primaryImageId}
							disabled={!canEdit}
						/>
					</Field>
				</FormRow>

				{canEdit && (
					<FormActions>
						<IconButton
							label="Slett"
							iconProps={{
								icon: 'trash-alt',
								solid: true,
								size: 'sm',
							}}
							backgroundColor="transparent"
							hoverBackgroundColor={theme.colors.pink}
							borderColor={theme.colors.pink}
							hoverBorderColor={theme.colors.pink}
							color={theme.colors.pink}
							hoverColor="white"
							onClick={e => {
								e.preventDefault();
								e.stopPropagation();
								setShowDeleteConfirm(true);
							}}
							type="button"
						/>

						<IconButton
							label="Skriv ut"
							iconProps={{
								icon: 'print',
								solid: true,
								size: 'sm',
							}}
							backgroundColor="transparent"
							hoverBackgroundColor={theme.colors.blue}
							borderColor={theme.colors.blue}
							hoverBorderColor={theme.colors.blue}
							color={theme.colors.blue}
							hoverColor="white"
							style={{ marginLeft: 'auto', marginRight: '1rem' }}
							onClick={e => {
								e.preventDefault();
								e.stopPropagation();
								printAssessment(props);
							}}
							type="button"
						/>

						<IconButton
							label="Lagre"
							iconProps={{
								icon: 'save',
								solid: true,
								size: 'sm',
							}}
							backgroundColor="transparent"
							hoverBackgroundColor={theme.colors.blue}
							borderColor={theme.colors.blue}
							hoverBorderColor={theme.colors.blue}
							color={theme.colors.blue}
							hoverColor="white"
							type="submit"
						/>
					</FormActions>
				)}
			</form>

			{showDeleteConfirm && (
				<Confirm
					modal={showDeleteConfirm}
					toggleModal={() => setShowDeleteConfirm(false)}
					confirm={() => handleDeleteAssessment()}
				/>
			)}

			{showExtendedAssessment && (
				<ExtendedAssessment
					{...assessment}
					deactivateAssessmentClick={deactivateAssessmentClick}
					completeAssessmentClick={completeAssessmentClick}
					refetchAssessment={refetchAssessment}
				/>
			)}
		</>
	);
}

const FormActions = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 15px 15px;
`;
export const FormRow = styled.div`
	display: flex;
	margin-bottom: 30px;
	position: relative;
	flex-direction: column;
	@media (min-width: 768px) {
		flex-direction: row;
	}
`;
const FieldWrapper = styled.div`
	display: flex;
	flex-direction: column;
	padding: 0 15px;
	flex: ${p => p.flex || 'auto'};
	width: 100%;
	margin-bottom: 20px;
	@media (min-width: 768px) {
		margin-bottom: 0;
	}
`;
const FieldLabel = styled.div`
	font-size: ${p => p.theme.remCalc(12)};
	line-height: 1;
	margin-bottom: 10px;
`;
const FieldContent = styled.div`
	.MuiInput-root {
		display: block;
	}
`;
export const Input = styled.input`
	width: 100%;
	color: ${p => p.theme.colors.blue};
	font-size: ${p => p.theme.remCalc(18)};
	font-weight: 700;
	border: none;
	border-bottom: 1px solid ${p => p.theme.colors.lightGray};
	transition: all 0.3s;
	outline: none;
	&:disabled {
		background: none;
		opacity: 0.7;
	}
	&:focus {
		border-bottom: 2px solid ${p => p.theme.colors.blue};
	}
`;

export function Field({ label, children, flex = null }) {
	return (
		<FieldWrapper flex={flex}>
			<FieldLabel>{label}</FieldLabel>
			<FieldContent>{children}</FieldContent>
		</FieldWrapper>
	);
}
