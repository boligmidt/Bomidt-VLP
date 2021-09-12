import React from 'react';
import styled from 'styled-components';

import calendar from 'assets/icons/calendar.svg';

const StyledListDate = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const Calendar = styled.div`
	align-items: center;
	border: 1px solid ${p => p.theme.colors.border};
	border-radius: 50%;
	display: flex;
	font-weight: ${p => p.theme.fontWeights.bold};
	width: 30px;
	height: 30px;
	justify-content: center;
	margin-bottom: 6px;
	text-transform: uppercase;
`;

const Img = styled(calendar)`
	width: 10px;
	height: auto;
`;

const Label = styled.div`
	text-align: center;
	font-size: ${p => p.theme.remCalc(14)};
	font-weight: 700;
	letter-spacing: 0.14px;
	color: ${p => p.theme.colors.blue};
`;

export default function DateWithIcon({ date = null }) {
	return (
		<StyledListDate>
			<Calendar>
				<Img />
			</Calendar>

			<Label>{date ? date : 'Ingen'}</Label>
		</StyledListDate>
	);
}
