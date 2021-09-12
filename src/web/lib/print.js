import React from 'react';
import ReactDOMServer from 'react-dom/server';
import PrintAssessment from 'components/print/Assessment';
import PrintCostOverview from 'components/print/CostOverview';

export function printContent(content, debug) {
	setTimeout(() => {
		let printWindow = window.open();
		printWindow.document.write(content);
		printWindow.focus();
		if (!debug) {
			printWindow.document.close();
			printWindow.print();
			printWindow.close();
		}
	}, 500);
}

export function printAssessment(assessment) {
	
		printContent(
			ReactDOMServer.renderToString(<PrintAssessment {...assessment} />)
		);
	
}

export function printAssessmentGroup(group) {
	printContent(
		ReactDOMServer.renderToString(
			<div>
				{group.subGroups &&
					group.subGroups.map((subGroup, s) => {
						return (
							subGroup.items &&
							subGroup.items.map(item => (
								<PrintAssessment {...item} />
							))
						);
					})}
			</div>
		)
	);
}

export function printAllAssessmentGroups(groups, header = null) {
	printContent(
		ReactDOMServer.renderToString(
			<div>
				{header && <h1>{header}</h1>}
				{groups && groups.length
					? groups.map(
							(group, i) =>
								group.subGroups &&
								group.subGroups.map((subGroup, s) => {
									return (
										subGroup.items &&
										subGroup.items.map(item => (
											<PrintAssessment {...item} />
										))
									);
								})
					  )
					: null}
			</div>
		)
	);
}

export function printCostOverview(
	data,
	housingCooperative,
	addressMap,
	totalCost
) {
	printContent(
		ReactDOMServer.renderToString(
			<PrintCostOverview
				data={data}
				housingCooperative={housingCooperative}
				addressMap={addressMap}
				totalCost={totalCost}
			/>
		)
	);
}
