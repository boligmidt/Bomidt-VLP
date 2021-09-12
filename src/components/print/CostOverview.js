import React from 'react';
import PrintExpensesGraph from 'web/modules/print/PrintExpensesGraph';
import moment from 'moment';

export default function PrintCostOverview({
	data,
	housingCooperative,
	addressMap,
	totalCost,
}) {
	return (
		<div>
			<style
				dangerouslySetInnerHTML={{
					__html: `
					h2 {
						margin: 10px 0 20px;
						text-align: center;
						font-weight: 900;
					}
					h3{
						margin: 10px 0;
						text-align: center;
						font-weight: 900;
					}
					.date {
						position: absolute;
						top: 10px;
						right: 10px;
						font-weight: 900;
					}
					table {
						border-collapse: collapse;
						width: 100%;
						margin-bottom: 40px;
					}
					table td {
						padding: 8px 10px;
						font-size: 12px;
					}
					table tr td:last-of-type {
						width: 20%;
						font-weight: bold;
					}
					table tr:last-of-type td {
						font-weight: bold;
					}
					table,
					th,
					td {
						border: 1px solid black;
					}
					thead tr td {
						font-weight: 900;
					}
			`,
				}}
			/>

			<h3>{housingCooperative.title}</h3>

			<span className="date">
				{moment().format('DD / MM / YYYY [kl] HH:mm')}
			</span>

			<table>
				<tr>
					<td colSpan="2">
						<PrintExpensesGraph width={800} data={data} />
					</td>
				</tr>

				<tr>
					<td colSpan="2">
						<h3>Vedlikeholdskostnader</h3>
					</td>
				</tr>

				{addressMap &&
					Object.keys(addressMap).map((key, i) => {
						const cost = addressMap[key];

						return (
							<tr key={i}>
								<td>{key}</td>
								<td>
									{new Intl.NumberFormat('nb-NO', {
										style: 'currency',
										currency: 'NOK',
										minimumFractionDigits: 0,
									}).format(cost)}
								</td>
							</tr>
						);
					})}

				<tr>
					<td>Totalt</td>
					<td>
						{new Intl.NumberFormat('nb-NO', {
							style: 'currency',
							currency: 'NOK',
							minimumFractionDigits: 0,
						}).format(totalCost)}
					</td>
				</tr>
			</table>
		</div>
	);
}
