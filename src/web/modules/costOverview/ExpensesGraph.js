import React, { useState } from 'react';
import {
	XYPlot,
	XAxis,
	YAxis,
	HorizontalGridLines,
	VerticalBarSeries,
	makeWidthFlexible,
	LabelSeries,
} from 'react-vis';
import numeral from 'numeral';

const Plot = makeWidthFlexible(XYPlot);

export default function ExpensesGraph({ data, onClickedYear, ...props }) {
	const [detailed, setDetailed] = useState(false);
	const [nearestX, setNearestX] = useState();

	return (
		<div
			onClick={() => {
				setDetailed(!detailed);
			}}
			style={{
				padding: '15px',
			}}>
			<Plot
				height={300}
				{...props}
				xType="ordinal"
				margin={{ left: 100, top: 25 }}>
				<HorizontalGridLines
					style={{
						stroke: 'rgba(0, 0, 0, 0.15)',
					}}
				/>

				<VerticalBarSeries
					className="test"
					animation="gentle"
					color="#ff6c69"
					data={data}
					style={{
						cursor: 'pointer',
					}}
					barWidth={0.4}
					onNearestX={e => {
						setNearestX(e.x);
					}}
					onSeriesClick={() => {
						onClickedYear(nearestX);
					}}
				/>

				<LabelSeries
					data={data}
					labelAnchorX="middle"
					labelAnchorY="middle"
					animation
				/>

				<XAxis />

				<YAxis tickFormat={v => numeral(v).format('0,0[.]00 $')} />
			</Plot>
		</div>
	);
}
