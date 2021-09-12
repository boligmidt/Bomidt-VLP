import React from 'react';
import moment from 'moment';
import styled from 'styled-components';

import { getAttributeLabel } from 'web/lib/helpers';

const ActivitiesListWrap = styled.div`
	display: flex;
	flex-direction: column;
	align-items: stretch;
	padding: 0 15px;
`;
function Activity(props) {
	switch (props.type) {
		case 'change':
			return <Change {...props} />;
			break;

		case 'comment':
			return <Comment {...props} />;
			break;

		case 'file':
			return <File {...props} />;
			break;

		default:
			return null;
			break;
	}
}

const List = styled.ul`
	margin: 0 0 30px;
	padding: 15px 10px 15px 30px;
	background: #f3f3f3;
`;
const Line = styled.hr`
	border-top: ${p => p.theme.colors.gray};
`;

function Change(props) {
	if (!props.diff || !props.diff.length) return null;

	return (
		<div>
			<h4>
				{moment(props.createdAt).format('YYYY/MM/DD - [kl.] HH:mm')} av{' '}
				{props.userName}
			</h4>

			<h5>Endringer</h5>

			<List>
				{props.diff.map((change, i) => {
					let { from, to } = change;

					if (
						change.key === 'dueDate' ||
						change.key === 'createdAt'
					) {
						from = moment(change.from).format('YYYY/MM');
						to = moment(change.to).format('YYYY/MM');
					}

					if (change.key === 'isActive') {
						from = !!change.from ? 'Aktiv' : 'Inaktiv';
						to = !!change.to ? 'Aktiv' : 'Inaktiv';
					}

					if (change.key === 'isCompleted') {
						from = !!change.from ? 'Fullført' : 'ikke fullført';
						to = !!change.to ? 'Fullført' : 'ikke fullført';
					}

					if (from === to) return null;

					return (
						<li key={`${props._id}-${i}-${change.key}`}>
							<strong>{getAttributeLabel(change.key)}</strong>
							{from && (
								<>
									{' '}
									fra <strong>{from}</strong>
								</>
							)}
							{to && (
								<>
									{' '}
									til <strong>{to}</strong>
								</>
							)}
						</li>
					);
				})}
			</List>

			<Line />
		</div>
	);
}

const Paragraph = styled.p`
	margin: 0 0 30px;
	padding: 15px 10px;
	background: white;
	border: 1px solid #f3f3f3;
`;

function Comment(props) {
	return (
		<div>
			<h4>
				{moment(props.createdAt).format('YYYY/MM/DD - [kl.] HH:mm')} av{' '}
				{props.userName}
			</h4>

			<Paragraph>{props.comment}</Paragraph>

			<Line />
		</div>
	);
}

function File(props) {
	if (!props.file) return null;

	let action = 'la til';
	if (props.file.isDeleted) {
		action = 'fjernet';
	}

	return (
		<div>
			<h4>
				{moment(props.createdAt).format('YYYY/MM/DD - [kl.] HH:mm')} av{' '}
				{props.userName}
			</h4>

			<p>
				{action}{' '}
				<a
					target="_blank"
					href={props.file.fileUrl}
					title={props.file.fileName}>
					{props.file.fileName}
				</a>
			</p>

			<Line />
		</div>
	);
}

export default function ActivitiesList({ activities }) {
	return (
		<ActivitiesListWrap>
			{activities
				? activities.map(activity => (
						<Activity key={activity._id} {...activity} />
				  ))
				: null}
		</ActivitiesListWrap>
	);
}
