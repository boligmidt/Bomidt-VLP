import React from 'react';
import styled from 'styled-components';

const ExpensesTableWrap = styled.div`
	padding: 20px;
	margin: 60px 0;
	max-width: 500px;
	background: white;
`;
const Table = styled.div`
	margin-top: 30px;
`;
const ExpensesRow = styled.div`
	display: flex;
	border-bottom: ${p => (p.sum ? '3px double #ddd' : '1px solid #ddd')};
	font-weight: ${p => (p.sum ? '700' : '400')};
`;
const ExpensesColumn = styled.div`
	flex: 1;
	padding: 10px;
	text-align: ${p => (p.right ? 'right' : 'left')};
`;

export default function ExpensesTable({ addressMap, totalCost }) {
	return (
		<ExpensesTableWrap>
			<h3>Vedlikeholdskostnader</h3>

			<Table>
				{addressMap &&
					Object.keys(addressMap).map((key, i) => {
						const cost = addressMap[key];

						return (
							<ExpensesRow key={i}>
								<ExpensesColumn>{key}</ExpensesColumn>
								<ExpensesColumn right>
									{new Intl.NumberFormat('nb-NO', {
										style: 'currency',
										currency: 'NOK',
										minimumFractionDigits: 0,
									}).format(cost)}
								</ExpensesColumn>
							</ExpensesRow>
						);
					})}

				<ExpensesRow sum>
					<ExpensesColumn>Totalt</ExpensesColumn>
					<ExpensesColumn right>
						{new Intl.NumberFormat('nb-NO', {
							style: 'currency',
							currency: 'NOK',
							minimumFractionDigits: 0,
						}).format(totalCost)}
					</ExpensesColumn>
				</ExpensesRow>
			</Table>
		</ExpensesTableWrap>
	);
}
