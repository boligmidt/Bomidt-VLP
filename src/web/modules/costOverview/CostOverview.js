import React, { useEffect } from 'react';
import { useAppContext } from 'web/lib/AppProvider';
import { useQuery } from '@apollo/react-hooks';
import moment from 'moment';
import numeral from 'numeral';
import numeralNo from 'numeral/locales/no';
numeral.locale('no');

import Layout from 'components/layout/Layout';
import PageHeader from 'components/general/PageHeader';
import Loading from 'components/general/Loading';
import ExpensesGraph from 'web/modules/costOverview/ExpensesGraph';
import { PrintButton } from 'components/general/Buttons';

import { printCostOverview } from 'web/lib/print';
import { GET_ASSESSMENTS } from 'api/CostOverview';
import { GET_HOUSINGCOOPERATIVE } from 'api/HousingCooperatives';
import ExpensesTable from './ExpensesTable';

export default function CostOverview({ history, ...props }) {
	const { currentHousingCooperative, address, search } = useAppContext();

	const {
		loading,
		data: { assessments } = {},
		refetch: refetchAssessments,
	} = useQuery(GET_ASSESSMENTS, {
		variables: {
			housingCooperativeId: currentHousingCooperative || '',
			isActive: true,
			search,
			address,
		},
	});
	const { data: { housingCooperative = {} } = {} } = useQuery(
		GET_HOUSINGCOOPERATIVE,
		{
			variables: { _id: currentHousingCooperative },
		}
	);

	useEffect(() => {
		refetchAssessments();
	}, [search, address]);

	if (loading) return <Loading />;

	let totalCost = 0;
	let yearMap = {};
	let addressMap = {};
	let data = [];

	assessments.items.forEach(a => {
		let year = moment(a.dueDate).format('YYYY');

		if (isNaN(year)) {
			year = 9999;
		}

		if (!yearMap[year]) {
			yearMap[year] = 0;
		}

		if (!addressMap[a.addressName]) {
			addressMap[a.addressName] = 0;
		}

		let cost = 0;

		if (a.cost) {
			cost = parseInt(a.cost.replace(' ', ''));
		}

		if (isNaN(cost)) {
			cost = 0;
		}

		addressMap[a.addressName] += cost;
		yearMap[year] += cost;
		totalCost += cost;
	});

	Object.keys(yearMap).forEach(key => {
		if (!isNaN(yearMap[key]) || yearMap[key] !== undefined) {
			data.push({
				x: Number(key),
				y: Number(yearMap[key]),
				label: numeral(Number(yearMap[key])).format('0,0[.]00 $'),
				yOffset: -12,
			});
		}
	});

	return (
		<Layout hasSearch hasAddressSelect>
			<PageHeader
				rightColumn={
					<PrintButton
						onClick={() =>
							printCostOverview(
								data,
								housingCooperative,
								addressMap,
								totalCost
							)
						}
					/>
				}>
				Kostnadsoversikt
			</PageHeader>

			{assessments && (
				<ExpensesGraph
					data={data}
					onClickedYear={year =>
						history.push(`/kostnadsoversikt/${year}`)
					}
				/>
			)}

			{assessments && (
				<ExpensesTable addressMap={addressMap} totalCost={totalCost} />
			)}
		</Layout>
	);
}
