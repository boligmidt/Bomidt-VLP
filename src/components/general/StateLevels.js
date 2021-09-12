import React, { useState } from 'react';
import styled from 'styled-components';

import theme from 'web/styles/theme';
import CheckBox from 'components/general/CheckBox';

const StateLevelWrap = styled.div`
	display: flex;
	flex-wrap: wrap;
	margin-bottom: 40px;
`;
const CheckBoxWrap = styled.div`
	display: flex;
	margin: 0 10px 13px 0;
`;
const LabelWrap = styled.div`
	font-weight: bold;
	margin-right: 6px;
`;

export default function StateLevelFilter({ active, handleFilterClick }) {
	return (
		<StateLevelWrap>
			{stateLevels.map(item => (
				<CheckBoxWrap
					key={item.value}
					onClick={e => handleFilterClick(item.value)}>
					<CheckBox
						checked={active.indexOf(item.value) !== -1}
						color={item.color}
					/>
					<LabelWrap>{item.label}</LabelWrap>
					<span>{item.desc}</span>
				</CheckBoxWrap>
			))}
		</StateLevelWrap>
	);
}

export const stateLevels = [
	{
		value: 'tgiu',
		label: 'TGiU',
		desc: 'Ikke undersøkt',
		color: theme.colors.blue,
	},
	{
		value: 'tg0',
		label: 'TG0',
		desc: 'Ingen symptomer (under 5 år)',
		color: theme.colors.green,
	},
	{
		value: 'tg1',
		label: 'TG1',
		desc: 'Svake symptomer',
		color: theme.colors.green,
	},
	{
		value: 'tg2',
		desc: 'Middels kraftige symptomer',
		label: 'TG2',
		color: theme.colors.orange,
	},
	{
		value: 'tg3',
		label: 'TG3',
		desc: 'Kraftige symptomer',
		color: theme.colors.red,
	},
];

export const Tag = styled.div`
	background-color: ${p => p.color};
	width: 44px;
	height: 20px;
	border-radius: 50px;
	color: white;
	text-align: center;
	font-size: 13px;
	font-weight: 700;
	letter-spacing: 0.13px;
	text-transform: uppercase;
	line-height: 1.7;
`;

export function StateLevelTag({ stateLevel }) {
	let current = {};
	stateLevels.forEach(item => {
		if (item.value === stateLevel) {
			current = item;
		}
	});
	return <Tag color={current.color}>{current.label}</Tag>;
}

const TagsWrap = styled.div`
	display: flex;
	justify-content: space-between;
	pointer-events: ${p => (p.disabled ? 'none' : 'initial')};
`;
const ExtendedTag = styled(Tag)`
	background-color: ${p => (p.active ? p.color : p.theme.colors.darkGray)};
	transition: background-color 0.2s;
	width: 57px;
	height: 26px;
	line-height: 26px;
	cursor: pointer;

	&:hover {
		background-color: ${p => p.color};
	}
`;

export function StateLevelSelect({ onSelect, defaultValue, disabled = null }) {
	const [value, setValue] = useState(defaultValue);
	return (
		<TagsWrap disabled={disabled}>
			{stateLevels.map(stateLevel => (
				<ExtendedTag
					key={stateLevel.value}
					active={value === stateLevel.value}
					onClick={e => {
						if (disabled) return null;

						setValue(stateLevel.value);
						onSelect(stateLevel.value);
					}}
					{...stateLevel}>
					{stateLevel.label}
				</ExtendedTag>
			))}
			<input type="hidden" name="stateLevel" value={value} />
		</TagsWrap>
	);
}
