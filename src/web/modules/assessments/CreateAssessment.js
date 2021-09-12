import React, { useState, useEffect, useReducer, useRef } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { useAppContext } from 'web/lib/AppProvider';
import { rgba } from 'polished';

import Layout from 'components/layout/Layout';
import PageHeader from 'components/general/PageHeader';
import Loading from 'components/general/Loading';
import CategoryItem from 'web/modules/assessments/CategoryItem';
import Select from 'components/general/Select';

import { GET_CATEGORIES } from 'api/Categories';
import { ADD_ASSESSMENTS, GET_ASSESSMENTS } from 'api/Assessments';
import { GET_HOUSINGCOOPERATIVE } from 'api/HousingCooperatives';
import {
	GET_HOUSINGCOOPERATIVE_ADDRESSES,
	DUPLICATE_ADDRESS,
} from 'api/Addresses';

import styled, { keyframes } from 'styled-components';

const FormWrapper = styled.div``;

const StyledCategoryGroup = styled.div`
	display: flex;
	flex-direction: column;
	padding: 1rem;
	margin-top: ${p => (p.isDuplicate ? '-0.5rem' : '0')};
	margin-bottom: 0.5rem;
	background-color: ${p =>
		p.isDuplicate ? rgba('black', 0.03) : p.theme.colors.white};

	@media (min-width: 768px) {
		flex-direction: row;
	}
`;

const StyledCategoryGroupHeader = styled.div`
	width: 35%;
	color: ${p => p.theme.colors.blue};
`;

const StyledChildren = styled.div`
	flex-grow: 1;
	display: flex;
	flex-direction: column;
`;

const slideIn = keyframes`
0% {
	height: 0;
	line-height: 0;
}
100% {
	height: 3rem;
	line-height: 3rem;
}
`;
const slideOut = keyframes`
0% {
	height: 3rem;
	line-height: 3rem;
}
100% {
	height: 0;
	line-height: 0;
}
`;

const SelectionBar = styled.div`
	display: flex;
	align-items: flex-end;
	background-color: ${p => p.theme.colors.buttonBg};
	color: ${p => p.theme.colors.white};
	border: none;
	position: sticky;
	bottom: 0;
	right: 0;
	left: 0;
	margin-left: 2rem;
	margin-right: 2rem;
	line-height: ${p => (p.open ? '3rem' : '0')};
	animation: ${p => (p.open ? slideIn : slideOut)} 0.5s 1 ease-out;
`;

const ObjectCounter = styled.div`
	flex-grow: 1;
	padding-left: 2rem;
	font-weight: bold;
`;

const TextButton = styled.button`
	all: unset;
	margin-right: 1rem;
	padding-left: 2rem;
	font-weight: ${p => (p.cancel ? undefined : 'bold')};
	text-decoration: ${p => (p.cancel ? 'underline' : undefined)};
`;

const DuplicateButton = styled.button`
	all: unset;
	margin-left: auto;
	margin-right: 2rem;
	align-self: flex-end;
	line-height: 1.6;
	padding-left: 2rem;
	padding-right: 2rem;
	font-weight: bold;
	border: 1px solid
		${p => (p.delete ? p.theme.colors.red : p.theme.colors.blue)};
	color: ${p => (p.delete ? p.theme.colors.red : p.theme.colors.blue)};
`;
const AddressWrapper = styled.div`
	padding-bottom: 40px;
`;

export default function CreateAssessment({ history, isHistory }) {
	const addressRef = useRef(null);
	const [address, setAddress] = useState(null);
	const [copyFromAddress, setCopyFromAddress] = useState(null);
	const {
		currentHousingCooperative,
		setAddress: setContextAddress,
	} = useAppContext();
	const [render, reRender] = useState(1);

	const { data: { housingCooperative = {} } = {}, error, loading } = useQuery(
		GET_HOUSINGCOOPERATIVE,
		{
			variables: { _id: currentHousingCooperative },
		}
	);

	const {
		data: { addresses = [] } = {},
		loading: loadingAddresses,
	} = useQuery(GET_HOUSINGCOOPERATIVE_ADDRESSES, {
		variables: { housingCooperativeId: currentHousingCooperative },
	});

	const {
		data: { items: categoryData = null } = {},
		loading: categoryLoading,
		error: categoryError,
	} = useQuery(GET_CATEGORIES);

	const [addAssessments] = useMutation(ADD_ASSESSMENTS);
	const [duplicateAddress] = useMutation(DUPLICATE_ADDRESS);

	const scrollToTop = () => {
		addressRef.current.scrollIntoView({ behavior: 'smooth' });
	};

	// dispatchers
	const [categories, dispatchCategory] = useReducer(
		(state, { data, action }) => {
			let newState = [];
			switch (action) {
				case 'init':
					let sortedCategories = data.sort((a, b) => {
						return a.order - b.order;
					});
					sortedCategories.map((item, index) => {
						item.key = item._id;
						newState.push(item);
					});
					return newState;
					break;

				case 'add':
					state.map(item => {
						newState.push(item);
						if (item === data) {
							let newItem = Object.assign({}, data);
							newItem.isDuplicate = true;
							newItem.key =
								item.key +
								Math.floor(Math.random() * 1000000000);
							newState.push(newItem);
						}
					});
					return newState;
					break;

				case 'delete':
					state.map(item => {
						if (item.key !== data.key) {
							newState.push(item);
						}
					});
					return newState;
					break;

				default:
					return state;
			}
		}
	);

	const [selectedAssessments, assessmentsDispatch] = useReducer(
		(state, { data, action }) => {
			let newState = [];
			switch (action) {
				case 'add':
					if (typeof state === 'undefined') {
						return [data];
					} else {
						return [data, ...state];
					}
					break;

				case 'delete':
					state.map(item => {
						if (item.registrationKey !== data.registrationKey) {
							newState.push(item);
						}
					});
					return newState;
					break;

				case 'reset':
					return undefined;

					break;

				case 'deletegroup':
					if (typeof state === 'undefined') {
						return undefined;
					}
					state.map(item => {
						if (item.parentKey !== data.key) {
							newState.push(item);
						}
					});
					return newState;
					break;

				default:
					return state;
			}
		}
	);

	useEffect(() => {
		let didCancel = false;
		const init = async () => {
			if (categoryData) {
				if (!didCancel) {
					dispatchCategory({
						data: categoryData.items,
						action: 'init',
					});
				}
			}
		};
		init();
		return () => {
			didCancel = true;
		};
	}, [categoryData]);

	const submitAssessments = async () => {
		if (!address) {
			scrollToTop();
			return;
		}

		let refetchVars = {
			housingCooperativeId: currentHousingCooperative,
			orderBy: 'groupOrder',
		};

		if (isHistory) {
			refetchVars.isCompleted = true;
		}

		if (copyFromAddress) {
			const res = await duplicateAddress({
				variables: {
					fromAddress: copyFromAddress,
					toAddress: address,
				},
				refetchQueries: [
					{
						query: GET_ASSESSMENTS,
						variables: refetchVars,
					},
				],
			});

			setContextAddress(address);

			history.push(isHistory ? '/historikk/' : '/tilstandsvurdering/');
			return;
		}

		let assessmentInput = [];
		selectedAssessments.map(item => {
			delete item.registrationKey;
			delete item.parentKey;
			if (isHistory) {
				item.isCompleted = true;
				item.completedAt = new Date();
			}
			item.address = address;
			assessmentInput.push(item);
		});

		await addAssessments({
			variables: { assessments: assessmentInput },
			refetchQueries: [
				{
					query: GET_ASSESSMENTS,
					variables: refetchVars,
				},
			],
		});

		history.push(isHistory ? '/historikk/' : '/tilstandsvurdering/');
	};

	const resetForm = () => {
		setAddress(null);
		assessmentsDispatch({ action: 'reset' });
		dispatchCategory({ action: 'init', data: categoryData.items });
		reRender(render + 1);
	};

	if (loading || categoryLoading || loadingAddresses) return <Loading />;
	if (error || categoryError) return <p>Error</p>;

	return (
		<Layout>
			<PageHeader>Ny vurdering</PageHeader>

			<AddressWrapper ref={addressRef}>
				<Select
					placeholder="Velg adresse"
					options={addresses}
					onSelect={value => setAddress(value)}
					value={address}
					renderInput={false}
				/>
			</AddressWrapper>

			{address && (
				<AddressWrapper key={`selector-${render}`}>
					<Select
						placeholder="Kopier vurderinger fra adresse"
						options={addresses.filter(a => a.value !== address)}
						onSelect={value => setCopyFromAddress(value)}
						value={copyFromAddress}
						renderInput={false}
					/>
				</AddressWrapper>
			)}

			{address && !copyFromAddress && (
				<FormWrapper key={render}>
					{categories &&
						categories.map(group => {
							return (
								<StyledCategoryGroup
									key={group.key}
									isDuplicate={group.isDuplicate}>
									<StyledCategoryGroupHeader>
										{group.name}
									</StyledCategoryGroupHeader>
									<StyledChildren>
										{group.children
											? group.children.map((child, i) => (
													<CategoryItem
														address={
															housingCooperative.address
														}
														key={`${group.key}-${i}`}
														registrationKey={`${group.key}-${child.orderIndex}`}
														selectedAssessments={
															selectedAssessments
														}
														housingCooperativeId={
															currentHousingCooperative
														}
														parent={group}
														child={child}
														register={
															assessmentsDispatch
														}
													/>
											  ))
											: null}
										{group.isDuplicate ? (
											<DuplicateButton
												delete={true}
												onClick={() => {
													assessmentsDispatch({
														data: {
															key: group.key,
														},
														action: 'deletegroup',
													});
													dispatchCategory({
														data: group,
														action: 'delete',
													});
													reRender(render + 1);
												}}>
												Slett
											</DuplicateButton>
										) : (
											<DuplicateButton
												onClick={() => {
													dispatchCategory({
														data: group,
														action: 'add',
													});
													reRender(render + 1);
												}}>
												Kopier
											</DuplicateButton>
										)}
									</StyledChildren>
								</StyledCategoryGroup>
							);
						})}

					{selectedAssessments && (
						<SelectionBar
							open={
								selectedAssessments.length > 0 ? true : false
							}>
							<ObjectCounter>{`${selectedAssessments.length} Objekter valgt`}</ObjectCounter>
							<TextButton
								cancel={true}
								onClick={() => resetForm()}>
								Avbryt
							</TextButton>

							<TextButton onClick={() => submitAssessments()}>
								Lagre
							</TextButton>
						</SelectionBar>
					)}
				</FormWrapper>
			)}

			{address && copyFromAddress && (
				<SelectionBar open={true}>
					<ObjectCounter>{`Kopier vurderinger fra ${
						addresses.find(a => a.value === copyFromAddress).label
					} til ${
						addresses.find(a => a.value === address).label
					}`}</ObjectCounter>

					<TextButton
						cancel={true}
						onClick={() => {
							reRender(render + 1);
							setCopyFromAddress(null);
						}}>
						Avbryt
					</TextButton>

					<TextButton onClick={() => submitAssessments()}>
						Lagre
					</TextButton>
				</SelectionBar>
			)}
		</Layout>
	);
}
